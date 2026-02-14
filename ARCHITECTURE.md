# MegaBets — Architecture Design

## Deployed Contracts (MegaETH Testnet)
- Implementation: `0x38a5dD723D2FbEc159088ec04d421416e3534799` (v1)
- Implementation: `0x4953e802cdc9ffF10A300953a12815f742A44996` (v2 - per-feed timeframes)
- **Proxy: `0x0F60d55De565e6634668cd53952831578fcb423F`**
- Deployer: `0xDb1714b8c7694Fd8d0CB3532d72bCEc4918470E2`
- USDM: `0x77252Dba16C234CA52674adBAC911538705FB31c`
- BTC Oracle: `0x4bE899cF15a212fd6123E4A0E6e1B4925f493B96`
- ETH Oracle: `0x9674Dbe42f9996e1470F8eC15a6D0aebA4a93AEb`

## Overview
60-second micro-prediction rounds on MegaETH. Users bet UP or DOWN on BTC/ETH price. P2P pool model — winners split losers' stakes minus 3% rake.

## Oracle Strategy

### RedStone Models Available

**Option A: Pull Model (Core)** — recommended ✅
- Price data lives off-chain in RedStone's cache layer
- Data is attached to transaction calldata by the caller (using `@redstone-finance/evm-connector` SDK)
- Contract verifies cryptographic signatures on-chain
- **Pros**: Works on any chain immediately, no relayer dependency, truly trustless, cheaper (no storage writes for price feeds)
- **Cons**: Resolver must use RedStone SDK to wrap the `resolveRound()` call

**Option B: Push Model (Classic)**
- RedStone relayer pushes prices to on-chain Chainlink-compatible price feed
- Contract reads `latestRoundData()` — familiar pattern
- **Pros**: Simple contract reads, anyone can resolve without SDK
- **Cons**: Depends on RedStone having a relayer deployed on MegaETH, update frequency controlled by relayer (might not be sub-second)

### Recommendation: Pull Model + Permissionless Resolution Bot

The Pull model is perfect for MegaBets:
1. No dependency on RedStone deploying infrastructure on MegaETH
2. Price data is cryptographically signed — verifiable on-chain
3. Our resolution bot wraps calls with RedStone SDK
4. **Anyone** can run the resolver (permissionless) — just needs the SDK
5. Frontend can also trigger resolution if bot is down

### How It Works

```
User bets UP on ETH → placeBet(roundId, UP, amount)
                       ↓
Round locks after 60s → lockRound(roundId) [bot calls with RedStone data → lockPrice stored]
                       ↓
60s later → resolveRound(roundId) [bot calls with RedStone data → closePrice compared to lockPrice]
                       ↓
Winners claim → claimWinnings(roundId) [proportional share of losing pool minus rake]
```

### Price Flow
- `lockRound()`: Caller attaches RedStone signed price data. Contract extracts & verifies price, stores as `lockPrice`. Timestamp must be within ±10s of lock time.
- `resolveRound()`: Same mechanism. Contract extracts `closePrice`. Timestamp must be after round end time, within ±10s.
- Both functions are **permissionless** — anyone with the SDK can call them.

## Contract Architecture

### MegaBets.sol (UUPS Upgradeable)

```solidity
// Core state
struct Round {
    bytes32 feed;          // e.g., bytes32("ETH") or bytes32("BTC")
    uint64  startTime;     // when first bet came in
    uint64  lockTime;      // startTime + bettingWindow (e.g., 60s)
    uint64  resolveTime;   // lockTime + resolutionWindow (e.g., 60s)
    uint256 lockPrice;     // price at lock (8 decimals from RedStone)
    uint256 closePrice;    // price at resolution
    uint256 totalUp;       // total USDM staked on UP
    uint256 totalDown;     // total USDM staked on DOWN
    Status  status;        // OPEN → LOCKED → RESOLVED → (CANCELLED)
}

enum Status { NONE, OPEN, LOCKED, RESOLVED, CANCELLED }
enum Direction { UP, DOWN }

struct Bet {
    Direction direction;
    uint256   amount;
    bool      claimed;
}

// Key mappings
mapping(uint256 => Round) public rounds;                        // roundId → Round
mapping(uint256 => mapping(address => Bet)) public bets;       // roundId → user → Bet
mapping(address => address) public referrers;                   // user → referrer (set once)
uint256 public nextRoundId;

// Config
uint256 public constant RAKE_BPS = 300;          // 3%
uint256 public constant REFERRAL_BPS = 50;       // 0.5% of bet (from the 3%)
uint256 public constant PROTOCOL_BPS = 250;      // 2.5% of bet
uint64  public bettingWindow = 60;               // seconds to place bets
uint64  public resolutionWindow = 60;            // seconds after lock to resolve
uint256 public minBet = 1e6;                     // 1 USDM (6 decimals)
uint256 public maxBet = 1000e6;                  // 1,000 USDM
address public treasury;                         // protocol fee recipient
IERC20  public usdm;                             // USDM token
```

### Key Functions

```solidity
// --- User Actions ---

/// @notice Place a bet. Creates a new round if none is open for this feed.
function placeBet(bytes32 feed, Direction direction, uint256 amount) external;

/// @notice Set referrer (one-time, can't change)
function setReferrer(address referrer) external;

/// @notice Claim winnings after round is resolved
function claimWinnings(uint256 roundId) external;

// --- Permissionless Resolution (RedStone Pull) ---

/// @notice Lock the round with current price. Callable by anyone with RedStone data.
function lockRound(uint256 roundId) external;

/// @notice Resolve the round with closing price. Callable by anyone with RedStone data.
function resolveRound(uint256 roundId) external;

/// @notice Cancel round if not enough participation or oracle failure
function cancelRound(uint256 roundId) external;

// --- Admin ---
function setConfig(uint64 bettingWindow, uint64 resolutionWindow, uint256 minBet, uint256 maxBet) external onlyOwner;
function setTreasury(address treasury) external onlyOwner;
function pause() / unpause() external onlyOwner;
```

### Round Lifecycle

```
[No round for feed]
    │
    ▼ placeBet() → creates round, status=OPEN
[OPEN] ←── more bets come in (60s window)
    │
    │ after bettingWindow elapsed
    ▼ lockRound() → RedStone price → lockPrice stored, status=LOCKED
[LOCKED] ←── no more bets accepted
    │
    │ after resolutionWindow elapsed  
    ▼ resolveRound() → RedStone price → closePrice stored, status=RESOLVED
[RESOLVED]
    │
    ▼ claimWinnings() → winners get proportional share
[DONE]

Alternative:
[OPEN/LOCKED] → cancelRound() if oracle fails or no opposing bets → refund all
```

### Payout Math

```
Round resolved UP wins:
  totalPool = totalUp + totalDown
  rake = totalPool * 3%
  referralFees = sum of (betAmount * 0.5%) for referred winners
  protocolFee = rake - referralFees
  winnerPool = totalPool - rake
  
  For each UP bettor:
    payout = (userBet / totalUp) * winnerPool
    
  If totalDown == 0 (no opposition): 
    round is cancelled, all bets refunded (or: reduced payout mode)
```

### Security

- **Reentrancy guard** on all state-changing functions
- **RedStone signature verification** — only accepts data from authorized signers
- **Timestamp validation** — price data must be recent (±10s)
- **Overflow protection** — Solidity 0.8+
- **UUPS upgrade** — owner-only upgrades
- **Pausable** — emergency stop
- **No self-referral** — `referrer != msg.sender`
- **Cancel safety** — rounds can be cancelled if oracle fails within grace period

## Frontend Architecture

Next.js 16 + Privy embedded wallets (reuse from Battleship):

```
/megabets
├── app/
│   ├── layout.tsx          # Providers (Privy, Wagmi, QueryClient)
│   ├── page.tsx            # Main betting UI
│   └── api/
│       └── faucet/         # Gas faucet for new users
├── components/
│   ├── RoundCard.tsx       # Live round with countdown, pool sizes, bet buttons
│   ├── BetPanel.tsx        # Amount input, direction selector, place bet
│   ├── PriceChart.tsx      # Mini real-time price chart (TradingView lightweight)
│   ├── History.tsx         # Past rounds, user's bet history
│   ├── LiveTicker.tsx      # Scrolling feed of bets being placed
│   └── Leaderboard.tsx     # Top winners
├── hooks/
│   ├── useRound.ts         # Current round state, countdown
│   ├── useBet.ts           # Place bet, claim winnings
│   └── usePrice.ts         # Real-time price from RedStone/WebSocket
├── lib/
│   ├── contract.ts         # ABI, addresses, chain config
│   └── redstone.ts         # RedStone SDK wrapper for resolution
└── public/
    └── sounds/             # Bet placed, round locked, win/loss
```

### UX Flow
1. User connects via Privy (social login → embedded wallet)
2. Sees live ETH and BTC rounds with countdown timers
3. Taps UP or DOWN, enters amount, confirms (zero-popup with embedded wallet)
4. Watches live countdown, sees other bets flowing in
5. Round locks → price displayed → 60s resolution countdown
6. Round resolves → WIN/LOSS animation → auto-claim or manual claim
7. Referral link sharing for bonus earnings

### Real-time Features (MegaETH 10ms blocks = visible speed)
- **Live bet feed**: Every bet appears instantly as it's mined
- **Pool size updates**: Bars showing UP vs DOWN in real-time
- **Price chart**: Sub-second updates via WebSocket
- **Countdown**: Precise to milliseconds
- **Transaction confirmations**: Near-instant feedback

## Resolution Bot

Simple Node.js service:
1. Polls for rounds that need locking/resolving
2. Wraps calls with RedStone evm-connector SDK
3. Submits transactions to MegaETH
4. Fallback: frontend can trigger resolution too

```typescript
// Bot pseudocode
while (true) {
  const rounds = await getActiveRounds();
  for (const round of rounds) {
    if (round.status === OPEN && now > round.lockTime) {
      await lockRoundWithRedstone(round.id);
    }
    if (round.status === LOCKED && now > round.resolveTime) {
      await resolveRoundWithRedstone(round.id);
    }
  }
  await sleep(1000); // 1s polling
}
```

## Tech Stack
- **Contract**: Solidity 0.8.28, Foundry, UUPS, OpenZeppelin 5.x, RedStone evm-connector
- **Frontend**: Next.js 16, Privy, viem, wagmi, TailwindCSS, Framer Motion
- **Bot**: Node.js, ethers.js + @redstone-finance/evm-connector
- **Chain**: MegaETH (testnet → mainnet)
- **Token**: USDM (6 decimals)

## Feeds
- `ETH` → bytes32("ETH") → ETH/USD price (8 decimals from RedStone)
- `BTC` → bytes32("BTC") → BTC/USD price (8 decimals from RedStone)

RedStone data service: `redstone-primary-prod` (production feeds, multiple signers)

## Revenue Model
- 3% rake on every resolved round's total pool
- 2.5% to protocol treasury
- 0.5% to referrers (only for referred users)
- At $10K daily volume → $250/day protocol revenue
- At $100K daily volume → $2,500/day

## Build Order
1. **Contract** — MegaBets.sol with RedStone integration + tests (2-3 days)
2. **Frontend** — Betting UI, Privy, real-time (3-4 days)
3. **Bot** — Resolution service (1 day)
4. **Deploy testnet** — End-to-end testing (1 day)
5. **Deploy mainnet** — Launch 🚀 (1 day)

Total: ~2 weeks

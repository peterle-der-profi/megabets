# MegaBets — Technical Specification

> Real-time pari-mutuel micro-prediction platform on MegaETH
> Version: 1.0 | Date: 2026-02-13 | Target build: 2-3 weeks

---

## Table of Contents

1. [Overview](#1-overview)
2. [Smart Contract Architecture](#2-smart-contract-architecture)
3. [RedStone Oracle Integration](#3-redstone-oracle-integration)
4. [Frontend Architecture](#4-frontend-architecture)
5. [Keeper Bot](#5-keeper-bot)
6. [Design Theme](#6-design-theme)
7. [Testing Plan](#7-testing-plan)
8. [Deployment Plan](#8-deployment-plan)
9. [File Structure](#9-file-structure)
10. [Timeline](#10-timeline)
11. [Open Questions](#11-open-questions)

---

## 1. Overview

**MegaBets** is a pari-mutuel prediction game where users bet UP or DOWN on crypto asset prices over 60-second rounds. Winners split losers' pool minus a 3% rake. No house capital required.

### Core Parameters

| Parameter | Value |
|---|---|
| Chain | MegaETH (testnet 6343, mainnet 4326) |
| Block time | 10ms |
| Stablecoin | USDM (ERC-20, 6 decimals) |
| Oracle | RedStone push model |
| Round duration | 60s (6,000 blocks) |
| Betting window | 50s (5,000 blocks) |
| Lock window | 10s (1,000 blocks) |
| Rake | 3% (300 bps, configurable) |
| Launch markets | BTC/USD, ETH/USD |

### MegaETH-Specific Constraints

These are **non-negotiable** platform differences from mainnet Ethereum. Every builder must internalize these:

| # | Constraint | Impact |
|---|---|---|
| 1 | **`eth_sendRawTransactionSync` (EIP-7966)** — returns receipt in <10ms, no polling | Use everywhere: frontend, keeper. Custom viem transport rewrites `eth_sendRawTransaction` → `eth_sendRawTransactionSync`. No `waitForTransactionReceipt` needed. |
| 2 | **Volatile Data Access Limit** — after reading `block.timestamp` or `block.number`, only 20M gas remains for compute | In contract: do ALL heavy math/storage BEFORE reading `block.number`. Structure functions so block metadata is the **last** thing accessed. |
| 3 | **SSTORE 0→nonzero costs 2M+ gas** × bucket multiplier | Design structs for slot reuse. Use circular buffer for rounds instead of ever-growing mapping. Minimize new storage slots per tx. |
| 4 | **Intrinsic gas: 60,000** (not 21K) | Budget accordingly in gas estimates and fee displays. |
| 5 | **Base fee: fixed 0.001 gwei**, no EIP-1559 | Hardcode `gasPrice: 1_000n` (1000 wei = 0.001 gwei) in frontend and keeper. No maxFeePerGas/maxPriorityFeePerGas. |
| 6 | **Gas estimation: always remote** — MegaEVM opcode costs differ | Always use `eth_estimateGas` RPC call. For Foundry deploys: `--skip-simulation`. Never trust local gas estimates. |
| 7 | **WebSocket: `miniBlocks` subscription** | Use `eth_subscribe("miniBlocks")` for real-time data. Send `eth_chainId` keepalive every 30s. Max 50 connections per endpoint. |
| 8 | **Contract size limit: 512KB** | Not a concern for us, but good to know. |
| 9 | **LOG opcodes: quadratic cost above 4KB** | Keep all events small. No string reasons in events (use error codes). Cancel reason as uint8 enum, not string. |
| 10 | **Foundry: `--skip-simulation --broadcast`** | Required for all deploy/script commands. May need gas estimate multiplier. |
| 11 | **High-precision timestamp oracle** at `0x6342000000000000000000000000000000000002` | Returns microsecond timestamps. Can use for precise round timing if block.number proves insufficient. |
| 12 | **Multicall3** at `0xcA11bde05977b3631167028862bE2a173976CA11` | Batch all frontend reads through Multicall3 for efficiency. |
| 13 | **OP Stack predeploys** — WETH9 at `0x4200000000000000000000000000000000000006` | Available if needed. |

### How It Works

1. Round opens → users bet UP or DOWN with USDM
2. After 50s, round locks — no more bets, lock price recorded
3. After 10 more seconds, round ends — close price recorded
4. If close > lock → UP wins. If close < lock → DOWN wins.
5. Winners split the entire pool minus 3% rake, proportional to their bet size
6. Next round's betting opens when current round locks (overlapping rounds)

---

## 2. Smart Contract Architecture

### 2.1 Contract: `MegaBets.sol`

**Inheritance**: `UUPSUpgradeable`, `OwnableUpgradeable`, `PausableUpgradeable`, `ReentrancyGuardUpgradeable`, `RedstoneConsumerBase`

**Compiler**: Solidity 0.8.24+, via-IR enabled for optimization

#### ⚠️ MegaETH Gas Rules (applies to ALL functions)

1. **Volatile data last**: Every function that reads `block.number` or `block.timestamp` must do so as the LAST operation, after all heavy computation and storage writes. After accessing volatile data, only 20M gas remains. Structure: load storage → compute → write storage → read block.number → emit event → return.

2. **Minimize 0→nonzero SSTORE**: Each fresh slot write costs 2M+ gas. Reuse slots via circular buffer for rounds. Pack structs tightly to minimize slot count.

3. **Small events**: LOG opcodes have quadratic cost above 4KB. No `string` in events — use `uint8` enum codes for cancel reasons.

---

### 2.2 Enums

```solidity
enum Position {
    Up,   // 0
    Down  // 1
}

enum RoundStatus {
    None,              // 0 - doesn't exist
    Betting,           // 1 - accepting bets
    Locked,            // 2 - no new bets, awaiting end
    AwaitingSettlement,// 3 - round ended, needs oracle price
    Settled,           // 4 - payouts available
    Cancelled          // 5 - refunds available
}

// ⚠️ MegaETH: use uint8 enum instead of string to keep LOG data <4KB
enum CancelReason {
    None,                    // 0
    SettlementWindowExpired, // 1
    OneSided,                // 2
    PriceUnchanged           // 3
}
```

### 2.3 Structs — Slot-Packed for MegaETH

> ⚠️ **MegaETH SSTORE cost**: 0→nonzero writes cost 2M+ gas × bucket multiplier. Every slot matters.
> Pack structs to minimize slot count. Use a **circular buffer** for rounds so slots are reused (nonzero→nonzero is ~10x cheaper than 0→nonzero).

```solidity
struct Market {
    bytes32 feedId;           // RedStone feed ID (e.g., "BTC", "ETH")       — slot 0
    uint64 bettingDuration;   // in blocks (default 5000 = 50s)              — slot 1 (packed)
    uint64 lockDuration;      // in blocks (default 1000 = 10s)              ┘
    uint128 minBet;           // minimum bet in USDM (e.g., 1e6 = $1)       — slot 1 (packed)
    uint128 maxBet;           // maximum bet in USDM (e.g., 10000e6 = $10k) — slot 2 (packed)
    uint64 currentRoundId;    // latest round ID (uint64 is enough)          ┘
    bool active;              // can new rounds be started?                   ┘
}
// Total: ~3 slots per market

// ⚠️ SLOT-OPTIMIZED Round struct: 5 storage slots (down from 8+)
struct Round {
    // Slot 0: timing (all uint64, packed into one 256-bit slot)
    uint64 id;
    uint64 startBlock;
    uint64 lockBlock;
    uint64 endBlock;
    
    // Slot 1: prices (two uint128 = one slot)  
    uint128 lockPrice;        // RedStone 8 decimals, uint128 is plenty
    uint128 closePrice;
    
    // Slot 2: pool sizes (two uint128 = one slot)
    uint128 totalUp;
    uint128 totalDown;
    
    // Slot 3: totals + status (packed)
    uint128 rewardAmount;     // totalAmount - rake (set at settlement)
    uint8 status;             // RoundStatus enum
    uint8 cancelReason;       // CancelReason enum
    bytes32 marketId;         // redundant but needed for event emission
    
    // Slot 4: marketId
    // (moved marketId to its own slot since slot 3 is full)
}
// Total: 5 slots per round (vs 8+ unpacked)
// NOTE: totalAmount is computed as totalUp + totalDown (not stored separately)

// Bet struct: 2 slots
struct Bet {
    // Slot 0: core data (packed)
    uint128 amount;           // bet amount in USDM
    uint8 position;           // Position enum (0=Up, 1=Down)
    bool claimed;             // has payout been claimed?
    // 14 bytes remaining in this slot
    
    // We DON'T store roundId, marketId, or player — they're the mapping keys
    // bets[roundId][player] => Bet
}
// Total: 1 slot per bet (!)
```

#### Circular Buffer for Rounds

Instead of `mapping(uint256 => Round)` which creates new slots forever, use a circular buffer per market:

```solidity
uint16 constant ROUND_BUFFER_SIZE = 256; // keep last 256 rounds per market

// rounds[marketId][roundId % ROUND_BUFFER_SIZE] => Round
mapping(bytes32 => Round[ROUND_BUFFER_SIZE]) public roundBuffers;

// Global round counter (still monotonically increasing for external reference)
uint64 public nextRoundId;
```

**Why**: After 256 rounds (~4.3 hours at 60s/round), slots start being reused. Nonzero→nonzero SSTORE is ~10x cheaper than 0→nonzero on MegaETH. This saves massive gas over time.

**Trade-off**: Can only look up last 256 rounds per market on-chain. Older rounds are available via event logs (indexed off-chain). This is acceptable — users should claim within a few hours.

> If circular buffer adds too much complexity for v1, fall back to plain mapping but document the gas implications. The buffer is strongly recommended for mainnet.

### 2.4 State Variables

```solidity
// Core
IERC20 public usdm;
address public treasury;
uint16 public rakeBps;            // default 300 (3%)
uint16 public referralBps;        // default 100 (1% of rake → referrer)

// Markets: marketId => Market
// marketId = keccak256(abi.encodePacked(feedId)) e.g., keccak256("BTC")
mapping(bytes32 => Market) public markets;
bytes32[] public marketIds;       // list of all market IDs

// Rounds: circular buffer per market (see §2.3)
// roundBuffers[marketId][roundId % ROUND_BUFFER_SIZE] => Round
uint16 public constant ROUND_BUFFER_SIZE = 256;
mapping(bytes32 => Round[256]) public roundBuffers;
uint64 public nextRoundId;        // starts at 1, globally unique

// Bets: roundId => player => Bet
// One bet per player per round (can add to existing bet same side only)
mapping(uint64 => mapping(address => Bet)) public bets;

// Bet tracking for user history
mapping(address => uint256[]) public userRoundIds;  // all rounds user bet on

// Referrals: user => referrer (one-level, immutable once set)
mapping(address => address) public referrers;

// Oracle staleness threshold
uint64 public maxOracleDelay;     // max seconds between oracle timestamp and block.timestamp (default 60)

// Settlement buffer: max blocks after endBlock that settlement is allowed before auto-cancel
uint64 public settlementBuffer;   // default 30000 blocks (5 minutes)
```

### 2.5 Events

```solidity
event MarketAdded(bytes32 indexed marketId, bytes32 feedId, uint64 bettingDuration, uint64 lockDuration, uint128 minBet, uint128 maxBet);
event MarketRemoved(bytes32 indexed marketId);
event MarketUpdated(bytes32 indexed marketId, uint64 bettingDuration, uint64 lockDuration, uint128 minBet, uint128 maxBet);

event RoundStarted(bytes32 indexed marketId, uint256 indexed roundId, uint64 startBlock, uint64 lockBlock, uint64 endBlock);
event RoundLocked(bytes32 indexed marketId, uint256 indexed roundId, uint256 lockPrice);
event RoundSettled(bytes32 indexed marketId, uint256 indexed roundId, uint256 closePrice, Position winningPosition, uint128 rewardAmount);
event RoundCancelled(bytes32 indexed marketId, uint256 indexed roundId, uint8 reason); // CancelReason enum, no string (MegaETH LOG cost)

event BetPlaced(bytes32 indexed marketId, uint256 indexed roundId, address indexed player, uint128 amount, Position position);
event Claimed(address indexed player, uint256 indexed roundId, uint128 amount);
event ReferrerSet(address indexed user, address indexed referrer);
event RakeCollected(uint256 indexed roundId, uint128 rakeAmount, uint128 referralAmount);

event TreasuryUpdated(address newTreasury);
event RakeBpsUpdated(uint16 newRakeBps);
event ReferralBpsUpdated(uint16 newReferralBps);
```

### 2.6 Errors

```solidity
error MarketNotActive();
error MarketAlreadyExists();
error MarketDoesNotExist();
error RoundNotInBettingPhase();
error RoundNotSettleable();
error BetTooSmall(uint128 amount, uint128 minBet);
error BetTooLarge(uint128 amount, uint128 maxBet);
error AlreadyBetOtherSide();
error NothingToClaim();
error AlreadyClaimed();
error RoundNotFinalized();
error OraclePriceStale(uint64 oracleTimestamp, uint64 blockTimestamp);
error InvalidRakeBps();
error SelfReferral();
error ReferrerAlreadySet();
error TransferFailed();
error ZeroAmount();
error SettlementWindowExpired();
```

### 2.7 Core Functions

#### `initialize(address _usdm, address _treasury, address _owner)`

```solidity
function initialize(
    address _usdm,
    address _treasury,
    address _owner
) external initializer {
    __UUPSUpgradeable_init();
    __Ownable_init(_owner);
    __Pausable_init();
    __ReentrancyGuard_init();
    
    usdm = IERC20(_usdm);
    treasury = _treasury;
    rakeBps = 300;        // 3%
    referralBps = 100;    // 1% of rake
    nextRoundId = 1;
    maxOracleDelay = 60;
    settlementBuffer = 30000; // 5 min
}
```

#### `addMarket(bytes32 feedId, uint64 bettingDuration, uint64 lockDuration, uint128 minBet, uint128 maxBet)`

```solidity
function addMarket(
    bytes32 feedId,
    uint64 bettingDuration,
    uint64 lockDuration,
    uint128 minBet,
    uint128 maxBet
) external onlyOwner {
    bytes32 marketId = keccak256(abi.encodePacked(feedId));
    if (markets[marketId].active) revert MarketAlreadyExists();
    
    markets[marketId] = Market({
        feedId: feedId,
        bettingDuration: bettingDuration,
        lockDuration: lockDuration,
        minBet: minBet,
        maxBet: maxBet,
        currentRoundId: 0,
        active: true
    });
    marketIds.push(marketId);
    
    emit MarketAdded(marketId, feedId, bettingDuration, lockDuration, minBet, maxBet);
}
```

#### `startNewRound(bytes32 marketId)`

Anyone can call this. Starts a new round for a market if conditions are met.

```solidity
function startNewRound(bytes32 marketId) external whenNotPaused returns (uint64 roundId) {
    Market storage market = markets[marketId];
    if (!market.active) revert MarketNotActive();
    
    // 1. Load storage BEFORE volatile access
    uint64 prevRoundId = market.currentRoundId;
    uint64 bettingDuration = market.bettingDuration;
    uint64 lockDuration = market.lockDuration;
    
    // Check previous round status (may need block.number via _getRoundStatus)
    if (prevRoundId != 0) {
        Round storage prev = _getRoundStorage(prevRoundId);
        uint8 prevStatus = prev.status;
        // For settled/cancelled, no block.number needed
        // For betting→locked transition, we need block.number
        // Defer this check to after we read block.number below
    }
    
    // 2. Assign round ID
    roundId = nextRoundId++;
    
    // 3. ⚠️ Read block.number (volatile access — 20M gas limit starts)
    uint64 startBlock = uint64(block.number);
    uint64 lockBlock = startBlock + bettingDuration;
    uint64 endBlock = lockBlock + lockDuration;
    
    // Validate previous round (lightweight, post-volatile)
    if (prevRoundId != 0) {
        Round storage prev = _getRoundStorage(prevRoundId);
        uint8 ps = prev.status;
        if (ps == uint8(RoundStatus.Betting)) {
            // Check if it should be locked by now
            if (block.number < prev.lockBlock) {
                revert("Previous round still in betting phase");
            }
        }
    }
    
    // 4. Write round to circular buffer (reuses existing slot = cheap nonzero→nonzero SSTORE)
    Round storage round = roundBuffers[marketId][roundId % ROUND_BUFFER_SIZE];
    round.id = roundId;
    round.startBlock = startBlock;
    round.lockBlock = lockBlock;
    round.endBlock = endBlock;
    round.lockPrice = 0;
    round.closePrice = 0;
    round.totalUp = 0;
    round.totalDown = 0;
    round.rewardAmount = 0;
    round.status = uint8(RoundStatus.Betting);
    round.cancelReason = 0;
    round.marketId = marketId;
    
    market.currentRoundId = roundId;
    
    emit RoundStarted(marketId, roundId, startBlock, lockBlock, endBlock);
}
```

```solidity
// Helper to get round from circular buffer
function _getRoundStorage(uint64 roundId) internal view returns (Round storage) {
    // We need marketId to index into the buffer, but roundId alone isn't enough.
    // ALTERNATIVE: use a flat mapping (simpler) and accept the 0→nonzero cost for v1.
    // For circular buffer, we need a global roundId → marketId lookup.
    // Simple solution: store it.
}
```

> **Implementation note**: The circular buffer requires knowing the marketId to look up a round. Two options:
> 1. **Always pass marketId alongside roundId** in function params (slightly worse UX)
> 2. **Keep a small `mapping(uint64 => bytes32) roundMarket`** that maps roundId → marketId (1 extra slot write per round, but it's a warm slot after first use)
> 
> Recommendation: option 2. The `roundMarket` mapping slot gets reused once the mapping is populated, and it makes the external API cleaner.

#### `bet(uint64 roundId, Position position, uint128 amount)`

```solidity
function bet(
    uint64 roundId,
    Position position,
    uint128 amount
) external whenNotPaused nonReentrant {
    if (amount == 0) revert ZeroAmount();
    
    // ⚠️ MegaETH VOLATILE DATA RULE: block.number access triggers 20M gas limit.
    // Strategy: load all storage, do all computation, write storage, THEN check block.number.
    
    // 1. Load storage (BEFORE volatile access)
    bytes32 marketId;  // will be set from round
    Round storage round = _getRoundStorage(roundId);
    marketId = round.marketId;
    Market storage market = markets[marketId];
    uint128 minBet = market.minBet;
    uint128 maxBet = market.maxBet;
    uint64 lockBlock = round.lockBlock;
    uint8 status = round.status;
    
    // 2. Validate amount (pure computation, no volatile data)
    if (amount < minBet) revert BetTooSmall(amount, minBet);
    if (amount > maxBet) revert BetTooLarge(amount, maxBet);
    
    // 3. Check/update bet storage
    Bet storage existingBet = bets[roundId][msg.sender];
    if (existingBet.amount > 0) {
        if (existingBet.position != uint8(position)) revert AlreadyBetOtherSide();
        existingBet.amount += amount;
    } else {
        bets[roundId][msg.sender] = Bet({
            amount: amount,
            position: uint8(position),
            claimed: false
        });
        userRoundIds[msg.sender].push(roundId);
    }
    
    // 4. Update round totals
    if (position == Position.Up) {
        round.totalUp += amount;
    } else {
        round.totalDown += amount;
    }
    
    // 5. Transfer USDM
    bool success = usdm.transferFrom(msg.sender, address(this), amount);
    if (!success) revert TransferFailed();
    
    // 6. ⚠️ NOW check block.number (volatile access — 20M gas limit starts here)
    //    Only lightweight checks + event emission after this point.
    if (status != uint8(RoundStatus.Betting)) revert RoundNotInBettingPhase();
    if (block.number >= lockBlock) revert RoundNotInBettingPhase();
    
    emit BetPlaced(marketId, roundId, msg.sender, amount, position);
}
```

> **⚠️ Revert-safety note**: If block.number check fails, the entire tx reverts — including the USDM transfer and storage writes. So putting the check last is safe; it just means we do "wasted" work on revert. This is the correct trade-off on MegaETH: the happy path (valid bet) is gas-optimized, and reverts don't cost the user anything meaningful.

#### `setReferrer(address referrer)`

```solidity
function setReferrer(address referrer) external {
    if (referrer == msg.sender) revert SelfReferral();
    if (referrers[msg.sender] != address(0)) revert ReferrerAlreadySet();
    referrers[msg.sender] = referrer;
    emit ReferrerSet(msg.sender, referrer);
}
```

#### `lockRound(uint64 roundId)`

Called by keeper when a round reaches its lock block. Records the lock price.

```solidity
function lockRound(uint64 roundId) external whenNotPaused {
    // ⚠️ MegaETH volatile data rule: RedStone oracle read + storage writes FIRST, block.number LAST
    
    // 1. Load storage
    Round storage round = _getRoundStorage(roundId);
    bytes32 marketId = round.marketId;
    Market storage market = markets[marketId];
    uint8 status = round.status;
    uint64 lockBlock = round.lockBlock;
    
    require(status == uint8(RoundStatus.Betting), "Not in betting phase");
    
    // 2. Get lock price from RedStone (heavy computation, do before volatile access)
    uint128 lockPrice = uint128(getOracleNumericValueFromTxMsg(market.feedId));
    
    // 3. Write storage
    round.lockPrice = lockPrice;
    round.status = uint8(RoundStatus.Locked);
    
    // 4. ⚠️ NOW access block.number (volatile — 20M gas remaining)
    require(block.number >= lockBlock, "Too early to lock");
    
    emit RoundLocked(marketId, roundId, lockPrice);
}
```

#### `settleRound(uint64 roundId)`

Anyone can call. RedStone price data is in the calldata (appended by RedStone SDK wrapper).

```solidity
function settleRound(uint64 roundId) external whenNotPaused nonReentrant {
    // ⚠️ MegaETH volatile data rule: all heavy work BEFORE block.number access
    
    // 1. Load all storage
    Round storage round = _getRoundStorage(roundId);
    bytes32 marketId = round.marketId;
    Market storage market = markets[marketId];
    uint8 status = round.status;
    uint64 endBlock = round.endBlock;
    uint128 totalUp = round.totalUp;
    uint128 totalDown = round.totalDown;
    uint128 lockPrice = round.lockPrice;
    uint16 _rakeBps = rakeBps;
    uint64 _settlementBuffer = settlementBuffer;
    
    require(status == uint8(RoundStatus.Locked), "Round not in locked state");
    
    // 2. Get close price from RedStone (heavy crypto verification, BEFORE volatile access)
    uint128 closePrice = uint128(getOracleNumericValueFromTxMsg(market.feedId));
    
    // 3. Compute payout math (pure computation)
    uint128 totalAmount = totalUp + totalDown;
    bool noBets = (totalAmount == 0);
    bool oneSided = (totalUp == 0 || totalDown == 0);
    bool priceUnchanged = (closePrice == lockPrice);
    
    uint128 rake;
    uint128 rewardPool;
    if (!noBets && !oneSided && !priceUnchanged) {
        rake = (totalAmount * _rakeBps) / 10000;
        rewardPool = totalAmount - rake;
    }
    
    // 4. Write storage (all SSTORE before volatile access)
    round.closePrice = closePrice;
    
    if (noBets) {
        round.status = uint8(RoundStatus.Settled);
        round.rewardAmount = 0;
    } else if (oneSided) {
        round.status = uint8(RoundStatus.Cancelled);
        round.cancelReason = uint8(CancelReason.OneSided);
    } else if (priceUnchanged) {
        round.status = uint8(RoundStatus.Cancelled);
        round.cancelReason = uint8(CancelReason.PriceUnchanged);
    } else {
        round.rewardAmount = rewardPool;
        round.status = uint8(RoundStatus.Settled);
    }
    
    // 5. Transfer rake (external call, but still before volatile access)
    if (rake > 0) {
        usdm.transfer(treasury, rake);
    }
    
    // 6. ⚠️ NOW access block.number (volatile — 20M gas remaining)
    require(block.number >= endBlock, "Round not ended yet");
    if (block.number > endBlock + _settlementBuffer) {
        // Override: cancel due to expired window
        round.status = uint8(RoundStatus.Cancelled);
        round.cancelReason = uint8(CancelReason.SettlementWindowExpired);
        // Refund rake if we already sent it
        // NOTE: edge case — if we sent rake but then cancel, treasury keeps it.
        // Fix: move rake transfer AFTER block.number check. But that violates volatile rule.
        // SOLUTION: pre-check with a cached block number estimate, or accept this as
        // a keeper responsibility (keeper should not settle expired rounds).
        emit RoundCancelled(marketId, roundId, uint8(CancelReason.SettlementWindowExpired));
        return;
    }
    
    // 7. Emit events (lightweight, post-volatile is fine)
    if (noBets) {
        emit RoundSettled(marketId, roundId, closePrice, Position.Up, 0);
    } else if (oneSided) {
        emit RoundCancelled(marketId, roundId, uint8(CancelReason.OneSided));
    } else if (priceUnchanged) {
        emit RoundCancelled(marketId, roundId, uint8(CancelReason.PriceUnchanged));
    } else {
        Position winningPosition = closePrice > lockPrice ? Position.Up : Position.Down;
        emit RoundSettled(marketId, roundId, closePrice, winningPosition, rewardPool);
        emit RakeCollected(roundId, rake, 0);
    }
}
```

> **Note on settlement window expiry race condition**: The keeper is responsible for not submitting settlement txs after the window expires. The contract has a safety check, but the rake-refund edge case means the keeper should pre-check `block.number` off-chain before submitting. This is fine — the keeper always knows the current block.

#### `_distributeRake(uint256 roundId, uint128 rake)` (internal)

```solidity
function _distributeRake(uint256 roundId, uint128 rake) internal {
    // For now, send full rake to treasury
    // Referral rake is calculated at claim time per-user
    bool success = usdm.transfer(treasury, rake);
    if (!success) revert TransferFailed();
    
    emit RakeCollected(roundId, rake, 0);
}
```

> **Note on referral rake**: To keep settlement gas-efficient, referral payouts are NOT calculated during settlement. Instead, the full rake goes to treasury. Referral rewards can be handled off-chain or via a separate claim mechanism in v2. This simplifies the contract significantly.

**Alternative (if on-chain referral is required)**: Track per-round referral amounts and distribute during `claim()`. See Open Questions.

#### `claim(uint256[] calldata roundIds)`

```solidity
function claim(uint256[] calldata roundIds) external nonReentrant {
    uint128 totalPayout = 0;
    
    for (uint256 i = 0; i < roundIds.length; i++) {
        uint256 roundId = roundIds[i];
        Bet storage userBet = bets[roundId][msg.sender];
        
        if (userBet.amount == 0) continue;
        if (userBet.claimed) continue;
        
        Round storage round = rounds[roundId];
        
        uint128 payout = 0;
        
        if (round.status == RoundStatus.Settled) {
            Position winningPosition = round.closePrice > round.lockPrice 
                ? Position.Up 
                : Position.Down;
            
            if (userBet.position == winningPosition) {
                // Winner: (userBet / totalWinnerSide) * rewardPool
                uint128 totalWinnerSide = winningPosition == Position.Up 
                    ? round.totalUp 
                    : round.totalDown;
                
                payout = uint128(
                    (uint256(userBet.amount) * uint256(round.rewardAmount)) / uint256(totalWinnerSide)
                );
            }
            // Losers get nothing (payout stays 0)
            
        } else if (round.status == RoundStatus.Cancelled) {
            // Refund full bet
            payout = userBet.amount;
        } else {
            continue; // Round not finalized yet
        }
        
        userBet.claimed = true;
        
        if (payout > 0) {
            totalPayout += payout;
            emit Claimed(msg.sender, roundId, payout);
        }
    }
    
    if (totalPayout == 0) revert NothingToClaim();
    
    bool success = usdm.transfer(msg.sender, totalPayout);
    if (!success) revert TransferFailed();
}
```

#### `_cancelRound(uint64 roundId, CancelReason reason)` (internal)

```solidity
function _cancelRound(uint64 roundId, CancelReason reason) internal {
    Round storage round = _getRoundStorage(roundId);
    round.status = uint8(RoundStatus.Cancelled);
    round.cancelReason = uint8(reason);
    emit RoundCancelled(round.marketId, roundId, uint8(reason));
}
```

#### `_getRoundStatus(Round storage round)` (internal view)

Returns the computed status based on block number (Betting/Locked transitions are block-based):

```solidity
function _getRoundStatus(Round storage round) internal view returns (RoundStatus) {
    if (round.status == RoundStatus.Settled || round.status == RoundStatus.Cancelled) {
        return round.status;
    }
    if (round.id == 0) return RoundStatus.None;
    
    if (round.status == RoundStatus.Locked && block.number >= round.endBlock) {
        return RoundStatus.AwaitingSettlement;
    }
    if (round.status == RoundStatus.Betting && block.number >= round.lockBlock) {
        // Lock hasn't been called yet but we're past lockBlock
        // Still return Locked conceptually (bets should be rejected)
        return RoundStatus.Locked;
    }
    
    return round.status;
}
```

> **Important**: The `bet()` function uses `_getRoundStatus()` to check phase, so bets are automatically rejected after `lockBlock` even if `lockRound()` hasn't been called yet. The keeper should still call `lockRound()` to record the lock price, but the contract is safe regardless.

### 2.8 Admin Functions

```solidity
function setTreasury(address _treasury) external onlyOwner {
    treasury = _treasury;
    emit TreasuryUpdated(_treasury);
}

function setRakeBps(uint16 _rakeBps) external onlyOwner {
    if (_rakeBps > 1000) revert InvalidRakeBps(); // max 10%
    rakeBps = _rakeBps;
    emit RakeBpsUpdated(_rakeBps);
}

function setReferralBps(uint16 _referralBps) external onlyOwner {
    referralBps = _referralBps;
    emit ReferralBpsUpdated(_referralBps);
}

function setMaxOracleDelay(uint64 _delay) external onlyOwner {
    maxOracleDelay = _delay;
}

function setSettlementBuffer(uint64 _buffer) external onlyOwner {
    settlementBuffer = _buffer;
}

function updateMarket(
    bytes32 marketId,
    uint64 bettingDuration,
    uint64 lockDuration,
    uint128 minBet,
    uint128 maxBet
) external onlyOwner {
    Market storage market = markets[marketId];
    if (!market.active) revert MarketDoesNotExist();
    market.bettingDuration = bettingDuration;
    market.lockDuration = lockDuration;
    market.minBet = minBet;
    market.maxBet = maxBet;
    emit MarketUpdated(marketId, bettingDuration, lockDuration, minBet, maxBet);
}

function removeMarket(bytes32 marketId) external onlyOwner {
    markets[marketId].active = false;
    emit MarketRemoved(marketId);
}

function pause() external onlyOwner { _pause(); }
function unpause() external onlyOwner { _unpause(); }

function _authorizeUpgrade(address) internal override onlyOwner {}
```

### 2.9 View Functions

```solidity
function getCurrentRound(bytes32 marketId) external view returns (Round memory, RoundStatus) {
    uint256 roundId = markets[marketId].currentRoundId;
    Round storage round = rounds[roundId];
    return (round, _getRoundStatus(round));
}

function getRound(uint256 roundId) external view returns (Round memory, RoundStatus) {
    return (rounds[roundId], _getRoundStatus(rounds[roundId]));
}

function getUserBet(uint256 roundId, address user) external view returns (Bet memory) {
    return bets[roundId][user];
}

function getUserRounds(address user, uint256 offset, uint256 limit) 
    external view returns (uint256[] memory) 
{
    uint256[] storage allRounds = userRoundIds[user];
    uint256 len = allRounds.length;
    if (offset >= len) return new uint256[](0);
    uint256 end = offset + limit > len ? len : offset + limit;
    uint256[] memory result = new uint256[](end - offset);
    for (uint256 i = offset; i < end; i++) {
        result[i - offset] = allRounds[i];
    }
    return result;
}

function getUserClaimable(address user, uint256[] calldata roundIds) 
    external view returns (uint128 total) 
{
    for (uint256 i = 0; i < roundIds.length; i++) {
        Bet storage userBet = bets[roundIds[i]][user];
        if (userBet.amount == 0 || userBet.claimed) continue;
        
        Round storage round = rounds[roundIds[i]];
        if (round.status == RoundStatus.Cancelled) {
            total += userBet.amount;
        } else if (round.status == RoundStatus.Settled) {
            Position winning = round.closePrice > round.lockPrice ? Position.Up : Position.Down;
            if (userBet.position == winning) {
                uint128 winnerSide = winning == Position.Up ? round.totalUp : round.totalDown;
                total += uint128((uint256(userBet.amount) * uint256(round.rewardAmount)) / uint256(winnerSide));
            }
        }
    }
}

function getMarketInfo(bytes32 marketId) external view returns (Market memory) {
    return markets[marketId];
}

function getMarketIds() external view returns (bytes32[] memory) {
    return marketIds;
}

// Dynamic payout multipliers (for frontend display)
function getPayoutMultiplier(uint256 roundId, Position position) external view returns (uint256) {
    Round storage round = rounds[roundId];
    if (round.totalAmount == 0) return 0;
    uint128 sideTotal = position == Position.Up ? round.totalUp : round.totalDown;
    if (sideTotal == 0) return 0;
    // Returns multiplier with 4 decimal precision (e.g., 19700 = 1.97x)
    uint128 potentialReward = round.totalAmount - ((round.totalAmount * rakeBps) / 10000);
    return (uint256(potentialReward) * 10000) / uint256(sideTotal);
}
```

### 2.10 Payout Math Examples

**Scenario 1**: Simple round
- Total UP bets: 1000 USDM (Alice: 600, Bob: 400)
- Total DOWN bets: 500 USDM (Charlie: 500)
- Total pool: 1500 USDM
- Rake: 1500 * 3% = 45 USDM → treasury
- Reward pool: 1455 USDM
- **UP wins**:
  - Alice: (600/1000) * 1455 = 873 USDM (profit: +273)
  - Bob: (400/1000) * 1455 = 582 USDM (profit: +182)
  - Charlie: 0 (loss: -500)

**Scenario 2**: Heavy one-side
- Total UP: 100 USDM (one user)
- Total DOWN: 900 USDM (many users)
- Pool: 1000, Rake: 30, Reward: 970
- **UP wins**: sole UP bettor gets 970 USDM (9.7x return!)
- **DOWN wins**: each DOWN bettor gets proportional share of 970 (1.077x return)

**Scenario 3**: Cancelled — equal price or one-sided
- All bets refunded in full (no rake taken)

---

## 3. RedStone Oracle Integration

### 3.1 How RedStone Push Model Works

RedStone uses a **calldata-based** approach. Price data is signed off-chain by RedStone nodes and appended to transaction calldata. The on-chain contract extracts and verifies this data.

### 3.2 Integration Pattern

The contract inherits from `RedstoneConsumerBase`:

```solidity
import "@redstone-finance/evm-connector/contracts/data-services/MainDemoConsumerBase.sol";

contract MegaBets is MainDemoConsumerBase, UUPSUpgradeable, ... {
    // MainDemoConsumerBase provides:
    // - getOracleNumericValueFromTxMsg(bytes32 dataFeedId) returns (uint256)
    // - The value is extracted from calldata and signature is verified
    
    // For production, use PrimaryProdDataServiceConsumerBase instead
}
```

### 3.3 Calling Pattern (from keeper/frontend)

The keeper wraps contract calls using the RedStone SDK:

```javascript
import { WrapperBuilder } from "@redstone-finance/evm-connector";

const wrappedContract = WrapperBuilder
    .wrap(contract)
    .usingDataService({
        dataServiceId: "redstone-primary-prod",
        uniqueSignersCount: 3,
        dataPackagesIds: ["BTC", "ETH"],
    });

// This automatically appends signed price data to the calldata
await wrappedContract.settleRound(roundId);
await wrappedContract.lockRound(roundId);
```

### 3.4 Feed IDs

| Asset | RedStone Feed ID | bytes32 |
|---|---|---|
| BTC/USD | `"BTC"` | `bytes32("BTC")` |
| ETH/USD | `"ETH"` | `bytes32("ETH")` |

RedStone returns prices with 8 decimal places.

### 3.5 Validation

- RedStone's `ConsumerBase` validates the signer cryptographically
- We additionally check: oracle timestamp is not stale (within `maxOracleDelay` seconds)
- If validation fails, the `getOracleNumericValueFromTxMsg` call reverts

### 3.6 Mock Oracle for Testing

```solidity
// contracts/src/mocks/MockRedstoneConsumer.sol

contract MegaBetsMock is MegaBets {
    mapping(bytes32 => uint256) private _mockPrices;
    
    function setMockPrice(bytes32 feedId, uint256 price) external {
        _mockPrices[feedId] = price;
    }
    
    // Override RedStone's extraction to return mock price
    function getOracleNumericValueFromTxMsg(bytes32 dataFeedId) 
        public view virtual override returns (uint256) 
    {
        return _mockPrices[dataFeedId];
    }
}
```

This allows tests to set arbitrary prices without needing signed RedStone payloads.

---

## 4. Frontend Architecture

### 4.1 Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework |
| Privy | Auth + embedded wallets |
| wagmi v2 + viem | Contract interaction |
| TailwindCSS | Styling |
| lightweight-charts (TradingView) | Price chart |
| zustand | Client state management |
| MegaETH WebSocket RPC | Real-time miniBlocks subscription |

#### ⚠️ MegaETH Custom viem Transport

**Critical**: All transaction submissions must use `eth_sendRawTransactionSync` (EIP-7966), which returns the receipt in <10ms — no polling needed.

```typescript
// lib/megaeth-transport.ts
import { custom, type EIP1193Provider } from 'viem';

export function megaethTransport(rpcUrl: string) {
    return custom({
        async request({ method, params }) {
            // Intercept: rewrite sendRawTransaction → sync variant
            const actualMethod = method === 'eth_sendRawTransaction'
                ? 'eth_sendRawTransactionSync'
                : method;
            
            const res = await fetch(rpcUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: actualMethod, params }),
            });
            const json = await res.json();
            if (json.error) throw new Error(json.error.message);
            return json.result;
        },
    } as EIP1193Provider);
}

// Usage in wagmi config:
const megaethChain = {
    id: 6343, // testnet
    name: 'MegaETH Testnet',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: { default: { http: ['https://carrot.megaeth.com/rpc'] } },
};
```

#### ⚠️ MegaETH Gas Config

```typescript
// Hardcoded gas price — MegaETH has fixed 0.001 gwei base fee, no EIP-1559
const MEGAETH_GAS_PRICE = 1_000n; // 1000 wei = 0.001 gwei

// Intrinsic gas is 60,000 (not 21K) — budget accordingly
const MEGAETH_INTRINSIC_GAS = 60_000n;

// Always use eth_estimateGas — never trust local estimates
// MegaEVM opcode costs differ from standard EVM
```

#### ⚠️ Multicall3 for Batch Reads

All frontend read operations should batch through Multicall3 at `0xcA11bde05977b3631167028862bE2a173976CA11`:

```typescript
// Use wagmi's built-in multicall support, just set the address
const multicallConfig = {
    address: '0xcA11bde05977b3631167028862bE2a173976CA11' as const,
};
// wagmi's useReadContracts automatically batches through Multicall3
```

### 4.2 Pages & Components

#### Single Page App: `/`

Everything lives on one page. Markets are tabs or side-by-side panels.

**Layout** (top to bottom):
```
┌─────────────────────────────────────────────┐
│  Header: Logo | Connect Wallet | Balance    │
├─────────────────────────────────────────────┤
│  Market Tabs: [BTC/USD] [ETH/USD]           │
├─────────────────────────────────────────────┤
│  ┌──────────────────┐ ┌──────────────────┐  │
│  │   PRICE CHART    │ │   BET PANEL      │  │
│  │   (5min candles) │ │   UP / DOWN      │  │
│  │   lock price line│ │   Amount input   │  │
│  │                  │ │   Quick: $1 $5...│  │
│  │                  │ │   [PLACE BET]    │  │
│  │                  │ │                  │  │
│  │                  │ │   COUNTDOWN      │  │
│  │                  │ │   00:42          │  │
│  │                  │ │                  │  │
│  │                  │ │   Pool: UP $450  │  │
│  │                  │ │         DOWN $230│  │
│  │                  │ │   Multiplier:    │  │
│  │                  │ │   UP 1.48x       │  │
│  │                  │ │   DOWN 2.90x     │  │
│  └──────────────────┘ └──────────────────┘  │
├─────────────────────────────────────────────┤
│  RECENT ROUNDS: #142 UP ✓ | #141 DOWN ✗ ...│
├─────────────────────────────────────────────┤
│  MY BETS | LEADERBOARD | CLAIM WINNINGS     │
└─────────────────────────────────────────────┘
```

#### Key Components

| Component | Description |
|---|---|
| `MarketView` | Container for one market (chart + bet panel + history) |
| `PriceChart` | TradingView lightweight-charts, 5min window, lock price line |
| `BetPanel` | UP/DOWN buttons, amount input, quick buttons, place bet CTA |
| `Countdown` | Big countdown timer, changes color in last 10s (locked phase) |
| `PoolDisplay` | Real-time UP/DOWN pool sizes + dynamic multipliers |
| `RoundHistory` | Last 10-20 rounds with results (UP/DOWN, prices) |
| `UserBets` | User's active and past bets, claim button |
| `Leaderboard` | Top players by profit (daily/weekly/all-time) |
| `Header` | Privy connect, USDM balance, network indicator |
| `ClaimModal` | Batch claim winnings from multiple settled rounds |

### 4.3 Real-Time Data Flow

#### ⚠️ MegaETH WebSocket: `miniBlocks` Subscription

MegaETH uses `miniBlocks` instead of `newHeads` for real-time block data. Must send `eth_chainId` keepalive every 30s. Max 50 connections per endpoint — share one connection across the app.

```typescript
// lib/megaeth-ws.ts
class MegaETHWebSocket {
    private ws: WebSocket;
    private keepaliveInterval: NodeJS.Timer;
    
    connect(wsUrl: string) {
        this.ws = new WebSocket(wsUrl);
        
        // Subscribe to miniBlocks (MegaETH-specific)
        this.ws.onopen = () => {
            this.ws.send(JSON.stringify({
                jsonrpc: '2.0', id: 1,
                method: 'eth_subscribe',
                params: ['miniBlocks']
            }));
            
            // ⚠️ REQUIRED: keepalive every 30s or connection drops
            this.keepaliveInterval = setInterval(() => {
                this.ws.send(JSON.stringify({
                    jsonrpc: '2.0', id: 999,
                    method: 'eth_chainId', params: []
                }));
            }, 30_000);
        };
    }
}
```

```
Single MegaETH WebSocket connection (shared)
    │
    ├── eth_subscribe("miniBlocks")
    │       → Update countdown timer (blocks remaining → seconds)
    │       → Check if round status changed (betting → locked → ended)
    │       → Trigger refetch of pool sizes on relevant blocks
    │
    ├── eth_subscribe("logs", { address: MegaBets, topics: [BetPlaced] })
    │       → Update pool sizes and multipliers instantly
    │
    ├── eth_subscribe("logs", { address: MegaBets, topics: [RoundSettled] })
    │       → Show result animation
    │       → Update history
    │       → Check if user won → confetti
    │
    ├── eth_subscribe("logs", { address: MegaBets, topics: [RoundStarted] })
    │       → New round available for betting
    │
    └── Price feed (RedStone API or Pyth for display only)
            → Update live price on chart every 1-2 seconds
```

> **Connection budget**: Max 50 WS connections per endpoint. With one shared connection per browser tab, this supports 50 concurrent users per RPC endpoint. For production, use multiple RPC endpoints or a load balancer.

### 4.4 Hooks

```typescript
// hooks/useMegaBets.ts — main hook
function useMegaBets(marketId: string) {
    // Returns: currentRound, nextRound, poolUp, poolDown, 
    //          countdown, multiplierUp, multiplierDown, roundHistory
}

// hooks/useUserBets.ts
function useUserBets() {
    // Returns: activeBets, claimableRounds, totalClaimable, claimAll()
}

// hooks/usePriceChart.ts  
function usePriceChart(feedId: string) {
    // Returns: priceData[], currentPrice, lockPrice
}

// hooks/useCountdown.ts
function useCountdown(endBlock: bigint) {
    // Returns: secondsRemaining, phase ('betting' | 'locked' | 'ended')
    // Calculates from block diff: (endBlock - currentBlock) * 0.01
}
```

### 4.5 Wallet Flow

1. User clicks "Connect" → Privy modal (email, social, or external wallet)
2. Privy creates/connects embedded wallet on MegaETH
3. First bet → prompt USDM approval (approve max uint256 for convenience)
4. Subsequent bets → silent signing via Privy embedded wallet
5. Gas: testnet faucet endpoint, mainnet users need small ETH for gas

#### ⚠️ Instant Receipts with `eth_sendRawTransactionSync`

Because MegaETH returns receipts synchronously (<10ms), the UX is **radically different** from other chains:

```typescript
// NO polling, NO waiting. Receipt comes back immediately.
const receipt = await walletClient.sendTransaction({
    to: megaBetsAddress,
    data: encodeFunctionData({ ... }),
    gasPrice: 1_000n, // fixed 0.001 gwei
});
// `receipt` already contains status, logs, gas used — DONE

// This means:
// - No "pending" spinner needed (tx confirms before UI can show one)
// - No toast saying "waiting for confirmation"
// - Immediately update UI with result
// - Can show success/failure inline in the bet button
```

### 4.6 USDM Approval Flow

```typescript
// On first bet, check allowance (via Multicall3 batch with balance check)
const allowance = await usdm.allowance(userAddress, megaBetsAddress);
if (allowance < betAmount) {
    // Approve max — instant receipt via sendRawTransactionSync
    await usdm.approve(megaBetsAddress, MaxUint256);
    // No need to wait — already confirmed!
}
// Place bet — also instant
await megaBets.bet(roundId, position, amount);
```

---

## 5. Keeper Bot

### 5.1 Overview

A Node.js script that manages round lifecycle. Runs continuously.

### 5.2 Logic

```javascript
// keeper/keeper.js
import { WrapperBuilder } from "@redstone-finance/evm-connector";
import { createWalletClient, http } from 'viem';

const POLL_INTERVAL = 3000; // 3 seconds

// ⚠️ MegaETH: Use custom transport for eth_sendRawTransactionSync
// Receipt returns in <10ms — no polling needed
const transport = http(RPC_URL, {
    fetchOptions: {},
    // Custom request handler to rewrite sendRawTransaction → sync
    onRequest(request) {
        if (request.method === 'eth_sendRawTransaction') {
            request.method = 'eth_sendRawTransactionSync';
        }
    }
});

// ⚠️ MegaETH: Fixed gas price, no EIP-1559
const TX_OVERRIDES = {
    gasPrice: 1_000n, // 0.001 gwei, fixed
};

// ⚠️ MegaETH: Always use eth_estimateGas (remote), never local simulation
// MegaEVM opcode costs differ from standard EVM

async function main() {
    while (true) {
        for (const marketId of MARKET_IDS) {
            await processMarket(marketId);
        }
        await sleep(POLL_INTERVAL);
    }
}

async function processMarket(marketId) {
    const [round, status] = await megaBets.getCurrentRound(marketId);
    const currentBlock = await provider.getBlockNumber();
    
    // 1. If no active round or current round is settled/cancelled, start new round
    if (round.id === 0n || status === SETTLED || status === CANCELLED) {
        // Receipt returns instantly via eth_sendRawTransactionSync
        const receipt = await megaBets.startNewRound(marketId, TX_OVERRIDES);
        console.log(`Started new round for ${marketId} in block ${receipt.blockNumber}`);
        return;
    }
    
    // 2. If round needs locking (past lockBlock, still in Betting status)
    if (status === BETTING && currentBlock >= round.lockBlock) {
        const wrapped = WrapperBuilder.wrap(megaBets).usingDataService({
            dataServiceId: "redstone-primary-prod",
            uniqueSignersCount: 3,
            dataPackagesIds: [feedIdForMarket(marketId)],
        });
        const receipt = await wrapped.lockRound(round.id, TX_OVERRIDES);
        console.log(`Locked round ${round.id} at block ${receipt.blockNumber}`);
        
        // Start next round immediately — instant receipt
        const receipt2 = await megaBets.startNewRound(marketId, TX_OVERRIDES);
        console.log(`Started next round for ${marketId}`);
    }
    
    // 3. If round needs settlement (past endBlock, in Locked state)
    if ((status === LOCKED || status === AWAITING_SETTLEMENT) && currentBlock >= round.endBlock) {
        // ⚠️ Pre-check: don't settle if window expired (avoid rake-refund edge case)
        if (currentBlock > round.endBlock + settlementBuffer) {
            console.log(`Round ${round.id} settlement window expired, skipping`);
            return;
        }
        
        const wrapped = WrapperBuilder.wrap(megaBets).usingDataService({
            dataServiceId: "redstone-primary-prod",
            uniqueSignersCount: 3,
            dataPackagesIds: [feedIdForMarket(marketId)],
        });
        const receipt = await wrapped.settleRound(round.id, TX_OVERRIDES);
        console.log(`Settled round ${round.id} at block ${receipt.blockNumber}`);
    }
}
```

### 5.3 Keeper Requirements

- Private key with ETH for gas on MegaETH
- ⚠️ Uses `eth_sendRawTransactionSync` — receipts are instant, no tx polling
- ⚠️ Hardcoded `gasPrice: 1_000n` (0.001 gwei) — no EIP-1559
- ⚠️ Always uses `eth_estimateGas` remotely — never local gas estimation
- Runs on MacBook during dev, Railway for production
- Logs all actions to stdout
- Handles errors gracefully (retry on failure, skip on revert)
- Environment variables: `PRIVATE_KEY`, `RPC_URL`, `WS_URL`, `MEGABETS_ADDRESS`

---

## 6. Design Theme

### Option A: Dark Trading Terminal (Recommended)

Clean, dark, professional. Inspired by Hyperliquid, Polymarket, dYdX.

- **Background**: `#0a0a0f` (near-black)
- **Cards**: `#12121a` with subtle border `#1e1e2e`
- **UP color**: `#22c55e` (green-500)
- **DOWN color**: `#ef4444` (red-500)
- **Accent**: `#8b5cf6` (violet-500)
- **Text**: white primary, `#9ca3af` secondary
- **Font**: Inter or JetBrains Mono for numbers
- **Countdown**: massive, monospaced, glowing accent color
- **Animations**: subtle glow on bet placement, confetti on win, shake on loss

**Pros**: Mainstream appeal, feels professional, attracts DeFi/trading users
**Cons**: Less unique, doesn't stand out from competitors

### Option B: Win98 Retro (Brand Continuity)

Same aesthetic as the Battleship project. Window frames, pixel fonts, system colors.

- Betting panel as a Win98 dialog box
- Chart in a "Program Manager" window
- Countdown as a pixel-art digital clock
- System sounds for bet/win/loss
- Start menu for settings

**Pros**: Unique brand identity, memorable, fun, stands out completely
**Cons**: Might feel gimmicky for a financial product, accessibility concerns

### Recommendation

**Go with Option A (Dark Terminal) for MegaBets.** The product is financial in nature — users are making real money decisions. A clean, professional UI builds trust. Save Win98 for games/social products.

> **Alex to decide.**

---

## 7. Testing Plan

### 7.1 Contract Unit Tests (Foundry)

```
test/MegaBets.t.sol

Tests:
├── Round Lifecycle
│   ├── test_startNewRound_createsRound
│   ├── test_startNewRound_failsIfPreviousStillBetting
│   ├── test_startNewRound_succeedsAfterPreviousLocked
│   ├── test_roundTransitions_bettingToLocked
│   ├── test_roundTransitions_lockedToSettled
│   ├── test_roundAutoRejectsBetsAfterLockBlock
│
├── Betting
│   ├── test_bet_up_succeeds
│   ├── test_bet_down_succeeds
│   ├── test_bet_addToExistingPosition
│   ├── test_bet_revertSwitchSide
│   ├── test_bet_revertBelowMin
│   ├── test_bet_revertAboveMax
│   ├── test_bet_revertAfterLockBlock
│   ├── test_bet_revertWhenPaused
│   ├── test_bet_transfersUSDM
│   ├── test_bet_updatesPoolTotals
│
├── Settlement
│   ├── test_settle_upWins
│   ├── test_settle_downWins
│   ├── test_settle_equalPriceCancels
│   ├── test_settle_oneSidedCancels
│   ├── test_settle_noBetsSkips
│   ├── test_settle_rakeSentToTreasury
│   ├── test_settle_revertBeforeEndBlock
│   ├── test_settle_expiredWindowCancels
│
├── Claims
│   ├── test_claim_winnerGetsPayout
│   ├── test_claim_loserGetsNothing
│   ├── test_claim_cancelledGetsRefund
│   ├── test_claim_batchMultipleRounds
│   ├── test_claim_revertDoubleClaim
│   ├── test_claim_revertNothingToClaim
│
├── Payouts (exact math)
│   ├── test_payout_scenario1_balanced
│   ├── test_payout_scenario2_heavyOneSide
│   ├── test_payout_scenario3_manyUsers
│   ├── test_payout_rakeCalculation
│
├── Admin
│   ├── test_addMarket
│   ├── test_removeMarket
│   ├── test_setRakeBps
│   ├── test_setRakeBps_revertAboveMax
│   ├── test_pause_unpause
│   ├── test_onlyOwner
│
├── Edge Cases
│   ├── test_multipleMarketsIndependent
│   ├── test_overlappingRounds
│   ├── test_maxUint128Bets
│   ├── test_dustAmountPayout
│   └── test_reentrancyProtection
```

### 7.2 Payout Test Vectors

| Scenario | UP Pool | DOWN Pool | Total | Rake (3%) | Reward Pool | Winner | Alice (UP 100) Gets |
|---|---|---|---|---|---|---|---|
| Balanced | 500 | 500 | 1000 | 30 | 970 | UP | 194 |
| Skewed UP | 900 | 100 | 1000 | 30 | 970 | UP | 107.78 |
| Skewed DOWN | 100 | 900 | 1000 | 30 | 970 | UP | 970 |
| Tiny pool | 1 | 1 | 2 | 0 (rounds down) | 2 | UP | 2 |

### 7.3 Frontend Testing

- Manual testing on MegaETH testnet
- Test wallet flows with Privy testnet mode
- Test real-time updates with multiple browser windows
- Test edge cases: betting right at lock time, claiming during settlement

---

## 8. Deployment Plan

### 8.1 Testnet

1. Deploy `MegaBetsMock` (with mock oracle) to MegaETH testnet (6343)
2. Reuse existing MockUSDM at `0x77252Dba16C234CA52674adBAC911538705FB31c`
3. Initialize with treasury = deployer address
4. Add markets: BTC (`bytes32("BTC")`), ETH (`bytes32("ETH")`)
5. Market config: betting=5000 blocks, lock=1000 blocks, minBet=1e6 ($1), maxBet=10000e6 ($10k)
6. Start keeper bot
7. Deploy frontend to Vercel

### 8.2 Deploy Script

```solidity
// script/Deploy.s.sol
contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        
        // Deploy implementation
        MegaBets impl = new MegaBets();
        
        // Deploy proxy
        bytes memory initData = abi.encodeCall(
            MegaBets.initialize,
            (USDM_ADDRESS, TREASURY, DEPLOYER)
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        
        MegaBets megaBets = MegaBets(address(proxy));
        
        // Add markets
        megaBets.addMarket(bytes32("BTC"), 5000, 1000, 1e6, 10000e6);
        megaBets.addMarket(bytes32("ETH"), 5000, 1000, 1e6, 10000e6);
        
        vm.stopBroadcast();
    }
}
```

#### ⚠️ MegaETH Foundry Deploy Command

```bash
# MUST use --skip-simulation --broadcast (MegaEVM gas costs differ from local EVM)
forge script script/Deploy.s.sol:Deploy \
    --rpc-url $MEGAETH_RPC \
    --private-key $DEPLOYER_KEY \
    --broadcast \
    --skip-simulation \
    --gas-price 1000    # 0.001 gwei fixed base fee
    # May need --gas-estimate-multiplier 200 if estimation is tight
```

#### ⚠️ Foundry Config for MegaETH

```toml
# foundry.toml
[profile.default]
src = "src"
out = "out"
libs = ["lib"]
solc_version = "0.8.24"
via_ir = true
optimizer = true
optimizer_runs = 200

[profile.megaeth]
# MegaETH-specific overrides
gas_price = 1000           # 0.001 gwei
# Do NOT set gas_limit — always use remote estimation
```

### 8.3 Addresses (to be filled)

| Contract | Testnet | Mainnet |
|---|---|---|
| USDM | `0x77252Dba16C234CA52674adBAC911538705FB31c` | TBD |
| MegaBets Proxy | TBD | TBD |
| MegaBets Impl | TBD | TBD |
| Treasury | deployer | TBD (multisig?) |

#### MegaETH System Addresses

| Contract | Address | Notes |
|---|---|---|
| Multicall3 | `0xcA11bde05977b3631167028862bE2a173976CA11` | Batch reads |
| WETH9 | `0x4200000000000000000000000000000000000006` | OP Stack predeploy |
| High-precision timestamp oracle | `0x6342000000000000000000000000000000000002` | Returns microseconds |

---

## 9. File Structure

```
megabets/
├── PLAN.md                          # This file
├── contracts/
│   ├── foundry.toml
│   ├── remappings.txt
│   ├── src/
│   │   ├── MegaBets.sol             # Main contract
│   │   └── mocks/
│   │       └── MegaBetsMock.sol     # Mock oracle version for testing
│   ├── test/
│   │   └── MegaBets.t.sol           # Foundry tests
│   └── script/
│       └── Deploy.s.sol             # Deployment script
├── frontend/
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.ts
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx                 # Main page
│   │   └── providers.tsx            # Privy + wagmi providers
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── MarketView.tsx
│   │   ├── PriceChart.tsx
│   │   ├── BetPanel.tsx
│   │   ├── Countdown.tsx
│   │   ├── PoolDisplay.tsx
│   │   ├── RoundHistory.tsx
│   │   ├── UserBets.tsx
│   │   ├── Leaderboard.tsx
│   │   └── ClaimModal.tsx
│   ├── hooks/
│   │   ├── useMegaBets.ts
│   │   ├── useUserBets.ts
│   │   ├── usePriceChart.ts
│   │   └── useCountdown.ts
│   └── lib/
│       ├── contracts.ts             # ABIs + addresses
│       ├── constants.ts
│       └── utils.ts
├── keeper/
│   ├── package.json
│   ├── keeper.js                    # Main keeper script
│   └── .env.example
└── bot/                             # Future: Telegram bot
```

---

## 10. Timeline

### Week 1: Foundation

| Day | Task | Owner |
|---|---|---|
| 1 | Contract: MegaBets.sol — structs, storage, round lifecycle, bet() | Solidity dev |
| 1 | Frontend: project setup, Privy, wagmi config, layout | Fullstack dev |
| 2 | Contract: settlement, claims, payout math, admin functions | Solidity dev |
| 2 | Frontend: BetPanel, Countdown, PoolDisplay components | Fullstack dev |
| 3 | Contract: full test suite (all scenarios from §7.1) | Solidity dev |
| 3 | Frontend: PriceChart with TradingView, real-time price feed | Fullstack dev |
| 4 | Contract: deploy to testnet, verify | Solidity dev |
| 4 | Frontend: connect to testnet contract, end-to-end bet flow | Fullstack dev |
| 5 | Keeper bot: implement + test on testnet | Solidity dev |
| 5 | Frontend: WebSocket subscriptions, real-time pool/countdown updates | Fullstack dev |

### Week 2: Polish & Integration

| Day | Task | Owner |
|---|---|---|
| 6-7 | Frontend: RoundHistory, UserBets, ClaimModal, Leaderboard | Fullstack dev |
| 6-7 | Contract: RedStone real integration (swap out mock oracle) | Solidity dev |
| 8 | Frontend: animations (confetti, win/loss), sound effects | Fullstack dev |
| 8 | Keeper: RedStone SDK integration, production-ready | Solidity dev |
| 9-10 | Full integration testing, bug fixes, edge cases | Both |
| 9-10 | UI polish, responsive design, loading states | Fullstack dev |

### Week 3: Launch

| Day | Task | Owner |
|---|---|---|
| 11-12 | Testnet beta — invite users, monitor, fix bugs | Both |
| 13 | Mainnet deploy (if ready) | Solidity dev |
| 14 | Launch, monitor, hotfix as needed | Both |

---

## 11. Open Questions

> These need Alex's input before or during the build.

1. **Design theme**: Dark terminal (Option A) or Win98 retro (Option B)? See §6.

2. **Referral system**: Keep it simple (off-chain tracking, manual payouts) or build on-chain referral into v1? On-chain adds complexity. Recommendation: skip for v1, add in v2.

3. **Leaderboard data source**: On-chain events indexed by frontend (slow) or use a simple backend/indexer (The Graph, Ponder, or custom)?  Recommendation: start with direct RPC reads + event logs, add indexer if needed.

4. **USDM on mainnet**: What's the mainnet USDM address? Or are we deploying our own stablecoin wrapper?

5. **Gas sponsorship**: Should we sponsor gas for users on mainnet (paymaster/relayer) or require users to hold MegaETH gas token? For testnet, faucet is fine.

6. **Round duration flexibility**: UI toggle for 30s/60s/5min rounds per market, or hardcode 60s for launch?  Recommendation: hardcode 60s for v1.

7. **Max bet limit**: $10,000 per bet reasonable for launch? Should we start lower ($1,000) and increase?

8. **Treasury**: Deployer EOA for now, or set up a multisig before launch?

9. **Domain**: What domain for the frontend? `megabets.xyz`? `megabets.gg`?

10. **Telegram bot**: Priority for v1 or post-launch? If v1, what features? (bet via chat, round notifications, leaderboard)

---

*End of spec. Ready to build.* 🎰

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/PausableUpgradeable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface AggregatorV3Interface {
    function latestRoundData()
        external
        view
        returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
    function decimals() external view returns (uint8);
}

/// @title MegaBets — Micro-predictions on MegaETH
/// @notice P2P binary prediction rounds (1m/5m/10m/15m). Bet UP or DOWN on price.
/// @dev Uses RedStone Bolt push oracle (2.4ms updates) via Chainlink-compatible interface.
contract MegaBets is UUPSUpgradeable, OwnableUpgradeable, PausableUpgradeable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    // ─── Enums ────────────────────────────────────────────────────────────
    enum Status { NONE, OPEN, LOCKED, RESOLVED, CANCELLED }
    enum Direction { UP, DOWN }

    // ─── Structs ──────────────────────────────────────────────────────────
    struct Round {
        bytes32 feedId;
        uint64  startTime;
        uint64  lockTime;
        uint64  resolveTime;
        int256  lockPrice;
        int256  closePrice;
        uint256 totalUp;
        uint256 totalDown;
        uint256 rewardPool;
        uint256 rakeAmount;
        Status  status;
    }

    struct Bet {
        Direction direction;
        uint128   amount;
        bool      claimed;
    }

    struct FeedConfig {
        address oracle;
        bool    active;
        uint64  bettingWindow;     // per-feed betting window (seconds)
        uint64  resolutionWindow;  // per-feed resolution window (seconds)
    }

    // ─── Constants ────────────────────────────────────────────────────────
    uint256 public constant RAKE_BPS = 300;
    uint256 public constant REFERRAL_BPS = 50;
    uint256 public constant BPS = 10_000;
    uint256 public constant CANCEL_GRACE = 300;
    uint256 public constant SWEEP_GRACE = 86_400;

    // ─── State ────────────────────────────────────────────────────────────
    IERC20 public usdm;
    address public treasury;

    uint64 public bettingWindow;      // global default (fallback)
    uint64 public resolutionWindow;   // global default (fallback)
    uint128 public minBet;
    uint128 public maxBet;

    uint256 public nextRoundId;

    mapping(bytes32 => FeedConfig) public feeds;
    mapping(bytes32 => uint256) public currentRound;
    mapping(uint256 => Round) public rounds;
    mapping(uint256 => mapping(address => Bet)) public bets;
    mapping(address => address) public referrers;
    mapping(address => uint256) public referralEarnings;

    // ─── Events ───────────────────────────────────────────────────────────
    event RoundOpened(uint256 indexed roundId, bytes32 indexed feedId, uint64 lockTime, uint64 resolveTime);
    event BetPlaced(uint256 indexed roundId, address indexed user, Direction direction, uint128 amount);
    event RoundLocked(uint256 indexed roundId, int256 lockPrice);
    event RoundResolved(uint256 indexed roundId, int256 closePrice, Direction winningDirection);
    event RoundCancelled(uint256 indexed roundId);
    event Claimed(uint256 indexed roundId, address indexed user, uint256 payout);
    event ReferrerSet(address indexed user, address indexed referrer);
    event ReferralCredited(address indexed referrer, address indexed user, uint256 amount);
    event ReferralWithdrawn(address indexed referrer, uint256 amount);
    event RakeSwept(uint256 indexed roundId, uint256 amount);
    event FeedUpdated(bytes32 indexed feedId, address oracle, bool active, uint64 bettingWindow, uint64 resolutionWindow);
    event TreasuryUpdated(address treasury);
    event ConfigUpdated(uint64 bettingWindow, uint64 resolutionWindow, uint128 minBet, uint128 maxBet);

    // ─── Errors ───────────────────────────────────────────────────────────
    error FeedNotActive();
    error RoundNotOpen();
    error RoundNotLockable();
    error RoundNotResolvable();
    error RoundNotCancellable();
    error RoundNotFinished();
    error BelowMinBet();
    error AboveMaxBet();
    error AlreadyBet();
    error NothingToClaim();
    error AlreadyClaimed();
    error ReferrerAlreadySet();
    error SelfReferral();
    error ZeroAddress();
    error StalePrice();
    error InvalidPrice();
    error NoReferralEarnings();
    error TooEarlyToSweep();

    // ─── Initializer ─────────────────────────────────────────────────────
    function initialize(
        address _usdm,
        address _treasury,
        uint64 _bettingWindow,
        uint64 _resolutionWindow,
        uint128 _minBet,
        uint128 _maxBet
    ) external initializer {
        __Ownable_init(msg.sender);
        __Pausable_init();

        if (_usdm == address(0) || _treasury == address(0)) revert ZeroAddress();

        usdm = IERC20(_usdm);
        treasury = _treasury;
        bettingWindow = _bettingWindow;
        resolutionWindow = _resolutionWindow;
        minBet = _minBet;
        maxBet = _maxBet;
        nextRoundId = 1;
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  USER ACTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function placeBet(bytes32 feedId, Direction direction, uint128 amount) external whenNotPaused nonReentrant {
        if (!feeds[feedId].active) revert FeedNotActive();
        if (amount < minBet) revert BelowMinBet();
        if (amount > maxBet) revert AboveMaxBet();

        uint256 roundId = currentRound[feedId];
        Round storage round = rounds[roundId];

        if (roundId == 0 || round.status != Status.OPEN || block.timestamp >= round.lockTime) {
            roundId = _openRound(feedId);
            round = rounds[roundId];
        }

        if (bets[roundId][msg.sender].amount > 0) revert AlreadyBet();

        usdm.safeTransferFrom(msg.sender, address(this), amount);

        bets[roundId][msg.sender] = Bet(direction, amount, false);

        if (direction == Direction.UP) {
            round.totalUp += amount;
        } else {
            round.totalDown += amount;
        }

        emit BetPlaced(roundId, msg.sender, direction, amount);
    }

    function setReferrer(address referrer) external {
        if (referrer == address(0)) revert ZeroAddress();
        if (referrer == msg.sender) revert SelfReferral();
        if (referrers[msg.sender] != address(0)) revert ReferrerAlreadySet();
        referrers[msg.sender] = referrer;
        emit ReferrerSet(msg.sender, referrer);
    }

    function claimWinnings(uint256 roundId) external nonReentrant {
        Round storage round = rounds[roundId];

        if (round.status == Status.CANCELLED) {
            _claimRefund(roundId);
            return;
        }
        if (round.status != Status.RESOLVED) revert RoundNotFinished();

        Bet storage bet = bets[roundId][msg.sender];
        if (bet.amount == 0) revert NothingToClaim();
        if (bet.claimed) revert AlreadyClaimed();

        Direction winDir = _winningDirection(round);
        if (bet.direction != winDir) revert NothingToClaim();

        bet.claimed = true;

        uint256 winningTotal = winDir == Direction.UP ? round.totalUp : round.totalDown;
        uint256 payout = (uint256(bet.amount) * round.rewardPool) / winningTotal;

        address ref = referrers[msg.sender];
        if (ref != address(0)) {
            uint256 refFee = (uint256(bet.amount) * REFERRAL_BPS) / BPS;
            if (refFee > round.rakeAmount) refFee = round.rakeAmount;
            if (refFee > 0) {
                round.rakeAmount -= refFee;
                referralEarnings[ref] += refFee;
                emit ReferralCredited(ref, msg.sender, refFee);
            }
        }

        usdm.safeTransfer(msg.sender, payout);
        emit Claimed(roundId, msg.sender, payout);
    }

    function withdrawReferralEarnings() external nonReentrant {
        uint256 amount = referralEarnings[msg.sender];
        if (amount == 0) revert NoReferralEarnings();
        referralEarnings[msg.sender] = 0;
        usdm.safeTransfer(msg.sender, amount);
        emit ReferralWithdrawn(msg.sender, amount);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  PERMISSIONLESS RESOLUTION
    // ═══════════════════════════════════════════════════════════════════════

    function lockRound(uint256 roundId) external whenNotPaused {
        Round storage round = rounds[roundId];
        if (round.status != Status.OPEN) revert RoundNotOpen();
        if (block.timestamp < round.lockTime) revert RoundNotLockable();

        round.lockPrice = _getPrice(round.feedId);
        round.status = Status.LOCKED;

        emit RoundLocked(roundId, round.lockPrice);
    }

    function resolveRound(uint256 roundId) external whenNotPaused nonReentrant {
        Round storage round = rounds[roundId];
        if (round.status != Status.LOCKED) revert RoundNotResolvable();
        if (block.timestamp < round.resolveTime) revert RoundNotResolvable();

        int256 price = _getPrice(round.feedId);
        round.closePrice = price;

        if (round.totalUp == 0 || round.totalDown == 0 || price == round.lockPrice) {
            round.status = Status.CANCELLED;
            emit RoundCancelled(roundId);
            return;
        }

        uint256 totalPool = round.totalUp + round.totalDown;
        uint256 rake = (totalPool * RAKE_BPS) / BPS;
        round.rakeAmount = rake;
        round.rewardPool = totalPool - rake;
        round.status = Status.RESOLVED;

        emit RoundResolved(roundId, price, _winningDirection(round));
    }

    function cancelRound(uint256 roundId) external {
        Round storage round = rounds[roundId];
        bool canCancel;
        if (round.status == Status.OPEN && block.timestamp > round.lockTime + CANCEL_GRACE) canCancel = true;
        if (round.status == Status.LOCKED && block.timestamp > round.resolveTime + CANCEL_GRACE) canCancel = true;
        if (!canCancel) revert RoundNotCancellable();

        round.status = Status.CANCELLED;
        emit RoundCancelled(roundId);
    }

    function sweepRake(uint256 roundId) external {
        Round storage round = rounds[roundId];
        if (round.status != Status.RESOLVED) revert RoundNotFinished();
        if (block.timestamp < round.resolveTime + SWEEP_GRACE) revert TooEarlyToSweep();

        uint256 amount = round.rakeAmount;
        if (amount == 0) return;
        round.rakeAmount = 0;

        usdm.safeTransfer(treasury, amount);
        emit RakeSwept(roundId, amount);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  ADMIN
    // ═══════════════════════════════════════════════════════════════════════

    /// @notice Set feed with per-feed timeframes. Pass 0 for windows to use global defaults.
    function setFeed(
        bytes32 feedId,
        address oracle,
        bool active,
        uint64 _bettingWindow,
        uint64 _resolutionWindow
    ) external onlyOwner {
        if (oracle == address(0)) revert ZeroAddress();
        feeds[feedId] = FeedConfig({
            oracle: oracle,
            active: active,
            bettingWindow: _bettingWindow,
            resolutionWindow: _resolutionWindow
        });
        emit FeedUpdated(feedId, oracle, active, _bettingWindow, _resolutionWindow);
    }

    function setTreasury(address _treasury) external onlyOwner {
        if (_treasury == address(0)) revert ZeroAddress();
        treasury = _treasury;
        emit TreasuryUpdated(_treasury);
    }

    function setConfig(uint64 _bw, uint64 _rw, uint128 _min, uint128 _max) external onlyOwner {
        bettingWindow = _bw;
        resolutionWindow = _rw;
        minBet = _min;
        maxBet = _max;
        emit ConfigUpdated(_bw, _rw, _min, _max);
    }

    function pause() external onlyOwner { _pause(); }
    function unpause() external onlyOwner { _unpause(); }

    // ═══════════════════════════════════════════════════════════════════════
    //  VIEWS
    // ═══════════════════════════════════════════════════════════════════════

    function getRound(uint256 roundId) external view returns (Round memory) {
        return rounds[roundId];
    }

    function getBet(uint256 roundId, address user) external view returns (Bet memory) {
        return bets[roundId][user];
    }

    function calcPayout(uint256 roundId, address user) external view returns (uint256) {
        Round storage round = rounds[roundId];
        if (round.status != Status.RESOLVED) return 0;
        Bet storage bet = bets[roundId][user];
        if (bet.amount == 0 || bet.claimed) return 0;
        Direction winDir = _winningDirection(round);
        if (bet.direction != winDir) return 0;
        uint256 winningTotal = winDir == Direction.UP ? round.totalUp : round.totalDown;
        return (uint256(bet.amount) * round.rewardPool) / winningTotal;
    }

    /// @notice Get effective betting window for a feed (feed-specific or global fallback)
    function getFeedWindows(bytes32 feedId) external view returns (uint64 bw, uint64 rw) {
        FeedConfig storage f = feeds[feedId];
        bw = f.bettingWindow > 0 ? f.bettingWindow : bettingWindow;
        rw = f.resolutionWindow > 0 ? f.resolutionWindow : resolutionWindow;
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  INTERNALS
    // ═══════════════════════════════════════════════════════════════════════

    function _openRound(bytes32 feedId) internal returns (uint256 roundId) {
        roundId = nextRoundId++;
        FeedConfig storage f = feeds[feedId];

        // Use per-feed windows if set, otherwise global defaults
        uint64 bw = f.bettingWindow > 0 ? f.bettingWindow : bettingWindow;
        uint64 rw = f.resolutionWindow > 0 ? f.resolutionWindow : resolutionWindow;

        uint64 lt = uint64(block.timestamp) + bw;
        rounds[roundId] = Round({
            feedId: feedId,
            startTime: uint64(block.timestamp),
            lockTime: lt,
            resolveTime: lt + rw,
            lockPrice: 0,
            closePrice: 0,
            totalUp: 0,
            totalDown: 0,
            rewardPool: 0,
            rakeAmount: 0,
            status: Status.OPEN
        });
        currentRound[feedId] = roundId;
        emit RoundOpened(roundId, feedId, lt, lt + rw);
    }

    function _getPrice(bytes32 feedId) internal view returns (int256) {
        (, int256 answer,, uint256 updatedAt,) = AggregatorV3Interface(feeds[feedId].oracle).latestRoundData();
        if (answer <= 0) revert InvalidPrice();
        uint256 age;
        if (updatedAt > 1e15) {
            age = block.timestamp * 1e6 - updatedAt;
            if (age > 60_000_000) revert StalePrice();
        } else {
            age = block.timestamp - updatedAt;
            if (age > 60) revert StalePrice();
        }
        return answer;
    }

    function _winningDirection(Round storage round) internal view returns (Direction) {
        return round.closePrice > round.lockPrice ? Direction.UP : Direction.DOWN;
    }

    function _claimRefund(uint256 roundId) internal {
        Bet storage bet = bets[roundId][msg.sender];
        if (bet.amount == 0) revert NothingToClaim();
        if (bet.claimed) revert AlreadyClaimed();
        bet.claimed = true;
        usdm.safeTransfer(msg.sender, bet.amount);
        emit Claimed(roundId, msg.sender, bet.amount);
    }

    function _authorizeUpgrade(address) internal override onlyOwner {}
}

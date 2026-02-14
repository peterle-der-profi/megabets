// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/MegaBets.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

// ─── Mock USDM ───────────────────────────────────────────────────────────────
contract MockUSDM is ERC20 {
    constructor() ERC20("Mock USDM", "USDM") {}
    function decimals() public pure override returns (uint8) { return 6; }
    function mint(address to, uint256 amount) external { _mint(to, amount); }
}

// ─── Mock Oracle ──────────────────────────────────────────────────────────────
contract MockOracle {
    int256 public price;
    uint256 public updatedAt;
    uint8 public decimals = 8;

    function setPrice(int256 _price) external {
        price = _price;
        updatedAt = block.timestamp;
    }

    function setPriceAt(int256 _price, uint256 _updatedAt) external {
        price = _price;
        updatedAt = _updatedAt;
    }

    function latestRoundData() external view returns (uint80, int256, uint256, uint256, uint80) {
        return (1, price, updatedAt, updatedAt, 1);
    }
}

// ─── Tests ────────────────────────────────────────────────────────────────────
contract MegaBetsTest is Test {
    MegaBets public megabets;
    MockUSDM public usdm;
    MockOracle public btcOracle;
    MockOracle public ethOracle;

    address owner = address(this);
    address treasury = makeAddr("treasury");
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");
    address carol = makeAddr("carol");
    address referrer = makeAddr("referrer");

    bytes32 constant BTC = bytes32("BTC");
    bytes32 constant ETH = bytes32("ETH");

    uint128 constant MIN_BET = 1e6;       // 1 USDM
    uint128 constant MAX_BET = 1000e6;    // 1000 USDM
    uint64 constant BET_WINDOW = 60;
    uint64 constant RES_WINDOW = 60;

    function setUp() public {
        usdm = new MockUSDM();
        btcOracle = new MockOracle();
        ethOracle = new MockOracle();

        // Deploy proxy
        MegaBets impl = new MegaBets();
        bytes memory initData = abi.encodeCall(
            MegaBets.initialize,
            (address(usdm), treasury, BET_WINDOW, RES_WINDOW, MIN_BET, MAX_BET)
        );
        ERC1967Proxy proxy = new ERC1967Proxy(address(impl), initData);
        megabets = MegaBets(address(proxy));

        // Configure feeds
        btcOracle.setPrice(69000e8);
        ethOracle.setPrice(2050e8);
        // 0,0 = use global defaults (60s/60s)
        megabets.setFeed(BTC, address(btcOracle), true, 0, 0);
        megabets.setFeed(ETH, address(ethOracle), true, 0, 0);

        // Fund users
        usdm.mint(alice, 10_000e6);
        usdm.mint(bob, 10_000e6);
        usdm.mint(carol, 10_000e6);

        // Approve
        vm.prank(alice);
        usdm.approve(address(megabets), type(uint256).max);
        vm.prank(bob);
        usdm.approve(address(megabets), type(uint256).max);
        vm.prank(carol);
        usdm.approve(address(megabets), type(uint256).max);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    function test_initialize() public view {
        assertEq(address(megabets.usdm()), address(usdm));
        assertEq(megabets.treasury(), treasury);
        assertEq(megabets.bettingWindow(), BET_WINDOW);
        assertEq(megabets.resolutionWindow(), RES_WINDOW);
        assertEq(megabets.minBet(), MIN_BET);
        assertEq(megabets.maxBet(), MAX_BET);
        assertEq(megabets.nextRoundId(), 1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  PLACING BETS
    // ═══════════════════════════════════════════════════════════════════════

    function test_placeBet_opensRound() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);

        uint256 roundId = megabets.currentRound(BTC);
        assertEq(roundId, 1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.OPEN));
        assertEq(round.totalUp, 100e6);
        assertEq(round.totalDown, 0);
        assertEq(round.lockTime, uint64(block.timestamp) + BET_WINDOW);
    }

    function test_placeBet_multipleBettors() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(BTC, MegaBets.Direction.DOWN, 200e6);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(round.totalUp, 100e6);
        assertEq(round.totalDown, 200e6);
    }

    function test_placeBet_revert_belowMin() public {
        vm.prank(alice);
        vm.expectRevert(MegaBets.BelowMinBet.selector);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 0.5e6);
    }

    function test_placeBet_revert_aboveMax() public {
        vm.prank(alice);
        vm.expectRevert(MegaBets.AboveMaxBet.selector);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 1001e6);
    }

    function test_placeBet_revert_alreadyBet() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        vm.prank(alice);
        vm.expectRevert(MegaBets.AlreadyBet.selector);
        megabets.placeBet(BTC, MegaBets.Direction.DOWN, 50e6);
    }

    function test_placeBet_revert_feedNotActive() public {
        vm.expectRevert(MegaBets.FeedNotActive.selector);
        vm.prank(alice);
        megabets.placeBet(bytes32("SOL"), MegaBets.Direction.UP, 100e6);
    }

    function test_placeBet_newRoundAfterLockTime() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        assertEq(megabets.currentRound(BTC), 1);

        // Warp past lock time
        vm.warp(block.timestamp + BET_WINDOW + 1);
        btcOracle.setPrice(69000e8);

        vm.prank(bob);
        megabets.placeBet(BTC, MegaBets.Direction.DOWN, 50e6);
        assertEq(megabets.currentRound(BTC), 2);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  ROUND LIFECYCLE
    // ═══════════════════════════════════════════════════════════════════════

    function test_lockRound() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69500e8);

        megabets.lockRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.LOCKED));
        assertEq(round.lockPrice, 69500e8);
    }

    function test_lockRound_revert_tooEarly() public {
        _setupRound();
        vm.expectRevert(MegaBets.RoundNotLockable.selector);
        megabets.lockRound(1);
    }

    function test_resolveRound_upWins() public {
        _setupRound();

        // Lock
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        // Resolve — price went up
        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69500e8);
        megabets.resolveRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.RESOLVED));
        assertEq(round.closePrice, 69500e8);

        // totalPool = 100 + 200 = 300. Rake = 300 * 3% = 9. RewardPool = 291.
        assertEq(round.rewardPool, 291e6);
        assertEq(round.rakeAmount, 9e6);
    }

    function test_resolveRound_downWins() public {
        _setupRound();

        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(68500e8);
        megabets.resolveRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.RESOLVED));
    }

    function test_resolveRound_cancelled_oneSided() public {
        // Only UP bets
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);

        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69500e8);
        megabets.resolveRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.CANCELLED));
    }

    function test_resolveRound_cancelled_priceUnchanged() public {
        _setupRound();

        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69000e8); // same price
        megabets.resolveRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.CANCELLED));
    }

    function test_resolveRound_revert_tooEarly() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        vm.expectRevert(MegaBets.RoundNotResolvable.selector);
        megabets.resolveRound(1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  CLAIMS
    // ═══════════════════════════════════════════════════════════════════════

    function test_claimWinnings_upWins() public {
        _setupAndResolveUp();

        uint256 balBefore = usdm.balanceOf(alice);
        vm.prank(alice);
        megabets.claimWinnings(1);
        uint256 payout = usdm.balanceOf(alice) - balBefore;

        // Alice bet 100 UP, total UP = 100, rewardPool = 291
        // Payout = (100 / 100) * 291 = 291
        assertEq(payout, 291e6);
    }

    function test_claimWinnings_loserGetsNothing() public {
        _setupAndResolveUp();

        vm.prank(bob);
        vm.expectRevert(MegaBets.NothingToClaim.selector);
        megabets.claimWinnings(1);
    }

    function test_claimWinnings_revert_doubleClaim() public {
        _setupAndResolveUp();

        vm.prank(alice);
        megabets.claimWinnings(1);

        vm.prank(alice);
        vm.expectRevert(MegaBets.AlreadyClaimed.selector);
        megabets.claimWinnings(1);
    }

    function test_claimRefund_cancelled() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);

        // Cancel via one-sided
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);
        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69500e8);
        megabets.resolveRound(1); // cancelled because one-sided

        uint256 balBefore = usdm.balanceOf(alice);
        vm.prank(alice);
        megabets.claimWinnings(1);
        assertEq(usdm.balanceOf(alice) - balBefore, 100e6);
    }

    function test_claimWinnings_proportional() public {
        // Alice 100 UP, Bob 200 DOWN, Carol 50 UP
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(BTC, MegaBets.Direction.DOWN, 200e6);
        vm.prank(carol);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 50e6);

        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);
        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69500e8); // UP wins
        megabets.resolveRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        // totalPool = 350, rake = 10.5 → 10 (integer), rewardPool = 340 (actually 350 * 300 / 10000 = 10.5 → 10)
        // Wait — 350e6 * 300 / 10000 = 10_500_000 = 10.5 USDM. rewardPool = 339_500_000
        assertEq(round.rewardPool, 339_500_000);

        // Alice: 100/150 * 339.5 = 226.333...
        uint256 alicePayout = megabets.calcPayout(1, alice);
        assertEq(alicePayout, 226_333_333); // truncated

        // Carol: 50/150 * 339.5 = 113.166...
        uint256 carolPayout = megabets.calcPayout(1, carol);
        assertEq(carolPayout, 113_166_666); // truncated

        vm.prank(alice);
        megabets.claimWinnings(1);
        vm.prank(carol);
        megabets.claimWinnings(1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  REFERRALS
    // ═══════════════════════════════════════════════════════════════════════

    function test_setReferrer() public {
        vm.prank(alice);
        megabets.setReferrer(referrer);
        assertEq(megabets.referrers(alice), referrer);
    }

    function test_setReferrer_revert_self() public {
        vm.prank(alice);
        vm.expectRevert(MegaBets.SelfReferral.selector);
        megabets.setReferrer(alice);
    }

    function test_setReferrer_revert_alreadySet() public {
        vm.prank(alice);
        megabets.setReferrer(referrer);
        vm.prank(alice);
        vm.expectRevert(MegaBets.ReferrerAlreadySet.selector);
        megabets.setReferrer(bob);
    }

    function test_referralEarnings_onClaim() public {
        // Alice has referrer, bets UP and wins
        vm.prank(alice);
        megabets.setReferrer(referrer);

        _setupAndResolveUp();

        vm.prank(alice);
        megabets.claimWinnings(1);

        // Referral fee = alice's bet (100e6) * 50 / 10000 = 500_000 (0.5 USDM)
        assertEq(megabets.referralEarnings(referrer), 500_000);
    }

    function test_withdrawReferralEarnings() public {
        vm.prank(alice);
        megabets.setReferrer(referrer);

        _setupAndResolveUp();
        vm.prank(alice);
        megabets.claimWinnings(1);

        uint256 balBefore = usdm.balanceOf(referrer);
        vm.prank(referrer);
        megabets.withdrawReferralEarnings();
        assertEq(usdm.balanceOf(referrer) - balBefore, 500_000);
        assertEq(megabets.referralEarnings(referrer), 0);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  CANCEL & SWEEP
    // ═══════════════════════════════════════════════════════════════════════

    function test_cancelRound_staleOpen() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW + 301); // past grace
        megabets.cancelRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.CANCELLED));
    }

    function test_cancelRound_staleLocked() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);

        vm.warp(block.timestamp + RES_WINDOW + 301);
        megabets.cancelRound(1);

        MegaBets.Round memory round = megabets.getRound(1);
        assertEq(uint8(round.status), uint8(MegaBets.Status.CANCELLED));
    }

    function test_cancelRound_revert_tooEarly() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW + 100);
        vm.expectRevert(MegaBets.RoundNotCancellable.selector);
        megabets.cancelRound(1);
    }

    function test_sweepRake() public {
        _setupAndResolveUp();
        vm.prank(alice);
        megabets.claimWinnings(1);

        // Fast forward 24h+
        vm.warp(block.timestamp + 86_401);

        uint256 treasuryBefore = usdm.balanceOf(treasury);
        megabets.sweepRake(1);
        // Rake was 9e6, referral deducted 0 (alice has no referrer in this helper)
        uint256 swept = usdm.balanceOf(treasury) - treasuryBefore;
        assertEq(swept, 9e6);
    }

    function test_sweepRake_revert_tooEarly() public {
        _setupAndResolveUp();
        vm.expectRevert(MegaBets.TooEarlyToSweep.selector);
        megabets.sweepRake(1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  ADMIN
    // ═══════════════════════════════════════════════════════════════════════

    function test_pause() public {
        megabets.pause();
        vm.prank(alice);
        vm.expectRevert();
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
    }

    function test_setConfig() public {
        megabets.setConfig(30, 30, 5e6, 500e6);
        assertEq(megabets.bettingWindow(), 30);
        assertEq(megabets.resolutionWindow(), 30);
        assertEq(megabets.minBet(), 5e6);
        assertEq(megabets.maxBet(), 500e6);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  ORACLE
    // ═══════════════════════════════════════════════════════════════════════

    function test_stalePrice_reverts() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        // Don't update oracle — price is 60+ seconds old
        btcOracle.setPriceAt(69000e8, block.timestamp - 61);

        vm.expectRevert(MegaBets.StalePrice.selector);
        megabets.lockRound(1);
    }

    function test_invalidPrice_reverts() public {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(-1);

        vm.expectRevert(MegaBets.InvalidPrice.selector);
        megabets.lockRound(1);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  MULTI-FEED
    // ═══════════════════════════════════════════════════════════════════════

    function test_multipleFeedsIndependent() public {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(ETH, MegaBets.Direction.DOWN, 100e6);

        assertEq(megabets.currentRound(BTC), 1);
        assertEq(megabets.currentRound(ETH), 2);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  PER-FEED TIMEFRAMES
    // ═══════════════════════════════════════════════════════════════════════

    function test_perFeedTimeframe_5min() public {
        // Set BTC-5m feed with 300s windows
        bytes32 BTC5M = bytes32("BTC5M");
        megabets.setFeed(BTC5M, address(btcOracle), true, 300, 300);

        (uint64 bw, uint64 rw) = megabets.getFeedWindows(BTC5M);
        assertEq(bw, 300);
        assertEq(rw, 300);

        // Place bet
        vm.prank(alice);
        megabets.placeBet(BTC5M, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(BTC5M, MegaBets.Direction.DOWN, 100e6);

        MegaBets.Round memory round = megabets.getRound(megabets.currentRound(BTC5M));
        assertEq(round.lockTime, uint64(block.timestamp) + 300);
        assertEq(round.resolveTime, uint64(block.timestamp) + 600);

        uint256 roundIdBtc5 = megabets.currentRound(BTC5M);

        // Can't lock before 300s (only 100s in)
        vm.warp(block.timestamp + 100);
        btcOracle.setPrice(69000e8);
        vm.expectRevert(MegaBets.RoundNotLockable.selector);
        megabets.lockRound(roundIdBtc5);

        // Can lock after 300s
        vm.warp(block.timestamp + 200); // total 300s
        btcOracle.setPrice(69000e8);
        megabets.lockRound(roundIdBtc5);
    }

    function test_perFeedTimeframe_fallbackToGlobal() public {
        // ETH feed with 0,0 should use global 60s defaults
        (uint64 bw, uint64 rw) = megabets.getFeedWindows(ETH);
        assertEq(bw, BET_WINDOW);
        assertEq(rw, RES_WINDOW);
    }

    function test_multipleTimeframesSameFeed() public {
        // BTC-1m and BTC-5m as separate feeds, same oracle
        bytes32 BTC1M = bytes32("BTC1M");
        bytes32 BTC5M = bytes32("BTC5M");
        megabets.setFeed(BTC1M, address(btcOracle), true, 60, 60);
        megabets.setFeed(BTC5M, address(btcOracle), true, 300, 300);

        vm.prank(alice);
        megabets.placeBet(BTC1M, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(BTC5M, MegaBets.Direction.DOWN, 100e6);

        // Different round IDs
        uint256 r1 = megabets.currentRound(BTC1M);
        uint256 r5 = megabets.currentRound(BTC5M);
        assertTrue(r1 != r5);

        // Different lock times
        MegaBets.Round memory round1 = megabets.getRound(r1);
        MegaBets.Round memory round5 = megabets.getRound(r5);
        assertEq(round1.lockTime, uint64(block.timestamp) + 60);
        assertEq(round5.lockTime, uint64(block.timestamp) + 300);
    }

    // ═══════════════════════════════════════════════════════════════════════
    //  HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    /// @dev Alice 100 UP, Bob 200 DOWN
    function _setupRound() internal {
        vm.prank(alice);
        megabets.placeBet(BTC, MegaBets.Direction.UP, 100e6);
        vm.prank(bob);
        megabets.placeBet(BTC, MegaBets.Direction.DOWN, 200e6);
    }

    /// @dev Full round: Alice 100 UP, Bob 200 DOWN, UP wins
    function _setupAndResolveUp() internal {
        _setupRound();
        vm.warp(block.timestamp + BET_WINDOW);
        btcOracle.setPrice(69000e8);
        megabets.lockRound(1);
        vm.warp(block.timestamp + RES_WINDOW);
        btcOracle.setPrice(69500e8);
        megabets.resolveRound(1);
    }
}

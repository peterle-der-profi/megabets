import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { usePrivy } from "@privy-io/react-auth";

import {
  ADDRESSES, MEGABETS_ABI, ERC20_ABI, FEED_IDS, Direction, RoundStatus,
  FeedKey, Timeframe, Asset, TIMEFRAMES, feedKey, megaethTestnet,
} from "@/lib/contract";
import { useCurrentRoundId, useRound, useBet } from "@/hooks/useRound";
import { usePrice, usePriceHistory } from "@/hooks/usePrice";
import { useClaimable, useRoundBets } from "@/hooks/useHistory";
import { useAutoReferrer } from "@/hooks/useReferral";
import { SmoothChart } from "@/components/SmoothChart";
import { Header } from "@/components/Header";
import { BtcIcon, EthIcon } from "@/components/CryptoIcons";

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  "1m": "1M",
  "5m": "5M",
  "10m": "10M",
  "15m": "15M",
};

const QUICK_AMOUNTS = [1, 5, 10, 25, 50, 100];

export default function MarketPage() {
  const { feedId: rawFeedId } = useParams<{ feedId: string }>();
  const navigate = useNavigate();

  const [assetPart, tfPart] = (rawFeedId || "BTC-1m").split("-") as [Asset, Timeframe];
  const asset: Asset = assetPart === "ETH" ? "ETH" : "BTC";
  const [timeframe, setTimeframe] = useState<Timeframe>(
    TIMEFRAMES.includes(tfPart as Timeframe) ? (tfPart as Timeframe) : "1m"
  );

  const fk = feedKey(asset, timeframe) as FeedKey;
  const { price, prevPrice } = usePrice(asset);
  const { login, authenticated } = usePrivy();
  const { address } = useAccount();
  const { writeContractAsync, isPending: isTxPending } = useWriteContract();

  const { data: roundId } = useCurrentRoundId(fk);
  const { data: round } = useRound(roundId);
  const { data: userBet } = useBet(roundId, address as `0x${string}`);

  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<"idle" | "approving" | "betting" | "claiming" | "success" | "error">("idle");
  const priceHistory = usePriceHistory(asset);
  const { claimable: claimableRounds } = useClaimable(address);
  const { setReferrer } = useAutoReferrer();
  const { bets: roundBets } = useRoundBets(roundId ? Number(roundId) : undefined);

  const { data: allowance } = useReadContract({
    address: ADDRESSES.usdm,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: address ? [address, ADDRESSES.megaBets] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const { data: usdmBalance } = useReadContract({
    address: ADDRESSES.usdm,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const rawStatus = round ? Number(round.status) : RoundStatus.NONE;
  const isFinished = rawStatus === RoundStatus.RESOLVED || rawStatus === RoundStatus.CANCELLED;
  const status = isFinished ? RoundStatus.NONE : rawStatus;
  const hasBet = !isFinished && userBet && Number(userBet.amount) > 0;
  const betAmount = parseUnits(amount || "0", 6);
  const needsApproval = allowance !== undefined && betAmount > (allowance as bigint);

  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    if (!round) return;
    const targetTime = status === RoundStatus.OPEN
      ? Number(round.lockTime)
      : status === RoundStatus.LOCKED
        ? Number(round.resolveTime)
        : 0;
    if (!targetTime) { setCountdown(0); return; }
    const tick = () => setCountdown(Math.max(0, targetTime - Math.floor(Date.now() / 1000)));
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [round, status]);

  const lockPrice = !isFinished && round && round.lockPrice > 0n ? Number(round.lockPrice) / 1e8 : undefined;

  const handleBet = useCallback(async () => {
    if (!authenticated) { login(); return; }
    if (selectedDirection === null || !amount) return;
    try {
      await setReferrer();
      if (needsApproval) {
        setTxStatus("approving");
        await writeContractAsync({
          address: ADDRESSES.usdm, abi: ERC20_ABI,
          functionName: "approve",
          args: [ADDRESSES.megaBets, betAmount],
          chainId: megaethTestnet.id,
        });
      }
      setTxStatus("betting");
      await writeContractAsync({
        address: ADDRESSES.megaBets, abi: MEGABETS_ABI,
        functionName: "placeBet",
        args: [FEED_IDS[fk], selectedDirection, betAmount as unknown as bigint],
        chainId: megaethTestnet.id,
      });
      setTxStatus("success");
      setAmount("");
      setSelectedDirection(null);
      setTimeout(() => setTxStatus("idle"), 3000);
    } catch (e) {
      console.error("Bet error:", e);
      setTxStatus("error");
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  }, [authenticated, login, selectedDirection, amount, needsApproval, betAmount, writeContractAsync, fk, setReferrer]);

  const handleClaim = useCallback(async () => {
    if (!roundId) return;
    try {
      setTxStatus("claiming");
      await writeContractAsync({
        address: ADDRESSES.megaBets, abi: MEGABETS_ABI,
        functionName: "claimWinnings", args: [roundId],
        chainId: megaethTestnet.id,
      });
      setTxStatus("success");
      setTimeout(() => setTxStatus("idle"), 3000);
    } catch (e) {
      console.error("Claim error:", e);
      setTxStatus("error");
      setTimeout(() => setTxStatus("idle"), 3000);
    }
  }, [roundId, writeContractAsync]);

  const handleTimeframeChange = (tf: Timeframe) => {
    setTimeframe(tf);
    navigate(`/market/${asset}-${tf}`, { replace: true });
  };

  const IconComponent = asset === "BTC" ? BtcIcon : EthIcon;
  const assetColor = asset === "BTC" ? "#F7931A" : "#8B5CF6";
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
  const priceDelta = lockPrice ? price - lockPrice : undefined;
  const totalUp = !isFinished && round ? Number(round.totalUp) / 1e6 : 0;
  const totalDown = !isFinished && round ? Number(round.totalDown) / 1e6 : 0;
  const totalPool = totalUp + totalDown;

  const upPct = totalPool > 0 ? (totalUp / totalPool) * 100 : 50;
  const downPct = totalPool > 0 ? (totalDown / totalPool) * 100 : 50;

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  const isUrgent = countdown > 0 && countdown <= 10;
  const isCritical = countdown > 0 && countdown <= 5;

  const balanceDisplay = usdmBalance !== undefined
    ? Number(formatUnits(usdmBalance as bigint, 6)).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Back */}
        <button
          onClick={() => navigate("/")}
          className="text-text-dim text-[10px] font-mono uppercase tracking-widest hover:text-text-secondary mb-4 flex items-center gap-1 transition-colors"
          style={{ letterSpacing: "0.08em" }}
        >
          ← MARKETS
        </button>

        {/* Claimable banner */}
        {claimableRounds.length > 0 && (
          <Link
            to="/history"
            className="block rounded-xl border border-up/20 bg-up/5 px-4 py-3 mb-4 text-up font-mono text-sm font-bold hover:bg-up/10 transition-colors glow-up"
          >
            🎉 You have {claimableRounds.length} unclaimed reward{claimableRounds.length > 1 ? "s" : ""} — Claim now →
          </Link>
        )}

        {/* Header row: asset + countdown */}
        <div className="flex items-center justify-between mb-5 anim-fade-up">
          <div className="flex items-center gap-4">
            <IconComponent size={48} />
            <div>
              <h1 className="text-3xl font-black text-text-bright tracking-tight font-display">
                {asset}/USD <span style={{ color: assetColor }} className="text-xl font-bold">· {TIMEFRAME_LABELS[timeframe]}</span>
              </h1>
              <div className="flex items-center gap-2 mt-1">
                {status === RoundStatus.OPEN && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-up pulse-live" />
                    <span className="text-xs font-semibold text-up uppercase font-display" style={{ letterSpacing: "0.08em" }}>Betting Open</span>
                  </div>
                )}
                {status === RoundStatus.LOCKED && (
                  <span className="text-xs font-semibold text-accent uppercase font-display" style={{ letterSpacing: "0.08em" }}>🔒 Locked</span>
                )}
              </div>
            </div>
          </div>

          {/* Countdown */}
          {countdown > 0 && (
            <div className={`text-right ${isCritical ? "countdown-pulse-critical" : isUrgent ? "countdown-pulse-fast" : ""}`}>
              <div className={`font-mono font-black tracking-tight ${
                isCritical ? "text-down" : isUrgent ? "text-btc" : status === RoundStatus.OPEN ? "text-up" : "text-accent"
              }`} style={{
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                textShadow: isCritical ? "0 0 30px rgba(255,50,50,0.6)" : isUrgent ? "0 0 20px rgba(247,147,26,0.5)" : status === RoundStatus.OPEN ? "0 0 20px rgba(0,255,106,0.3)" : "none",
              }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>
                {status === RoundStatus.OPEN ? "until lock" : "until resolve"}
              </div>
            </div>
          )}
        </div>

        {/* HUGE Price */}
        <div className="flex items-baseline gap-6 mb-5 anim-fade-up anim-delay-1">
          <div>
            <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Current Price</div>
            <div className={`font-mono font-black ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-bright"}`}
              style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', lineHeight: 1.1 }}>
              ${price > 0 ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
            </div>
          </div>
          {lockPrice !== undefined && (
            <div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Lock Price</div>
              <div className="text-2xl font-mono font-bold text-accent">
                ${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
          {priceDelta !== undefined && (
            <div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Delta</div>
              <div className={`text-2xl font-mono font-bold ${priceDelta >= 0 ? "text-up" : "text-down"}`}>
                {priceDelta >= 0 ? "+" : ""}{priceDelta.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Timeframe pills */}
        <div className="flex items-center gap-1.5 mb-5 anim-fade-up anim-delay-2">
          {TIMEFRAMES.map((tf) => {
            const isActive = timeframe === tf;
            return (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all font-display ${
                  isActive ? "text-white" : "text-text-dim hover:text-text-secondary"
                }`}
                style={isActive ? {
                  background: `linear-gradient(135deg, ${assetColor} 0%, ${asset === "BTC" ? "#E91E8B" : "#6366F1"} 100%)`,
                  boxShadow: `0 0 16px ${assetColor}66`,
                } : {
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {TIMEFRAME_LABELS[tf]}
              </button>
            );
          })}
        </div>

        {/* Chart + Trade panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5 anim-fade-up anim-delay-3" style={{ alignItems: "stretch" }}>
          {/* Chart with gradient border */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="rounded-xl p-[1px] flex-1" style={{
              background: asset === "BTC"
                ? 'linear-gradient(135deg, rgba(247,147,26,0.35) 0%, rgba(233,30,139,0.15) 50%, rgba(139,92,246,0.08) 100%)'
                : 'linear-gradient(135deg, rgba(139,92,246,0.35) 0%, rgba(233,30,139,0.15) 50%, rgba(247,147,26,0.08) 100%)'
            }}>
              <div className="rounded-xl bg-bg-card/95 overflow-hidden h-full min-h-[420px]" style={{ backdropFilter: 'blur(12px)' }}>
                <SmoothChart
                  prices={priceHistory}
                  lockPrice={lockPrice}
                  height={420}
                  accentColor={asset === "BTC" ? "#F7931A" : "#8B5CF6"}
                />
              </div>
            </div>
          </div>

          {/* Trade panel */}
          <div className="flex flex-col">
            <div className="rounded-xl p-[1px] flex-1" style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.25) 0%, rgba(99,102,241,0.04) 100%)' }}>
            <div className="rounded-xl bg-bg-card/95 overflow-hidden flex-1 flex flex-col" style={{ backdropFilter: 'blur(12px)' }}>
              {/* Trade header */}
              <div className="flex items-center justify-between px-5 py-3.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <span className="text-xs font-bold text-text-bright uppercase font-display" style={{ letterSpacing: "0.08em" }}>Make Your Move</span>
                {status === RoundStatus.OPEN && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                    <span className="text-[10px] font-bold text-up uppercase font-display" style={{ letterSpacing: "0.08em" }}>Open</span>
                  </div>
                )}
                {status === RoundStatus.LOCKED && (
                  <span className="text-[10px] font-bold text-accent uppercase font-display" style={{ letterSpacing: "0.08em" }}>Locked</span>
                )}
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col">
                {/* HIGHER / LOWER */}
                {(status === RoundStatus.OPEN || status === RoundStatus.NONE) && !hasBet && (
                  <>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedDirection(Direction.UP)}
                        className={`w-full py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all duration-150 font-display ${
                          selectedDirection === Direction.UP ? "text-white glow-up scale-[1.02]" : "text-up hover:scale-[1.02]"
                        }`}
                        style={{
                          background: selectedDirection === Direction.UP
                            ? "linear-gradient(135deg, #00FF6A 0%, #00CC55 100%)"
                            : "linear-gradient(135deg, rgba(0,255,106,0.10) 0%, rgba(0,255,106,0.03) 100%)",
                          border: `1px solid ${selectedDirection === Direction.UP ? "rgba(0,255,106,0.5)" : "rgba(0,255,106,0.15)"}`,
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>▲</span> HIGHER
                          {totalPool > 0 && <span className="text-[10px] opacity-70 ml-1 font-mono">{Math.round(upPct)}%</span>}
                        </span>
                      </button>
                      <button
                        onClick={() => setSelectedDirection(Direction.DOWN)}
                        className={`w-full py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all duration-150 font-display ${
                          selectedDirection === Direction.DOWN ? "text-white glow-down scale-[1.02]" : "text-down hover:scale-[1.02]"
                        }`}
                        style={{
                          background: selectedDirection === Direction.DOWN
                            ? "linear-gradient(135deg, #FF3B3B 0%, #CC2020 100%)"
                            : "linear-gradient(135deg, rgba(255,59,59,0.10) 0%, rgba(255,59,59,0.03) 100%)",
                          border: `1px solid ${selectedDirection === Direction.DOWN ? "rgba(255,59,59,0.5)" : "rgba(255,59,59,0.15)"}`,
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>▼</span> LOWER
                          {totalPool > 0 && <span className="text-[10px] opacity-70 ml-1 font-mono">{Math.round(downPct)}%</span>}
                        </span>
                      </button>
                    </div>

                    {/* Amount input */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Amount</label>
                        <span className="text-[10px] font-mono text-text-dim">Bal: {balanceDisplay} USDM</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="w-full px-4 py-3 pr-16 rounded-xl bg-bg border border-border focus:border-accent/50 focus:outline-none font-mono text-xl text-text-bright placeholder-text-dim transition-colors"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>
                          USDM
                        </span>
                      </div>
                    </div>

                    {/* Quick amounts */}
                    <div className="grid grid-cols-6 gap-1.5">
                      {QUICK_AMOUNTS.map((qa) => (
                        <button
                          key={qa}
                          onClick={() => setAmount(qa.toString())}
                          className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                            amount === qa.toString()
                              ? "bg-accent/20 text-accent border border-accent/40 glow-accent"
                              : "bg-bg-secondary border border-border text-text-dim hover:text-text-secondary hover:border-border-active"
                          }`}
                        >
                          {qa}
                        </button>
                      ))}
                    </div>

                    {/* Payout estimate */}
                    {Number(amount) > 0 && totalPool > 0 && selectedDirection !== null && (
                      <div className="flex items-center justify-between text-xs font-mono px-1">
                        <span className="text-text-dim">Est. payout</span>
                        <span className="text-up font-bold">
                          {(() => {
                            const myAmount = Number(amount);
                            const side = selectedDirection === Direction.UP ? totalUp : totalDown;
                            if (side + myAmount === 0) return "$0";
                            const payout = (myAmount / (side + myAmount)) * (totalPool + myAmount) * 0.97;
                            return `≈ $${payout.toFixed(2)}`;
                          })()}
                        </span>
                      </div>
                    )}

                    {/* Bet CTA */}
                    <button
                      onClick={handleBet}
                      disabled={selectedDirection === null || !amount || Number(amount) <= 0 || isTxPending}
                      className="w-full py-4 rounded-xl font-black text-lg uppercase tracking-wide transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:scale-[1.02] hover:brightness-110 text-white font-display"
                      style={{
                        background: selectedDirection === Direction.DOWN
                          ? "linear-gradient(135deg, #FF3B3B 0%, #B91C1C 100%)"
                          : selectedDirection === Direction.UP
                            ? "linear-gradient(135deg, #00FF6A 0%, #00AA44 100%)"
                            : "linear-gradient(180deg, #FFA030 0%, #D35400 100%)",
                        boxShadow: selectedDirection !== null
                          ? `0 0 24px ${selectedDirection === Direction.DOWN ? "rgba(255,59,59,0.35)" : "rgba(0,255,106,0.35)"}`
                          : "0 0 20px rgba(247,147,26,0.25)",
                        letterSpacing: '0.06em',
                      }}
                    >
                      {txStatus === "approving" ? "Approving..."
                        : txStatus === "betting" ? "Placing bet..."
                        : needsApproval ? "Approve & Bet"
                        : selectedDirection === null ? "Pick a side"
                        : "PLACE BET"}
                    </button>
                  </>
                )}

                {/* Position */}
                {hasBet && userBet && (
                  <div className={`p-4 rounded-xl ${
                    Number(userBet.direction) === Direction.UP
                      ? "bg-up/8 border border-up/20 glow-up"
                      : "bg-down/8 border border-down/20 glow-down"
                  }`}>
                    <div className="text-[10px] font-mono text-text-dim uppercase mb-2" style={{ letterSpacing: "0.08em" }}>Your Position</div>
                    <div className="flex items-center justify-between">
                      <span className={`font-black text-lg font-display ${Number(userBet.direction) === Direction.UP ? "text-up" : "text-down"}`}>
                        {Number(userBet.direction) === Direction.UP ? "▲ HIGHER" : "▼ LOWER"}
                      </span>
                      <span className="font-mono font-bold text-text-bright text-lg">
                        {(Number(userBet.amount) / 1e6).toFixed(2)} USDM
                      </span>
                    </div>
                  </div>
                )}

                {/* Claim */}
                {(status === RoundStatus.RESOLVED || status === RoundStatus.CANCELLED) && hasBet && !userBet?.claimed && (
                  <button
                    onClick={handleClaim}
                    disabled={isTxPending}
                    className="w-full py-4 rounded-xl font-black text-base uppercase tracking-wide transition-all disabled:opacity-40 text-white hover:scale-[1.02] font-display"
                    style={{
                      background: status === RoundStatus.RESOLVED
                        ? "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)"
                        : "transparent",
                      border: status === RoundStatus.RESOLVED ? "none" : "1px solid rgba(255,255,255,0.06)",
                      boxShadow: status === RoundStatus.RESOLVED ? "0 0 24px rgba(245,158,11,0.3)" : "none",
                      color: status === RoundStatus.RESOLVED ? "white" : "#94A3B8",
                    }}
                  >
                    {txStatus === "claiming" ? "Claiming..."
                      : status === RoundStatus.RESOLVED ? "🎉 Claim Winnings"
                      : "Claim Refund"}
                  </button>
                )}

                {/* TX status */}
                <AnimatePresence>
                  {(txStatus === "success" || txStatus === "error") && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-xs font-bold uppercase py-2.5 rounded-xl font-display ${
                        txStatus === "success" ? "text-up bg-up/10 border border-up/20" : "text-down bg-down/10 border border-down/20"
                      }`}
                      style={{ letterSpacing: "0.08em" }}
                    >
                      {txStatus === "success" ? "Confirmed ✓" : "Failed ✗"}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pool distribution */}
                {totalPool > 0 && (
                  <div className="space-y-2 pt-3 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
                    <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Pool</div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-up font-bold">▲ {totalUp.toFixed(0)}</span>
                      <span className="text-text-dim">{totalPool.toFixed(0)} USDM</span>
                      <span className="text-down font-bold">{totalDown.toFixed(0)} ▼</span>
                    </div>
                    <div className="relative h-2 rounded-full overflow-hidden bg-bg">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #00FF6A, #00CC55)' }}
                        animate={{ width: `${upPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-y-0 right-0 rounded-full"
                        style={{ background: 'linear-gradient(90deg, #CC2020, #FF3B3B)' }}
                        animate={{ width: `${downPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-text-dim">
                      <span>{totalPool > 0 && totalUp > 0 ? (totalPool / totalUp * 0.97).toFixed(2) : "—"}×</span>
                      <span>{totalPool > 0 && totalDown > 0 ? (totalPool / totalDown * 0.97).toFixed(2) : "—"}×</span>
                    </div>
                  </div>
                )}

                {/* Round result */}
                {status === RoundStatus.RESOLVED && round && (
                  <div className={`p-4 rounded-xl text-center ${
                    round.closePrice > round.lockPrice ? "bg-up/8 border border-up/20" : "bg-down/8 border border-down/20"
                  }`}>
                    <span className={`font-black text-xl font-display ${
                      round.closePrice > round.lockPrice ? "text-up" : "text-down"
                    }`}>
                      {round.closePrice > round.lockPrice ? "▲ HIGHER WINS" : "▼ LOWER WINS"}
                    </span>
                    <div className="text-[10px] font-mono text-text-dim mt-1 uppercase" style={{ letterSpacing: "0.08em" }}>
                      Close: ${(Number(round.closePrice) / 1e8).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Participants */}
        {!isFinished && roundBets.length > 0 && (
          <div className="lg:max-w-[66%] mb-4 anim-fade-up anim-delay-4">
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(12,16,32,0.7)', backdropFilter: 'blur(12px)' }}>
              <div className="px-5 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-text-bright uppercase font-display" style={{ letterSpacing: "0.08em" }}>
                    Players
                  </span>
                  <span className="text-[10px] font-mono text-text-dim">
                    {roundBets.length} in round
                  </span>
                </div>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {roundBets.map((bet) => (
                  <div key={bet.id} className="px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold ${bet.direction === 0 ? "text-up" : "text-down"}`}>
                        {bet.direction === 0 ? "▲" : "▼"}
                      </span>
                      <span className="font-mono text-xs text-text-dim">
                        {bet.user.slice(0, 6)}…{bet.user.slice(-4)}
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-text-bright">
                      {(Number(bet.amount) / 1e6).toFixed(2)} USDM
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

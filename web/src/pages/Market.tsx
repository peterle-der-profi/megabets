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
  const assetColor = asset === "BTC" ? "btc" : "eth";
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

  const balanceDisplay = usdmBalance !== undefined
    ? Number(formatUnits(usdmBalance as bigint, 6)).toFixed(2)
    : "0.00";

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-18 pb-16">
        <button
          onClick={() => navigate("/")}
          className="text-text-dim text-[10px] font-mono uppercase tracking-widest hover:text-text-secondary mb-3 flex items-center gap-1 transition-colors"
          style={{ letterSpacing: "0.08em" }}
        >
          ← MARKETS
        </button>

        {claimableRounds.length > 0 && (
          <Link
            to="/history"
            className="block rounded-xl border border-up/20 bg-up/5 px-4 py-3 mb-3 text-up font-mono text-sm font-bold hover:bg-up/10 transition-colors glow-up"
          >
            🎉 You have {claimableRounds.length} unclaimed reward{claimableRounds.length > 1 ? "s" : ""} — Claim now →
          </Link>
        )}

        {/* Header row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <IconComponent size={40} />
            <div>
              <h1 className="text-2xl font-black text-text-bright tracking-tight">
                {asset}/USD <span className={`text-${assetColor} text-lg font-bold`}>· {TIMEFRAME_LABELS[timeframe]}</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5">
                {status === RoundStatus.OPEN && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                    <span className="text-[11px] font-semibold text-up uppercase" style={{ letterSpacing: "0.08em" }}>Betting Open</span>
                  </div>
                )}
                {status === RoundStatus.LOCKED && (
                  <span className="text-[11px] font-semibold text-accent uppercase" style={{ letterSpacing: "0.08em" }}>Locked</span>
                )}
              </div>
            </div>
          </div>

          {/* Countdown */}
          {countdown > 0 && (
            <div className={`text-right ${isUrgent ? "pulse-urgent" : ""}`}>
              <div className={`font-mono font-black tracking-tight ${
                isUrgent ? "text-down text-5xl" : status === RoundStatus.OPEN ? "text-up text-5xl" : "text-accent text-4xl"
              }`} style={{ textShadow: isUrgent ? "0 0 20px rgba(239,68,68,0.5)" : status === RoundStatus.OPEN ? "0 0 20px rgba(34,197,94,0.3)" : "none" }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>
                {status === RoundStatus.OPEN ? "until lock" : "until resolve"}
              </div>
            </div>
          )}
        </div>

        {/* Price info */}
        <div className="flex items-baseline gap-6 mb-4">
          <div>
            <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Current</div>
            <div className={`text-5xl font-mono font-black ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : asset === "BTC" ? "text-btc" : "text-eth"}`}>
              ${price > 0 ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
            </div>
          </div>
          {lockPrice !== undefined && (
            <div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Lock Price</div>
              <div className="text-xl font-mono font-bold text-accent">
                ${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </div>
            </div>
          )}
          {priceDelta !== undefined && (
            <div>
              <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Delta</div>
              <div className={`text-xl font-mono font-bold ${priceDelta >= 0 ? "text-up" : "text-down"}`}>
                {priceDelta >= 0 ? "+" : ""}{priceDelta.toFixed(2)}
              </div>
            </div>
          )}
        </div>

        {/* Timeframe tabs */}
        <div className="flex items-center gap-1.5 mb-4">
          {TIMEFRAMES.map((tf) => {
            const isActive = timeframe === tf;
            const glowColor = asset === "BTC" ? "rgba(247,147,26,0.4)" : "rgba(139,92,246,0.4)";
            return (
              <button
                key={tf}
                onClick={() => handleTimeframeChange(tf)}
                className={`
                  px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all
                  ${isActive
                    ? `bg-${assetColor} text-white`
                    : "bg-bg-card text-text-dim hover:text-text-secondary hover:bg-bg-card-hover"
                  }
                `}
                style={isActive ? { boxShadow: `0 0 16px ${glowColor}, 0 0 4px ${glowColor}` } : {}}
              >
                {TIMEFRAME_LABELS[tf]}
              </button>
            );
          })}
        </div>

        {/* Chart + Trade panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4" style={{ alignItems: "stretch" }}>
          {/* Chart with gradient border */}
          <div className="lg:col-span-2 flex flex-col">
            <div className="rounded-xl p-[1px] flex-1"
              style={{ background: asset === "BTC"
                ? 'linear-gradient(135deg, rgba(247,147,26,0.4) 0%, rgba(233,30,139,0.2) 50%, rgba(139,92,246,0.1) 100%)'
                : 'linear-gradient(135deg, rgba(139,92,246,0.4) 0%, rgba(233,30,139,0.2) 50%, rgba(247,147,26,0.1) 100%)'
              }}>
              <div className={`rounded-xl bg-bg-card/95 overflow-hidden h-full min-h-[420px]`}>
                <SmoothChart
                  prices={priceHistory}
                  lockPrice={lockPrice}
                  height={420}
                  accentColor={asset === "BTC" ? "#F7931A" : "#8B5CF6"}
                />
              </div>
            </div>
          </div>

          {/* Trade panel with gradient border */}
          <div className="flex flex-col">
            <div className="rounded-xl p-[1px] flex-1" style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.3) 0%, rgba(99,102,241,0.05) 100%)' }}>
            <div className="rounded-xl bg-bg-card/95 overflow-hidden flex-1 flex flex-col">
              {/* Trade header */}
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                <span className="text-xs font-bold text-text-bright uppercase" style={{ letterSpacing: "0.08em" }}>Make your move</span>
                {status === RoundStatus.OPEN && (
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                    <span className="text-[10px] font-bold text-up uppercase" style={{ letterSpacing: "0.08em" }}>Open</span>
                  </div>
                )}
                {status === RoundStatus.LOCKED && (
                  <span className="text-[10px] font-bold text-accent uppercase" style={{ letterSpacing: "0.08em" }}>Locked</span>
                )}
              </div>

              <div className="p-4 space-y-4 flex-1 flex flex-col">
                {/* HIGHER / LOWER buttons */}
                {(status === RoundStatus.OPEN || status === RoundStatus.NONE) && !hasBet && (
                  <>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedDirection(Direction.UP)}
                        className={`
                          w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-150
                          ${selectedDirection === Direction.UP
                            ? "text-white glow-up"
                            : "text-up hover:scale-[1.03]"
                          }
                        `}
                        style={{
                          background: selectedDirection === Direction.UP
                            ? "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)"
                            : "linear-gradient(135deg, rgba(34,197,94,0.12) 0%, rgba(34,197,94,0.04) 100%)",
                          border: `1px solid ${selectedDirection === Direction.UP ? "rgba(34,197,94,0.5)" : "rgba(34,197,94,0.2)"}`,
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>▲</span> HIGHER
                          {totalPool > 0 && <span className="text-[10px] opacity-70 ml-1">{Math.round(upPct)}%</span>}
                        </span>
                      </button>
                      <button
                        onClick={() => setSelectedDirection(Direction.DOWN)}
                        className={`
                          w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all duration-150
                          ${selectedDirection === Direction.DOWN
                            ? "text-white glow-down"
                            : "text-down hover:scale-[1.03]"
                          }
                        `}
                        style={{
                          background: selectedDirection === Direction.DOWN
                            ? "linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                            : "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(239,68,68,0.04) 100%)",
                          border: `1px solid ${selectedDirection === Direction.DOWN ? "rgba(239,68,68,0.5)" : "rgba(239,68,68,0.2)"}`,
                        }}
                      >
                        <span className="flex items-center justify-center gap-2">
                          <span>▼</span> LOWER
                          {totalPool > 0 && <span className="text-[10px] opacity-70 ml-1">{Math.round(downPct)}%</span>}
                        </span>
                      </button>
                    </div>

                    {/* Amount */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Amount</label>
                        <span className="text-[10px] font-mono text-text-dim">Balance: {balanceDisplay} USDM</span>
                      </div>
                      <div className="relative">
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0"
                          className="w-full px-3 py-3 pr-16 rounded-xl bg-bg border border-border focus:border-accent/50 focus:outline-none font-mono text-xl text-text-bright placeholder-text-dim transition-colors"
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
                          className={`
                            py-2 rounded-lg text-xs font-mono font-bold transition-all
                            ${amount === qa.toString()
                              ? "bg-accent/20 text-accent border border-accent/40 glow-accent"
                              : "bg-bg-secondary border border-border text-text-dim hover:text-text-secondary hover:border-border-active"
                            }
                          `}
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

                    {/* CTA */}
                    <button
                      onClick={handleBet}
                      disabled={selectedDirection === null || !amount || Number(amount) <= 0 || isTxPending}
                      className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all disabled:opacity-20 disabled:cursor-not-allowed hover:scale-[1.02] hover:brightness-110 text-white"
                      style={{
                        background: selectedDirection === Direction.DOWN
                          ? "linear-gradient(135deg, #EF4444 0%, #B91C1C 100%)"
                          : selectedDirection === Direction.UP
                            ? "linear-gradient(135deg, #22C55E 0%, #15803D 100%)"
                            : "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)",
                        boxShadow: selectedDirection !== null
                          ? `0 0 20px ${selectedDirection === Direction.DOWN ? "rgba(239,68,68,0.3)" : "rgba(34,197,94,0.3)"}`
                          : "0 0 20px rgba(99,102,241,0.2)",
                      }}
                    >
                      {txStatus === "approving" ? "Approving..."
                        : txStatus === "betting" ? "Placing bet..."
                        : needsApproval ? "Approve & Bet"
                        : selectedDirection === null ? "Higher or lower?"
                        : "Make your bet"}
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
                    <div className="text-[10px] font-mono text-text-dim uppercase mb-2" style={{ letterSpacing: "0.08em" }}>Your position</div>
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-lg ${Number(userBet.direction) === Direction.UP ? "text-up" : "text-down"}`}>
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
                    className="w-full py-4 rounded-xl font-bold text-base uppercase tracking-wide transition-all disabled:opacity-40 text-white hover:scale-[1.02]"
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
                      : status === RoundStatus.RESOLVED ? "🎉 Claim winnings"
                      : "Claim refund"}
                  </button>
                )}

                {/* TX status */}
                <AnimatePresence>
                  {(txStatus === "success" || txStatus === "error") && (
                    <motion.div
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-xs font-bold uppercase py-2.5 rounded-xl ${
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
                  <div className="space-y-2 pt-3 border-t mt-auto" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                    <div className="text-[10px] font-mono text-text-dim uppercase" style={{ letterSpacing: "0.08em" }}>Pool</div>
                    <div className="flex justify-between text-[11px] font-mono">
                      <span className="text-up font-bold">▲ {totalUp.toFixed(0)}</span>
                      <span className="text-text-dim">{totalPool.toFixed(0)} USDM</span>
                      <span className="text-down font-bold">{totalDown.toFixed(0)} ▼</span>
                    </div>
                    <div className="relative h-1.5 rounded-full overflow-hidden bg-bg">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-full bg-up"
                        animate={{ width: `${upPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-y-0 right-0 rounded-full bg-down"
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
                    <span className={`font-black text-xl ${
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
          <div className="lg:max-w-[66%] mb-4">
            <div className="rounded-xl bg-bg-card overflow-hidden card-dark">
              <div className="px-4 py-2.5 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
                <span className="text-[10px] font-bold text-text-bright uppercase" style={{ letterSpacing: "0.08em" }}>
                  Players
                </span>
                <span className="text-[10px] font-mono text-text-dim">
                  {roundBets.length} in round
                </span>
              </div>
              <div className="divide-y divide-white/[0.03]">
                {roundBets.map((bet) => (
                  <div key={bet.id} className="px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`font-mono text-xs font-bold ${
                        bet.direction === 0 ? "text-up" : "text-down"
                      }`}>
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

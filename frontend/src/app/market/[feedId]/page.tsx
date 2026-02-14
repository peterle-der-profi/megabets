"use client";

import { use, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { usePrivy } from "@privy-io/react-auth";

import {
  ADDRESSES, MEGABETS_ABI, ERC20_ABI, FEED_IDS, Direction, RoundStatus,
  FeedKey, Timeframe, Asset, TIMEFRAMES, feedKey, megaethTestnet,
} from "@/lib/contract";
import { useCurrentRoundId, useRound, useBet } from "@/hooks/useRound";
import { usePrice } from "@/hooks/usePrice";
import { SmoothChart } from "@/components/SmoothChart";
import { Header } from "@/components/Header";

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  "1m": "1 Min",
  "5m": "5 Min",
  "10m": "10 Min",
  "15m": "15 Min",
};

const QUICK_AMOUNTS = [10, 50, 100, 500];

interface PageProps {
  params: Promise<{ feedId: string }>;
}

export default function MarketPage({ params }: PageProps) {
  const { feedId: rawFeedId } = use(params);
  const router = useRouter();

  // Parse feedId: "BTC-5m" → asset="BTC", timeframe="5m"
  const [assetPart, tfPart] = rawFeedId.split("-") as [Asset, Timeframe];
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
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  // Collect price history
  useEffect(() => {
    if (price <= 0) return;
    setPriceHistory((prev) => {
      const next = [...prev, price];
      return next.length > 300 ? next.slice(-300) : next;
    });
  }, [price]);

  // Load initial price history from server
  useEffect(() => {
    fetch("/api/prices")
      .then((r) => r.json())
      .then((data) => {
        const history = data[asset] as number[];
        if (history && history.length > 0) {
          setPriceHistory(history);
        }
      })
      .catch(() => {});
  }, [asset]);

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

  const status = round ? Number(round.status) : RoundStatus.NONE;
  const hasBet = userBet && Number(userBet.amount) > 0;
  const betAmount = parseUnits(amount || "0", 6);
  const needsApproval = allowance !== undefined && betAmount > (allowance as bigint);

  // Countdown
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

  const lockPrice = round && round.lockPrice > 0n ? Number(round.lockPrice) / 1e8 : undefined;

  const handleBet = useCallback(async () => {
    if (!authenticated) { login(); return; }
    if (selectedDirection === null || !amount) return;
    try {
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
  }, [authenticated, login, selectedDirection, amount, needsApproval, betAmount, writeContractAsync, fk]);

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

  // Navigate to new feed on timeframe change
  const handleTimeframeChange = (tf: Timeframe) => {
    setTimeframe(tf);
    router.replace(`/market/${asset}-${tf}`, { scroll: false });
  };

  const icon = asset === "BTC" ? "₿" : "Ξ";
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
  const priceDelta = lockPrice ? price - lockPrice : undefined;
  const totalUp = round ? Number(round.totalUp) / 1e6 : 0;
  const totalDown = round ? Number(round.totalDown) / 1e6 : 0;
  const totalPool = totalUp + totalDown;

  const upPct = totalPool > 0 ? (totalUp / totalPool) * 100 : 50;
  const downPct = totalPool > 0 ? (totalDown / totalPool) * 100 : 50;

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  const isUrgent = countdown > 0 && countdown <= 10;

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        {/* Back button */}
        <button
          onClick={() => router.push("/")}
          className="text-text-dim text-sm hover:text-text mb-4 flex items-center gap-1"
        >
          ← All Markets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chart area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Market header */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-bg-card border border-border text-xl">
                  {icon}
                </div>
                <div>
                  <h1 className="text-xl font-bold text-text-bright">
                    {asset} Up or Down — {TIMEFRAME_LABELS[timeframe]}
                  </h1>
                  <div className="text-sm text-text-dim">
                    {lockPrice !== undefined && (
                      <span>Price to beat: <span className="text-accent font-mono font-semibold">${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span></span>
                    )}
                  </div>
                </div>
              </div>

              {/* Countdown */}
              {countdown > 0 && (
                <div className="text-right">
                  <div className={`text-3xl font-mono font-bold ${isUrgent ? "text-down" : status === RoundStatus.OPEN ? "text-up" : "text-accent"}`}>
                    {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-text-dim">
                    {status === RoundStatus.OPEN ? "MINS  SECS" : "RESOLVING"}
                  </div>
                </div>
              )}
            </div>

            {/* Price display */}
            <div className="flex items-baseline gap-4">
              {lockPrice !== undefined && (
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-text-dim">Price to Beat</div>
                  <div className="text-lg font-mono font-semibold text-text-dim">
                    ${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </div>
                </div>
              )}
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-dim flex items-center gap-1">
                  Current Price
                  {priceDelta !== undefined && (
                    <span className={`font-mono ${priceDelta >= 0 ? "text-up" : "text-down"}`}>
                      {priceDelta >= 0 ? "▲" : "▼"} ${Math.abs(priceDelta).toFixed(2)}
                    </span>
                  )}
                </div>
                <div className={`text-2xl font-mono font-bold ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-bright"}`}>
                  ${price > 0 ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
              <SmoothChart
                prices={priceHistory}
                lockPrice={lockPrice}
                height={350}
              />
            </div>

            {/* Timeframe tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => handleTimeframeChange(tf)}
                  className={`
                    px-4 py-2 rounded-lg text-sm font-semibold transition-all
                    ${timeframe === tf
                      ? "bg-text-bright text-bg"
                      : "bg-bg-card border border-border text-text-dim hover:text-text hover:border-border-active"
                    }
                  `}
                >
                  {status === RoundStatus.OPEN && timeframe === tf && (
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-down mr-1.5 pulse-live" />
                  )}
                  {TIMEFRAME_LABELS[tf]}
                </button>
              ))}
              <div className="ml-auto flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-bg-card border border-border text-text-dim text-sm">
                  {icon}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Trade panel */}
          <div className="space-y-4">
            <div className="rounded-2xl border border-border bg-bg-card overflow-hidden sticky top-20">
              {/* Panel header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border">
                <span className="font-bold text-text-bright">Trade</span>
                {status === RoundStatus.OPEN && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-up/10">
                    <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                    <span className="text-[10px] font-bold text-up">BETTING OPEN</span>
                  </div>
                )}
                {status === RoundStatus.LOCKED && (
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10">
                    <span className="text-[10px] font-bold text-accent">LOCKED</span>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-4">
                {/* Up / Down buttons (Polymarket style) */}
                {(status === RoundStatus.OPEN || status === RoundStatus.NONE) && !hasBet && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setSelectedDirection(Direction.UP)}
                        className={`
                          py-3.5 rounded-xl font-bold text-base transition-all
                          ${selectedDirection === Direction.UP
                            ? "bg-up text-bg ring-2 ring-up ring-offset-2 ring-offset-bg-card"
                            : "bg-up/10 text-up hover:bg-up/20 border border-up/20"
                          }
                        `}
                      >
                        Up {totalPool > 0 ? `${Math.round(upPct)}¢` : ""}
                      </button>
                      <button
                        onClick={() => setSelectedDirection(Direction.DOWN)}
                        className={`
                          py-3.5 rounded-xl font-bold text-base transition-all
                          ${selectedDirection === Direction.DOWN
                            ? "bg-down text-white ring-2 ring-down ring-offset-2 ring-offset-bg-card"
                            : "bg-down/10 text-down hover:bg-down/20 border border-down/20"
                          }
                        `}
                      >
                        Down {totalPool > 0 ? `${Math.round(downPct)}¢` : ""}
                      </button>
                    </div>

                    {/* Amount */}
                    <AnimatePresence>
                      {selectedDirection !== null && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <div>
                            <label className="text-xs text-text-dim font-semibold mb-1 block">Amount</label>
                            <div className="relative">
                              <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full px-4 py-3 pr-20 rounded-xl bg-bg border border-border focus:border-accent focus:outline-none font-mono text-lg text-text-bright placeholder-text-dim"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-dim font-semibold">
                                USDM
                              </span>
                            </div>
                          </div>

                          {/* Quick amounts */}
                          <div className="flex gap-2">
                            {QUICK_AMOUNTS.map((qa) => (
                              <button
                                key={qa}
                                onClick={() => setAmount(qa.toString())}
                                className={`
                                  flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all
                                  ${amount === qa.toString()
                                    ? "bg-accent/20 text-accent border border-accent/40"
                                    : "bg-bg border border-border text-text-dim hover:text-text"
                                  }
                                `}
                              >
                                +{qa}
                              </button>
                            ))}
                          </div>

                          {/* Potential payout */}
                          {Number(amount) > 0 && totalPool > 0 && (
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-text-dim">To win</span>
                              <span className="text-up font-mono font-bold">
                                {(() => {
                                  const myAmount = Number(amount);
                                  const side = selectedDirection === Direction.UP ? totalUp : totalDown;
                                  const otherSide = selectedDirection === Direction.UP ? totalDown : totalUp;
                                  if (side + myAmount === 0) return "$0";
                                  const payout = (myAmount / (side + myAmount)) * (totalPool + myAmount) * 0.97;
                                  return `≈ $${payout.toFixed(2)}`;
                                })()}
                              </span>
                            </div>
                          )}

                          {/* Trade button */}
                          <button
                            onClick={handleBet}
                            disabled={!amount || Number(amount) <= 0 || isTxPending}
                            className={`
                              w-full py-3.5 rounded-xl font-bold text-base transition-all
                              disabled:opacity-40 disabled:cursor-not-allowed
                              ${selectedDirection === Direction.UP
                                ? "bg-up text-bg hover:brightness-110"
                                : "bg-down text-white hover:brightness-110"
                              }
                            `}
                          >
                            {txStatus === "approving" ? "Approving..."
                              : txStatus === "betting" ? "Placing bet..."
                              : needsApproval ? "Approve & Trade"
                              : "Trade"}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                )}

                {/* Active bet */}
                {hasBet && userBet && (
                  <div className={`p-4 rounded-xl border ${
                    Number(userBet.direction) === Direction.UP
                      ? "bg-up/5 border-up/30"
                      : "bg-down/5 border-down/30"
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={Number(userBet.direction) === Direction.UP ? "text-up" : "text-down"}>
                          {Number(userBet.direction) === Direction.UP ? "▲" : "▼"}
                        </span>
                        <span className="font-semibold text-text-bright">Your Position</span>
                      </div>
                      <span className="font-mono font-bold text-text-bright">
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
                    className={`
                      w-full py-3.5 rounded-xl font-bold text-base transition-all disabled:opacity-40
                      ${status === RoundStatus.RESOLVED ? "bg-gold text-bg" : "bg-text-dim/20 text-text"}
                    `}
                  >
                    {txStatus === "claiming" ? "Claiming..."
                      : status === RoundStatus.RESOLVED ? "🎉 Claim Winnings"
                      : "Claim Refund"}
                  </button>
                )}

                {/* TX feedback */}
                <AnimatePresence>
                  {(txStatus === "success" || txStatus === "error") && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className={`text-center text-sm font-semibold py-2 rounded-lg ${
                        txStatus === "success" ? "text-up bg-up/10" : "text-down bg-down/10"
                      }`}
                    >
                      {txStatus === "success" ? "✅ Confirmed!" : "❌ Failed"}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Pool info */}
                {totalPool > 0 && (
                  <div className="space-y-2 pt-2 border-t border-border">
                    <div className="flex justify-between text-xs">
                      <span className="text-up font-semibold">▲ {totalUp.toFixed(0)} USDM</span>
                      <span className="text-down font-semibold">{totalDown.toFixed(0)} USDM ▼</span>
                    </div>
                    <div className="relative h-2 rounded-full overflow-hidden bg-bg">
                      <motion.div
                        className="absolute inset-y-0 left-0 rounded-l-full bg-up"
                        animate={{ width: `${upPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.div
                        className="absolute inset-y-0 right-0 rounded-r-full bg-down"
                        animate={{ width: `${downPct}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-text-dim">
                      <span>Payout: {totalPool > 0 && totalUp > 0 ? (totalPool / totalUp * 0.97).toFixed(2) : "—"}×</span>
                      <span>Payout: {totalPool > 0 && totalDown > 0 ? (totalPool / totalDown * 0.97).toFixed(2) : "—"}×</span>
                    </div>
                  </div>
                )}

                {/* Resolved result */}
                {status === RoundStatus.RESOLVED && round && (
                  <div className="p-3 rounded-xl bg-bg text-center">
                    <span className={`text-lg font-bold ${
                      round.closePrice > round.lockPrice ? "text-up" : "text-down"
                    }`}>
                      {round.closePrice > round.lockPrice ? "▲ UP WINS" : "▼ DOWN WINS"}
                    </span>
                    <div className="text-xs text-text-dim mt-1 font-mono">
                      Close: ${(Number(round.closePrice) / 1e8).toFixed(2)}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

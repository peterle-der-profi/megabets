"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { usePrivy } from "@privy-io/react-auth";

import { ADDRESSES, MEGABETS_ABI, ERC20_ABI, FEED_IDS, Direction, RoundStatus, FeedKey, Timeframe, Asset } from "@/lib/contract";
import { megaethTestnet } from "@/lib/contract";
import { useCurrentRoundId, useRound, useBet } from "@/hooks/useRound";
import { PriceTicker } from "./PriceTicker";
import { CountdownTimer } from "./CountdownTimer";
import { PoolBar } from "./PoolBar";
import { BetButton } from "./BetButton";

interface Props {
  feed: Asset;
  feedId: FeedKey;
  timeframe: Timeframe;
}

const QUICK_AMOUNTS = [10, 50, 100, 500];

export function RoundCard({ feed, feedId, timeframe }: Props) {
  const { login, authenticated } = usePrivy();
  const { address } = useAccount();
  const { writeContractAsync, isPending: isTxPending } = useWriteContract();

  const [selectedDirection, setSelectedDirection] = useState<Direction | null>(null);
  const [amount, setAmount] = useState("");
  const [txStatus, setTxStatus] = useState<"idle" | "approving" | "betting" | "claiming" | "success" | "error">("idle");

  // Fetch round data
  const { data: roundId } = useCurrentRoundId(feedId);
  const { data: round } = useRound(roundId);
  const { data: userBet } = useBet(roundId, address as `0x${string}`);

  // Check USDM allowance
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

  const handleBet = useCallback(async () => {
    if (!authenticated) { login(); return; }
    if (selectedDirection === null || !amount) return;

    try {
      // Approve if needed
      if (needsApproval) {
        setTxStatus("approving");
        await writeContractAsync({
          address: ADDRESSES.usdm,
          abi: ERC20_ABI,
          functionName: "approve",
          args: [ADDRESSES.megaBets, betAmount],
          chainId: megaethTestnet.id,
        });
      }

      // Place bet
      setTxStatus("betting");
      await writeContractAsync({
        address: ADDRESSES.megaBets,
        abi: MEGABETS_ABI,
        functionName: "placeBet",
        args: [FEED_IDS[feedId], selectedDirection, betAmount as unknown as bigint],
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
  }, [authenticated, login, selectedDirection, amount, needsApproval, betAmount, writeContractAsync, feed]);

  const handleClaim = useCallback(async () => {
    if (!roundId) return;
    try {
      setTxStatus("claiming");
      await writeContractAsync({
        address: ADDRESSES.megaBets,
        abi: MEGABETS_ABI,
        functionName: "claimWinnings",
        args: [roundId],
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

  // Status badge
  const statusConfig = {
    [RoundStatus.NONE]: { label: "WAITING", color: "text-text-dim", bg: "bg-text-dim/10" },
    [RoundStatus.OPEN]: { label: "LIVE BETTING", color: "text-up", bg: "bg-up/10" },
    [RoundStatus.LOCKED]: { label: "LOCKED", color: "text-accent", bg: "bg-accent/10" },
    [RoundStatus.RESOLVED]: { label: "RESOLVED", color: "text-gold", bg: "bg-gold/10" },
    [RoundStatus.CANCELLED]: { label: "CANCELLED", color: "text-down", bg: "bg-down/10" },
  };

  const sc = statusConfig[status as keyof typeof statusConfig] || statusConfig[RoundStatus.NONE];

  return (
    <motion.div
      className={`
        relative rounded-2xl border overflow-hidden
        ${status === RoundStatus.OPEN ? "border-up/30 glow-up" : "border-border"}
        bg-bg-card backdrop-blur-sm
      `}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Top bar — status + round ID */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-border">
        <div className={`flex items-center gap-2 px-2.5 py-1 rounded-full ${sc.bg}`}>
          {status === RoundStatus.OPEN && (
            <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
          )}
          <span className={`text-[10px] font-bold uppercase tracking-widest ${sc.color}`}>
            {sc.label}
          </span>
        </div>
        <span className="text-xs text-text-dim font-mono">
          {timeframe} · #{roundId?.toString() || "—"}
        </span>
      </div>

      <div className="p-5 space-y-5">
        {/* Price + Timer */}
        <div className="flex items-start justify-between">
          <PriceTicker feed={feed} />
          {status === RoundStatus.OPEN && round && (
            <CountdownTimer
              targetTime={Number(round.lockTime)}
              label="Betting closes"
              variant="betting"
            />
          )}
          {status === RoundStatus.LOCKED && round && (
            <CountdownTimer
              targetTime={Number(round.resolveTime)}
              label="Resolves in"
              variant="resolution"
            />
          )}
        </div>

        {/* Pool Bar */}
        {round && (round.totalUp > 0n || round.totalDown > 0n) && (
          <PoolBar totalUp={round.totalUp} totalDown={round.totalDown} />
        )}

        {/* Betting UI — only when OPEN and user hasn't bet */}
        {(status === RoundStatus.OPEN || status === RoundStatus.NONE) && !hasBet && (
          <div className="space-y-4">
            {/* Direction buttons */}
            <div className="flex gap-3">
              <BetButton
                direction={Direction.UP}
                selected={selectedDirection}
                onSelect={setSelectedDirection}
                disabled={isTxPending}
              />
              <BetButton
                direction={Direction.DOWN}
                selected={selectedDirection}
                onSelect={setSelectedDirection}
                disabled={isTxPending}
              />
            </div>

            {/* Amount input */}
            <AnimatePresence>
              {selectedDirection !== null && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-3 overflow-hidden"
                >
                  <div className="relative">
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="Enter amount"
                      className="w-full px-4 py-3 pr-20 rounded-xl bg-bg border border-border focus:border-accent focus:outline-none font-mono text-lg text-text-bright placeholder-text-dim"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-text-dim font-semibold">
                      USDM
                    </span>
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
                            : "bg-bg border border-border text-text-dim hover:text-text hover:border-border-active"
                          }
                        `}
                      >
                        {qa}
                      </button>
                    ))}
                    {usdmBalance && (
                      <button
                        onClick={() => setAmount(formatUnits(usdmBalance as bigint, 6))}
                        className="flex-1 py-1.5 rounded-lg text-xs font-semibold bg-bg border border-border text-text-dim hover:text-text hover:border-border-active transition-all"
                      >
                        MAX
                      </button>
                    )}
                  </div>

                  {/* Place bet button */}
                  <motion.button
                    onClick={handleBet}
                    disabled={!amount || Number(amount) <= 0 || isTxPending}
                    className={`
                      w-full py-3.5 rounded-xl font-bold text-base uppercase tracking-wide
                      transition-all disabled:opacity-40 disabled:cursor-not-allowed
                      ${selectedDirection === Direction.UP
                        ? "bg-up text-bg hover:brightness-110"
                        : "bg-down text-white hover:brightness-110"
                      }
                    `}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {txStatus === "approving"
                      ? "Approving..."
                      : txStatus === "betting"
                      ? "Placing bet..."
                      : needsApproval
                      ? `Approve & Bet ${amount || "0"} USDM ${selectedDirection === Direction.UP ? "▲ UP" : "▼ DOWN"}`
                      : `Bet ${amount || "0"} USDM ${selectedDirection === Direction.UP ? "▲ UP" : "▼ DOWN"}`
                    }
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* User's active bet */}
        {hasBet && userBet && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
              p-4 rounded-xl border
              ${Number(userBet.direction) === Direction.UP
                ? "bg-up/5 border-up/30"
                : "bg-down/5 border-down/30"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`text-lg ${Number(userBet.direction) === Direction.UP ? "text-up" : "text-down"}`}>
                  {Number(userBet.direction) === Direction.UP ? "▲" : "▼"}
                </span>
                <span className="font-semibold text-text-bright">Your Bet</span>
              </div>
              <span className="font-mono font-bold text-text-bright">
                {Number(userBet.amount) / 1e6} USDM
              </span>
            </div>
          </motion.div>
        )}

        {/* Claim button for resolved rounds */}
        {status === RoundStatus.RESOLVED && hasBet && !userBet?.claimed && (
          <motion.button
            onClick={handleClaim}
            disabled={isTxPending}
            className="w-full py-3.5 rounded-xl font-bold text-base bg-gold text-bg hover:brightness-110 disabled:opacity-40"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {txStatus === "claiming" ? "Claiming..." : "🎉 Claim Winnings"}
          </motion.button>
        )}

        {/* Cancelled — refund */}
        {status === RoundStatus.CANCELLED && hasBet && !userBet?.claimed && (
          <motion.button
            onClick={handleClaim}
            disabled={isTxPending}
            className="w-full py-3.5 rounded-xl font-bold text-base bg-text-dim/20 text-text hover:brightness-110 disabled:opacity-40"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            Claim Refund
          </motion.button>
        )}

        {/* TX Status Toast */}
        <AnimatePresence>
          {(txStatus === "success" || txStatus === "error") && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`
                text-center text-sm font-semibold py-2 rounded-lg
                ${txStatus === "success" ? "text-up bg-up/10" : "text-down bg-down/10"}
              `}
            >
              {txStatus === "success" ? "✅ Transaction confirmed!" : "❌ Transaction failed"}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lock price indicator */}
      {status === RoundStatus.LOCKED && round && round.lockPrice > 0n && (
        <div className="px-5 py-2 border-t border-border bg-accent/5 flex items-center justify-between">
          <span className="text-xs text-text-dim">Lock Price</span>
          <span className="text-sm font-mono font-bold text-accent">
            ${(Number(round.lockPrice) / 1e8).toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
        </div>
      )}

      {/* Resolved result */}
      {status === RoundStatus.RESOLVED && round && (
        <div className="px-5 py-3 border-t border-border bg-bg-card">
          <div className="flex items-center justify-between text-sm">
            <div>
              <span className="text-text-dim">Lock: </span>
              <span className="font-mono font-semibold">${(Number(round.lockPrice) / 1e8).toFixed(2)}</span>
            </div>
            <span className={`font-bold text-lg ${
              round.closePrice > round.lockPrice ? "text-up" : "text-down"
            }`}>
              {round.closePrice > round.lockPrice ? "▲ UP WINS" : "▼ DOWN WINS"}
            </span>
            <div>
              <span className="text-text-dim">Close: </span>
              <span className="font-mono font-semibold">${(Number(round.closePrice) / 1e8).toFixed(2)}</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

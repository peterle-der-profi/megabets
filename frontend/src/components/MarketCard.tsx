"use client";

import { motion } from "framer-motion";
import { usePrice } from "@/hooks/usePrice";
import { Asset, Timeframe, feedKey, FeedKey } from "@/lib/contract";
import { useCurrentRoundId, useRound } from "@/hooks/useRound";
import { RoundStatus } from "@/lib/contract";
import Link from "next/link";
import { MiniChart } from "./MiniChart";

interface Props {
  asset: Asset;
  timeframe: Timeframe;
  index?: number;
}

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  "1m": "1 Minute",
  "5m": "5 Minutes",
  "10m": "10 Minutes",
  "15m": "15 Minutes",
};

export function MarketCard({ asset, timeframe, index = 0 }: Props) {
  const fk = feedKey(asset, timeframe);
  const { price, prevPrice } = usePrice(asset);
  const { data: roundId } = useCurrentRoundId(fk);
  const { data: round } = useRound(roundId);

  const status = round ? Number(round.status) : RoundStatus.NONE;
  const isLive = status === RoundStatus.OPEN;
  const totalPool = round ? (Number(round.totalUp) + Number(round.totalDown)) / 1e6 : 0;
  const icon = asset === "BTC" ? "₿" : "Ξ";
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";

  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  return (
    <Link href={`/market/${asset}-${timeframe}`}>
      <motion.div
        className={`
          relative rounded-2xl border overflow-hidden cursor-pointer
          transition-all duration-200 hover:scale-[1.02] hover:shadow-lg
          ${isLive ? "border-up/30 hover:border-up/50" : "border-border hover:border-border-active"}
          bg-bg-card
        `}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-bg border border-border text-lg">
              {icon}
            </div>
            <div>
              <div className="font-bold text-text-bright text-base">
                {asset} Up or Down
              </div>
              <div className="text-xs text-text-dim">
                {TIMEFRAME_LABELS[timeframe]}
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className={`font-mono font-bold text-lg ${
              direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-bright"
            }`}>
              {formattedPrice}
            </div>
            {isLive && (
              <div className="flex items-center gap-1 justify-end">
                <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                <span className="text-[10px] font-bold text-up uppercase">Live</span>
              </div>
            )}
          </div>
        </div>

        {/* Mini chart area */}
        <div className="h-16 px-2">
          <MiniChart feed={asset} compact />
        </div>

        {/* Footer stats */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-bg/30">
          <div className="flex items-center gap-3 text-xs text-text-dim">
            {totalPool > 0 && (
              <span className="font-mono">{totalPool.toFixed(0)} USDM pool</span>
            )}
            {!isLive && status === RoundStatus.NONE && (
              <span>Waiting for first bet</span>
            )}
          </div>
          <span className="text-xs text-accent font-semibold">Trade →</span>
        </div>
      </motion.div>
    </Link>
  );
}

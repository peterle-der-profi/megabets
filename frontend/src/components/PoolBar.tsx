"use client";

import { motion } from "framer-motion";

interface Props {
  totalUp: bigint;
  totalDown: bigint;
}

export function PoolBar({ totalUp, totalDown }: Props) {
  const up = Number(totalUp) / 1e6;
  const down = Number(totalDown) / 1e6;
  const total = up + down;
  const upPct = total > 0 ? (up / total) * 100 : 50;
  const downPct = total > 0 ? (down / total) * 100 : 50;

  const upOdds = total > 0 && up > 0 ? (total / up).toFixed(2) : "—";
  const downOdds = total > 0 && down > 0 ? (total / down).toFixed(2) : "—";

  return (
    <div className="space-y-2">
      {/* Labels */}
      <div className="flex justify-between text-xs font-semibold">
        <div className="flex items-center gap-2">
          <span className="text-up">▲ UP</span>
          <span className="text-text-dim font-mono">{up.toFixed(0)} USDM</span>
          <span className="text-text-dim">({upPct.toFixed(0)}%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-text-dim">({downPct.toFixed(0)}%)</span>
          <span className="text-text-dim font-mono">{down.toFixed(0)} USDM</span>
          <span className="text-down">DOWN ▼</span>
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-3 rounded-full overflow-hidden bg-bg border border-border">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-l-full"
          style={{
            background: "linear-gradient(90deg, var(--color-up), var(--color-up-glow))",
            boxShadow: "0 0 10px var(--color-up-glow)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${upPct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
        <motion.div
          className="absolute inset-y-0 right-0 rounded-r-full"
          style={{
            background: "linear-gradient(270deg, var(--color-down), var(--color-down-glow))",
            boxShadow: "0 0 10px var(--color-down-glow)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${downPct}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      {/* Odds */}
      <div className="flex justify-between text-[10px] text-text-dim">
        <span>Payout: {upOdds}×</span>
        <span>Payout: {downOdds}×</span>
      </div>
    </div>
  );
}

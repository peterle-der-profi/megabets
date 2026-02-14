"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Asset, TIMEFRAMES, Timeframe, feedKey } from "@/lib/contract";
import { RoundCard } from "./RoundCard";

interface Props {
  asset: Asset;
}

export function AssetCard({ asset }: Props) {
  const [activeTimeframe, setActiveTimeframe] = useState<Timeframe>("1m");

  return (
    <div className="space-y-0">
      {/* Timeframe tabs */}
      <div className="flex gap-1 px-1">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf}
            onClick={() => setActiveTimeframe(tf)}
            className={`
              relative px-4 py-2 rounded-t-xl text-xs font-bold uppercase tracking-wider transition-all
              ${activeTimeframe === tf
                ? "bg-bg-card text-text-bright border border-border border-b-0"
                : "bg-transparent text-text-dim hover:text-text"
              }
            `}
          >
            {tf}
            {activeTimeframe === tf && (
              <motion.div
                layoutId={`tab-indicator-${asset}`}
                className="absolute bottom-0 left-2 right-2 h-0.5 bg-accent rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Active round card */}
      <RoundCard feed={asset} feedId={feedKey(asset, activeTimeframe)} timeframe={activeTimeframe} />
    </div>
  );
}

"use client";

import { Header } from "@/components/Header";
import { MarketCard } from "@/components/MarketCard";
import { motion } from "framer-motion";
import { Asset, Timeframe } from "@/lib/contract";

const MARKETS: { asset: Asset; timeframe: Timeframe }[] = [
  { asset: "BTC", timeframe: "1m" },
  { asset: "BTC", timeframe: "5m" },
  { asset: "ETH", timeframe: "1m" },
  { asset: "ETH", timeframe: "5m" },
  { asset: "BTC", timeframe: "10m" },
  { asset: "BTC", timeframe: "15m" },
  { asset: "ETH", timeframe: "10m" },
  { asset: "ETH", timeframe: "15m" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="max-w-6xl mx-auto px-4 pt-24 pb-16 space-y-8">
        {/* Hero */}
        <motion.div
          className="text-center space-y-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
            <span className="text-text-bright">Predict.</span>{" "}
            <span className="text-up">Win.</span>{" "}
            <span className="text-text-bright">Repeat.</span>
          </h1>
          <p className="text-text-dim text-lg max-w-xl mx-auto">
            Bet UP or DOWN on crypto prices. Winners take the pool.
            <br />
            <span className="text-accent font-semibold">Powered by MegaETH — 10ms blocks.</span>
          </p>
        </motion.div>

        {/* Market grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
          {MARKETS.map((m, i) => (
            <MarketCard
              key={`${m.asset}-${m.timeframe}`}
              asset={m.asset}
              timeframe={m.timeframe}
              index={i}
            />
          ))}
        </div>

        {/* Bottom info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border bg-bg-card p-5 space-y-2">
            <div className="text-sm font-bold text-text-bright">🎯 How it works</div>
            <div className="text-xs text-text-dim space-y-1">
              <p>1. Pick a market and direction (UP or DOWN)</p>
              <p>2. Place your bet in USDM (1–1,000)</p>
              <p>3. Price is locked, countdown begins</p>
              <p>4. Winners split the pool minus 3% fee</p>
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-bg-card p-5 space-y-2">
            <div className="text-sm font-bold text-text-bright">⚡ Why MegaETH?</div>
            <div className="text-xs text-text-dim space-y-1">
              <p>10ms block times — fastest EVM chain</p>
              <p>Real-time oracle prices (2.4ms updates)</p>
              <p>Near-zero gas fees</p>
              <p>Instant settlement</p>
            </div>
          </div>
          <div className="rounded-2xl border border-accent/30 bg-accent/5 p-5 space-y-2">
            <div className="text-sm font-bold text-accent">🔗 Invite & Earn</div>
            <div className="text-xs text-text-dim">
              Share your referral link. Earn 0.5% on every bet your friends make — forever.
            </div>
            <button className="w-full py-2 rounded-lg bg-accent/20 text-accent text-xs font-bold hover:bg-accent/30 transition-colors">
              Copy Referral Link
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between text-xs text-text-dim">
          <span>MegaBets © 2026</span>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
            <span>MegaETH — 10ms blocks</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

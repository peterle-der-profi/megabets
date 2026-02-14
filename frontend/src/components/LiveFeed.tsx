"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface FeedItem {
  id: string;
  user: string;
  direction: "UP" | "DOWN";
  amount: number;
  feed: string;
  time: number;
}

// Mock live feed for now — will be replaced with real event listener
const mockFeed: FeedItem[] = [
  { id: "1", user: "0x68...91F7", direction: "UP", amount: 250, feed: "BTC", time: Date.now() - 5000 },
  { id: "2", user: "0xE6...50f8", direction: "DOWN", amount: 100, feed: "ETH", time: Date.now() - 12000 },
  { id: "3", user: "0xAB...12cd", direction: "UP", amount: 500, feed: "BTC", time: Date.now() - 25000 },
  { id: "4", user: "0x34...ef56", direction: "DOWN", amount: 50, feed: "ETH", time: Date.now() - 40000 },
  { id: "5", user: "0x78...9abc", direction: "UP", amount: 1000, feed: "BTC", time: Date.now() - 55000 },
];

export function LiveFeed() {
  const [items] = useState<FeedItem[]>(mockFeed);

  return (
    <div className="rounded-2xl border border-border bg-bg-card overflow-hidden">
      <div className="px-5 py-3 border-b border-border flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
        <span className="text-xs font-bold uppercase tracking-widest text-text-dim">Live Activity</span>
      </div>
      <div className="divide-y divide-border max-h-80 overflow-y-auto">
        <AnimatePresence initial={false}>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center justify-between px-5 py-3 hover:bg-bg-card-hover transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className={`text-sm font-bold ${item.direction === "UP" ? "text-up" : "text-down"}`}>
                  {item.direction === "UP" ? "▲" : "▼"}
                </span>
                <div>
                  <span className="text-sm font-mono text-text-bright">{item.user}</span>
                  <span className="text-xs text-text-dim ml-2">{item.feed}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-mono font-semibold text-text-bright">
                  {item.amount} USDM
                </span>
                <div className="text-[10px] text-text-dim">
                  {Math.floor((Date.now() - item.time) / 1000)}s ago
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

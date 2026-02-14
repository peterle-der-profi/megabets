"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePrice } from "@/hooks/usePrice";

interface Props {
  feed: "BTC" | "ETH";
}

export function PriceTicker({ feed }: Props) {
  const { price, prevPrice } = usePrice(feed);
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
  const icon = feed === "BTC" ? "₿" : "Ξ";
  const formattedPrice = price > 0
    ? price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : "—";

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-bg-card border border-border">
        <span className="text-lg">{icon}</span>
      </div>
      <div>
        <div className="text-xs text-text-dim font-semibold uppercase tracking-wide">
          {feed}/USD
        </div>
        <div className="flex items-center gap-1.5">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={formattedPrice}
              className={`text-xl font-mono font-bold ${
                direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-bright"
              }`}
              initial={{ y: direction === "up" ? 8 : direction === "down" ? -8 : 0, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: direction === "up" ? -8 : direction === "down" ? 8 : 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              ${formattedPrice}
            </motion.div>
          </AnimatePresence>
          {/* Direction arrow */}
          <AnimatePresence mode="wait">
            {direction !== "neutral" && (
              <motion.span
                key={direction + formattedPrice}
                className={`text-sm font-bold ${direction === "up" ? "text-up" : "text-down"}`}
                initial={{ opacity: 0, y: direction === "up" ? 6 : -6, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                {direction === "up" ? "▲" : "▼"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

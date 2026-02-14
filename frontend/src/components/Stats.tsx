"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Total Volume", value: "$0", icon: "📊" },
  { label: "Active Rounds", value: "0", icon: "🔥" },
  { label: "Total Bettors", value: "0", icon: "👥" },
  { label: "Avg Round Pool", value: "$0", icon: "💰" },
];

export function Stats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="rounded-xl border border-border bg-bg-card p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg">{stat.icon}</span>
            <span className="text-[10px] uppercase tracking-widest text-text-dim font-semibold">
              {stat.label}
            </span>
          </div>
          <div className="text-xl font-mono font-bold text-text-bright">
            {stat.value}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

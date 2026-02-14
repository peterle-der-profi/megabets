"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  targetTime: number; // unix seconds
  label: string;
  variant: "betting" | "resolution";
}

export function CountdownTimer({ targetTime, label, variant }: Props) {
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    const tick = () => {
      const now = Math.floor(Date.now() / 1000);
      setRemaining(Math.max(0, targetTime - now));
    };
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [targetTime]);

  const seconds = remaining;
  const progress = variant === "betting"
    ? Math.max(0, Math.min(1, seconds / 60))
    : Math.max(0, Math.min(1, seconds / 60));

  const isUrgent = seconds <= 10;
  const color = variant === "betting" ? "var(--color-up)" : "var(--color-accent)";
  const urgentColor = "var(--color-down)";
  const activeColor = isUrgent ? urgentColor : color;

  // SVG circle
  const size = 80;
  const stroke = 4;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] uppercase tracking-widest text-text-dim font-semibold">
        {label}
      </span>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={stroke}
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={activeColor}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{
              filter: isUrgent ? `drop-shadow(0 0 6px ${urgentColor})` : `drop-shadow(0 0 4px ${color})`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            key={seconds}
            className="text-lg font-mono font-bold"
            style={{ color: activeColor }}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.15 }}
          >
            {seconds}s
          </motion.span>
        </div>
      </div>
    </div>
  );
}

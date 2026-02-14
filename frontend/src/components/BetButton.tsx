"use client";

import { motion } from "framer-motion";
import { Direction } from "@/lib/contract";

interface Props {
  direction: Direction;
  selected: Direction | null;
  onSelect: (d: Direction) => void;
  disabled?: boolean;
}

export function BetButton({ direction, selected, onSelect, disabled }: Props) {
  const isUp = direction === Direction.UP;
  const isSelected = selected === direction;

  return (
    <motion.button
      onClick={() => onSelect(direction)}
      disabled={disabled}
      className={`
        relative flex-1 py-4 rounded-xl font-bold text-lg uppercase tracking-wide
        border-2 transition-all duration-200
        ${isUp
          ? isSelected
            ? "bg-up/20 border-up text-up glow-up"
            : "bg-up/5 border-up/20 text-up/60 hover:bg-up/10 hover:border-up/40"
          : isSelected
            ? "bg-down/20 border-down text-down glow-down"
            : "bg-down/5 border-down/20 text-down/60 hover:bg-down/10 hover:border-down/40"
        }
        ${disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
      `}
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      <div className="flex items-center justify-center gap-2">
        <span className="text-2xl">{isUp ? "▲" : "▼"}</span>
        <span>{isUp ? "UP" : "DOWN"}</span>
      </div>
      {isSelected && (
        <motion.div
          className={`absolute inset-0 rounded-xl ${isUp ? "bg-up" : "bg-down"}`}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ zIndex: -1 }}
        />
      )}
    </motion.button>
  );
}

"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useReadContract } from "wagmi";
import { ADDRESSES, ERC20_ABI } from "@/lib/contract";
import { megaethTestnet } from "@/lib/contract";
import { formatUnits } from "viem";
import { motion } from "framer-motion";

export function Header() {
  const { login, logout, authenticated, user } = usePrivy();
  const { address } = useAccount();
  const { data: usdmBalanceRaw } = useReadContract({
    address: ADDRESSES.usdm,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const displayAddress = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const displayBalance = usdmBalanceRaw !== undefined
    ? `${Number(formatUnits(usdmBalanceRaw as bigint, 6)).toFixed(2)} USDM`
    : "0.00 USDM";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-bg/80 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            className="text-2xl font-black tracking-tight"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-up">MEGA</span>
            <span className="text-text-bright">BETS</span>
          </motion.div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-up-dim border border-up/20">
            <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
            <span className="text-xs font-semibold text-up">LIVE</span>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {authenticated && address ? (
            <>
              {/* Balance chip */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border">
                <span className="text-sm font-mono font-semibold text-text-bright">
                  {displayBalance}
                </span>
              </div>
              {/* Address + disconnect */}
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-card border border-border hover:border-border-active transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-up" />
                <span className="text-sm font-mono text-text-dim">{displayAddress}</span>
              </button>
            </>
          ) : (
            <motion.button
              onClick={login}
              className="px-5 py-2 rounded-lg bg-accent text-white font-semibold text-sm hover:brightness-110 transition-all glow-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Connect
            </motion.button>
          )}
        </div>
      </div>
    </header>
  );
}

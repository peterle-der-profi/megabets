import { usePrivy } from "@privy-io/react-auth";
import { useAccount, useReadContract } from "wagmi";
import { ADDRESSES, ERC20_ABI } from "@/lib/contract";
import { formatUnits } from "viem";
import { Link } from "react-router-dom";

export function Header() {
  const { login, logout, authenticated } = usePrivy();
  const { address } = useAccount();
  const { data: usdmBalanceRaw } = useReadContract({
    address: ADDRESSES.usdm,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address, refetchInterval: 5000 },
  });

  const displayAddress = address
    ? `${address.slice(0, 6)}…${address.slice(-4)}`
    : "";

  const displayBalance = usdmBalanceRaw !== undefined
    ? `${Number(formatUnits(usdmBalanceRaw as bigint, 6)).toFixed(2)}`
    : "0.00";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl" style={{
      background: 'rgba(6,8,15,0.75)',
      borderBottom: '1px solid rgba(255,255,255,0.03)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #F7931A 0%, #DC1478 100%)',
            boxShadow: '0 0 20px rgba(247,147,26,0.3)',
          }}>
            <span className="text-white text-sm font-black font-display relative z-10">M</span>
          </div>
          <span className="text-lg font-bold tracking-tight text-text-bright font-display">
            Mega<span className="text-btc">Bets</span>
          </span>
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {authenticated && address ? (
            <>
              <Link
                to="/history"
                className="text-sm text-text-secondary hover:text-text-bright transition-colors font-medium font-body hidden sm:block"
              >
                History
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                <span className="text-sm font-semibold text-text-bright font-mono">{displayBalance}</span>
                <span className="text-xs text-text-dim font-mono">USDM</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors hover:bg-white/[0.04]"
                style={{ background: 'rgba(255,255,255,0.03)' }}
              >
                <div className="w-2 h-2 rounded-full bg-up" />
                <span className="text-sm text-text-secondary font-mono">{displayAddress}</span>
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="px-6 py-2.5 rounded-xl text-white font-bold text-sm font-display uppercase tracking-wide hover:scale-[1.03] hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(180deg, #FFA030 0%, #D35400 100%)',
                boxShadow: '0 0 24px rgba(247,147,26,0.35), 0 4px 16px rgba(0,0,0,0.4)',
                letterSpacing: '0.05em',
              }}
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

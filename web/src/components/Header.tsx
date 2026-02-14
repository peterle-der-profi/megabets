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
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg/80 backdrop-blur-xl border-b" style={{ borderColor: 'rgba(255,255,255,0.03)' }}>
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 group">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="text-base font-extrabold tracking-tight text-text-bright">
              MegaBets
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {authenticated && address ? (
            <>
              <Link
                to="/history"
                className="text-sm text-text-secondary hover:text-text-bright transition-colors font-medium"
              >
                History
              </Link>
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-secondary">
                <span className="text-sm font-semibold text-text-bright">{displayBalance}</span>
                <span className="text-xs text-text-dim">USDM</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-bg-secondary hover:bg-bg-card-hover transition-colors"
              >
                <div className="w-2 h-2 rounded-full bg-up" />
                <span className="text-sm text-text font-mono">{displayAddress}</span>
              </button>
            </>
          ) : (
            <button
              onClick={login}
              className="px-5 py-2 rounded-lg text-white font-semibold text-sm hover:brightness-110 transition-all"
              style={{
                background: 'linear-gradient(135deg, #F7931A 0%, #D35400 100%)',
                boxShadow: '0 0 20px rgba(247,147,26,0.3), 0 2px 8px rgba(0,0,0,0.3)',
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

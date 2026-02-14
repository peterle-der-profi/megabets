import { usePrivy } from "@privy-io/react-auth";
import { useAccount } from "wagmi";
import { Link, useLocation } from "react-router-dom";

export function Header() {
  const { login, logout, authenticated } = usePrivy();
  const { address } = useAccount();
  const location = useLocation();

  const isHome = location.pathname === "/" || location.pathname === "";
  const isHistory = location.pathname.startsWith("/history");

  return (
    <header className="sticky top-0 z-50" style={{
      background: 'rgba(6,8,15,0.6)',
      backdropFilter: 'blur(24px) saturate(1.4)',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Logo — fire gradient M */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="relative">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center font-display font-bold text-base text-white relative z-10"
              style={{
                background: 'linear-gradient(135deg, #FF6B00 0%, #F7931A 30%, #DC1478 70%, #8B5CF6 100%)',
              }}>
              M
            </div>
            {/* Glow behind logo */}
            <div className="absolute inset-[-4px] rounded-xl opacity-50 group-hover:opacity-80 transition-opacity" style={{
              background: 'linear-gradient(135deg, #F7931A, #DC1478)',
              filter: 'blur(10px)',
            }} />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-base text-text-bright tracking-tight leading-none">
              Mega<span className="text-btc">Bets</span>
            </span>
            <span className="text-[8px] font-mono text-text-dim uppercase tracking-[0.2em] leading-none mt-0.5">
              MegaETH
            </span>
          </div>
        </Link>

        {/* Center: chain status */}
        <div className="hidden sm:flex items-center gap-4">
          {/* Live indicator */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full" style={{ background: 'rgba(0,255,106,0.06)', border: '1px solid rgba(0,255,106,0.1)' }}>
            <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
            <span className="text-[10px] font-mono text-up font-semibold uppercase tracking-wider">Live</span>
            <span className="text-[10px] font-mono text-text-dim">· 10ms blocks</span>
          </div>

          {/* Nav */}
          <nav className="flex items-center gap-0.5">
            <Link to="/" className={`px-3 py-1.5 rounded-lg text-[11px] font-display font-bold uppercase tracking-wider transition-all ${
              isHome ? 'text-text-bright bg-white/6' : 'text-text-dim hover:text-text-secondary hover:bg-white/3'
            }`}>Markets</Link>
            <Link to="/history" className={`px-3 py-1.5 rounded-lg text-[11px] font-display font-bold uppercase tracking-wider transition-all ${
              isHistory ? 'text-text-bright bg-white/6' : 'text-text-dim hover:text-text-secondary hover:bg-white/3'
            }`}>History</Link>
          </nav>
        </div>

        {/* Right: wallet */}
        {authenticated ? (
          <button onClick={logout}
            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-semibold text-text-bright transition-all hover:bg-white/5"
            style={{ border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="w-2 h-2 rounded-full bg-up" />
            {address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connected"}
          </button>
        ) : (
          <button onClick={login}
            className="relative px-6 py-2.5 rounded-lg text-sm font-display font-bold text-white hover:scale-[1.03] active:scale-[0.97] transition-all"
            style={{
              background: 'linear-gradient(135deg, #FF6B00 0%, #F7931A 40%, #DC1478 100%)',
              boxShadow: '0 0 20px rgba(247,147,26,0.3)',
            }}>
            Connect
            <div className="absolute inset-0 rounded-lg opacity-0 hover:opacity-100 transition-opacity" style={{
              background: 'linear-gradient(135deg, #FF8533 0%, #F7A030 40%, #E91E8B 100%)',
            }} />
          </button>
        )}
      </div>
    </header>
  );
}

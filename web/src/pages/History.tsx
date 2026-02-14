import { useAccount, useWriteContract } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import { Header } from "@/components/Header";
import { BtcIcon, EthIcon } from "@/components/CryptoIcons";
import { useHistory, useClaimable, type BetRecord } from "@/hooks/useHistory";
import { ADDRESSES, MEGABETS_ABI, megaethTestnet } from "@/lib/contract";
import { Link } from "react-router-dom";
import { useState } from "react";

function feedToAsset(feedId: string): "BTC" | "ETH" {
  return feedId.startsWith("ETH") ? "ETH" : "BTC";
}

function feedToTimeframe(feedId: string): string {
  return feedId.replace(/^(BTC|ETH)/, "");
}

function statusLabel(bet: BetRecord): { text: string; color: string; icon: string } {
  const s = bet.round_status;
  if (s === 1) return { text: "Open", color: "text-accent", icon: "⏳" };
  if (s === 2) return { text: "Locked", color: "text-accent", icon: "🔒" };
  if (s === 4) return { text: "Cancelled", color: "text-text-dim", icon: "↩" };
  if (s === 3) {
    const closePrice = BigInt(bet.close_price || "0");
    const lockPrice = BigInt(bet.lock_price || "0");
    const wentUp = closePrice > lockPrice;
    const userUp = bet.direction === 0;
    const won = (wentUp && userUp) || (!wentUp && !userUp);
    if (closePrice === lockPrice) return { text: "Push", color: "text-text-dim", icon: "➖" };
    return won
      ? { text: "Won", color: "text-up", icon: "🏆" }
      : { text: "Lost", color: "text-down", icon: "✗" };
  }
  return { text: "Unknown", color: "text-text-dim", icon: "?" };
}

export default function History() {
  const { login, authenticated } = usePrivy();
  const { address } = useAccount();
  const { bets: history, loading } = useHistory(address);
  const { claimable, refetch: refetchClaimable } = useClaimable(address);
  const { writeContractAsync, isPending } = useWriteContract();
  const [claimingId, setClaimingId] = useState<number | null>(null);
  const [claimingAll, setClaimingAll] = useState(false);

  const totalBets = history.length;
  const resolvedBets = history.filter((b: BetRecord) => b.round_status === 3);
  const totalWagered = resolvedBets.reduce((sum: number, b: BetRecord) => sum + Number(b.amount) / 1e6, 0);
  const wonBets = history.filter((b: BetRecord) => statusLabel(b).text === "Won");
  const winRate = resolvedBets.length > 0 ? ((wonBets.length / resolvedBets.length) * 100).toFixed(0) : "—";
  const totalWon = wonBets.reduce((sum: number, b: BetRecord) => {
    const totalPool = Number(b.total_up || 0) + Number(b.total_down || 0);
    const mySide = b.direction === 0 ? Number(b.total_up || 0) : Number(b.total_down || 0);
    if (mySide === 0) return sum;
    const payout = (Number(b.amount) / mySide) * totalPool * 0.97 / 1e6;
    return sum + payout;
  }, 0);
  const netPnL = totalWon - totalWagered;

  const handleClaim = async (roundId: number) => {
    try {
      setClaimingId(roundId);
      await writeContractAsync({
        address: ADDRESSES.megaBets, abi: MEGABETS_ABI,
        functionName: "claimWinnings", args: [BigInt(roundId)],
        chainId: megaethTestnet.id,
      });
      refetchClaimable();
    } catch (e) { console.error("Claim error:", e); }
    finally { setClaimingId(null); }
  };

  const handleClaimAll = async () => {
    setClaimingAll(true);
    try {
      for (const bet of claimable) {
        await writeContractAsync({
          address: ADDRESSES.megaBets, abi: MEGABETS_ABI,
          functionName: "claimWinnings", args: [BigInt(bet.round_id)],
          chainId: megaethTestnet.id,
        });
      }
      refetchClaimable();
    } catch (e) { console.error("Claim all error:", e); }
    finally { setClaimingAll(false); }
  };

  if (!authenticated || !address) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 pt-24 text-center">
          <h1 className="text-3xl font-black text-text-bright mb-2">Bet History</h1>
          <p className="text-text-dim mb-6">Connect your wallet to view your bet history.</p>
          <button onClick={login}
            className="px-8 py-3 rounded-xl text-white font-bold text-sm uppercase hover:scale-[1.02] transition-all"
            style={{
              background: 'linear-gradient(135deg, #F7931A 0%, #D35400 100%)',
              boxShadow: '0 0 20px rgba(247,147,26,0.3), 0 4px 16px rgba(0,0,0,0.4)',
            }}>
            Connect Wallet
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 pt-20 pb-16">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-black text-text-bright">Your History</h1>
          <Link to="/" className="text-[10px] font-mono uppercase tracking-widest text-text-dim hover:text-text-bright transition-colors">
            ← Markets
          </Link>
        </div>

        {/* Stats cards with gradient borders */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Total Bets", value: totalBets.toString(), gradient: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(99,102,241,0.1) 100%)" },
            { label: "Wagered", value: `$${totalWagered.toFixed(2)}`, gradient: "linear-gradient(135deg, rgba(247,147,26,0.4) 0%, rgba(247,147,26,0.1) 100%)" },
            { label: "Win Rate", value: `${winRate}%`, gradient: "linear-gradient(135deg, rgba(34,197,94,0.4) 0%, rgba(34,197,94,0.1) 100%)" },
            { label: "Net P&L", value: `${netPnL >= 0 ? "+" : ""}$${netPnL.toFixed(2)}`, color: netPnL >= 0 ? "text-up" : "text-down", gradient: netPnL >= 0 ? "linear-gradient(135deg, rgba(34,197,94,0.4) 0%, rgba(34,197,94,0.1) 100%)" : "linear-gradient(135deg, rgba(239,68,68,0.4) 0%, rgba(239,68,68,0.1) 100%)" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl p-[1px]" style={{ background: stat.gradient }}>
              <div className="rounded-xl bg-bg-card/95 p-4 h-full">
                <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-1.5">{stat.label}</div>
                <div className={`text-2xl font-mono font-black ${stat.color || "text-text-bright"}`}>{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Claimable banner */}
        {claimable.length > 0 && (
          <div className="rounded-xl p-[1px] mb-6" style={{ background: 'linear-gradient(90deg, #22C55E 0%, #16A34A 100%)' }}>
            <div className="rounded-xl bg-bg-card/95 p-4 flex items-center justify-between">
              <span className="text-up font-bold text-sm">
                🎉 You have {claimable.length} unclaimed reward{claimable.length > 1 ? "s" : ""}!
              </span>
              {claimable.length > 1 && (
                <button onClick={handleClaimAll} disabled={claimingAll || isPending}
                  className="px-5 py-2 rounded-lg text-white font-bold text-xs uppercase hover:scale-[1.02] transition-all disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 0 12px rgba(34,197,94,0.3)' }}>
                  {claimingAll ? "Claiming..." : "Claim All"}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Bet list */}
        {loading && history.length === 0 ? (
          <div className="text-center text-text-dim py-16 font-mono text-sm">Loading...</div>
        ) : history.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-3">📊</div>
            <p className="text-text-dim font-mono text-sm mb-3">No bets yet</p>
            <Link to="/" className="text-btc text-sm font-bold hover:underline">Place your first bet →</Link>
          </div>
        ) : (
          <div className="space-y-2">
            {history.map((bet: BetRecord) => {
              const asset = feedToAsset(bet.feed_id);
              const tf = feedToTimeframe(bet.feed_id);
              const status = statusLabel(bet);
              const Icon = asset === "BTC" ? BtcIcon : EthIcon;
              const isClaimable = claimable.some((c: BetRecord) => c.round_id === bet.round_id);
              const amountDisplay = (Number(bet.amount) / 1e6).toFixed(2);
              const lockPx = bet.lock_price ? Number(bet.lock_price) / 1e8 : null;
              const closePx = bet.close_price ? Number(bet.close_price) / 1e8 : null;
              const assetColor = asset === "BTC" ? "#F7931A" : "#8B5CF6";

              return (
                <div key={`${bet.round_id}-${bet.user}`}
                  className="rounded-xl p-[1px] transition-all hover:scale-[1.005]"
                  style={{
                    background: isClaimable
                      ? 'linear-gradient(135deg, rgba(34,197,94,0.5) 0%, rgba(34,197,94,0.2) 100%)'
                      : status.text === "Won"
                        ? 'linear-gradient(135deg, rgba(34,197,94,0.2) 0%, rgba(34,197,94,0.05) 100%)'
                        : `linear-gradient(135deg, ${assetColor}15 0%, transparent 100%)`
                  }}>
                  <div className="rounded-xl bg-bg-card/95 p-4 flex items-center gap-4">
                    <Icon size={28} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="font-mono font-bold text-sm text-text-bright">{asset}/{tf}</span>
                        <span className="text-[10px] font-mono text-text-dim">#{bet.round_id}</span>
                        <span className={`text-xs font-mono font-bold ${bet.direction === 0 ? "text-up" : "text-down"}`}>
                          {bet.direction === 0 ? "▲ HIGHER" : "▼ LOWER"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] font-mono text-text-dim">
                        <span className="text-text-bright font-bold">{amountDisplay} USDM</span>
                        {lockPx !== null && <span>Lock: ${lockPx.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>}
                        {closePx !== null && closePx > 0 && (
                          <span className={`font-bold ${closePx > (lockPx || 0) ? "text-up" : closePx < (lockPx || 0) ? "text-down" : "text-text-dim"}`}>
                            → ${closePx.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className={`text-sm font-bold ${status.color}`}>
                        {status.icon} {status.text}
                      </span>
                      {isClaimable && (
                        <button onClick={() => handleClaim(bet.round_id)} disabled={isPending || claimingId === bet.round_id}
                          className="px-4 py-2 rounded-lg text-white font-bold text-xs uppercase hover:scale-[1.02] transition-all disabled:opacity-40"
                          style={{ background: 'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)', boxShadow: '0 0 10px rgba(34,197,94,0.3)' }}>
                          {claimingId === bet.round_id ? "..." : "Claim"}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

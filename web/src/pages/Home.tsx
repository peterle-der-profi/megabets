import { useState, useEffect } from "react";
import { useAccount } from "wagmi";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { SmoothChart } from "@/components/SmoothChart";
import { BtcIcon, EthIcon } from "@/components/CryptoIcons";
import { usePrice, usePriceHistory } from "@/hooks/usePrice";
import { useReferralEarnings } from "@/hooks/useReferral";
import { useCurrentRoundId, useRound } from "@/hooks/useRound";
import { Link } from "react-router-dom";
import { Asset, Timeframe, RoundStatus, feedKey, FeedKey, TIMEFRAMES } from "@/lib/contract";

const TIMEFRAME_LABELS: Record<Timeframe, string> = { "1m": "1 MIN", "5m": "5 MIN", "10m": "10 MIN", "15m": "15 MIN" };

/* ─── §3: HERO PRICE PANEL — integrated, not boxed ─── */
function HeroPriceCard({ asset }: { asset: Asset }) {
  const { price, prevPrice } = usePrice(asset);
  const history = usePriceHistory(asset);
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  return (
    <div className="relative flex-1 min-w-0">
      {/* No individual card border — triptych container handles it */}
      <div className="overflow-hidden h-full bg-transparent">
        <div className="px-4 pt-2 pb-0 flex items-center gap-2">
          {asset === "BTC" ? <BtcIcon size={24} /> : <EthIcon size={24} />}
          <span className="text-[10px] text-text-dim font-semibold uppercase tracking-wider">{asset}/USD</span>
          <span className={`ml-auto text-xs ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-dim"}`}>
            {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
          </span>
        </div>
        <div className="px-4 pb-1">
          <div className="font-mono font-black text-3xl sm:text-4xl truncate text-text-bright leading-[1.1]">
            {formattedPrice}
            <span className={`text-sm ml-1 ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-dim"}`}>
              {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
            </span>
          </div>
        </div>
        {/* Chart — compact, no flex stretch */}
        <div className="relative">
          <SmoothChart prices={history} height={100} accentColor={asset === "BTC" ? "#F7931A" : "#8B5CF6"} />
          <div className="absolute bottom-1 left-3 text-[8px] text-text-dim/30 font-mono">
            Last Round Endprice
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── §1: COUNTDOWN — DOMINANT ELEMENT ─── */
function HeroCountdown() {
  const navigate = useNavigate();
  const btc1m = feedKey("BTC", "1m") as FeedKey;
  const { data: roundId } = useCurrentRoundId(btc1m);
  const { data: round } = useRound(roundId);

  const rawStatus = round ? Number(round.status) : RoundStatus.NONE;
  const isActive = rawStatus === RoundStatus.OPEN || rawStatus === RoundStatus.LOCKED;
  const totalPool = isActive && round ? (Number(round.totalUp) + Number(round.totalDown)) / 1e6 : 0;

  const [countdown, setCountdown] = useState(0);
  useEffect(() => {
    if (!round) return;
    const targetTime = rawStatus === RoundStatus.OPEN
      ? Number(round.lockTime)
      : rawStatus === RoundStatus.LOCKED
        ? Number(round.resolveTime)
        : 0;
    if (!targetTime) { setCountdown(0); return; }
    const tick = () => setCountdown(Math.max(0, targetTime - Math.floor(Date.now() / 1000)));
    tick();
    const id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [round, rawStatus]);

  const mins = Math.floor(countdown / 60);
  const secs = countdown % 60;
  const isUrgent = countdown > 0 && countdown <= 10;
  const isCritical = countdown > 0 && countdown <= 5;

  // §1: Diameter +50% (was 120 → now 170)
  const radius = 170;
  const circumference = 2 * Math.PI * radius;
  const totalDuration = round
    ? (rawStatus === RoundStatus.OPEN
      ? Number(round.lockTime) - Number(round.startTime)
      : rawStatus === RoundStatus.LOCKED
        ? Number(round.resolveTime) - Number(round.lockTime)
        : 60)
    : 60;
  const progress = totalDuration > 0 ? Math.min(1, countdown / totalDuration) : 0;
  const dashOffset = circumference * (1 - progress);

  // §1: pulse class — 1.2s normal, faster under 10s
  const pulseClass = isActive && countdown > 0
    ? (isCritical ? "countdown-pulse-critical" : isUrgent ? "countdown-pulse-fast" : "countdown-pulse")
    : "";

  return (
    <div className="flex flex-col items-center gap-2">
      {/* §1: Ring — 380px container (was 280) */}
      <div className={`relative ${pulseClass}`} style={{ width: 380, height: 380 }}>
        {/* §1: Outer glow radius +30%, opacity +25% */}
        <div className="absolute inset-[-80px] rounded-full" style={{
          background: isActive
            ? `radial-gradient(circle, ${isCritical ? 'rgba(255,50,50,0.40)' : 'rgba(247,147,26,0.38)'} 0%, rgba(233,30,139,0.22) 25%, ${isCritical ? 'rgba(255,50,50,0.08)' : 'rgba(247,147,26,0.06)'} 50%, transparent 68%)`
            : 'radial-gradient(circle, rgba(247,147,26,0.14) 0%, rgba(233,30,139,0.09) 25%, rgba(180,40,60,0.04) 45%, transparent 65%)',
        }} />
        {/* §1: Inner glow +25% */}
        <div className="absolute inset-[-30px] rounded-full" style={{
          background: isActive
            ? `radial-gradient(circle, transparent 36%, ${isCritical ? 'rgba(255,50,50,0.25)' : 'rgba(247,147,26,0.22)'} 48%, rgba(233,30,139,0.10) 58%, transparent 70%)`
            : 'radial-gradient(circle, transparent 40%, rgba(247,147,26,0.07) 52%, rgba(233,30,139,0.03) 62%, transparent 72%)',
        }} />

        {/* §1: SVG — stroke +20% (was 6 → 7) */}
        <svg width="380" height="380" className={`relative z-10 -rotate-90 ${isActive && countdown > 0 ? 'ring-fire' : 'ring-fire-idle'}`}>
          <circle cx="190" cy="190" r={radius} fill="none" stroke="rgba(247,147,26,0.12)" strokeWidth="3" />
          <circle cx="190" cy="190" r={radius + 12} fill="none" stroke="rgba(220,20,120,0.04)" strokeWidth="1" />
          <circle cx="190" cy="190" r={radius - 12} fill="none" stroke="rgba(247,147,26,0.03)" strokeWidth="1" />
          {isActive && countdown > 0 && (
            <circle
              cx="190" cy="190" r={radius}
              fill="none"
              stroke="url(#fireGradient)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.3s ease' }}
            />
          )}
          <defs>
            <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={isCritical ? "#FF2020" : "#FF6B00"} />
              <stop offset="40%" stopColor={isCritical ? "#FF4040" : "#F7931A"} />
              <stop offset="70%" stopColor={isCritical ? "#CC2020" : "#DC1478"} />
              <stop offset="100%" stopColor={isCritical ? "#991010" : "#8B5CF6"} />
            </linearGradient>
          </defs>
        </svg>

        {/* §1: Center — font-size +35% (text-7xl → ~text-8xl/9xl) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {isActive && countdown > 0 ? (
            <>
              <div className={`font-mono font-black leading-none ${isCritical ? "text-down" : isUrgent ? "text-btc" : "text-text-bright"}`}
                style={{
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  textShadow: isCritical ? '0 0 50px rgba(255,50,50,0.9), 0 0 100px rgba(255,50,50,0.3)' : isUrgent ? '0 0 40px rgba(247,147,26,0.7)' : '0 0 25px rgba(255,255,255,0.15)',
                  letterSpacing: '-0.03em',
                }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              {/* §1: Pool inside ring */}
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[10px] font-mono text-text-dim uppercase tracking-[0.15em]">Last Round</span>
                {totalPool > 0 && (
                  <span className="font-mono font-bold text-xl text-btc">${totalPool.toLocaleString()}</span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-text-dim font-mono font-light leading-none" style={{ fontSize: '4rem', letterSpacing: '0.05em' }}>—:—</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-2 tracking-[0.15em]">WAITING</div>
            </>
          )}
        </div>
      </div>

      {/* §5: CTA — heavier, +15% size, gradient, glow under */}
      <button
        onClick={() => navigate("/market/BTC-1m")}
        className="px-16 py-5 rounded-xl text-white font-black text-xl uppercase tracking-wider hover:scale-[1.05] active:scale-[0.98] transition-all relative"
        style={{
          background: 'linear-gradient(180deg, #FFA030 0%, #F7931A 40%, #D35400 100%)',
          boxShadow: '0 0 40px rgba(247,147,26,0.45), 0 8px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.08em',
        }}
      >
        Bet Now!
        {/* §5: Soft glow under button */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3/4 h-6 rounded-full" style={{
          background: 'rgba(247,147,26,0.25)',
          filter: 'blur(20px)',
        }} />
      </button>
    </div>
  );
}

/* ─── §6: Market cards — variation, only ONE glows strongly ─── */
function ActiveMarketCard({ asset, timeframe, featured }: { asset: Asset; timeframe: Timeframe; featured?: boolean }) {
  const fk = feedKey(asset, timeframe);
  const { data: roundId } = useCurrentRoundId(fk);
  const { data: round } = useRound(roundId);
  const { price, prevPrice } = usePrice(asset);

  const status = round ? Number(round.status) : RoundStatus.NONE;
  const isActive = status === RoundStatus.OPEN || status === RoundStatus.LOCKED;
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";

  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  // §6: Only featured card glows strongly
  const borderGradient = featured
    ? "linear-gradient(135deg, #F7931A 0%, #E91E8B 50%, #8B5CF6 100%)"
    : "rgba(255,255,255,0.04)";

  return (
    <Link to={`/market/${asset}-${timeframe}`}>
      <div className="relative rounded-xl p-[1px] h-full" style={{ background: borderGradient }}>
        <div className={`rounded-xl p-4 h-full flex flex-col justify-between transition-colors ${
          featured ? "bg-bg-card/90" : "bg-bg-card/60 hover:bg-bg-card/80"
        }`}>
          <div className="flex items-center gap-2 mb-2">
            {asset === "BTC" ? <BtcIcon size={20} /> : <EthIcon size={20} />}
            <span className="font-semibold text-text-bright text-sm">{asset}/USD</span>
          </div>

          <div className="font-mono font-bold text-2xl mb-3 text-text-bright">
            {formattedPrice}
            <span className={`text-sm ml-1 ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-dim"}`}>
              {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-text-dim">
              {isActive ? (
                <>
                  <span className="text-up">📊</span>
                  <span className="font-semibold text-up">15</span>
                  <span>active</span>
                </>
              ) : (
                <span>Waiting</span>
              )}
            </div>
            {/* §6: Only featured gets vivid pill, others subdued */}
            <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full ${
              featured ? "text-white" : "text-text-secondary"
            }`}
              style={featured ? {
                background: asset === "BTC"
                  ? 'linear-gradient(135deg, #F7931A 0%, #E67E22 100%)'
                  : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
                boxShadow: '0 0 10px rgba(247,147,26,0.3)',
              } : {
                background: 'rgba(255,255,255,0.06)',
              }}>
              Higher or lower?
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Referral ─── */
function ReferralSection() {
  const { address } = useAccount();
  const { earnings, withdraw, isPending } = useReferralEarnings();
  const [copied, setCopied] = useState(false);
  const link = address ? `${window.location.origin}/?ref=${address}` : `${window.location.origin}`;
  const copyLink = () => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-base font-bold text-text-bright">Refer Friends & Earn Forever!</div>
          <div className="text-sm text-text-dim mt-0.5">
            Share your link. Earn <span className="font-semibold text-btc">0.5%</span> on every bet your friends make — forever.
          </div>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {earnings > 0 && (
            <button onClick={withdraw} disabled={isPending}
              className="px-3 py-2 rounded-lg text-up font-mono font-bold text-xs hover:bg-up/10 transition-colors disabled:opacity-40 border border-up/20">
              {isPending ? "..." : `Claim $${earnings.toFixed(2)}`}
            </button>
          )}
          <button onClick={copyLink}
            className="px-6 py-2.5 rounded-lg text-white font-bold text-sm uppercase hover:scale-[1.02] active:scale-[0.98] transition-all"
            style={{
              background: 'linear-gradient(180deg, #FFA030 0%, #D35400 100%)',
              boxShadow: '0 0 12px rgba(247,147,26,0.2)',
              letterSpacing: '0.05em',
            }}>
            {copied ? "✓ Copied" : "Copy Link"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Markets with timeframe tabs ─── */
function MarketsSection() {
  const [selectedTf, setSelectedTf] = useState<Timeframe>("1m");
  const markets: { asset: Asset; featured?: boolean }[] = [
    { asset: "BTC" },
    { asset: "ETH" },
    { asset: "ETH", featured: true },
    { asset: "BTC" },
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-bold text-text-bright">Active Markets</h2>
        {/* Timeframe pills — prominent */}
        <div className="flex items-center gap-1.5">
          {TIMEFRAMES.map((tf) => {
            const active = tf === selectedTf;
            return (
              <button
                key={tf}
                onClick={() => setSelectedTf(tf)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  active ? "text-white" : "text-text-dim hover:text-text-secondary"
                }`}
                style={active ? {
                  background: 'linear-gradient(135deg, #F7931A 0%, #E91E8B 100%)',
                  boxShadow: '0 0 14px rgba(247,147,26,0.35)',
                } : {
                  background: 'rgba(255,255,255,0.04)',
                }}
              >
                {TIMEFRAME_LABELS[tf]}
              </button>
            );
          })}
        </div>
      </div>
      <div className="grid gap-3" style={{ gridTemplateColumns: '1.15fr 1fr 1fr 1.15fr' }}>
        {markets.map((m, i) => (
          <ActiveMarketCard
            key={`${m.asset}-${selectedTf}-${i}`}
            asset={m.asset}
            timeframe={selectedTf}
            featured={m.featured}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── HOME ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* §2: Reduced top padding (pt-16 not pt-20), tighter spacing */}
      <main className="max-w-6xl mx-auto px-4 pt-16 pb-8 flex-1 w-full">
        {/* §7: Headline — +10% size, "No Going Back." heavier, subtitle 70% opacity */}
        <div className="mb-4">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-text-bright tracking-tight leading-[1.05]">
            60 Seconds, One Call.{" "}
            <span className="bg-gradient-to-r from-btc via-[#E91E8B] to-eth bg-clip-text text-transparent font-black" style={{ fontWeight: 900 }}>
              No Going Back.
            </span>
          </h1>
          <p className="text-text-dim text-base sm:text-lg mt-2 opacity-[0.55]">
            60-second crypto predictions. Winners take the pool.
          </p>
        </div>

        {/* Hero triptych — one fluid shape, cards curve around countdown */}
        <div className="rounded-2xl p-[1px] mb-6" style={{
          background: 'linear-gradient(135deg, rgba(247,147,26,0.20) 0%, rgba(220,20,120,0.12) 30%, rgba(139,92,246,0.12) 60%, rgba(247,147,26,0.10) 100%)',
        }}>
          <div className="rounded-2xl bg-bg-card/70 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center">
              <div className="hidden md:block flex-1 py-3 pl-3">
                <HeroPriceCard asset="BTC" />
              </div>
              <div className="flex-shrink-0 flex items-center justify-center py-2" style={{ minWidth: 400 }}>
                <HeroCountdown />
              </div>
              <div className="hidden md:block flex-1 py-3 pr-3">
                <HeroPriceCard asset="ETH" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="grid grid-cols-1 gap-3 md:hidden mb-6">
          <HeroPriceCard asset="BTC" />
          <HeroPriceCard asset="ETH" />
        </div>

        {/* Active Markets with timeframe selector */}
        <MarketsSection />

        {/* How it works — minimal, no glow */}
        <div className="rounded-xl px-6 py-3 mb-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🎯", label: "Pick a market", desc: "USDM only, no minimums" },
              { icon: "📈", label: "Higher or Lower", desc: "Setter locks, countdown starts" },
              { icon: "🔒", label: "Price locks in", desc: "Frozen at market rate" },
              { icon: "💰", label: "Winners split pool", desc: "Chance favors the bold" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-text-bright">{item.label}</div>
                  <div className="text-[11px] text-text-dim mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <ReferralSection />
      </main>

      <footer className="py-3 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-center gap-5 text-[10px] text-text-dim font-mono opacity-50">
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-up" />
            MegaETH
          </span>
          <span>Redstone Oracle</span>
          <span>3% fee</span>
          <span>PVP pools</span>
        </div>
      </footer>
    </div>
  );
}

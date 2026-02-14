import { useState, useEffect, useRef } from "react";
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

/* ─── HERO PRICE PANEL ─── */
function HeroPriceCard({ asset }: { asset: Asset }) {
  const { price, prevPrice } = usePrice(asset);
  const history = usePriceHistory(asset);
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";
  const prevPriceRef = useRef(price);
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    if (price !== prevPriceRef.current && prevPriceRef.current > 0) {
      setFlashClass(price > prevPriceRef.current ? "price-flash-up" : "price-flash-down");
      const t = setTimeout(() => setFlashClass(""), 500);
      prevPriceRef.current = price;
      return () => clearTimeout(t);
    }
    prevPriceRef.current = price;
  }, [price]);

  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  return (
    <div className="relative flex-1 min-w-0">
      <div className="overflow-hidden h-full bg-transparent">
        <div className="px-4 pt-3 pb-0 flex items-center gap-2">
          {asset === "BTC" ? <BtcIcon size={28} /> : <EthIcon size={28} />}
          <span className="text-xs text-text-dim font-semibold uppercase tracking-wider font-mono">{asset}/USD</span>
          <span className={`ml-auto text-xs font-mono ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-dim"}`}>
            {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
          </span>
        </div>
        <div className="px-4 pb-1">
          <div className={`font-mono font-black text-4xl sm:text-5xl truncate text-text-bright leading-[1.1] ${flashClass}`}>
            {formattedPrice}
          </div>
        </div>
        <div className="relative">
          <SmoothChart prices={history} height={110} accentColor={asset === "BTC" ? "#F7931A" : "#8B5CF6"} />
        </div>
      </div>
    </div>
  );
}

/* ─── THE FIERY COUNTDOWN RING ─── */
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

  const pulseClass = isActive && countdown > 0
    ? (isCritical ? "countdown-pulse-critical" : isUrgent ? "countdown-pulse-fast" : "countdown-pulse")
    : "";

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Ring — 380px, DOMINATES */}
      <div className={`relative ${pulseClass}`} style={{ width: 380, height: 380 }}>
        {/* Outer glow */}
        <div className="absolute inset-[-80px] rounded-full" style={{
          background: isActive
            ? `radial-gradient(circle, ${isCritical ? 'rgba(255,50,50,0.45)' : 'rgba(247,147,26,0.40)'} 0%, rgba(233,30,139,0.22) 25%, ${isCritical ? 'rgba(255,50,50,0.08)' : 'rgba(247,147,26,0.06)'} 50%, transparent 68%)`
            : 'radial-gradient(circle, rgba(247,147,26,0.12) 0%, rgba(233,30,139,0.07) 25%, transparent 50%)',
        }} />
        {/* Inner glow ring */}
        <div className="absolute inset-[-30px] rounded-full" style={{
          background: isActive
            ? `radial-gradient(circle, transparent 36%, ${isCritical ? 'rgba(255,50,50,0.25)' : 'rgba(247,147,26,0.22)'} 48%, rgba(233,30,139,0.10) 58%, transparent 70%)`
            : 'radial-gradient(circle, transparent 40%, rgba(247,147,26,0.05) 52%, transparent 62%)',
        }} />

        {/* SVG Ring */}
        <svg width="380" height="380" className={`relative z-10 -rotate-90 ${isActive && countdown > 0 ? 'ring-fire' : 'ring-fire-idle'}`}>
          <circle cx="190" cy="190" r={radius} fill="none" stroke="rgba(247,147,26,0.10)" strokeWidth="3" />
          <circle cx="190" cy="190" r={radius + 12} fill="none" stroke="rgba(220,20,120,0.03)" strokeWidth="1" />
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

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
          {isActive && countdown > 0 ? (
            <>
              <div className={`font-mono font-black leading-none ${isCritical ? "text-down" : isUrgent ? "text-btc" : "text-text-bright"}`}
                style={{
                  fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                  textShadow: isCritical ? '0 0 50px rgba(255,50,50,0.9), 0 0 100px rgba(255,50,50,0.3)' : isUrgent ? '0 0 40px rgba(247,147,26,0.7)' : '0 0 25px rgba(255,255,255,0.12)',
                  letterSpacing: '-0.03em',
                }}>
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </div>
              <div className="mt-2 flex flex-col items-center">
                <span className="text-[10px] font-mono text-text-dim uppercase tracking-[0.15em]">
                  {rawStatus === RoundStatus.OPEN ? "Betting Open" : "Locked"}
                </span>
                {totalPool > 0 && (
                  <span className="font-mono font-bold text-xl text-btc mt-0.5">${totalPool.toLocaleString()}</span>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="text-text-dim font-mono font-light leading-none" style={{ fontSize: '4rem', letterSpacing: '0.05em' }}>—:—</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-2 tracking-[0.15em]">WAITING FOR ROUND</div>
            </>
          )}
        </div>
      </div>

      {/* BET NOW CTA */}
      <button
        onClick={() => navigate("/market/BTC-1m")}
        className="px-20 py-5 rounded-2xl text-white font-black text-2xl uppercase tracking-wider hover:scale-[1.05] active:scale-[0.98] transition-all relative font-display"
        style={{
          background: 'linear-gradient(180deg, #FFA030 0%, #F7931A 40%, #D35400 100%)',
          boxShadow: '0 0 50px rgba(247,147,26,0.5), 0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.25)',
          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
          letterSpacing: '0.1em',
        }}
      >
        BET NOW
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 rounded-full" style={{
          background: 'rgba(247,147,26,0.3)',
          filter: 'blur(24px)',
        }} />
      </button>
    </div>
  );
}

/* ─── MARKET CARD ─── */
function ActiveMarketCard({ asset, timeframe, featured }: { asset: Asset; timeframe: Timeframe; featured?: boolean }) {
  const fk = feedKey(asset, timeframe);
  const { data: roundId } = useCurrentRoundId(fk);
  const { data: round } = useRound(roundId);
  const { price, prevPrice } = usePrice(asset);

  const status = round ? Number(round.status) : RoundStatus.NONE;
  const isActive = status === RoundStatus.OPEN || status === RoundStatus.LOCKED;
  const totalPool = isActive && round ? (Number(round.totalUp) + Number(round.totalDown)) / 1e6 : 0;
  const direction = price > prevPrice ? "up" : price < prevPrice ? "down" : "neutral";

  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  const borderGradient = featured
    ? "linear-gradient(135deg, #F7931A 0%, #E91E8B 50%, #8B5CF6 100%)"
    : "rgba(255,255,255,0.04)";

  return (
    <Link to={`/market/${asset}-${timeframe}`}>
      <div className="relative rounded-xl p-[1px] h-full group" style={{ background: borderGradient }}>
        {featured && (
          <div className="absolute -inset-2 rounded-2xl opacity-40 group-hover:opacity-60 transition-opacity" style={{
            background: 'radial-gradient(circle at center, rgba(247,147,26,0.2) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }} />
        )}
        <div className={`rounded-xl p-5 h-full flex flex-col justify-between transition-all relative ${
          featured ? "bg-bg-card/90" : "bg-bg-card/60 group-hover:bg-bg-card/80"
        }`} style={{
          backdropFilter: 'blur(12px)',
        }}>
          <div className="flex items-center gap-2.5 mb-3">
            {asset === "BTC" ? <BtcIcon size={24} /> : <EthIcon size={24} />}
            <span className="font-semibold text-text-bright text-sm font-display">{asset}/USD</span>
            <span className="text-[10px] text-text-dim font-mono ml-auto uppercase">{TIMEFRAME_LABELS[timeframe]}</span>
          </div>

          <div className="font-mono font-black text-3xl mb-4 text-text-bright">
            {formattedPrice}
            <span className={`text-sm ml-1 ${direction === "up" ? "text-up" : direction === "down" ? "text-down" : "text-text-dim"}`}>
              {direction === "up" ? "▲" : direction === "down" ? "▼" : ""}
            </span>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-[10px] text-text-dim font-mono">
              {isActive ? (
                <>
                  <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
                  <span className="text-up font-semibold">Live</span>
                  {totalPool > 0 && <span className="ml-1">{totalPool.toFixed(0)} USDM</span>}
                </>
              ) : (
                <span>Waiting</span>
              )}
            </div>
            <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full font-display ${
              featured ? "text-white" : "text-text-secondary"
            }`} style={featured ? {
              background: asset === "BTC"
                ? 'linear-gradient(135deg, #F7931A 0%, #E67E22 100%)'
                : 'linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)',
              boxShadow: '0 0 10px rgba(247,147,26,0.3)',
            } : {
              background: 'rgba(255,255,255,0.05)',
            }}>
              Predict →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── REFERRAL BAR ─── */
function ReferralBar() {
  const { address } = useAccount();
  const { earnings, withdraw, isPending } = useReferralEarnings();
  const [copied, setCopied] = useState(false);
  const link = address ? `${window.location.origin}/?ref=${address}` : `${window.location.origin}`;
  const copyLink = () => { navigator.clipboard.writeText(link); setCopied(true); setTimeout(() => setCopied(false), 2000); };

  return (
    <div className="rounded-xl" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)' }}>
      <div className="px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="text-sm font-bold text-text-bright font-display">Refer & Earn Forever</div>
          <div className="text-xs text-text-dim mt-0.5 font-body">
            Earn <span className="font-semibold text-btc">0.5%</span> on every bet your referrals make.
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
            className="px-5 py-2 rounded-lg text-white font-bold text-xs uppercase hover:scale-[1.02] active:scale-[0.98] transition-all font-display"
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

/* ─── MARKETS WITH TIMEFRAME AS HERO ─── */
const TF_META: Record<Timeframe, { label: string; desc: string; icon: string }> = {
  "1m": { label: "1 MIN", desc: "Lightning fast", icon: "⚡" },
  "5m": { label: "5 MIN", desc: "Quick reads", icon: "🔥" },
  "10m": { label: "10 MIN", desc: "Steady calls", icon: "📊" },
  "15m": { label: "15 MIN", desc: "Big picture", icon: "🎯" },
};

function MarketsSection() {
  const [selectedTf, setSelectedTf] = useState<Timeframe>("1m");

  return (
    <div className="mb-8 anim-fade-up anim-delay-4">
      <h2 className="text-xl font-bold text-text-bright font-display mb-4">Pick Your Speed</h2>
      
      {/* Timeframe selector — BIG, prominent cards */}
      <div className="grid grid-cols-4 gap-2 mb-5">
        {TIMEFRAMES.map((tf) => {
          const active = tf === selectedTf;
          const meta = TF_META[tf];
          return (
            <button
              key={tf}
              onClick={() => setSelectedTf(tf)}
              className={`relative rounded-xl p-3 text-left transition-all group ${
                active ? '' : 'hover:scale-[1.02]'
              }`}
              style={active ? {
                background: 'linear-gradient(135deg, rgba(247,147,26,0.15) 0%, rgba(220,20,120,0.08) 100%)',
                border: '1px solid rgba(247,147,26,0.3)',
                boxShadow: '0 0 24px rgba(247,147,26,0.15), inset 0 0 20px rgba(247,147,26,0.05)',
              } : {
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base">{meta.icon}</span>
                <span className={`font-display font-bold text-lg tracking-tight ${
                  active ? 'text-btc' : 'text-text-secondary group-hover:text-text-bright'
                }`}>
                  {meta.label}
                </span>
              </div>
              <span className={`text-[10px] font-mono uppercase tracking-wider ${
                active ? 'text-btc/70' : 'text-text-dim'
              }`}>
                {meta.desc}
              </span>
              {active && (
                <div className="absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-8 h-[2px] rounded-full bg-btc" />
              )}
            </button>
          );
        })}
      </div>

      {/* Market cards for selected timeframe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ActiveMarketCard asset="BTC" timeframe={selectedTf} featured />
        <ActiveMarketCard asset="ETH" timeframe={selectedTf} />
      </div>
    </div>
  );
}

/* ─── HOME PAGE ─── */
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-8 flex-1 w-full">
        {/* Hero headline — staggered reveal */}
        <div className="mb-6 anim-fade-up">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-text-bright tracking-tight leading-[1.05] font-display">
            60 Seconds. One Call.{" "}
            <span className="text-fire" style={{ fontWeight: 900 }}>
              No Going Back.
            </span>
          </h1>
          <p className="text-text-dim text-lg sm:text-xl mt-3 opacity-60 font-body max-w-xl">
            Predict crypto prices. Winners take the pool. 60-second rounds on MegaETH.
          </p>
        </div>

        {/* Triptych: BTC | COUNTDOWN | ETH */}
        <div className="rounded-2xl p-[1px] mb-8 anim-fade-up anim-delay-1" style={{
          background: 'linear-gradient(135deg, rgba(247,147,26,0.18) 0%, rgba(220,20,120,0.10) 30%, rgba(139,92,246,0.10) 60%, rgba(247,147,26,0.08) 100%)',
        }}>
          <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(12,16,32,0.7)', backdropFilter: 'blur(16px)' }}>
            <div className="flex items-center">
              <div className="hidden md:block flex-1 py-4 pl-4">
                <HeroPriceCard asset="BTC" />
              </div>
              <div className="flex-shrink-0 flex items-center justify-center py-4" style={{ minWidth: 420 }}>
                <HeroCountdown />
              </div>
              <div className="hidden md:block flex-1 py-4 pr-4">
                <HeroPriceCard asset="ETH" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile price cards */}
        <div className="grid grid-cols-2 gap-3 md:hidden mb-6 anim-fade-up anim-delay-2">
          <div className="rounded-xl p-[1px]" style={{ background: 'linear-gradient(135deg, rgba(247,147,26,0.2) 0%, transparent 100%)' }}>
            <div className="rounded-xl bg-bg-card/80 p-3">
              <HeroPriceCard asset="BTC" />
            </div>
          </div>
          <div className="rounded-xl p-[1px]" style={{ background: 'linear-gradient(135deg, rgba(139,92,246,0.2) 0%, transparent 100%)' }}>
            <div className="rounded-xl bg-bg-card/80 p-3">
              <HeroPriceCard asset="ETH" />
            </div>
          </div>
        </div>

        {/* Markets */}
        <MarketsSection />

        {/* How it works — compact strip */}
        <div className="rounded-xl px-6 py-3.5 mb-5 anim-fade-up anim-delay-5" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)' }}>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: "🎯", label: "Pick a market", desc: "BTC or ETH, any timeframe" },
              { icon: "📈", label: "Higher or Lower", desc: "Place your prediction" },
              { icon: "🔒", label: "Price locks in", desc: "Countdown starts, no going back" },
              { icon: "💰", label: "Winners take all", desc: "Pool split minus 3% rake" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="text-lg flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-xs font-bold text-text-bright font-display">{item.label}</div>
                  <div className="text-[11px] text-text-dim mt-0.5 font-body">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Referral */}
        <ReferralBar />
      </main>

      {/* Footer */}
      <footer className="py-3 mt-auto" style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-6 text-[10px] text-text-dim font-mono opacity-50">
          <span className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-up" />
            MegaETH
          </span>
          <span>Redstone Oracle</span>
          <span>3% rake</span>
          <span>PVP pools</span>
        </div>
      </footer>
    </div>
  );
}

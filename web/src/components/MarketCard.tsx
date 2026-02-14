import { Asset, Timeframe, feedKey, RoundStatus } from "@/lib/contract";
import { useCurrentRoundId, useRound } from "@/hooks/useRound";
import { Link } from "react-router-dom";
import { BtcIcon, EthIcon } from "./CryptoIcons";
import { usePrice } from "@/hooks/usePrice";

interface Props {
  asset: Asset;
  timeframe: Timeframe;
}

const TIMEFRAME_LABELS: Record<Timeframe, string> = {
  "1m": "1 Min",
  "5m": "5 Min",
  "10m": "10 Min",
  "15m": "15 Min",
};

export function MarketCard({ asset, timeframe }: Props) {
  const fk = feedKey(asset, timeframe);
  const { data: roundId } = useCurrentRoundId(fk);
  const { data: round } = useRound(roundId);
  const { price } = usePrice(asset);

  const status = round ? Number(round.status) : RoundStatus.NONE;
  const isActive = status === RoundStatus.OPEN || status === RoundStatus.LOCKED;
  const isLive = status === RoundStatus.OPEN;
  const totalPool = isActive && round ? (Number(round.totalUp) + Number(round.totalDown)) / 1e6 : 0;

  const formattedPrice = price > 0
    ? `$${price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : "—";

  // Gradient backgrounds per asset
  const gradientStyle = asset === "BTC"
    ? { background: 'linear-gradient(135deg, rgba(247,147,26,0.12) 0%, rgba(14,19,36,1) 70%)' }
    : { background: 'linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(14,19,36,1) 70%)' };

  const glowClass = isLive ? (asset === "BTC" ? "glow-btc" : "glow-eth") : "";
  const borderClass = isLive
    ? (asset === "BTC" ? "border-btc/25" : "border-eth/25")
    : "border-border";

  return (
    <Link to={`/market/${asset}-${timeframe}`}>
      <div
        className={`rounded-xl p-4 cursor-pointer card-dark ${glowClass} ${borderClass}`}
        style={gradientStyle}
      >
        <div className="flex items-center gap-2.5 mb-2">
          {asset === "BTC" ? <BtcIcon size={24} /> : <EthIcon size={24} />}
          <div>
            <div className="font-semibold text-text-bright text-sm">{asset}/USD</div>
            <div className="text-[10px] text-text-dim font-mono uppercase tracking-widest">{TIMEFRAME_LABELS[timeframe]}</div>
          </div>
        </div>

        {/* Price */}
        <div className="font-mono font-bold text-2xl text-text-bright mb-2 truncate">
          {formattedPrice}
        </div>

        <div className="flex items-center justify-between">
          {isLive ? (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-up pulse-live" />
              <span className="text-[10px] font-semibold text-up">Live</span>
              {totalPool > 0 && <span className="text-[10px] text-text-dim ml-1">{totalPool.toFixed(0)} USDM</span>}
            </div>
          ) : status === RoundStatus.LOCKED ? (
            <span className="text-[10px] text-accent font-semibold">Locked{totalPool > 0 ? ` · ${totalPool.toFixed(0)}` : ""}</span>
          ) : (
            <span className="text-[10px] text-text-dim">Waiting</span>
          )}
          <span className={`text-[10px] font-bold uppercase tracking-widest ${asset === "BTC" ? "text-btc" : "text-eth"}`}>
            Higher or lower?
          </span>
        </div>
      </div>
    </Link>
  );
}

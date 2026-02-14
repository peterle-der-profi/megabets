import { useEffect, useRef, useState, useCallback } from "react";
import { usePrice } from "@/hooks/usePrice";

interface Props {
  feed: "BTC" | "ETH";
  compact?: boolean;
}

const MAX_POINTS = 120;

export function MiniChart({ feed, compact = false }: Props) {
  const { price } = usePrice(feed);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<number[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [priceChange, setPriceChange] = useState(0);

  useEffect(() => {
    if (price <= 0) return;
    const pts = pointsRef.current;
    if (pts.length === 0 || pts[pts.length - 1] !== price) {
      pts.push(price);
      if (pts.length > MAX_POINTS) pts.shift();
    }
    setCurrentPrice(price);
    if (pts.length >= 2) {
      setPriceChange(((price - pts[0]) / pts[0]) * 100);
    }
  }, [price]);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const w = rect.width;
    const h = rect.height;
    const pts = pointsRef.current;

    ctx.clearRect(0, 0, w, h);
    if (pts.length < 2) return;

    const min = Math.min(...pts);
    const max = Math.max(...pts);
    const range = max - min || 1;
    const padding = compact ? 2 : 8;
    const chartH = h - padding * 2;

    const isUp = pts[pts.length - 1] >= pts[0];
    const lineColor = isUp ? "#00ff88" : "#ff3366";

    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = compact ? 1.5 : 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    for (let i = 0; i < pts.length; i++) {
      const x = (i / (MAX_POINTS - 1)) * w;
      const y = padding + chartH - ((pts[i] - min) / range) * chartH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.lineTo(((pts.length - 1) / (MAX_POINTS - 1)) * w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    ctx.fillStyle = isUp ? "rgba(0, 255, 136, 0.04)" : "rgba(255, 51, 102, 0.04)";
    ctx.fill();

    if (!compact) {
      const lastX = ((pts.length - 1) / (MAX_POINTS - 1)) * w;
      const lastY = padding + chartH - ((pts[pts.length - 1] - min) / range) * chartH;
      ctx.beginPath();
      ctx.arc(lastX, lastY, 3, 0, Math.PI * 2);
      ctx.fillStyle = lineColor;
      ctx.fill();
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6, 0, Math.PI * 2);
      ctx.fillStyle = isUp ? "rgba(0, 255, 136, 0.2)" : "rgba(255, 51, 102, 0.2)";
      ctx.fill();
    }
  }, [compact]);

  useEffect(() => {
    draw();
    const id = setInterval(draw, 500);
    return () => clearInterval(id);
  }, [draw, currentPrice]);

  if (compact) {
    return (
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    );
  }

  const isUp = priceChange >= 0;
  const icon = feed === "BTC" ? "₿" : "Ξ";

  return (
    <div className="rounded-lg border border-border bg-bg-card overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono">{icon}</span>
          <span className="text-[10px] font-mono font-semibold text-text-dim uppercase tracking-widest">{feed}/USD</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono font-bold text-text-bright">
            ${currentPrice > 0 ? currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : "—"}
          </span>
          {pointsRef.current.length >= 2 && (
            <span className={`text-[10px] font-mono font-semibold ${isUp ? "text-up" : "text-down"}`}>
              {isUp ? "▲" : "▼"} {Math.abs(priceChange).toFixed(3)}%
            </span>
          )}
        </div>
      </div>
      <canvas
        ref={canvasRef}
        className="w-full"
        style={{ height: 80, display: "block" }}
      />
    </div>
  );
}

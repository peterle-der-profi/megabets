import { useEffect, useRef, useCallback } from "react";

interface Props {
  prices: number[];
  lockPrice?: number;
  height?: number;
  accentColor?: string;
}

export function SmoothChart({ prices, lockPrice, height = 300, accentColor }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const targetRef = useRef<number[]>([]);
  const renderedRef = useRef<number[]>([]);
  const lastTimeRef = useRef(0);
  const scaleMinRef = useRef<number | null>(null);
  const scaleMaxRef = useRef<number | null>(null);
  // For tip extrapolation — track velocity of the last data point
  const lastTargetTipRef = useRef<number>(0);
  const tipVelocityRef = useRef<number>(0);
  const tipExtraRef = useRef<number>(0); // extrapolated offset beyond last rendered point

  // Update target every render
  targetRef.current = [...prices];
  if (renderedRef.current.length === 0 && prices.length > 0) {
    renderedRef.current = [...prices];
  }

  // Track velocity when target tip changes
  const newTip = prices.length > 0 ? prices[prices.length - 1] : 0;
  if (newTip !== lastTargetTipRef.current && lastTargetTipRef.current !== 0) {
    tipVelocityRef.current = newTip - lastTargetTipRef.current;
    tipExtraRef.current = 0; // reset extrapolation on new data
  }
  lastTargetTipRef.current = newTip;

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const target = targetRef.current;
    const rendered = renderedRef.current;
    const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = timestamp;
    const lerpFactor = Math.min(1, dt * 10); // slightly slower lerp for smoother feel

    while (rendered.length < target.length) {
      rendered.push(target[rendered.length]);
    }
    if (rendered.length > target.length) {
      rendered.splice(0, rendered.length - target.length);
    }

    for (let i = 0; i < rendered.length; i++) {
      rendered[i] += (target[i] - rendered[i]) * lerpFactor;
    }

    // Extrapolate tip: drift in the direction of last velocity, decay over time
    const velocity = tipVelocityRef.current;
    const extraTarget = velocity * 0.3; // drift up to 30% of last move
    tipExtraRef.current += (extraTarget - tipExtraRef.current) * Math.min(1, dt * 2);
    // Decay extrapolation back to 0 slowly
    tipExtraRef.current *= Math.max(0, 1 - dt * 1.5);

    ctx.clearRect(0, 0, w, h);

    if (rendered.length < 2) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const padding = { top: 16, bottom: 16, left: 0, right: 64 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    let targetMin = Math.min(...rendered);
    let targetMax = Math.max(...rendered);
    if (lockPrice !== undefined) {
      targetMin = Math.min(targetMin, lockPrice);
      targetMax = Math.max(targetMax, lockPrice);
    }
    const range = targetMax - targetMin || 1;
    const padRange = range * 0.05;
    const targetEffMin = targetMin - padRange;
    const targetEffMax = targetMax + padRange;

    // Smooth the scale to prevent pulsing
    const scaleLerp = Math.min(1, dt * 3);
    if (scaleMinRef.current === null) {
      scaleMinRef.current = targetEffMin;
      scaleMaxRef.current = targetEffMax;
    } else {
      scaleMinRef.current += (targetEffMin - scaleMinRef.current) * scaleLerp;
      scaleMaxRef.current! += (targetEffMax - scaleMaxRef.current!) * scaleLerp;
    }
    const effectiveMin = scaleMinRef.current;
    const effectiveMax = scaleMaxRef.current!;
    const effectiveRange = effectiveMax - effectiveMin || 1;

    const toX = (i: number) => padding.left + (i / Math.max(rendered.length - 1, 1)) * chartW;
    const toY = (v: number) => padding.top + chartH - ((v - effectiveMin) / effectiveRange) * chartH;

    // Grid lines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const val = effectiveMin + (effectiveRange * i) / steps;
      const y = toY(val);
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
    }

    // Lock price line
    if (lockPrice !== undefined && lockPrice > 0) {
      const ly = toY(lockPrice);
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "rgba(148, 163, 184, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, ly);
      ctx.lineTo(w - padding.right, ly);
      ctx.stroke();
      ctx.restore();

      ctx.fillStyle = "#94A3B8";
      ctx.font = "10px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Lock $${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, w - padding.right + 4, ly - 4);
    }

    const tipValue = rendered[rendered.length - 1] + tipExtraRef.current;
    const isUp = tipValue >= rendered[0];
    const lineColor = accentColor || (isUp ? "#22c55e" : "#ef4444");

    // Price line — draw all points, then extend a tiny segment to the extrapolated tip
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    ctx.moveTo(toX(0), toY(rendered[0]));
    for (let i = 1; i < rendered.length; i++) {
      const prevX = toX(i - 1);
      const prevY = toY(rendered[i - 1]);
      const currX = toX(i);
      const currY = toY(rendered[i]);
      const midX = (prevX + currX) / 2;
      const midY = (prevY + currY) / 2;
      ctx.quadraticCurveTo(prevX, prevY, midX, midY);
    }

    // Extend line slightly beyond last point toward extrapolated tip
    const lastX = toX(rendered.length - 1);
    const lastY = toY(rendered[rendered.length - 1]);
    const tipY = toY(tipValue);
    // Small horizontal extension (8px) to show movement
    const extendX = Math.min(lastX + 8, w - padding.right);
    ctx.quadraticCurveTo(lastX, lastY, extendX, tipY);
    ctx.stroke();

    // Fill gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    if (accentColor) {
      // Parse hex to rgb for gradient
      const r = parseInt(accentColor.slice(1, 3), 16);
      const g = parseInt(accentColor.slice(3, 5), 16);
      const b = parseInt(accentColor.slice(5, 7), 16);
      gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.18)`);
    } else {
      gradient.addColorStop(0, isUp ? "rgba(34, 197, 94, 0.18)" : "rgba(239, 68, 68, 0.18)");
    }
    gradient.addColorStop(1, "rgba(11, 15, 26, 0)");

    ctx.lineTo(extendX, h - padding.bottom);
    ctx.lineTo(toX(0), h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Tip dot — at the extrapolated position
    const dotX = extendX;
    const dotY = tipY;

    // Glow
    ctx.beginPath();
    ctx.arc(dotX, dotY, 6, 0, Math.PI * 2);
    if (accentColor) {
      const r = parseInt(accentColor.slice(1, 3), 16);
      const g = parseInt(accentColor.slice(3, 5), 16);
      const b = parseInt(accentColor.slice(5, 7), 16);
      ctx.fillStyle = `rgba(${r}, ${g}, ${b}, 0.15)`;
    } else {
      ctx.fillStyle = isUp ? "rgba(34, 197, 94, 0.15)" : "rgba(239, 68, 68, 0.15)";
    }
    ctx.fill();

    // Solid dot
    ctx.beginPath();
    ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();

    // Current price label — show the actual (non-extrapolated) price
    const currentPrice = rendered[rendered.length - 1];
    ctx.fillStyle = lineColor;
    ctx.font = "bold 11px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(
      `$${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      w - padding.right + 4,
      dotY + 4
    );

    // Y-axis labels
    ctx.fillStyle = "#64748B";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    for (let i = 0; i <= steps; i++) {
      const val = effectiveMin + (effectiveRange * i) / steps;
      const y = toY(val);
      ctx.fillText(`$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, w - 2, y + 3);
    }

    animRef.current = requestAnimationFrame(draw);
  }, [lockPrice, accentColor]);

  useEffect(() => {
    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height, display: "block" }}
    />
  );
}

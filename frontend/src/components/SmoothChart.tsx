"use client";

import { useEffect, useRef, useCallback } from "react";

interface Props {
  prices: number[];
  lockPrice?: number;
  height?: number;
}

export function SmoothChart({ prices, lockPrice, height = 300 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const targetRef = useRef<number[]>([]);
  const renderedRef = useRef<number[]>([]);
  const lastTimeRef = useRef(0);

  // Keep target in sync
  useEffect(() => {
    targetRef.current = [...prices];
    if (renderedRef.current.length === 0 && prices.length > 0) {
      renderedRef.current = [...prices];
    }
  }, [prices]);

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

    // Lerp rendered toward target
    const target = targetRef.current;
    const rendered = renderedRef.current;
    const dt = lastTimeRef.current ? (timestamp - lastTimeRef.current) / 1000 : 0.016;
    lastTimeRef.current = timestamp;
    const lerpFactor = Math.min(1, dt * 8); // smooth ~8fps lerp rate

    // Sync lengths
    while (rendered.length < target.length) {
      rendered.push(target[rendered.length]);
    }
    if (rendered.length > target.length) {
      rendered.splice(0, rendered.length - target.length);
    }

    for (let i = 0; i < rendered.length; i++) {
      rendered[i] += (target[i] - rendered[i]) * lerpFactor;
    }

    ctx.clearRect(0, 0, w, h);

    if (rendered.length < 2) {
      animRef.current = requestAnimationFrame(draw);
      return;
    }

    const padding = { top: 20, bottom: 20, left: 0, right: 60 };
    const chartW = w - padding.left - padding.right;
    const chartH = h - padding.top - padding.bottom;

    let min = Math.min(...rendered);
    let max = Math.max(...rendered);
    if (lockPrice !== undefined) {
      min = Math.min(min, lockPrice);
      max = Math.max(max, lockPrice);
    }
    const range = max - min || 1;
    // Add 5% padding to range
    const padRange = range * 0.05;
    const effectiveMin = min - padRange;
    const effectiveMax = max + padRange;
    const effectiveRange = effectiveMax - effectiveMin;

    const toX = (i: number) => padding.left + (i / Math.max(rendered.length - 1, 1)) * chartW;
    const toY = (v: number) => padding.top + chartH - ((v - effectiveMin) / effectiveRange) * chartH;

    // Draw lock price dashed line (target price)
    if (lockPrice !== undefined && lockPrice > 0) {
      const ly = toY(lockPrice);
      ctx.save();
      ctx.setLineDash([6, 4]);
      ctx.strokeStyle = "rgba(124, 77, 255, 0.5)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(padding.left, ly);
      ctx.lineTo(w - padding.right, ly);
      ctx.stroke();
      ctx.restore();

      // Label
      ctx.fillStyle = "rgba(124, 77, 255, 0.8)";
      ctx.font = "11px 'JetBrains Mono', monospace";
      ctx.textAlign = "left";
      ctx.fillText(`Target $${lockPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, w - padding.right + 4, ly + 4);
    }

    // Determine color
    const isUp = rendered[rendered.length - 1] >= rendered[0];
    const lineColor = isUp ? "#00e676" : "#ff1744";
    const glowColor = isUp ? "rgba(0, 230, 118, 0.3)" : "rgba(255, 23, 68, 0.3)";

    // Draw smooth line using quadratic curves
    ctx.beginPath();
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 2.5;
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
    // Final segment
    ctx.lineTo(toX(rendered.length - 1), toY(rendered[rendered.length - 1]));
    ctx.stroke();

    // Gradient fill
    const gradient = ctx.createLinearGradient(0, padding.top, 0, h - padding.bottom);
    gradient.addColorStop(0, isUp ? "rgba(0, 230, 118, 0.12)" : "rgba(255, 23, 68, 0.12)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.lineTo(toX(rendered.length - 1), h - padding.bottom);
    ctx.lineTo(toX(0), h - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Glow dot at tip
    const tipX = toX(rendered.length - 1);
    const tipY = toY(rendered[rendered.length - 1]);

    // Outer glow
    ctx.beginPath();
    ctx.arc(tipX, tipY, 10, 0, Math.PI * 2);
    ctx.fillStyle = glowColor;
    ctx.fill();

    // Inner dot
    ctx.beginPath();
    ctx.arc(tipX, tipY, 4, 0, Math.PI * 2);
    ctx.fillStyle = lineColor;
    ctx.fill();

    // Current price label at tip
    const currentPrice = rendered[rendered.length - 1];
    ctx.fillStyle = lineColor;
    ctx.font = "bold 12px 'JetBrains Mono', monospace";
    ctx.textAlign = "left";
    ctx.fillText(
      `$${currentPrice.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      w - padding.right + 4,
      tipY + 4
    );

    // Y-axis labels (right side, a few price levels)
    ctx.fillStyle = "rgba(107, 107, 138, 0.6)";
    ctx.font = "10px 'JetBrains Mono', monospace";
    ctx.textAlign = "right";
    const steps = 4;
    for (let i = 0; i <= steps; i++) {
      const val = effectiveMin + (effectiveRange * i) / steps;
      const y = toY(val);
      ctx.fillText(`$${val.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`, w - 2, y + 3);
      // Subtle grid line
      ctx.save();
      ctx.strokeStyle = "rgba(30, 30, 46, 0.5)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(w - padding.right, y);
      ctx.stroke();
      ctx.restore();
    }

    animRef.current = requestAnimationFrame(draw);
  }, [lockPrice]);

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

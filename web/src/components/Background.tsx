import { useEffect, useRef } from "react";

/** Animated nebula background + floating particles */
export function Background() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;

    const colors = [
      "rgba(247,147,26,0.6)",
      "rgba(255,100,20,0.5)",
      "rgba(220,20,120,0.4)",
      "rgba(167,139,250,0.4)",
      "rgba(255,200,80,0.3)",
      "rgba(255,60,20,0.4)",
    ];

    function spawnParticle() {
      if (!container) return;
      const p = document.createElement("div");
      p.className = "particle";
      const size = 1 + Math.random() * 3;
      const x = Math.random() * 100;
      const duration = 8 + Math.random() * 12;
      const delay = Math.random() * 5;
      const color = colors[Math.floor(Math.random() * colors.length)];

      Object.assign(p.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${x}%`,
        background: color,
        boxShadow: `0 0 ${size * 3}px ${color}`,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
      });

      container.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, (duration + delay) * 1000);
    }

    // Spawn initial batch
    for (let i = 0; i < 15; i++) {
      setTimeout(() => spawnParticle(), i * 200);
    }

    // Keep spawning
    const interval = setInterval(spawnParticle, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="nebula-bg" />
      <div ref={particlesRef} className="particles" />
    </>
  );
}

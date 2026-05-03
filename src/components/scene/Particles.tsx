import { useEffect, useState } from "react";

interface ParticlesProps {
  x: number;
  y: number;
  trigger: number | null;
}

interface Particle {
  id: number;
  angle: number;
  dist: number;
  color: string;
}

const PALETTE = ["var(--xp-gold)", "var(--moon-glow)", "var(--accent-cyan)"];

export function Particles({ x, y, trigger }: ParticlesProps) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    if (trigger == null) return;
    const newP: Particle[] = Array.from({ length: 12 }, (_, i) => ({
      id: trigger + i,
      angle: (i / 12) * Math.PI * 2,
      dist: 30 + (i % 3) * 10,
      color: PALETTE[i % PALETTE.length],
    }));
    setParticles(newP);
    const t = window.setTimeout(() => setParticles([]), 800);
    return () => window.clearTimeout(t);
  }, [trigger]);

  if (particles.length === 0) return null;

  return (
    <div
      className="absolute pointer-events-none z-[8]"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            width: 4,
            height: 4,
            background: p.color,
            transform: `translate(${Math.cos(p.angle) * p.dist}px, ${Math.sin(p.angle) * p.dist}px)`,
            animation: "particle-up 0.8s ease-out forwards",
            boxShadow: `0 0 4px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
}

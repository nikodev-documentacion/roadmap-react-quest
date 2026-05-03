import { useMemo } from "react";

interface KitsuneProps {
  size?: number;
  facing?: "left" | "right";
  state?: "idle" | "walk" | "victory";
}

/**
 * Kitsune - original ninja-fox character (NOT a copy of any branded character).
 * Pure SVG so it scales crisply with `image-rendering: pixelated`.
 */
export function Kitsune({ size = 56, facing = "right", state = "idle" }: KitsuneProps) {
  const flip = facing === "left" ? "scaleX(-1)" : "scaleX(1)";
  const wrapperAnimation =
    state === "victory"
      ? "kitsune-victory 0.7s ease-in-out infinite"
      : state === "walk"
      ? "fox-walk 0.3s steps(2) infinite"
      : "float 2s ease-in-out infinite";
  return (
    <div
      style={{
        width: size,
        height: size,
        transform: flip,
        transformOrigin: "center",
        position: "relative",
        animation: wrapperAnimation,
        filter:
          state === "victory"
            ? "drop-shadow(0 0 12px var(--xp-gold)) drop-shadow(0 0 4px var(--moon-glow))"
            : undefined,
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated", overflow: "visible" }}
      >
        {/* Victory aura - radiating sparkles */}
        {state === "victory" && (
          <g style={{ animation: "kitsune-sparkle 1s linear infinite" }}>
            <rect x="4" y="6" width="1" height="1" fill="var(--xp-gold)" />
            <rect x="28" y="4" width="1" height="1" fill="var(--moon-glow)" />
            <rect x="30" y="14" width="1" height="1" fill="var(--xp-gold)" />
            <rect x="2" y="16" width="1" height="1" fill="var(--moon-glow)" />
            <rect x="5" y="2" width="2" height="1" fill="var(--xp-gold)" />
            <rect x="26" y="22" width="1" height="1" fill="var(--moon-glow)" />
          </g>
        )}
        {/* Tail */}
        <g style={{ transformOrigin: "10px 22px", animation: "fox-tail 0.6s ease-in-out infinite" }}>
          <rect x="2" y="18" width="2" height="2" fill="var(--fox-orange)" />
          <rect x="4" y="17" width="2" height="2" fill="var(--fox-orange)" />
          <rect x="6" y="18" width="2" height="2" fill="var(--fox-orange)" />
          <rect x="2" y="20" width="2" height="2" fill="var(--fox-cream)" />
          <rect x="4" y="19" width="2" height="2" fill="var(--fox-orange)" />
          <rect x="6" y="20" width="2" height="2" fill="var(--fox-orange)" />
          <rect x="3" y="16" width="2" height="2" fill="var(--fox-cream)" />
        </g>

        {/* Body */}
        <rect x="9" y="17" width="12" height="6" fill="var(--fox-orange)" />
        <rect x="9" y="22" width="12" height="2" fill="var(--fox-dark)" />
        <rect x="11" y="20" width="8" height="2" fill="var(--fox-cream)" />

        {/* Legs */}
        <rect x="10" y="24" width="2" height="3" fill="var(--fox-dark)" />
        <rect x="14" y="24" width="2" height="3" fill="var(--fox-dark)" />
        <rect x="18" y="24" width="2" height="3" fill="var(--fox-dark)" />
        <rect x="10" y="27" width="2" height="1" fill="#000" />
        <rect x="14" y="27" width="2" height="1" fill="#000" />
        <rect x="18" y="27" width="2" height="1" fill="#000" />

        {/* Head */}
        <rect x="18" y="10" width="9" height="8" fill="var(--fox-orange)" />
        <rect x="20" y="14" width="6" height="3" fill="var(--fox-cream)" />
        <rect x="25" y="14" width="3" height="2" fill="var(--fox-cream)" />
        <rect x="27" y="13" width="1" height="1" fill="#000" />

        {/* Ears */}
        <rect x="18" y="8" width="2" height="3" fill="var(--fox-orange)" />
        <rect x="19" y="9" width="1" height="1" fill="var(--fox-cream)" />
        <rect x="24" y="8" width="2" height="3" fill="var(--fox-orange)" />
        <rect x="24" y="9" width="1" height="1" fill="var(--fox-cream)" />

        {/* Ninja headband */}
        <rect x="17" y="11" width="10" height="2" fill="#c84040" />
        <rect x="17" y="12" width="10" height="1" fill="#8a2020" />
        <rect x="16" y="11" width="1" height="3" fill="#c84040" />
        <rect x="15" y="13" width="1" height="2" fill="#c84040" />

        {/* Eye */}
        <rect x="22" y="13" width="2" height="1" fill="#000" />
        <rect x="23" y="13" width="1" height="1" fill="var(--accent-cyan)" style={{ animation: "blink 4s infinite" }} />

        {/* Mask */}
        <rect x="20" y="15" width="6" height="2" fill="var(--night-2)" opacity="0.6" />
      </svg>
    </div>
  );
}

interface PixelTreeProps {
  x: string;
  scale?: number;
  dim?: boolean;
}

export function PixelTree({ x, scale = 1, dim = false }: PixelTreeProps) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        bottom: 0,
        transform: `scale(${scale})`,
        transformOrigin: "bottom center",
        filter: dim ? "brightness(0.5)" : "none",
      }}
    >
      <svg viewBox="0 0 24 40" width="48" height="80" shapeRendering="crispEdges">
        <rect x="10" y="28" width="4" height="12" fill="var(--trunk)" />
        <rect x="10" y="28" width="1" height="12" fill="#2a1810" />
        <rect x="6" y="20" width="12" height="10" fill="var(--leaf-1)" />
        <rect x="4" y="14" width="16" height="8" fill="var(--leaf-2)" />
        <rect x="6" y="8" width="12" height="8" fill="var(--leaf-2)" />
        <rect x="8" y="4" width="8" height="6" fill="var(--leaf-3)" />
        <rect x="10" y="6" width="2" height="2" fill="#7ac290" />
        <rect x="14" y="14" width="2" height="2" fill="#7ac290" />
      </svg>
    </div>
  );
}

export function ForestBackground() {
  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, i) => ({
        x: (i * 73) % 100,
        y: (i * 37) % 45,
        delay: (i * 0.13) % 3,
        size: i % 3 === 0 ? 2 : 1,
      })),
    [],
  );

  return (
    <div className="absolute inset-0 overflow-hidden z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--night-0) 0%, var(--night-1) 40%, var(--night-2) 75%, var(--leaf-1) 100%)",
        }}
      />
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            background: "var(--moon-glow)",
            animation: `star-twinkle ${2 + (i % 3)}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "12%",
          width: 80,
          height: 80,
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      >
        <svg viewBox="0 0 16 16" width="80" height="80" shapeRendering="crispEdges">
          <rect x="4" y="2" width="8" height="12" fill="var(--moon-glow)" />
          <rect x="2" y="4" width="12" height="8" fill="var(--moon-glow)" />
          <rect x="3" y="3" width="2" height="1" fill="var(--moon)" />
          <rect x="10" y="6" width="2" height="2" fill="var(--moon)" opacity="0.6" />
          <rect x="6" y="9" width="1" height="1" fill="var(--moon)" opacity="0.6" />
        </svg>
      </div>
      <svg
        viewBox="0 0 400 100"
        preserveAspectRatio="none"
        className="absolute left-0 w-full"
        style={{ bottom: "30%", height: "25%" }}
        shapeRendering="crispEdges"
      >
        <polygon
          points="0,100 0,60 40,30 80,55 130,20 180,50 240,15 290,45 340,25 400,55 400,100"
          fill="var(--night-2)"
          opacity="0.8"
        />
      </svg>
      <div className="absolute left-0 right-0" style={{ bottom: "20%", height: "30%" }}>
        {Array.from({ length: 12 }).map((_, i) => (
          <PixelTree key={i} x={`${i * 9 - 5}%`} scale={0.6 + ((i * 31) % 40) / 100} dim />
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "20%",
          background: "linear-gradient(180deg, var(--leaf-1) 0%, #1a2818 60%, #0d1408 100%)",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 8px, rgba(0,0,0,0.15) 8px 9px), repeating-linear-gradient(0deg, transparent 0 8px, rgba(0,0,0,0.1) 8px 9px)",
          }}
        />
      </div>
      <div
        className="absolute left-0 right-0"
        style={{
          bottom: "15%",
          height: 60,
          background: "linear-gradient(180deg, transparent, rgba(180, 200, 220, 0.08))",
          animation: "fog-drift 20s linear infinite",
          width: "200%",
        }}
      />
    </div>
  );
}

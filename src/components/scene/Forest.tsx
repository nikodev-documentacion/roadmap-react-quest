import { useMemo } from "react";

interface LuaProps {
  size?: number;
  facing?: "left" | "right";
  state?: "idle" | "walk" | "victory";
}

export function Lua({ size = 56, facing = "right", state = "idle" }: LuaProps) {
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
            : "drop-shadow(1px 0 0 rgba(255,240,200,0.25)) drop-shadow(-1px 0 0 rgba(255,240,200,0.25)) drop-shadow(0 1px 0 rgba(255,240,200,0.25)) drop-shadow(0 -1px 0 rgba(255,240,200,0.25)) drop-shadow(0 2px 6px rgba(0,0,0,0.9))",
      }}
    >
      <svg
        viewBox="0 0 32 32"
        width={size}
        height={size}
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated", overflow: "visible" }}
      >
        {/* Victory aura */}
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

        {/* Tail - fluffy, curled upward (happy dog) */}
        <g style={{ transformOrigin: "7px 20px", animation: "fox-tail 0.8s ease-in-out infinite" }}>
          <rect x="5" y="17" width="3" height="5" fill="var(--lua-fur)" />
          <rect x="3" y="13" width="3" height="5" fill="var(--lua-black)" />
          <rect x="3" y="9" width="3" height="5" fill="var(--lua-fur)" />
          <rect x="4" y="7" width="2" height="3" fill="var(--lua-highlight)" />
          {/* Fluffy texture */}
          <rect x="4" y="12" width="1" height="1" fill="var(--lua-highlight)" />
          <rect x="5" y="8" width="1" height="1" fill="var(--lua-highlight)" />
          <rect x="3" y="16" width="1" height="1" fill="var(--lua-highlight)" />
        </g>

        {/* Body */}
        <rect x="7" y="17" width="13" height="7" fill="var(--lua-black)" />
        <rect x="7" y="22" width="13" height="2" fill="var(--lua-fur)" />
        {/* Chest patch (lighter, like in the photo) */}
        <rect x="8" y="19" width="5" height="4" fill="var(--lua-chest)" />
        {/* Fur texture */}
        <rect x="14" y="18" width="2" height="1" fill="var(--lua-fur)" />
        <rect x="17" y="19" width="2" height="2" fill="var(--lua-fur)" />
        <rect x="9" y="17" width="1" height="2" fill="var(--lua-fur)" />

        {/* Legs */}
        <rect x="9" y="24" width="2" height="3" fill="var(--lua-fur)" />
        <rect x="13" y="24" width="2" height="3" fill="var(--lua-fur)" />
        <rect x="17" y="24" width="2" height="3" fill="var(--lua-fur)" />
        {/* Paws */}
        <rect x="9" y="27" width="2" height="1" fill="var(--lua-black)" />
        <rect x="13" y="27" width="2" height="1" fill="var(--lua-black)" />
        <rect x="17" y="27" width="2" height="1" fill="var(--lua-black)" />

        {/* Head - rounder than fox */}
        <rect x="17" y="9" width="11" height="9" fill="var(--lua-black)" />
        {/* Top rounded */}
        <rect x="18" y="8" width="9" height="1" fill="var(--lua-black)" />
        {/* Fur texture on head */}
        <rect x="18" y="10" width="2" height="1" fill="var(--lua-fur)" />
        <rect x="22" y="11" width="1" height="1" fill="var(--lua-fur)" />
        <rect x="20" y="9" width="1" height="1" fill="var(--lua-fur)" />

        {/* Muzzle (short, scruffy) */}
        <rect x="25" y="13" width="4" height="4" fill="var(--lua-fur)" />
        <rect x="27" y="12" width="2" height="1" fill="var(--lua-fur)" />
        {/* Nose */}
        <rect x="28" y="13" width="1" height="1" fill="#0a0505" />

        {/* Ears - tall and pointy like Lua's */}
        <rect x="18" y="4" width="3" height="6" fill="var(--lua-black)" />
        <rect x="19" y="5" width="1" height="4" fill="var(--lua-fur)" />
        <rect x="23" y="4" width="3" height="6" fill="var(--lua-black)" />
        <rect x="24" y="5" width="1" height="4" fill="var(--lua-fur)" />

        {/* Eyes - warm amber like Lua's */}
        <rect x="21" y="12" width="3" height="2" fill="var(--lua-eyes)" />
        <rect x="22" y="11" width="1" height="1" fill="var(--lua-black)" />
        <rect x="22" y="13" width="1" height="1" fill="#c86828" style={{ animation: "blink 4s infinite" }} />

        {/* Collar - blue like in the photos */}
        <rect x="18" y="17" width="9" height="1" fill="var(--lua-collar)" />
        <rect x="22" y="18" width="2" height="1" fill="var(--lua-collar)" />
      </svg>
    </div>
  );
}

/** @deprecated Use Lua instead */
export const Kitsune = Lua;

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
        filter: dim ? "brightness(0.72)" : "none",
      }}
    >
      <svg viewBox="0 0 24 40" width="48" height="80" shapeRendering="crispEdges">
        <rect x="10" y="28" width="4" height="12" fill="var(--trunk)" />
        <rect x="10" y="28" width="1" height="12" fill="#2a1810" />
        <rect x="6" y="20" width="12" height="10" fill="var(--leaf-1)" />
        <rect x="4" y="14" width="16" height="8" fill="var(--leaf-2)" />
        <rect x="6" y="8" width="12" height="8" fill="var(--leaf-2)" />
        <rect x="8" y="4" width="8" height="6" fill="var(--leaf-3)" />
        <rect x="10" y="6" width="2" height="2" fill="var(--leaf-highlight)" />
        <rect x="14" y="14" width="2" height="2" fill="var(--leaf-highlight)" />
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
            "linear-gradient(180deg, var(--night-0) 0%, var(--night-1) 40%, var(--night-2) 75%, var(--sky-horizon) 100%)",
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
      {/* Lua language logo — animated */}
      <div
        style={{
          position: "absolute",
          top: "6%",
          right: "10%",
          width: 90,
          height: 90,
          filter: "drop-shadow(0 0 10px #3a20ff88)",
        }}
      >
        <svg viewBox="0 0 100 100" width="90" height="90">
          {/* Dashed orbit ring — rotates */}
          <circle cx="50" cy="50" r="46" fill="none" stroke="#4455cc" strokeWidth="1.5"
            strokeDasharray="6 4" opacity="0.5">
            <animateTransform attributeName="transform" type="rotate"
              from="0 50 50" to="360 50 50" dur="14s" repeatCount="indefinite"/>
          </circle>

          {/* Main Lua circle — gentle pulse */}
          <circle cx="50" cy="50" r="32" fill="#12007d">
            <animate attributeName="r" values="32;33.5;32" dur="3s" repeatCount="indefinite"/>
          </circle>

          {/* White highlight */}
          <circle cx="37" cy="36" r="10" fill="white" opacity="0.92">
            <animate attributeName="opacity" values="0.92;0.65;0.92" dur="3s" repeatCount="indefinite"/>
          </circle>

          {/* Small orbiting circle */}
          <g>
            <animateTransform attributeName="transform" type="rotate"
              from="0 50 50" to="360 50 50" dur="8s" repeatCount="indefinite"/>
            <circle cx="91" cy="50" r="10" fill="#12007d"/>
          </g>
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
          fill="var(--mountain)"
          opacity="0.8"
        />
      </svg>
      <div className="absolute left-0 right-0" style={{ bottom: "20%", height: "38%", background: "linear-gradient(180deg, transparent 0%, var(--sky-horizon) 40%, var(--leaf-1) 100%)" }}>
        {Array.from({ length: 14 }).map((_, i) => (
          <PixelTree key={i} x={`${i * 8 - 4}%`} scale={1.1 + ((i * 31) % 50) / 100} dim />
        ))}
      </div>
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "20%",
          background: "linear-gradient(180deg, var(--leaf-1) 0%, var(--ground-mid) 60%, var(--ground-dark) 100%)",
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

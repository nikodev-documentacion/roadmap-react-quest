import { type Stage } from "@/data/roadmap-data";

interface TorchProps {
  lit: boolean;
  active: boolean;
}

function Torch({ lit, active }: TorchProps) {
  return (
    <div className="relative w-8 h-12 mx-auto">
      <svg viewBox="0 0 16 24" width="32" height="48" shapeRendering="crispEdges">
        <rect x="7" y="10" width="2" height="14" fill="var(--trunk)" />
        <rect x="7" y="10" width="1" height="14" fill="#2a1810" />
        <rect x="5" y="8" width="6" height="3" fill="#5a4530" />
        <rect x="4" y="9" width="8" height="1" fill="#3d2e22" />
        {lit && (
          <g>
            {/* Outer flame — slow organic flicker */}
            <g style={{ animation: "torch-flicker 1.2s ease-in-out infinite", transformOrigin: "8px 8px" }}>
              <rect x="5" y="6" width="1" height="2" fill="#b02408" />
              <rect x="10" y="6" width="1" height="2" fill="#b02408" />
              <rect x="6" y="3" width="4" height="5" fill={active ? "#ff8c20" : "#d86818"} />
              <rect x="5" y="4" width="1" height="3" fill={active ? "#ffa030" : "#d06018"} />
              <rect x="10" y="4" width="1" height="3" fill={active ? "#ffa030" : "#d06018"} />
            </g>
            {/* Inner flame — faster, reverse direction */}
            <g style={{ animation: "torch-flicker 0.75s ease-in-out infinite reverse", transformOrigin: "8px 4px" }}>
              <rect x="7" y="1" width="2" height="6" fill={active ? "#ffd840" : "#ffaa28"} />
              <rect x="6" y="3" width="1" height="2" fill={active ? "#ffee90" : "#ffcc40"} />
              <rect x="9" y="3" width="1" height="2" fill={active ? "#ffee90" : "#ffcc40"} />
            </g>
            {/* Bright tip — very fast */}
            <g style={{ animation: "torch-flicker 0.45s linear infinite", transformOrigin: "8px 1px" }}>
              <rect x="7" y="0" width="2" height="2" fill={active ? "#fffbe0" : "#ffe060"} />
            </g>
            {/* Sparks */}
            <g style={{ animation: "torch-spark-l 1.6s linear infinite" }}>
              <rect x="6" y="2" width="1" height="1" fill="#ffd030" />
            </g>
            <g style={{ animation: "torch-spark-r 2.2s linear 0.6s infinite" }}>
              <rect x="9" y="3" width="1" height="1" fill="#ffaa20" />
            </g>
            <g style={{ animation: "torch-spark-l 2.8s linear 1.2s infinite" }}>
              <rect x="8" y="1" width="1" height="1" fill="#ffe050" />
            </g>
          </g>
        )}
      </svg>
      {lit && (
        <div
          className="absolute pointer-events-none"
          style={{
            inset: -16,
            background: `radial-gradient(circle at 50% 35%, ${active ? "rgba(255,180,40,0.55)" : "rgba(220,110,40,0.35)"} 0%, transparent 65%)`,
            animation: "pulse-glow 2.5s ease-in-out infinite",
            filter: "blur(3px)",
          }}
        />
      )}
    </div>
  );
}

interface StageMarkerProps {
  stage: Stage;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

export function StageMarker({ stage, index, isActive, isCompleted, onClick }: StageMarkerProps) {
  return (
    <div
      onClick={onClick}
      className="absolute cursor-pointer z-[5]"
      style={{
        left: `${stage.position.x}%`,
        top: `${stage.position.y}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative w-20 text-center">
        <div
          className="font-pixel absolute left-1/2 -translate-x-1/2 px-1.5 py-0.5 border-2 whitespace-nowrap"
          style={{
            top: -28,
            background: isActive ? "var(--xp-gold)" : "var(--night-1)",
            color: isActive ? "var(--night-0)" : "var(--moon)",
            borderColor: "var(--moon)",
            fontSize: 8,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>
        <Torch lit={isActive || isCompleted} active={isActive} />
        <div
          className="font-pixel mt-1 leading-snug whitespace-nowrap"
          style={{
            fontSize: 7,
            color: isActive ? "var(--xp-gold)" : "var(--moon)",
            textShadow: "1px 1px 0 #000",
          }}
        >
          {stage.title.toUpperCase()}
        </div>
        {isActive && (
          <div
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: -52,
              animation: "float 1s ease-in-out infinite",
              fontSize: 16,
              color: "var(--xp-gold)",
              filter: "drop-shadow(0 0 4px var(--xp-gold))",
            }}
          >
            ▼
          </div>
        )}
      </div>
    </div>
  );
}

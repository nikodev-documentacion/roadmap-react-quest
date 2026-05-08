import { useEffect, useState } from "react";
import { type Stage } from "@/data/roadmap-data";

interface ConceptPanelProps {
  stage: Stage;
  currentIndex: number;
  total: number;
  earnedXP: number;
  totalXP: number;
}

const MEDAL_COLORS = [
  { body: "#d4a820", shine: "#fff4a0", ribbon: "#b88010" },
  { body: "#c0c0d0", shine: "#f0f0ff", ribbon: "#8888a0" },
  { body: "#d4804a", shine: "#ffd0a0", ribbon: "#a05020" },
  { body: "#60c060", shine: "#c0ffc0", ribbon: "#308030" },
  { body: "#60a8d8", shine: "#b0e0ff", ribbon: "#3070a8" },
  { body: "#c060c0", shine: "#f0b0f0", ribbon: "#8030a0" },
  { body: "#d84848", shine: "#ffb0b0", ribbon: "#a02020" },
  { body: "#48c8c8", shine: "#b0ffff", ribbon: "#208888" },
];

function Medal({ earned, index }: { earned: boolean; index: number }) {
  const c = earned ? MEDAL_COLORS[index] : null;
  const body = c?.body ?? "#1e1e2e";
  const shine = c?.shine ?? "#2a2a3a";
  const ribbon = c?.ribbon ?? "#161626";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        filter: earned
          ? `drop-shadow(0 0 5px ${body}) drop-shadow(0 0 2px ${shine})`
          : undefined,
      }}
    >
      <svg
        viewBox="0 0 14 18"
        width={36}
        height={46}
        shapeRendering="crispEdges"
        style={{ imageRendering: "pixelated" }}
      >
        {/* Ribbon */}
        <rect x="5" y="0" width="4" height="5" fill={ribbon} />
        <rect x="6" y="1" width="2" height="3" fill={earned ? shine : "#1a1a28"} opacity="0.4" />

        {/* Badge body (octagonal) */}
        <rect x="2" y="5"  width="10" height="8" fill={body} />
        <rect x="3" y="4"  width="8"  height="10" fill={body} />

        {/* Shine top-left */}
        {earned && <rect x="3" y="5" width="3" height="2" fill={shine} opacity="0.5" />}

        {/* Center symbol: star cross */}
        {earned ? (
          <>
            <rect x="6" y="7"  width="2" height="4" fill={ribbon} />
            <rect x="4" y="9"  width="6" height="2" fill={ribbon} />
            <rect x="5" y="8"  width="1" height="1" fill={shine} opacity="0.6" />
          </>
        ) : (
          <>
            <rect x="6" y="8"  width="2" height="2" fill="#2a2a3a" />
            <rect x="5" y="9"  width="4" height="1" fill="#2a2a3a" />
          </>
        )}
      </svg>

      <span
        className="font-pixel"
        style={{
          fontSize: 6,
          color: earned ? body : "var(--moon)",
          opacity: earned ? 1 : 0.25,
          textShadow: earned ? `0 0 6px ${body}` : "none",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}

export function ConceptPanel({ stage, currentIndex, total: _total, earnedXP: _earnedXP, totalXP: _totalXP }: ConceptPanelProps) {
  const [typed, setTyped] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    setTyped(0);
    setShowAll(false);
  }, [stage.id]);

  useEffect(() => {
    if (showAll) return;
    if (typed >= stage.concepts.length) return;
    const t = window.setTimeout(() => setTyped((v) => v + 1), 220);
    return () => window.clearTimeout(t);
  }, [typed, stage.concepts.length, showAll]);

  const visibleCount = showAll ? stage.concepts.length : typed;
  const allShown = visibleCount >= stage.concepts.length;
  const earnedMedals = Math.min(currentIndex, 8);

  return (
    <div className="absolute bottom-4 left-4 right-4 z-40 flex gap-3 items-stretch">

      {/* Left: items to collect */}
      <div
        className="pixel-panel relative flex-1"
        style={{ padding: "14px 18px 12px", minHeight: 180 }}
        onClick={() => !allShown && setShowAll(true)}
      >
        <div className="flex justify-between items-baseline gap-4 flex-wrap" style={{ marginBottom: 4 }}>
          <div>
            <span className="font-pixel" style={{ fontSize: 12, color: "var(--moon-glow)" }}>
              {stage.title.toUpperCase()}
            </span>
          </div>
          <div className="font-pixel italic" style={{ fontSize: 7, color: "var(--moon)", opacity: 0.7 }}>
            « {stage.subtitle} »
          </div>
        </div>

        <div className="font-mono mb-3" style={{ fontSize: 20, color: "var(--accent-cyan)", opacity: 0.9 }}>
          ◈ {stage.biome} &nbsp;·&nbsp;
          <span style={{ color: "var(--xp-gold)" }}>{stage.estimatedHours}h</span>
          <span style={{ opacity: 0.55 }}> · </span>
          <span style={{ color: "var(--xp-gold)" }}>{stage.concepts.length}</span>
          <span style={{ opacity: 0.55 }}> encuentros</span>
        </div>

        <div className="font-pixel mb-2" style={{ fontSize: 6, color: "var(--moon)", opacity: 0.6 }}>
          ── ITEMS A RECOLECTAR ──
        </div>

        <ul
          className="m-0 p-0 list-none grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "minmax(26px, auto)",
            rowGap: 12,
            columnGap: 24,
          }}
        >
          {stage.concepts.map((c, i) => (
            <li
              key={i}
              className="font-mono flex items-start gap-2"
              style={{
                fontSize: 18,
                color: i < visibleCount ? "var(--moon)" : "transparent",
                lineHeight: 1.2,
                opacity: i < visibleCount ? 1 : 0,
                transition: "opacity 0.15s",
              }}
            >
              <span style={{ color: "var(--xp-gold)", flexShrink: 0 }}>◆</span>
              <span>{c}</span>
            </li>
          ))}
        </ul>

        {!allShown && (
          <div
            className="font-pixel absolute"
            style={{ bottom: 8, right: 14, fontSize: 8, color: "var(--xp-gold)", animation: "blink 1s steps(2) infinite" }}
          >
            ▼
          </div>
        )}
      </div>

      {/* Right: backpack / medals */}
      <div
        className="pixel-panel"
        style={{ padding: "14px 16px", width: 220, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <div className="font-pixel" style={{ fontSize: 8, color: "var(--xp-gold)", textAlign: "center", letterSpacing: "0.1em" }}>
          MOCHILA
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 6,
            flex: 1,
            alignContent: "center",
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Medal key={i} earned={i < earnedMedals} index={i} />
          ))}
        </div>

        <div className="font-pixel" style={{ fontSize: 6, color: "var(--moon)", opacity: 0.5, textAlign: "center" }}>
          {earnedMedals} / 8 MEDALLAS
        </div>
      </div>
    </div>
  );
}

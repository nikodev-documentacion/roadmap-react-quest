import { useEffect, useState } from "react";
import { type Stage } from "@/data/roadmap-data";
import { Button } from "@/components/ui/button";

interface ConceptPanelProps {
  stage: Stage;
  currentIndex: number;
  total: number;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export function ConceptPanel({
  stage,
  currentIndex,
  total: _total,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
}: ConceptPanelProps) {
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

  return (
    <div
      className="absolute bottom-4 left-4 right-4 z-40 grid items-stretch"
      style={{ gridTemplateColumns: "auto 1fr auto", gap: 16 }}
    >
      <Button variant="pixel" onClick={onPrev} disabled={!hasPrev} aria-label="Anterior">
        ◀ PREV
      </Button>

      <div
        className="pixel-panel relative"
        style={{ padding: "16px 20px 14px", minHeight: 180 }}
        onClick={() => !allShown && setShowAll(true)}
      >
        <div
          className="flex justify-between items-baseline gap-4 flex-wrap"
          style={{ marginBottom: 4 }}
        >
          <div>
            <span className="font-pixel mr-2" style={{ fontSize: 8, color: "var(--xp-gold)" }}>
              ▼ STAGE {String(currentIndex + 1).padStart(2, "0")}
            </span>
            <span className="font-pixel" style={{ fontSize: 12, color: "var(--moon-glow)" }}>
              {stage.title.toUpperCase()}
            </span>
          </div>
          <div className="font-pixel italic" style={{ fontSize: 7, color: "var(--moon)", opacity: 0.7 }}>
            « {stage.subtitle} »
          </div>
        </div>

        <div className="font-mono mb-3" style={{ fontSize: 18, color: "var(--accent-cyan)", opacity: 0.85 }}>
          ⚔ {stage.biome} — {stage.xp} XP
        </div>

        <div className="font-pixel mb-2" style={{ fontSize: 6, color: "var(--moon)", opacity: 0.7 }}>
          ── HABILIDADES A DESBLOQUEAR ──
        </div>

        <ul
          className="m-0 p-0 list-none grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gridAutoRows: "minmax(28px, auto)",
            rowGap: 14,
            columnGap: 24,
          }}
        >
          {stage.concepts.map((c, i) => (
            <li
              key={i}
              className="font-mono flex items-start gap-2"
              style={{
                fontSize: 20,
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

        {!allShown ? (
          <div
            className="font-pixel absolute"
            style={{
              bottom: 8,
              right: 14,
              fontSize: 8,
              color: "var(--xp-gold)",
              animation: "blink 1s steps(2) infinite",
            }}
          >
            ▼
          </div>
        ) : (
          <div
            className="font-pixel absolute"
            style={{ bottom: 8, right: 14, fontSize: 7, color: "var(--moon)", opacity: 0.6 }}
          >
            {hasNext ? "PRESS NEXT ▶" : "★ FIN DEL VIAJE ★"}
          </div>
        )}
      </div>

      <Button variant="pixel" onClick={onNext} disabled={!hasNext} aria-label="Siguiente">
        NEXT ▶
      </Button>
    </div>
  );
}

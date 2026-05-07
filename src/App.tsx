import { useEffect } from "react";
import { useRoadmap } from "@/hooks/useRoadmap";
import { useSettings } from "@/hooks/useSettings";
import { retroSound } from "@/lib/sound";
import { ForestBackground, Lua } from "@/components/scene/Forest";
import { StageMarker } from "@/components/scene/StageMarker";
import { HUD } from "@/components/scene/HUD";
import { ConceptPanel } from "@/components/scene/ConceptPanel";
import { Particles } from "@/components/scene/Particles";
import { SettingsPanel } from "@/components/scene/SettingsPanel";

export function App() {
  const roadmap = useRoadmap();
  const [settings, setSetting] = useSettings();

  useEffect(() => {
    retroSound.muted = !settings.soundEnabled;
  }, [settings.soundEnabled]);

  const foxPos = roadmap.current.position;

  return (
    <div
      className="fixed inset-0 overflow-hidden scanlines"
      style={{
        background: "var(--night-0)",
      }}
    >
      <ForestBackground />

      {/* Path connecting stages */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
        preserveAspectRatio="none"
      >
        {roadmap.stages.map((s, i) => {
          if (i === roadmap.stages.length - 1) return null;
          const next = roadmap.stages[i + 1];
          const completed = roadmap.visited.has(i) && roadmap.visited.has(i + 1);
          return (
            <line
              key={s.id}
              x1={`${s.position.x}%`}
              y1={`${s.position.y}%`}
              x2={`${next.position.x}%`}
              y2={`${next.position.y}%`}
              stroke={completed ? "var(--xp-gold)" : "var(--night-3)"}
              strokeWidth={3}
              strokeDasharray="6 6"
              strokeLinecap="square"
              opacity={completed ? 0.8 : 0.4}
            />
          );
        })}
      </svg>

      {roadmap.stages.map((s, i) => (
        <StageMarker
          key={s.id}
          stage={s}
          index={i}
          isActive={i === roadmap.currentIndex}
          isCompleted={roadmap.visited.has(i) && i !== roadmap.currentIndex}
          onClick={() => {
            retroSound.click();
            roadmap.goTo(i);
          }}
        />
      ))}

      <Particles x={foxPos.x} y={foxPos.y - 5} trigger={roadmap.arrivalTick} />

      {/* Fox - moves between stages with smooth lerp */}
      <div
        className="absolute z-[7]"
        style={{
          left: `${foxPos.x}%`,
          top: `${foxPos.y - 7}%`,
          transform: "translate(-50%, -100%)",
          transition: "left 0.7s cubic-bezier(.5,.05,.5,.95), top 0.7s cubic-bezier(.5,0,.5,1.4)",
          filter: "drop-shadow(2px 4px 0 rgba(0,0,0,0.6))",
        }}
      >
        <Lua size={56} facing={roadmap.foxFacing} state={roadmap.foxState} />
      </div>

      <HUD
        stage={roadmap.current}
        currentIndex={roadmap.currentIndex}
        total={roadmap.total}
        earnedXP={roadmap.earnedXP}
        totalXP={roadmap.totalXP}
      />

      <ConceptPanel
        stage={roadmap.current}
        currentIndex={roadmap.currentIndex}
        total={roadmap.total}
        earnedXP={roadmap.earnedXP}
        totalXP={roadmap.totalXP}
      />

<SettingsPanel settings={settings} setSetting={setSetting} />

      {/* Victory banner - appears at the final stage */}
      {roadmap.isAtFinal && (
        <div
          className="absolute z-[60] pointer-events-none"
          style={{
            top: "30%",
            left: "50%",
            transform: "translate(-50%, 0)",
            animation: "victory-banner 0.8s cubic-bezier(.34,1.56,.64,1) forwards",
          }}
        >
          <div
            className="pixel-panel text-center"
            style={{
              padding: "14px 28px",
              background: "var(--night-1)",
              borderColor: "var(--xp-gold)",
              boxShadow: "0 0 24px var(--xp-gold), 4px 4px 0 rgba(0,0,0,0.6)",
            }}
          >
            <div className="font-pixel" style={{ fontSize: 14, color: "var(--xp-gold)", marginBottom: 6 }}>
              ★ ¡VICTORIA! ★
            </div>
            <div className="font-pixel" style={{ fontSize: 7, color: "var(--moon-glow)" }}>
              LUA ALCANZÓ LA CIMA
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

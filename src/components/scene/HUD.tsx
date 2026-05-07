import { type Stage } from "@/data/roadmap-data";
import { roadmapData } from "@/data/roadmap-data";

interface HUDProps {
  stage: Stage;
  currentIndex: number;
  total: number;
  earnedXP: number;
  totalXP: number;
}

export function HUD({ stage, currentIndex, total, earnedXP, totalXP }: HUDProps) {
  const xpPct = (earnedXP / totalXP) * 100;
  return (
    <div className="absolute top-16 left-4 right-4 z-5 flex gap-4 items-start pointer-events-none">
      {/* Player card */}
      <div className="pixel-panel pointer-events-auto" style={{ padding: "10px 14px", minWidth: 220 }}>
        <div className="font-pixel" style={{ fontSize: 10, color: "var(--xp-gold)", marginBottom: 6 }}>
          ★ {roadmapData.meta.author}
        </div>
        <div className="font-pixel" style={{ fontSize: 7, color: "var(--moon)", marginBottom: 8, opacity: 0.7 }}>
          {roadmapData.meta.playerLabel} · LVL {currentIndex + 1}
        </div>
        <div className="mb-1">
          <div
            className="font-pixel flex justify-between"
            style={{ fontSize: 6, color: "var(--moon)", marginBottom: 2 }}
          >
            <span>XP</span>
            <span>
              {earnedXP} / {totalXP}
            </span>
          </div>
          <div
            className="relative"
            style={{
              height: 10,
              background: "var(--night-0)",
              border: "2px solid var(--moon)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${xpPct}%`,
                background: "linear-gradient(90deg, var(--xp-gold) 0%, #fff5a0 50%, var(--xp-gold) 100%)",
                transition: "width 0.5s steps(8)",
                boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)",
              }}
            />
          </div>
        </div>
      </div>


    </div>
  );
}

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

      {/* Victory banner - parchment scroll */}
      {roadmap.isAtFinal && (
        <div
          className="absolute z-[60] pointer-events-none"
          style={{ top: "4%", left: "50%", transform: "translateX(-50%)", width: 300 }}
        >
        <div style={{
            transformOrigin: "top center",
            animation: "scroll-flutter 4s ease-in-out 1.6s infinite",
            filter: "drop-shadow(0 10px 28px rgba(0,0,0,0.85))",
          }}
        >
          {/* Top roller */}
          <div style={{
            height: 30,
            position: "relative",
            background: "linear-gradient(180deg, #7a4a08 0%, #d49020 20%, #f8c840 50%, #d49020 80%, #7a4a08 100%)",
            borderRadius: 15,
            border: "2px solid #5a3406",
            boxShadow: "0 4px 10px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.18)",
            zIndex: 3,
          }}>
            <div style={{ position: "absolute", left: -10, top: -3, width: 18, height: 36, background: "radial-gradient(ellipse at 40% 35%, #e8a820, #7a4808)", borderRadius: "50%", border: "2px solid #5a3406" }} />
            <div style={{ position: "absolute", right: -10, top: -3, width: 18, height: 36, background: "radial-gradient(ellipse at 40% 35%, #e8a820, #7a4808)", borderRadius: "50%", border: "2px solid #5a3406" }} />
            <div style={{ position: "absolute", inset: "5px 16px", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 12px, rgba(0,0,0,0.12) 12px 13px)" }} />
          </div>

          {/* Unfurling parchment body */}
          <div style={{ animation: "scroll-unfurl 1.4s cubic-bezier(.15,0,.25,1) forwards", transformOrigin: "top center", marginTop: -2 }}>
            <div style={{
              background: "linear-gradient(160deg, #faeec0 0%, #f4d878 40%, #e8c050 75%, #d8a838 100%)",
              clipPath: "polygon(3% 0, 97% 0, 100% 2%, 98% 14%, 100% 28%, 99% 44%, 100% 58%, 98% 72%, 100% 86%, 97% 97%, 100% 100%, 0 100%, 3% 97%, 0 86%, 2% 72%, 0 58%, 1% 44%, 0 28%, 2% 14%, 0 2%)",
              padding: "22px 34px 26px",
              position: "relative",
            }}>
              {/* Horizontal texture */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, transparent 0 20px, rgba(140,90,10,0.07) 20px 21px)" }} />
              {/* Aged vignette */}
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(110,60,5,0.22) 100%)" }} />

              <div style={{ position: "relative", textAlign: "center" }}>
                <div className="font-pixel" style={{ fontSize: 6, color: "#6a3a05", letterSpacing: "0.25em", marginBottom: 8 }}>
                  ✦ CERTIFICADO DE MAESTRIA ✦
                </div>
                <div style={{ width: "75%", height: 1, background: "linear-gradient(90deg, transparent, rgba(100,60,5,0.5), transparent)", margin: "0 auto 12px" }} />

                <div className="font-pixel" style={{ fontSize: 12, color: "#3a1800", lineHeight: 1.7, marginBottom: 12 }}>
                  MISION<br />CUMPLIDA!
                </div>

                <div style={{ fontFamily: "VT323, monospace", fontSize: 18, color: "#4a2806", lineHeight: 1.65, marginBottom: 14 }}>
                  Recorriste cada rincon del<br />
                  bosque y enfrentaste cada<br />
                  desafio sin rendirte.<br />
                  <br />
                  Ser dev no es solo escribir<br />
                  codigo. Es conectar piezas<br />
                  con proposito, sostener la<br />
                  disciplina cuando nadie mira<br />
                  y crecer junto al equipo.<br />
                  <br />
                  Hoy te celebramos.
                </div>

                <div style={{ width: "75%", height: 1, background: "linear-gradient(90deg, transparent, rgba(100,60,5,0.5), transparent)", margin: "0 auto 10px" }} />
                <div style={{ fontSize: 18, color: "#b87818", marginBottom: 8 }}>★ ★ ★</div>
                <div className="font-pixel" style={{ fontSize: 5, color: "#7a4a10", lineHeight: 2, letterSpacing: "0.1em" }}>
                  {roadmap.earnedXP} XP TOTALES · REACT QUEST
                </div>
              </div>
            </div>
          </div>

          {/* Bottom roller */}
          <div style={{
            height: 22,
            position: "relative",
            background: "linear-gradient(180deg, #7a4a08 0%, #d49020 20%, #f8c840 50%, #d49020 80%, #7a4a08 100%)",
            borderRadius: 11,
            border: "2px solid #5a3406",
            boxShadow: "0 4px 10px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.18)",
            marginTop: -2,
            zIndex: 3,
          }}>
            <div style={{ position: "absolute", left: -10, top: -4, width: 18, height: 30, background: "radial-gradient(ellipse at 40% 35%, #e8a820, #7a4808)", borderRadius: "50%", border: "2px solid #5a3406" }} />
            <div style={{ position: "absolute", right: -10, top: -4, width: 18, height: 30, background: "radial-gradient(ellipse at 40% 35%, #e8a820, #7a4808)", borderRadius: "50%", border: "2px solid #5a3406" }} />
            <div style={{ position: "absolute", inset: "4px 16px", backgroundImage: "repeating-linear-gradient(90deg, transparent 0 12px, rgba(0,0,0,0.12) 12px 13px)" }} />
          </div>
          </div>
        </div>
      )}
    </div>
  );
}

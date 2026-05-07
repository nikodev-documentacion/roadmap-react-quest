import { useState } from "react";
import { type Settings, type Aesthetic } from "@/hooks/useSettings";

interface SettingsPanelProps {
  settings: Settings;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
}

const AESTHETICS: { value: Aesthetic; label: string }[] = [
  { value: "night", label: "Noche" },
  { value: "day", label: "Día" },
];

/** Floating gear icon → expanding settings panel */
export function SettingsPanel({ settings, setSetting }: SettingsPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute z-50" style={{ bottom: 16, right: 16 }}>
      {!open && (
        <button
          className="pixel-btn"
          onClick={() => setOpen(true)}
          style={{ padding: "8px 10px", fontSize: 10 }}
          aria-label="Settings"
        >
          ⚙
        </button>
      )}
      {open && (
        <div className="pixel-panel" style={{ padding: "12px 14px", minWidth: 180 }}>
          <div className="flex justify-between items-center mb-3">
            <span className="font-pixel" style={{ fontSize: 8, color: "var(--xp-gold)" }}>
              ⚙ OPTIONS
            </span>
            <button
              className="font-pixel"
              onClick={() => setOpen(false)}
              style={{
                fontSize: 8,
                color: "var(--moon)",
                background: "none",
                border: "none",
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="mb-3">
            <div className="font-pixel mb-1.5" style={{ fontSize: 6, color: "var(--moon)", opacity: 0.7 }}>
              MOOD
            </div>
            <div className="flex gap-1">
              {AESTHETICS.map((a) => (
                <button
                  key={a.value}
                  className="font-pixel"
                  onClick={() => setSetting("aesthetic", a.value)}
                  style={{
                    fontSize: 7,
                    padding: "4px 6px",
                    background: settings.aesthetic === a.value ? "var(--xp-gold)" : "var(--night-2)",
                    color: settings.aesthetic === a.value ? "var(--night-0)" : "var(--moon)",
                    border: "2px solid var(--moon)",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings.soundEnabled}
              onChange={(e) => setSetting("soundEnabled", e.target.checked)}
              style={{ accentColor: "var(--xp-gold)" }}
            />
            <span className="font-pixel" style={{ fontSize: 7, color: "var(--moon)" }}>
              SOUND FX
            </span>
          </label>
        </div>
      )}
    </div>
  );
}

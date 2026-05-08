import { useEffect, useState } from "react";

export type Aesthetic = "night" | "day";

export interface Settings {
  aesthetic: Aesthetic;
  soundEnabled: boolean;
}

const DEFAULTS: Settings = {
  aesthetic: "night",
  soundEnabled: true,
};

const KEY = "react-quest-settings";

/** Persist user preferences (aesthetic theme, sound) in localStorage. */
export function useSettings(): [Settings, <K extends keyof Settings>(key: K, value: Settings[K]) => void] {
  const [settings, setSettings] = useState<Settings>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return { ...DEFAULTS, ...JSON.parse(raw) };
    } catch {
      // ignore
    }
    return DEFAULTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(settings));
    } catch {
      // ignore
    }
  }, [settings]);

  // Apply aesthetic to document root
  useEffect(() => {
    document.documentElement.dataset.aesthetic =
      settings.aesthetic === "night" ? "" : "day";
  }, [settings.aesthetic]);

  const setKey = <K extends keyof Settings>(key: K, value: Settings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return [settings, setKey];
}

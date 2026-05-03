import { useState, useEffect, useCallback, useMemo } from "react";
import { STAGES, TOTAL_XP, FINAL_STAGE_INDEX, type Stage } from "@/data/roadmap-data";
import { retroSound } from "@/lib/sound";

export interface RoadmapState {
  stages: Stage[];
  total: number;
  totalXP: number;
  currentIndex: number;
  current: Stage;
  visited: Set<number>;
  earnedXP: number;
  foxFacing: "left" | "right";
  foxState: "idle" | "walk" | "victory";
  isAtFinal: boolean;
  arrivalTick: number | null;
  goTo: (index: number, opts?: { silent?: boolean }) => void;
  next: () => void;
  prev: () => void;
}

/**
 * Centralised roadmap state machine.
 *
 * Owns: which stage is active, which stages have been visited, fox sprite
 * facing/animation state, and side-effect triggers for sound + screen shake +
 * particle bursts. Components consume it read-only via the hook return value.
 */
export function useRoadmap(): RoadmapState {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visited, setVisited] = useState<Set<number>>(new Set([0]));
  const [foxFacing, setFoxFacing] = useState<"left" | "right">("right");
  const [foxState, setFoxState] = useState<"idle" | "walk" | "victory">("idle");
  const [arrivalTick, setArrivalTick] = useState<number | null>(null);

  const total = STAGES.length;
  const current = STAGES[currentIndex];
  const earnedXP = useMemo(
    () => Array.from(visited).reduce((sum, i) => sum + STAGES[i].xp, 0),
    [visited],
  );

  const goTo = useCallback(
    (newIndex: number, opts: { silent?: boolean } = {}) => {
      if (newIndex < 0 || newIndex >= total) return;
      setCurrentIndex((prev) => {
        if (newIndex === prev) return prev;
        setFoxFacing(newIndex > prev ? "right" : "left");
        setFoxState("walk");
        if (!opts.silent) {
          if (newIndex > prev) retroSound.next();
          else retroSound.prev();
        }
        return newIndex;
      });
      setVisited((prev) => {
        if (prev.has(newIndex)) return prev;
        const nextSet = new Set(prev);
        nextSet.add(newIndex);
        return nextSet;
      });
      window.setTimeout(() => {
        const isFinal = newIndex === FINAL_STAGE_INDEX;
        setFoxState(isFinal ? "victory" : "idle");
        if (!opts.silent) {
          if (isFinal) {
            retroSound.victory();
          } else {
            retroSound.arrive();
          }
          setArrivalTick(Date.now());
        }
      }, 700);
    },
    [total],
  );

  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);
  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        if (currentIndex < total - 1) goTo(currentIndex + 1);
      } else if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        if (currentIndex > 0) goTo(currentIndex - 1);
      } else if (/^[1-9]$/.test(e.key)) {
        const i = parseInt(e.key, 10) - 1;
        if (i < total) goTo(i);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [currentIndex, total, goTo]);

  // Init audio on first user interaction (browser autoplay policy)
  useEffect(() => {
    const init = () => retroSound.init();
    window.addEventListener("click", init, { once: true });
    window.addEventListener("keydown", init, { once: true });
    return () => {
      window.removeEventListener("click", init);
      window.removeEventListener("keydown", init);
    };
  }, []);

  return {
    stages: STAGES,
    total,
    totalXP: TOTAL_XP,
    currentIndex,
    current,
    visited,
    earnedXP,
    foxFacing,
    foxState,
    isAtFinal: currentIndex === FINAL_STAGE_INDEX,
    arrivalTick,
    goTo,
    next,
    prev,
  };
}

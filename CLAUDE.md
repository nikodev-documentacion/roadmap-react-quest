# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server (localhost:5173)
npm run build      # tsc -b && vite build → dist/
npm run preview    # Preview production build
npm run lint       # ESLint check
npm run deploy     # Build + push to gh-pages branch
```

## Architecture

**React Quest** is a single-page, client-only app (no backend, no router) that presents a React learning roadmap as a pixel-art JRPG game. The player navigates a fox character through sequential stages, each representing a React learning module.

### Key files

- `src/data/roadmap-data.ts` — Single source of truth for all stage content (titles, concepts, XP, positions). Edit here to change course content.
- `src/hooks/useRoadmap.ts` — Core game state machine: current stage, visited stages, XP, fox animation state, keyboard/click navigation.
- `src/hooks/useSettings.ts` — Theme + sound preferences, persisted to `localStorage` under `"react-quest-settings"`.
- `src/lib/sound.ts` — `retroSound` singleton using Web Audio API. Lazily initializes AudioContext on first user interaction (browser autoplay policy).
- `src/App.tsx` — Renders all scene components and wires hooks together.
- `src/index.css` — CSS variables for three themes (night/synthwave/dawn), keyframe animations, and font imports.

### Component structure

```
src/components/
├── ui/          shadcn/ui primitives (Button, Card, Progress) built on Radix UI
└── scene/
    ├── Forest.tsx        Parallax background + Kitsune SVG character
    ├── StageMarker.tsx   Clickable torch markers at each stage position
    ├── HUD.tsx           Player stats, XP bar, stage counter
    ├── ConceptPanel.tsx  Dialogue box with typewriter effect, prev/next nav
    ├── Particles.tsx     Sparkle burst on stage arrival
    └── SettingsPanel.tsx Floating gear button; theme + sound toggles
```

### State management

No external state library. All state lives in two hooks:
- `useRoadmap()` — game progression (current stage, visited, fox state)
- `useSettings()` — user preferences (aesthetic, soundEnabled)

### Theming

Three themes toggled via `document.dataset.aesthetic`: `night` (default), `synthwave`, `dawn`. All theme values are CSS variables defined in `index.css`.

### Path alias

`@/*` resolves to `./src/*` (configured in `tsconfig.json` and `vite.config.ts`).

## Deployment

GitHub Actions (`.github/workflows/deploy.yml`) auto-deploys to GitHub Pages on push to `main`. Base URL is `/roadmap-react-quest/` (set via `VITE_BASE` env var or hardcoded default in `vite.config.ts`).

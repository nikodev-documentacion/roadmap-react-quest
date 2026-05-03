# React Quest · Roadmap del Kitsune

> Flyer interactivo videojuegil del roadmap del curso de React, por **NikoDev**.
> Aventura pixel art a través de un bosque nocturno donde un zorro ninja recorre 8 stages que representan los conceptos del curso (de bases a intermedio).

## ✨ Stack

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui** (Button, Card, Progress)
- **Web Audio API** para SFX 8-bit retro
- 100% client-side, listo para GitHub Pages

## 🚀 Comandos

```bash
npm install     # instalar dependencias
npm run dev     # desarrollo local en http://localhost:5173
npm run build   # build de producción a /dist
npm run preview # preview del build
npm run deploy  # build + push a la rama gh-pages (requiere git remote)
```

## 🗂️ Arquitectura

```
src/
├── data/
│   └── stages.ts            ← FUENTE DE VERDAD del roadmap (editar aquí)
├── hooks/
│   ├── useRoadmap.ts        ← state machine del juego (current stage, XP, animaciones, teclado)
│   └── useSettings.ts       ← preferencias persistidas en localStorage (theme, audio)
├── lib/
│   ├── sound.ts             ← motor de SFX 8-bit (Web Audio)
│   └── utils.ts             ← cn() para Tailwind
├── components/
│   ├── ui/                  ← componentes shadcn (Button, Card, Progress)
│   └── scene/
│       ├── Forest.tsx       ← background parallax + Kitsune (personaje)
│       ├── StageMarker.tsx  ← antorchas/checkpoints en el mapa
│       ├── HUD.tsx          ← cartel del jugador + XP bar + stage counter
│       ├── ConceptPanel.tsx ← diálogo JRPG con conceptos (efecto typewriter)
│       ├── Particles.tsx    ← burst de partículas al llegar
│       └── SettingsPanel.tsx← toggle de aesthetic + audio
├── App.tsx                  ← orquestación
├── main.tsx                 ← entry
└── index.css                ← variables CSS + utilidades pixel
```

### ¿Cómo agrego/modifico un stage?
Edita **`src/data/stages.ts`**. Cada stage define `id`, `title`, `subtitle`, `biome`, `xp`, `concepts[]` y `position` (coords % en el mapa). Todo el resto se actualiza solo.

### ¿Cómo cambio el personaje?
`src/components/scene/Forest.tsx` exporta `Kitsune` como un SVG pixel art. Modifica los `<rect>` para repintarlo.

### ¿Cómo cambio la paleta?
Edita las CSS variables en `src/index.css` (`:root` para night, `[data-aesthetic="..."]` para los temas alternativos).

## 🌐 Deploy a GitHub Pages

### Opción A — GitHub Actions (recomendado)
1. Sube el repo a GitHub.
2. **Settings → Pages → Source: GitHub Actions**.
3. Push a `main`. El workflow `.github/workflows/deploy.yml` builds + publica automáticamente.
4. El workflow inyecta `VITE_BASE=/<repo-name>/` para que las rutas funcionen.

### Opción B — gh-pages branch (manual)
```bash
# 1. Asegúrate que `base` en vite.config.ts coincida con tu repo name
# 2. npm run deploy
```
Esto publica `dist/` en la branch `gh-pages`. Luego en **Settings → Pages → Source: Deploy from branch → gh-pages**.

### ⚠️ Configurar la base URL
En `vite.config.ts`:
```ts
base: process.env.VITE_BASE ?? "/react-roadmap-kitsune/"
```
Cambia `"/react-roadmap-kitsune/"` al nombre real de tu repo, o pasa `VITE_BASE` por env (el workflow ya lo hace).

Si despliegas en `usuario.github.io` (sitio raíz del usuario), pon `base: "/"`.

## 🎮 Controles

- **← / →** o **A / D** · navegar entre stages
- **1-8** · saltar al stage N
- **Click** en una antorcha · saltar a ese stage
- **Botones PREV / NEXT** · navegar
- **⚙** · cambiar tema (Night / Synth / Dawn) y mute audio

## 📜 Notas

- El personaje **Kitsune** es un diseño original (zorro ninja con headband rojo). No es una recreación de personajes con copyright.
- Las fuentes "Press Start 2P" y "VT323" se cargan desde Google Fonts.
- El audio se inicializa al primer click/tecla por política de autoplay del navegador.

---

Hecho con ☕ por [NikoDev](https://github.com/nikodev)

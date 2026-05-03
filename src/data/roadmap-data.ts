/**
 * 🦊 ROADMAP DATA — fuente de verdad del curso.
 *
 * Edita este archivo para modificar el contenido del roadmap sin tocar
 * los componentes. Todos los stages, conceptos, XP y metadata viven aquí.
 *
 * ➕ Agregar stage: añade una entrada al array `stages`.
 * ✏️  Editar texto: modifica `title`, `subtitle`, `concepts`, `biome`.
 * 🎯 Ajustar XP: modifica `xp` (los XP totales se recalculan solos).
 * 🗺️  Reposicionar en el mapa: ajusta `position` (% del viewport).
 */

export interface RoadmapStage {
  /** Unique stage id (1-based, used as key) */
  id: number;
  /** Short title shown on markers and panels */
  title: string;
  /** Flavor subtitle shown in the dialogue panel */
  subtitle: string;
  /** Biome name for the HUD */
  biome: string;
  /** Optional longer description (currently unused but ready for expansion) */
  description?: string;
  /** XP reward when the stage is visited */
  xp: number;
  /** Bullet-point concepts the student will learn */
  concepts: string[];
  /** Position on the map as percentages of viewport (0-100) */
  position: { x: number; y: number };
}

export interface RoadmapData {
  /** Course / author metadata */
  meta: {
    title: string;
    subtitle: string;
    author: string;
    playerLabel: string;
  };
  stages: RoadmapStage[];
}

export const roadmapData: RoadmapData = {
  meta: {
    title: "REACT QUEST",
    subtitle: "~ ROADMAP DEL KITSUNE ~",
    author: "NIKODEV",
    playerLabel: "REACT NINJA",
  },
  stages: [
    {
      id: 1,
      title: "JSX Básico",
      subtitle: "El despertar del Kitsune",
      biome: "Entrada del bosque",
      description:
        "Las primeras líneas de JSX. El Kitsune abre los ojos al amanecer del bosque y aprende a expresar su voluntad en forma de árboles de elementos.",
      xp: 100,
      concepts: [
        "Sintaxis JSX vs HTML",
        "Expresiones { } en JSX",
        "Atributos y className",
        "Fragmentos <> </>",
        "Renderizado condicional básico",
      ],
      position: { x: 8, y: 58 },
    },
    {
      id: 2,
      title: "Components & Props",
      subtitle: "Forjando aliados",
      biome: "Claro de los robles",
      description: "Aprende a dividir tu UI en piezas reutilizables y a comunicarlas con props.",
      xp: 200,
      concepts: [
        "Function Components",
        "Props y destructuring",
        "Composición de componentes",
        "Children prop",
        "TypeScript props con interfaces",
      ],
      position: { x: 18, y: 42 },
    },
    {
      id: 3,
      title: "State & Events",
      subtitle: "Domando el chakra",
      biome: "Río de luciérnagas",
      description: "Tu UI cobra vida: gestión de estado local y respuesta a eventos del usuario.",
      xp: 300,
      concepts: [
        "useState fundamentals",
        "Event handlers (onClick, onChange)",
        "Lifting state up",
        "Controlled vs uncontrolled",
        "Inmutabilidad del estado",
      ],
      position: { x: 30, y: 56 },
    },
    {
      id: 4,
      title: "Hooks Básicos",
      subtitle: "Sellos arcanos",
      biome: "Templo abandonado",
      description: "Sellos para sincronizar con el mundo exterior, recordar valores y evitar trabajo de más.",
      xp: 400,
      concepts: [
        "useEffect y ciclo de vida",
        "Dependencias y cleanup",
        "useRef para DOM",
        "useMemo y useCallback",
        "Reglas de los hooks",
      ],
      position: { x: 42, y: 38 },
    },
    {
      id: 5,
      title: "Context API",
      subtitle: "El espíritu compartido",
      biome: "Cueva de cristales",
      description: "Comparte estado entre componentes lejanos sin sufrir prop drilling.",
      xp: 500,
      concepts: [
        "createContext y Provider",
        "useContext hook",
        "Cuándo usar Context",
        "Múltiples contextos",
        "Patrón Provider compuesto",
      ],
      position: { x: 54, y: 52 },
    },
    {
      id: 6,
      title: "Custom Hooks",
      subtitle: "Pergaminos secretos",
      biome: "Bosque de bambú",
      description: "Extrae lógica reutilizable en hooks propios — el camino del ninja senior.",
      xp: 600,
      concepts: [
        "Extracción de lógica reutilizable",
        "Naming convention (use*)",
        "useFetch, useLocalStorage",
        "Composición de hooks",
        "Testing custom hooks",
      ],
      position: { x: 66, y: 36 },
    },
    {
      id: 7,
      title: "Routing & Forms",
      subtitle: "Caminos divergentes",
      biome: "Encrucijada de piedra",
      description: "Múltiples rutas y formularios robustos con validación.",
      xp: 700,
      concepts: [
        "React Router v6",
        "Rutas dinámicas y params",
        "Forms controlados",
        "Validación con Zod / Yup",
        "React Hook Form",
      ],
      position: { x: 78, y: 50 },
    },
    {
      id: 8,
      title: "Performance",
      subtitle: "Maestría final",
      biome: "Cima de la montaña",
      description:
        "El stage final. Optimización, code splitting, suspense — la cima del bosque te espera.",
      xp: 1000,
      concepts: [
        "React.memo y memoización",
        "Code splitting & lazy",
        "Suspense boundaries",
        "Profiler & React DevTools",
        "Patrones de optimización",
      ],
      position: { x: 92, y: 32 },
    },
  ],
};

/** Convenience accessors */
export const STAGES = roadmapData.stages;
export const TOTAL_XP = STAGES.reduce((sum, s) => sum + s.xp, 0);
export const FINAL_STAGE_INDEX = STAGES.length - 1;

// Backwards-compatible alias for existing imports
export type Stage = RoadmapStage;

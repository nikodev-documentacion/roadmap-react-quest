/**
 * 🦊 ROADMAP DATA — fuente de verdad del curso React Quest.
 *
 * Edita este archivo para modificar el contenido del roadmap sin tocar
 * los componentes. Todos los stages, conceptos, XP y metadata viven aquí.
 *
 * ➕ Agregar stage: añade una entrada al array `stages`.
 * ✏️  Editar texto: modifica `title`, `subtitle`, `concepts`, `biome`.
 * 🎯 Ajustar XP: modifica `xp` (los XP totales se recalculan solos).
 * ⏱️  Duración: cada stage incluye estimación de horas y calendario sugerido.
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
  /** Description of what this stage covers */
  description?: string;
  /** XP reward when the stage is completed */
  xp: number;
  /** Estimated hours to complete (classes + exercises + revision + lab) */
  estimatedHours: number;
  /** Suggested week(s) for completing this stage */
  suggestedWeek: string;
  /** Key concepts taught in this stage */
  concepts: string[];
  /** Lab project description */
  lab: string;
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
    totalDurationWeeks: number;
    totalEstimatedHours: number;
  };
  stages: RoadmapStage[];
}

export const roadmapData: RoadmapData = {
  meta: {
    title: "REACT QUEST",
    subtitle: "~ ROADMAP DEL KITSUNE ~",
    author: "NIKODEV",
    playerLabel: "REACT NINJA",
    totalDurationWeeks: 12, // 8 semanas de stages + 4 semanas proyecto final
    totalEstimatedHours: 80, // Calculado automáticamente más abajo
  },
  stages: [
    {
      id: 1,
      title: "Fundamentos y Setup",
      subtitle: "El despertar del Kitsune",
      biome: "Entrada del bosque",
      description:
        "Aprende a inicializar proyectos React desde cero, entendiendo cada pieza. Sin magia, sin create-react-app: construcción manual para dominar los fundamentos.",
      xp: 150,
      estimatedHours: 8,
      suggestedWeek: "Semana 1",
      concepts: [
        "🔧 Inicialización manual de proyecto (Vite desde cero)",
        "📦 Package.json, bundlers y build tools",
        "⚛️ ¿Qué es React? Librería vs Framework",
        "🌳 Virtual DOM y reconciliación",
        "🛠️ React DevTools - herramientas del navegador",
        "🎨 JSX: sintaxis y expresiones",
        "🧩 Primer componente funcional",
      ],
      lab: "🎯 LAB: Crear proyecto desde cero + tarjeta de presentación interactiva",
      position: { x: 8, y: 58 },
    },
    {
      id: 2,
      title: "Components & Composición",
      subtitle: "Forjando aliados",
      biome: "Claro de los robles",
      description:
        "La arquitectura de componentes es el corazón de React. Aprende a componer UIs complejas desde piezas simples y reutilizables.",
      xp: 200,
      estimatedHours: 10,
      suggestedWeek: "Semana 2",
      concepts: [
        "🧱 Function Components - anatomía completa",
        "📬 Props: comunicación entre componentes",
        "🎭 Destructuring de props",
        "👶 Children prop y composición",
        "🔄 Composición vs herencia",
        "📋 Props con TypeScript (interfaces)",
        "✅ Validación y tipos",
      ],
      lab: "🎯 LAB: Galería de componentes reutilizables (Card, Button, Avatar, Badge)",
      position: { x: 18, y: 42 },
    },
    {
      id: 3,
      title: "Estado y Eventos",
      subtitle: "Domando el chakra",
      biome: "Río de luciérnagas",
      description:
        "Tu UI cobra vida. Maneja el estado local, responde a eventos del usuario y aprende los patrones fundamentales de interactividad.",
      xp: 250,
      estimatedHours: 12,
      suggestedWeek: "Semana 3",
      concepts: [
        "⚡ useState - gestión de estado local",
        "🎯 Event handlers (onClick, onChange, onSubmit)",
        "⬆️ Lifting state up - patrón fundamental",
        "🎛️ Controlled vs Uncontrolled components",
        "🔒 Inmutabilidad del estado",
        "🔢 Actualización de arrays y objetos",
        "🔄 Múltiples estados en un componente",
      ],
      lab: "🎯 LAB: Todo List interactivo con filtros y persistencia local",
      position: { x: 30, y: 56 },
    },
    {
      id: 4,
      title: "Ciclo de Vida y Effects",
      subtitle: "Sellos del tiempo",
      biome: "Templo abandonado",
      description:
        "Sincroniza tus componentes con el mundo exterior: APIs, timers, suscripciones. Entiende el ciclo de vida en profundidad.",
      xp: 300,
      estimatedHours: 12,
      suggestedWeek: "Semana 4",
      concepts: [
        "🔄 Ciclo de vida del componente funcional",
        "⚡ useEffect - side effects",
        "🎯 Dependencias y array de dependencias",
        "🧹 Cleanup functions (evitar memory leaks)",
        "🔗 useRef para referencias DOM",
        "📊 useRef para valores mutables",
        "⚠️ Reglas de los hooks",
      ],
      lab: "🎯 LAB: Pokedex con llamadas a API, búsqueda en tiempo real y timers",
      position: { x: 42, y: 38 },
    },
    {
      id: 5,
      title: "Context y Estado Global",
      subtitle: "El espíritu compartido",
      biome: "Cueva de cristales",
      description:
        "Comparte estado entre componentes lejanos sin prop drilling. Aprende cuándo usar Context y cuándo no.",
      xp: 300,
      estimatedHours: 10,
      suggestedWeek: "Semana 5",
      concepts: [
        "🌐 createContext y Provider",
        "🔌 useContext hook",
        "🤔 Cuándo usar Context (y cuándo NO)",
        "🎨 Múltiples contextos en una app",
        "🏗️ Patrón Provider compuesto",
        "⚡ Optimización de re-renders",
        "🎯 Context + useReducer para estado complejo",
      ],
      lab: "🎯 LAB: Tema dark/light + carrito de compras con Context API",
      position: { x: 54, y: 52 },
    },
    {
      id: 6,
      title: "Custom Hooks",
      subtitle: "Pergaminos secretos",
      biome: "Bosque de bambú",
      description:
        "Extrae lógica reutilizable en hooks propios. El camino del ninja senior: código limpio, reutilizable y testeable.",
      xp: 350,
      estimatedHours: 10,
      suggestedWeek: "Semana 6",
      concepts: [
        "📜 Extracción de lógica reutilizable",
        "📝 Naming convention (use*)",
        "🌐 useFetch - fetching de datos",
        "💾 useLocalStorage - persistencia",
        "🪝 Composición de hooks",
        "✅ Testing custom hooks",
        "🎨 Hooks para UI (useToggle, useDebounce, useMedia)",
      ],
      lab: "🎯 LAB: Librería de custom hooks reutilizables + documentación",
      position: { x: 66, y: 36 },
    },
    {
      id: 7,
      title: "Routing y Navegación",
      subtitle: "Caminos divergentes",
      biome: "Encrucijada de piedra",
      description:
        "Múltiples páginas, rutas dinámicas, navegación programática. Construye SPAs completas con React Router.",
      xp: 350,
      estimatedHours: 10,
      suggestedWeek: "Semana 7",
      concepts: [
        "🛣️ React Router v6 - fundamentos",
        "📍 Rutas anidadas y layouts",
        "🎯 Rutas dinámicas y params",
        "🔗 Links y navegación",
        "🚀 Navegación programática",
        "🔒 Rutas protegidas",
        "📊 Loaders y actions (React Router v6.4+)",
      ],
      lab: "🎯 LAB: Blog multipage con posts dinámicos, navegación y 404",
      position: { x: 78, y: 50 },
    },
    {
      id: 8,
      title: "Forms y Validación",
      subtitle: "El arte del control",
      biome: "Jardín zen",
      description:
        "Formularios robustos, validación en tiempo real, manejo de errores. Las bases para cualquier aplicación real.",
      xp: 350,
      estimatedHours: 8,
      suggestedWeek: "Semana 8",
      concepts: [
        "📝 Forms controlados - patrón fundamental",
        "✅ Validación manual y con librerías",
        "🔒 Validación con Zod / Yup",
        "🎯 React Hook Form - performance",
        "⚠️ Manejo de errores y feedback",
        "📤 Submit handlers y preventDefault",
        "🎨 UX de formularios (disabled, loading states)",
      ],
      lab: "🎯 LAB: Formulario de registro completo con validación y múltiples pasos",
      position: { x: 88, y: 42 },
    },
    {
      id: 9,
      title: "Proyecto Final",
      subtitle: "La gran prueba",
      biome: "Montaña sagrada",
      description:
        "Integra todo lo aprendido en un proyecto real. Cuatro semanas para construir, pulir y deployar tu obra maestra.",
      xp: 500,
      estimatedHours: 40,
      suggestedWeek: "Semanas 9-12",
      concepts: [
        "🏗️ Arquitectura de proyecto completo",
        "🎨 Integración de todos los conceptos",
        "📦 Gestión de dependencias",
        "🔧 Configuración avanzada",
        "🚀 Buenas prácticas",
        "📊 Planning y scope",
        "⏱️ Time management",
      ],
      lab: "🎯 PROYECTO FINAL: Aplicación web completa (E-commerce, Dashboard, Social App, etc.)",
      position: { x: 92, y: 34 },
    },
    {
      id: 10,
      title: "Code Review y Deploy",
      subtitle: "Maestría final",
      biome: "Cima del mundo",
      description:
        "Revisión de código, feedback personalizado, optimización y deployment. El Kitsune alcanza la maestría.",
      xp: 1000,
      estimatedHours: 8,
      suggestedWeek: "Semana 13",
      concepts: [
        "👁️ Code review y refactoring",
        "💬 Feedback personalizado",
        "⚡ Optimización final",
        "🚀 Deploy a producción (Vercel/Netlify)",
        "🌐 Variables de entorno",
        "📊 Performance audit",
        "🎓 Certificación y cierre",
      ],
      lab: "🎯 PRESENTACIÓN: Demo del proyecto + retrospectiva",
      position: { x: 95, y: 26 },
    },
  ],
};

/** Convenience accessors */
export const STAGES = roadmapData.stages;
export const TOTAL_XP = STAGES.reduce((sum, s) => sum + s.xp, 0);
export const TOTAL_HOURS = STAGES.reduce((sum, s) => sum + s.estimatedHours, 0);
export const FINAL_STAGE_INDEX = STAGES.length - 1;

// Update meta with calculated total hours
roadmapData.meta.totalEstimatedHours = TOTAL_HOURS;

// Backwards-compatible alias for existing imports
export type Stage = RoadmapStage;

/**
 * 📊 RESUMEN DEL CURSO
 * 
 * Duración total: 13 semanas
 * - 8 semanas de stages (fundamentos + prácticas)
 * - 4 semanas para proyecto final
 * - 1 semana de code review y deploy
 * 
 * Horas estimadas: ~118 horas
 * - Stages 1-8: ~80 horas (clases + ejercicios + labs)
 * - Proyecto final: ~40 horas
 * - Code review: ~8 horas
 * 
 * Modalidad sugerida: ~9-10 horas por semana
 * Intensidad: Media-Alta
 */
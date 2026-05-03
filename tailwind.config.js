/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        mono: ['"VT323"', "monospace"],
      },
      colors: {
        // Pixel night-forest palette - exposed as CSS variables for runtime theming
        night: {
          0: "var(--night-0)",
          1: "var(--night-1)",
          2: "var(--night-2)",
          3: "var(--night-3)",
        },
        moon: {
          DEFAULT: "var(--moon)",
          glow: "var(--moon-glow)",
        },
        leaf: {
          1: "var(--leaf-1)",
          2: "var(--leaf-2)",
          3: "var(--leaf-3)",
        },
        fox: {
          orange: "var(--fox-orange)",
          cream: "var(--fox-cream)",
          dark: "var(--fox-dark)",
        },
        accent: {
          cyan: "var(--accent-cyan)",
          pink: "var(--accent-pink)",
        },
        xp: "var(--xp-gold)",
        // shadcn semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      keyframes: {
        "torch-flicker": {
          "0%, 100%": { opacity: "1", transform: "scaleY(1)" },
          "50%": { opacity: "0.85", transform: "scaleY(1.05)" },
        },
        "fox-walk": {
          "0%, 100%": { transform: "translateY(0) rotate(0)" },
          "25%": { transform: "translateY(-2px) rotate(-2deg)" },
          "75%": { transform: "translateY(-2px) rotate(2deg)" },
        },
        "fox-tail": {
          "0%, 100%": { transform: "rotate(-10deg)" },
          "50%": { transform: "rotate(10deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px var(--moon-glow))" },
          "50%": { filter: "drop-shadow(0 0 16px var(--moon-glow))" },
        },
        blink: {
          "0%, 90%, 100%": { opacity: "1" },
          "92%, 96%": { opacity: "0" },
        },
      },
      animation: {
        "torch-flicker": "torch-flicker 0.3s ease-in-out infinite",
        "fox-walk": "fox-walk 0.3s steps(2) infinite",
        "fox-tail": "fox-tail 0.6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        blink: "blink 4s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

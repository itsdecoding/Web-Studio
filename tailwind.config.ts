import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: "#F7F5F0",
          dark: "#0B0C0E",
        },
        surface: {
          light: "#FFFFFF",
          dark: "#121418",
          elevated: "#181B20",
        },
        border: {
          light: "#E5E2DA",
          dark: "#23262D",
        },
        ink: {
          primary: "#FFFFFF",
          secondary: "#94A3B8",
          muted: "#64748B",
        },
        studio: {
          accent: "#F95721",
          accentHover: "#E04612",
          emerald: "#10B981",
          azure: "#3B82F6",
          amber: "#F59E0B",
          purple: "#8B5CF6",
        },
      },
    },
  },
  plugins: [],
};

export default config;

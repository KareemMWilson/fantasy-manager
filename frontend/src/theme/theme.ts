import {
  createSystem,
  defaultConfig,
  defineConfig,
  mergeConfigs,
} from "@chakra-ui/react";

const theme = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary: {
          50: { value: "#f0fdf4" }, 
          100: { value: "#dcfce7" },
          200: { value: "#bbf7d0" },
          300: { value: "#86efac" },
          400: { value: "#4ade80" },
          500: { value: "#22c55e" }, 
          600: { value: "#16a34a" },
          700: { value: "#15803d" },
          800: { value: "#166534" },
          900: { value: "#14532d" }, 
        },
        secondary: {
          50: { value: "#f0f9ff" }, 
          100: { value: "#e0f2fe" },
          200: { value: "#bae6fd" },
          300: { value: "#7dd3fc" },
          400: { value: "#38bdf8" },
          500: { value: "#0ea5e9" },
          600: { value: "#0284c7" },
          700: { value: "#0369a1" },
          800: { value: "#075985" },
          900: { value: "#0c4a6e" }, 
        },
        info: {
          50: { value: "#ecfeff" }, 
          100: { value: "#cffafe" },
          200: { value: "#a5f3fc" },
          300: { value: "#67e8f9" },
          400: { value: "#22d3ee" },
          500: { value: "#06b6d4" },
          600: { value: "#0891b2" },
          700: { value: "#0e7490" },
          800: { value: "#155e75" },
          900: { value: "#164e63" }, 
        },
        success: {
          50: { value: "#ecfdf5" },
          100: { value: "#d1fae5" },
          500: { value: "#10b981" }, 
          700: { value: "#047857" },
          900: { value: "#064e3b" },
        },
        error: {
          50: { value: "#fef2f2" },
          100: { value: "#fee2e2" },
          500: { value: "#ef4444" },
          700: { value: "#b91c1c" },
          900: { value: "#7f1d1d" },
        },
      },
    },
  },
});

const config = mergeConfigs(defaultConfig, theme);
const system = createSystem(config);

export default system;

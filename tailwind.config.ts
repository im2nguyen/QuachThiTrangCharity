import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lam: {
          50: "#f4f6f8",
          100: "#e6eaef",
          200: "#cdd6df",
          300: "#a9b8c7",
          400: "#7d93a8",
          500: "#5e7388",
          600: "#4a5b6e",
          700: "#3d4a5a",
          800: "#353f4c",
          900: "#2f3742",
        },
        sen: {
          100: "#fbeef0",
          200: "#f6d8dd",
          300: "#eeb4be",
          400: "#e08a98",
        },
        la: {
          500: "#3f8f4f",
          600: "#327a41",
          700: "#286634",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        heading: ["var(--font-heading)", "var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

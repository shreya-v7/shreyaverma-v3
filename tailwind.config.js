/** @type {import('tailwindcss').Config} */
const monochrome = {
  50: "#fafafa",
  100: "#f4f4f5",
  200: "#e4e4e7",
  300: "#d4d4d8",
  400: "#a1a1aa",
  500: "#71717a",
  600: "#52525b",
  700: "#3f3f46",
  800: "#27272a",
  900: "#18181b",
  950: "#09090b",
};

module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        neutral: monochrome,
        zinc: monochrome,
        slate: monochrome,
        stone: monochrome,
        gray: monochrome,
        blue: monochrome,
        cyan: monochrome,
        sky: monochrome,
        indigo: monochrome,
        emerald: monochrome,
        green: monochrome,
        rose: monochrome,
        red: monochrome,
        yellow: monochrome,
        amber: monochrome,
        orange: monochrome,
        fuchsia: monochrome,
        violet: monochrome,
        purple: monochrome,
        pink: monochrome,
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
      },
      typography: {
        quoteless: {
          css: {
            "blockquote p:first-of-type::before": { content: "none" },
            "blockquote p:first-of-type::after": { content: "none" },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

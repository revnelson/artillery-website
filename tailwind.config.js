const plugin = require("tailwindcss/plugin")
const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // 'media' for OS detection or 'class' for manual switching
  theme: {
    extend: {
      animation: {
        "reverse-spin": "reverse-spin 1s linear infinite",
      },
      keyframes: {
        "reverse-spin": {
          from: {
            transform: "rotate(360deg)",
          },
        },
      },
      maxWidth: {
        "8xl": "1920px",
      },
      colors: {
        electric: "#db00ff",
        ribbon: "#0047ff",
        primary: "var(--primary)",
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
        },
        "primary-2": "var(--primary-2)",
        secondary: "var(--secondary)",
        "secondary-2": "var(--secondary-2)",
        hover: "var(--hover)",
        "hover-1": "var(--hover-1)",
        "hover-2": "var(--hover-2)",
        "accents-0": "var(--accents-0)",
        "accents-1": "var(--accents-1)",
        "accents-2": "var(--accents-2)",
        "accents-3": "var(--accents-3)",
        "accents-4": "var(--accents-4)",
        "accents-5": "var(--accents-5)",
        "accents-6": "var(--accents-6)",
        "accents-7": "var(--accents-7)",
        "accents-8": "var(--accents-8)",
        "accents-9": "var(--accents-9)",
        violet: { main: "var(--violet)", light: "var(--violet-light)" },
        pink: { main: "var(--pink)" },
        cyan: { main: "var(--cyan)" },
        yellow: { main: "#FFD700", ...defaultTheme.colors.yellow },
        blue: {
          dark: "#002B5C",
          light: "#5CA8FF",
          main: "#0057B8",
        },
        teal: "#32de8a",
        green: { main: "#00B83D" },
        red: { main: "#B80056" },
      },
      fontFamily: {
        sans: ["Inter var", ...defaultTheme.fontFamily.sans],
        exo: ["Exo", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    aspectRatio: {
      auto: "auto",
      square: "1 / 1",
      video: "16 / 9",
      1: "1",
      2: "2",
      3: "3",
      4: "4",
      5: "5",
      6: "6",
      7: "7",
      8: "8",
      9: "9",
      10: "10",
      11: "11",
      12: "12",
      13: "13",
      14: "14",
      15: "15",
      16: "16",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(function ({ addBase, theme }) {
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
        h2: { fontSize: theme("fontSize.xl") },
        h3: { fontSize: theme("fontSize.lg") },
      })
    }),
    "@tailwindcss/aspect-ratio",
    "@tailwindcss/forms",
    "@tailwindcss/line-clamp",
    "@tailwindcss/typography",
  ],
}

/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#3a86ff",
          DEFAULT: "#1e40af",
          dark: "#1e3a8a",
        },
        darkMode: {
          background: "#1e293b",
          foreground: "#64748b",
          text: "#e2e8f0",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [typography],
};

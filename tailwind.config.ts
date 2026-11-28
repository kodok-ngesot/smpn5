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
      fontFamily: {
        sans: [
          "'Plus Jakarta Sans'",
          "'Segoe UI'",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        navy: {
          50: "#f0f4f9",
          100: "#d9e3f0",
          200: "#b3c7e1",
          700: "#1b447c",
          800: "#123159",
          900: "#0B1F3A",
          950: "#071426",
        },
      },
    },
  },
  plugins: [],
};
export default config;

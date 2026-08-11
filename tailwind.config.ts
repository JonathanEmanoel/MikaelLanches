import type { Config } from "tailwindcss";

// Configuracao do Tailwind com as cores oficiais da Play Lanches.
const config: Config = {
  // Arquivos onde o Tailwind deve procurar classes usadas pela interface.
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/context/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/services/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/utils/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/types/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      // Paleta principal usada no design fast-food.
      colors: {
        playOrange: "#ff5a00",
        playYellow: "#ffd229",
        playBlack: "#111111",
        playCream: "#fff7e8"
      },
      // Sombra laranja para CTAs e elementos de destaque.
      boxShadow: {
        glow: "0 18px 45px rgba(255, 90, 0, 0.28)"
      }
    }
  },
  plugins: []
};

export default config;

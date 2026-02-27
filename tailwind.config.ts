import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "fusion-azul": "#0f172a",
        "fusion-azul-alt": "#1e3a5f",
        "fusion-amarelo": "#facc15",
        "fusion-amarelo-escuro": "#eab308",
      },
    },
  },
  plugins: [],
};

export default config;

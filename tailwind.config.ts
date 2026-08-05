import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cafe: {
          50: "#fdf6ec",
          100: "#f8e8cf",
          500: "#b5651d",
          600: "#8a4d16",
          700: "#5c3410",
          900: "#2b1806",
        },
      },
    },
  },
  plugins: [],
};
export default config;

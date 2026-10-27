import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        page: "#FFFFFF",
        panel: "#F4F6F8",
        ink: {
          DEFAULT: "#0A0A0A",
          secondary: "#1F2933",
        },
        accent: "#0033A0",
        alert: "#B00020",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Arial Black", "sans-serif"],
        body: ["var(--font-body)", "Arial", "sans-serif"],
      },
      screens: {
        ultra: "1920px",
      },
      minHeight: {
        touch: "56px",
      },
      minWidth: {
        touch: "56px",
      },
    },
  },
  plugins: [],
};
export default config;

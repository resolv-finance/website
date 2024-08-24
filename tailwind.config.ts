import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      screens: {
        sm: "640px",
        md: "768px",
        lg: "798px",
      },
    },
    colors: {
      stoneGray: "#F7F7F7",
      stoneGrayDark: "#E6E6E6",
      black: "#000000",
      blue: {
        dark: "#2a72aa",
        DEFAULT: "#e6f4ff",
        light: "#c1e4ff",
      },
      current: "currentColor",
      gray: {
        border: "#c9c9c9",
        dark: "#2b2b2b",
        DEFAULT: "#f7f7f7",
        light: "#5f5f5f",
      },
      green: {
        DEFAULT: "#e0ffef",
        success: "#75b798",
      },
      red: "#ea868f",
      transparent: "transparent",
      white: "#ffffff",
    },
    fontSize: {
      // when base is 16px
      sm: "0.9375rem", // 15px
      lg: ["1.125rem", "1.388888"], // 18px 25px
      xl: ["1.1875rem", "1.5rem"], // 19px 24px
      "2xl": "1.25rem", // 20px
      "3xl": ["1.4375rem", "1.6875rem"], // 23px 27px
      "4xl": "1.5rem", // 24px
      "5xl": ["1.6875rem", "2.125rem"], // 27px 34px
      "6xl": ["2rem", "2.3125rem"], // 32px 37px
      "7xl": ["2.25rem", "2.875rem"], // 36px 46px
      "8xl": ["2.375rem", "3rem"], // 38px 48px
      "9xl": ["2.5rem", "3rem"], // 40px 48px
      "10xl": ["3.75rem", "4.1875rem"], // 60px 67px
      "11xl": "3.9375rem", // 63px
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-to-r": "linear-gradient(231deg, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "1.6875rem", // 27px
        xl: "1.8125rem", // 29px
        "2xl": "2.0625rem", // 33px
        "25xl": "2.3125rem", // 37px
        "3xl": "2.5625rem", // 41px
        "4xl": "3.125rem", // 50px
        full: "3.375rem", // 54px
      },
      fontFamily: {
        raleway: ["Raleway", "sans-serif"],
      },
      height: {
        email: "4rem",
        "98": "25rem",
      },
      lineHeight: {
        "extra-tight": "1.15",
      },
      spacing: {
        "h-logo": "2.44rem",
        explore: "1.125rem",
        "10": "2.658rem",
        "17": "4.0625rem",
        "18": "4.6rem",
        "34": "8.698rem",
      },
      width: {
        email: "30rem",
        "f-logo": "3.375rem",
        "13": "3.4375rem",
        "69": "17.2rem",
      },
      boxShadow: {
        "resolv-button":
          "0px 6px 19.6px -5px rgba(39, 49, 58, 0.12), 0px 0px 4px 2px rgba(255, 255, 255, 0.64) inset, 0px 5px 2px 0px rgba(255, 255, 255, 0.55) inset",
      },
    },
  },
  plugins: [],
};

export default config;

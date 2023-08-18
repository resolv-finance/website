import type { Config } from 'tailwindcss';

const defaultTheme = require('tailwindcss/defaultTheme');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      black: '#000000',
      blue: {
        dark: '#2a72aa',
        DEFAULT: '#e6f4ff',
        light: '#c1e4ff',
      },
      current: 'currentColor',
      gray: {
        border: '#d8d8d8',
        dark: '#2b2b2b',
        DEFAULT: '#f7f7f7',
        light: '#5f5f5f',
      },
      green: {
        DEFAULT: '#e0ffef',
        success: '#75b798',
      },
      red: '#ea868f',
      transparent: 'transparent',
      white: '#ffffff',
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      borderRadius: {
        '4xl': '3rem',
      },
      fontFamily: {
        raleway: ['Raleway', ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        'extra-tight': '1.15',
      },
      width: {
        'email': '30rem',
      },
    },
  },
  plugins: [],
}

export default config

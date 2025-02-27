/** @type {import('tailwindcss').Config} */
const { fontFamily } = require('tailwindcss/defaultTheme');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        josefin: ['Josefin Sans', ...fontFamily.sans],
        titillium: ['Titillium Web', ...fontFamily.sans],
      },
      colors: {
        'dark-bg': '#0F172A',
        'dark2': '#0B1121',
        'white': '#F1F6F9',
        'color2': '#394867',
        'color3': '#D4ADFC',
        cursorDotLight: "black",
        cursorOutlineLight: "rgba(0, 0, 0, 0.5)",
        cursorDotNight: "white",
        cursorOutlineNight: "rgba(255, 255, 255, 0.5)",
      },
      backgroundImage: {
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        gradient: {
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border': {
          to: { '--border-angle': '360deg' },
        }
      },
      animation: {
        'border': 'border 4s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["night", "light"]
  },
};

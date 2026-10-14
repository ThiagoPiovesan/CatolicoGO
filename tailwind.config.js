/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        church: {
          gold: '#e5a910',
          'gold-light': '#ffd84d',
          crimson: '#b82e33',
          'crimson-dark': '#8e1616',
          blue: '#0b6fb8',
          'blue-dark': '#005391',
          cream: '#fbf5f0',
          sand: '#ecdcd3',
          dark: '#0c1322',
        }
      }
    },
  },
  plugins: [],
}

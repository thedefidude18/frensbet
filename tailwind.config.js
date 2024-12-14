/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1a1b1f',
          lighter: '#2a2b2f',
        },
      },
      fontFamily: {
        sans: ['SF UI Rounded', 'system-ui', 'sans-serif'], // Use 'SF UI Rounded' font
      },
    },
  },
  plugins: [],
};

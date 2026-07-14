/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'sinme-azul': '#0A2E50',
        'sinme-dorado': '#C59B63',
      }
    },
  },
  plugins: [],
}
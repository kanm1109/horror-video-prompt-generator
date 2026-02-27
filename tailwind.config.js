/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        horror: {
          dark: '#0a0a0a',
          darker: '#050505',
          blood: '#8b0000',
          bloodLight: '#a52a2a',
          mist: '#2a2a2a',
          ghostly: '#e8e8e8'
        }
      },
      fontFamily: {
        horror: ['Creepster', 'cursive'],
        mono: ['Courier New', 'monospace']
      }
    },
  },
  plugins: [],
}

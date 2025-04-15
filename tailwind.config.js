// 🌿 tailwind.config.js – Agroverso regenerativo
import { defineConfig } from 'tailwindcss'

export default defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        greenRegenerative: '#4CAF50',
        blueWisdom: '#2196F3',
        grayIntelligent: '#607D8B',
        yellowEnergy: '#FFEB3B',
        redAlert: '#F44336'
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        opensans: ['Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
})

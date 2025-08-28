import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        base: '#1E1E1E',
        card: '#2B2B2B',
        text: '#FAFAFA',
        neon: '#00E0FF',
        purple: '#9B30FF',
        retrored: '#FF3B3B',
        gold: '#FFD700'
      },
      boxShadow: {
        glow: '0 0 0 2px rgba(0,224,255,0.6), 0 0 20px rgba(0,224,255,0.4)'
      }
    },
  },
  plugins: [],
}
export default config

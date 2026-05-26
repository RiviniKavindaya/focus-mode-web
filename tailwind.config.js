/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        display: ['"Syne"', 'system-ui', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        obsidian: {
          950: '#040407',
          900: '#08090f',
          800: '#0f1018',
          700: '#161722',
          600: '#1e1f2e',
          500: '#272840',
        },
        aurora: {
          blue:  '#4f9cf9',
          indigo: '#7c6af7',
          violet: '#a855f7',
          teal: '#2dd4bf',
          soft: '#c4b5fd',
        },
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 12s ease-in-out infinite reverse',
        'pulse-ring': 'pulseRing 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%':     { transform: 'translateY(-20px) rotate(2deg)' },
          '66%':     { transform: 'translateY(10px) rotate(-1deg)' },
        },
        pulseRing: {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.4 },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // Exact brand palette from prompt
          charcoal: '#171513',
          goldenYellow: '#F5A900',
          burntOrange: '#E87516',
          warmCream: '#F5E9D2',
          pureWhite: '#FFFFFF',

          // Semantic surfaces & accents
          surfaceDark: '#171513',
          darkCharcoal: '#171513',
          surfaceCard: '#1E1B18',
          surfaceMuted: '#27221E',
          surfaceElevated: '#322B26',
          burgundy: '#241B16',
          richRed: '#D95E16',
          brightRed: '#E87516',
          fieryOrange: '#E87516',
          amber: '#F5A900',
        }
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Outfit"', 'sans-serif'],
        heading: ['"Outfit"', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'glow-orange': '0 0 25px -3px rgba(232, 117, 22, 0.45)',
        'glow-yellow': '0 0 25px -3px rgba(245, 169, 0, 0.5)',
        'glow-red': '0 0 35px -5px rgba(232, 117, 22, 0.5)',
        'menu-card': '0 10px 30px -10px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(245, 169, 0, 0.1)',
        'dripping-glow': '0 10px 25px -5px rgba(245, 169, 0, 0.35)',
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'drip': 'drip 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.9', transform: 'scale(1.02)' },
        },
        drip: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.08)' },
        }
      }
    },
  },
  plugins: [],
}

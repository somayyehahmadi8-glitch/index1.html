import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0A192F',
          light: '#112D4E',
          50: '#E8EDF3',
          100: '#D1DAE6',
          200: '#A3B5CD',
          300: '#7590B4',
          400: '#466B9B',
          500: '#112D4E',
          600: '#0E2640',
          700: '#0A192F',
          800: '#071325',
          900: '#040C18',
        },
        champagne: {
          DEFAULT: '#C5A059',
          light: '#D4B876',
          dark: '#A8853E',
        },
        parchment: '#FDFCFB',
        warmgray: {
          DEFAULT: '#4A5568',
          light: '#718096',
          bg: '#F7F6F3',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        section: ['clamp(2rem, 4vw, 3rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      maxWidth: {
        container: '1320px',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          soft: 'var(--color-primary-soft)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          hover: 'var(--color-secondary-hover)',
          soft: 'var(--color-secondary-soft)',
        },
        accent: {
          DEFAULT: 'var(--color-teal)',
          soft: 'var(--color-teal-soft)',
        },
        highlight: {
          DEFAULT: 'var(--color-amber)',
          soft: 'var(--color-amber-soft)',
        },
        sand: {
          DEFAULT: 'var(--color-sand)',
          soft: 'var(--color-sand-soft)',
        },
        neutral: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          elevated: 'var(--color-surface-elevated)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
        },
      },
      fontFamily: {
        sans: ['Sarabun', 'Segoe UI', 'system-ui', 'sans-serif'],
        serif: ['Alegreya', 'Georgia', 'serif'],
        display: ['Alegreya', 'serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        primary: '0 4px 14px var(--color-primary-soft)',
        secondary: '0 4px 14px var(--color-secondary-soft)',
      },
      animation: {
        'spin-slow': 'spin 0.8s linear infinite',
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-in': 'slideIn 0.25s ease forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideIn: { from: { opacity: '0', transform: 'translateY(8px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: 'var(--brand-orange)',
          'orange-hover': 'var(--brand-orange-hover)',
          'orange-soft': 'var(--brand-orange-soft)',
          'orange-light': 'var(--brand-orange-soft)',
          green: 'var(--brand-green)',
          'green-mid': 'var(--brand-green-mid)',
          'green-soft': 'var(--brand-green-soft)',
          'green-light': 'var(--brand-green-soft)',
        },
        neutral: {
          bg: 'var(--color-bg)',
          surface: 'var(--color-surface)',
          border: 'var(--color-border)',
          text: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
          dim: 'var(--color-text-dim)',
          light: 'var(--color-surface)',
        },
      },
      fontFamily: {
        sans: ['Geist', 'DM Sans', 'Segoe UI', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
        'card-hover': '0 4px 12px rgba(0,0,0,0.08)',
        orange: '0 4px 14px rgba(224,90,30,0.32)',
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

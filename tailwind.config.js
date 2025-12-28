/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        border: 'var(--color-border)',
        accent: 'var(--color-accent)',
        'neo-bg': '#FFFCF0',
        'neo-black': '#18181b',
        'neo-primary': '#22d3ee',
        'neo-secondary': '#fb7185'
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px var(--color-border)',
        'neo-sm': '2px 2px 0px 0px var(--color-border)',
        'neo-lg': '6px 6px 0px 0px var(--color-border)',
        'neo-brutal': '4px 4px 0px 0px rgba(24,24,27,1)',
        'neo-brutal-sm': '2px 2px 0px 0px rgba(24,24,27,1)',
        'neo-brutal-lg': '6px 6px 0px 0px rgba(24,24,27,1)'
      }
    }
  },
  plugins: []
}


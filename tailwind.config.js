/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-purple': '#2e1261',
        'brand-red': '#F02232',
        'brand-dark': '#0a0a0f',
        'brand-white': '#FFFFFF',
        'brand-muted': '#a0a0b0',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
        wider: '0.1em',
      },
      lineHeight: {
        tight: '1.05',
      },
      maxWidth: {
        content: '1200px',
        column: '680px',
        narrow: '480px',
      },
      padding: {
        section: '140px',
        'section-mobile': '80px',
      },
    },
  },
  plugins: [],
}

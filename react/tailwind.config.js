/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#f8fafc',
          soft: '#f1f5f9'
        },
        primary: {
          DEFAULT: '#22c55e',
          dark: '#16a34a'
        },
        accent: '#10b981',
        text: {
          DEFAULT: '#0f172a',
          soft: '#334155',
          inverse: '#ffffff'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2,6,23,0.08)'
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol'
        ]
      }
    }
  },
  plugins: []
};

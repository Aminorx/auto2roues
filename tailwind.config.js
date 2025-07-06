/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-bolt': {
          50: '#E0F2F5',
          100: '#B3DDE4',
          200: '#86C8D3',
          500: '#067D92',
          600: '#056A7B',
          700: '#045764',
        },
      },
      fontFamily: {
        'sans': ['Nunito Sans', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
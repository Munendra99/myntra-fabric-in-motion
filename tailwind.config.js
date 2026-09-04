/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        myntra: {
          pink: '#FF3E6C',
          pinkHover: '#E7335D',
          pinkLight: '#FFF1F4',
          teal: '#03A685',
          orange: '#FF5722',
          charcoal: '#282C3F',
          muted: '#535766',
          lightMuted: '#94969F',
          border: '#EAEAEC',
          bgPage: '#F5F5F6'
        }
      },
      fontFamily: {
        sans: ['Assistant', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 4px rgba(40, 44, 63, 0.08)',
        'sticky': '0 -2px 10px rgba(0, 0, 0, 0.06)',
        'mobile-frame': '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
}

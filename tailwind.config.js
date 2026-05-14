// Tailwind theme: brand palette derived from the e2People logo (deep indigo / violet)
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef0ff',
          100: '#dde0ff',
          200: '#bcc2ff',
          300: '#959dfb',
          400: '#7077f0',
          500: '#5158e0',
          600: '#3f44c7',
          700: '#3437a3',
          800: '#2c2e85',
          900: '#23245f',
          DEFAULT: '#3437a3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(52, 55, 163, 0.18)',
      },
    },
  },
  plugins: [],
}

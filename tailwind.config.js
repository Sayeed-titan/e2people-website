/*
 * TAILWIND THEME — e2People design system
 * Brand palette is built around the logo's deep indigo (#3D3A8C)
 * and a soft lavender accent. Canvas is a warm off-white; ink is
 * the near-black used for the single "dark moment" section.
 *
 * HOW TO TWEAK:
 *  • Change brand hue: edit the `brand` scale below
 *  • Change canvas tone: edit `canvas.DEFAULT`
 *  • Change dark-section color: edit `ink.DEFAULT`
 */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          DEFAULT: '#FAFAFA',
          warm: '#F5F4F0',
        },
        ink: {
          DEFAULT: '#0F1020',
          soft:    '#181A2E',
          muted:   '#2A2C42',
        },
        brand: {
          50:  '#EFEEFA',
          100: '#DAD7F2',
          200: '#B6B0E6',
          300: '#9189D8',
          400: '#6E66C8',
          500: '#544CB2',
          600: '#46419E',
          700: '#3D3A8C',
          800: '#33307A',
          900: '#23214F',
          accent: '#8B89D9',
          DEFAULT: '#3D3A8C',
        },
        mute: {
          DEFAULT: '#6B6B73',
          soft: '#9A9AA3',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        editorial: '0.22em',
      },
      boxShadow: {
        soft:  '0 24px 60px -28px rgba(15, 16, 32, 0.18)',
        card:  '0 12px 32px -16px rgba(15, 16, 32, 0.12)',
        ring:  '0 0 0 1px rgba(15, 16, 32, 0.06)',
      },
      fontSize: {
        display: ['clamp(2.75rem, 7vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        eyebrow: ['0.75rem', { letterSpacing: '0.22em', lineHeight: '1' }],
      },
      backgroundImage: {
        'dot-grid': "radial-gradient(rgba(15, 16, 32, 0.06) 1px, transparent 1px)",
      },
      backgroundSize: {
        'dot-grid': '22px 22px',
      },
      keyframes: {
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-left': {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-right': {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'underline-grow': {
          '0%': { scaleX: '0' },
          '100%': { scaleX: '1' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'slide-up': 'slide-up 0.6s ease-out',
        'slide-left': 'slide-left 0.6s ease-out',
        'slide-right': 'slide-right 0.6s ease-out',
        'fade-in': 'fade-in 0.6s ease-out',
        'underline-grow': 'underline-grow 0.4s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

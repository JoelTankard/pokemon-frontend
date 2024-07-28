/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        jade: {
          50: '#eafff5',
          100: '#cdfee5',
          200: '#a0fad1',
          300: '#63f2b9',
          400: '#25e29d',
          500: '#00bd7e',
          600: '#00a46e',
          700: '#00835c',
          800: '#00674a',
          900: '#00553e'
        }
      },
      screens: {
        'hover-hover': { raw: '(hover: hover)' }
      },
      transitionDuration: {
        400: '400ms'
      },
      animation: {
        blink: 'blink 0.8s linear infinite',
      },

      keyframes: {
        blink: {
          '0%, 24%, 75%, 100%': { opacity: 1 },
          '25%, 74%': { opacity: 0 },
        }
      }
    }
  },
  plugins: []
}

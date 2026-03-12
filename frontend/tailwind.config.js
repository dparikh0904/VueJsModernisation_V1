/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9dbfe',
          300: '#7cc0fd',
          400: '#36a3f9',
          500: '#5e72e4',
          600: '#525fd5',
          700: '#4650c6',
          800: '#3e45b7',
          900: '#363ba8',
        },
        success: '#2dce89',
        danger: '#f5365c',
        warning: '#fb6340',
        info: '#11cdef',
        secondary: '#f7fafc',
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        argon: '0 7px 14px rgba(50, 50, 93, 0.1), 0 3px 6px rgba(0, 0, 0, 0.08)',
      },
    },
  },
  plugins: [],
};
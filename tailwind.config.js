/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      spacing: {
        '15': '3.75rem', // 60px
        '50': '12.5rem', // 200px
        '70': '17.5rem', // 280px
        '80': '20rem', // 320px
      },
      animation: {
        'fade-in-out': 'fadeInOut 3s ease-in-out infinite',
        'modal-slide-in': 'modalSlideIn 0.3s ease-out',
      },
      keyframes: {
        fadeInOut: {
          '0%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { opacity: '0.8' },
        },
        modalSlideIn: {
          'from': { opacity: '0', transform: 'translateY(-20px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}

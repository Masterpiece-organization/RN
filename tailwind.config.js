/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    // colors: {
    //   black: '#222222',
    // },
    extend: {
      backgroundColor: {
        black: '#121212', // 변경하려는 새로운 색상 값
      },
      borderColor: {
        black: '#121212', // 변경하려는 새로운 색상 값
      },
      textColor: {
        black: '#121212', // 변경하려는 새로운 색상 값
      },
    },
  },
  plugins: [],
};

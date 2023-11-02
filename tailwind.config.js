/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        'azul-button': '#010922',
      },
      backgroundImage:{
        'fundo': "url('/assets/images/image4.png')",
      }
    },
  },
  plugins: [],
}


/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", // arquivo principal
    "./src/**/*.{js,jsx,ts,tsx}", // todos os arquivos dentro da pasta src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

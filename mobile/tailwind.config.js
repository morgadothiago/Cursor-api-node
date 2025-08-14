/** @type {import('tailwindcss').Config} */
module.exports = {
  // Caminhos para todos os arquivos onde você usa classes do NativeWind
  content: [
    "./App.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}", // Inclui caso você tenha pastas dentro de src
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}

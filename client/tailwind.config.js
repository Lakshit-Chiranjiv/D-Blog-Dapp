/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'white': '1px 1px 10px 0px rgba(255,255,255,0.05)',
      }
    },
  },
  plugins: [],
}

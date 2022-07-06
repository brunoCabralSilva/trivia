/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lilas': '#B53DC4'
      },
      spacing: {
        'great': '22rem',
        'greatMobile': '24rem',
        '80vh': '85vh'
      }
    },
  },
  plugins: [],
}

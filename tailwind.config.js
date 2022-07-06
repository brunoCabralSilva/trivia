/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    minHeight: {
      '80vh': '85vh',
    },
    extend: {
      colors: {
        'lilas': '#B53DC4',
        'half-transparent': 'rgb(181,61,196,0.4)',
        'half-transparent2': 'rgb(0,0,0,0.7)',
        'test': '#590273',

      },
      backgroundImage: {
        'hero-pattern': "url('../src/img/ok.jpg')",
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

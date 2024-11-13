/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: '#0B0C10',
        darker: '#1F2833',
        light: '#C5C6C7',
        accent: '#d73600',
        primary: '#ac8506',
      },
      fontFamily: {
        // Set Raleway as the default for headings
        heading: ['Raleway', 'sans-serif'],
        // Set Roboto as the default for paragraphs
        body: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
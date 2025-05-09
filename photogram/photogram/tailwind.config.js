/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{html,js,jsx,ts,tsx}",
      "./public/**/*.html",
    ],
    theme: {
      extend: {
        colors: {
          primary: '#0070f3', // Define a custom primary color
          secondary: '#f0f0f0', // Define a custom secondary color
        },
        spacing: {
          '128': '32rem', // Define a custom spacing value
        },
        display: ["group-hover"]
      },
      
    },
    plugins: [],
  };
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "hsl(221, 83%, 53%)", // A professional blue for admin
        "primary-foreground": "#ffffff",
        background: "#f3f4f6", // gray-100
        card: "#ffffff",
      }
    },
  },
  plugins: [],
}

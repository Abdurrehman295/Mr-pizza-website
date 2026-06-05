/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#991b1b",
          dark: "#7f1d1d",
          light: "#dc2626",
        },
      },
    },
  },
  plugins: [],
};

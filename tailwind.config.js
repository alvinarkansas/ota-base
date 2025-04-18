/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      neutral: {
        100: "#F1F0F5",
        200: "#D7D7DB",
        300: "#AFB4BB",
        400: "#34353E",
        500: "#1C1C27",
      },
    },
    extend: {
      colors: {
        primary: {
          100: "#F29406",
          200: "#F27706",
          300: "#DB6900",
        },
      },
    },
  },
  plugins: [],
};

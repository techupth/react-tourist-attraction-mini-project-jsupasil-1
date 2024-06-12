/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dodgerblue: "rgb(47,156,220)",
        lightblue: "rgb(159,205,237)",
      },
    },
  },
  plugins: [],
};

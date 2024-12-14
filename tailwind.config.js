/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        concert: ['"Concert One"', "cursive"],
        squada: ['"Squada One"', "sans-serif"],
        nepali: ["Noto Sans Devanagari", "sans-serif"],

        jaini: ["Jaini", "Noto Sans Devanagari"],
        kalam: ["Kalam", "Noto Sans Devanagari"],

        amita: ["amita", "Noto Sans Devanagari"],
      },
    },
  },
  plugins: [],
};


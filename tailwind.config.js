/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headers: ["Rakkas-Regular"],
        secondary: ["sans-serif"],
        body: ["Cairo-Regular", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#F0E8FC",
          100: "#E0D3F8",
          200: "#C1A7F1",
          300: "#A17EE7",
          400: "#8055DD",
          500: "#5F2DD2",
          600: "#4A26A6",
          700: "#361D7C",
          800: "#241551",
          900: "#120B29",
          950: "#100925",
        },
        slate: {
          50: "#FAFAFA",
          100: "#EBEBEB",
          200: "#CFCFCF",
          300: "#B0B0B0",
          400: "#969696",
          500: "#7C7C7C",
          600: "#616161",
          700: "#494949",
          800: "#323232",
          900: "#1B1B1B",
          950: "#111111",
        },
      },
    },
  },
  plugins: [],
};

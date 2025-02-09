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
        primary: {
          main: "#FAFAFA",
          lighter: "#FFFFFF",
          darker: "#F3F4F6",
        },
        secondary: {
          main: "#4338CA",
          lighter: "#6366F1",
          darker: "#3730A3",
        },
        accent: {
          main: "#312E81",
          lighter: "#4338CA",
          darker: "#27284B",
        },
        text: {
          primary: "#111827",
          secondary: "#6B7280",
          light: "#9CA3AF",
        },
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        headers: ["Rakkas", "Badeen Display"],
        secondary: ["Aref Ruqaa", "sans-serif"],
        body: ["Cairo", "sans-serif"],
      },
      colors: {
        primary: {
          main: "#FAFAFA",
          lighter: "#FFFFFF",
          darker: "#F3F4F6",
          usage: "60% - خلفيات وكروت رئيسية",
        },
        secondary: {
          main: "#4338CA",
          lighter: "#6366F1",
          darker: "#3730A3",
          usage: "30% - عناصر تفاعلية وأزرار",
        },
        accent: {
          main: "#312E81",
          lighter: "#4338CA",
          darker: "#27284B",
          usage: "10% - تفاصيل وتأكيدات",
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

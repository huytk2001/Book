/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      flex: { 2: "2 2 0%", 3: "3 3 0%" },

      colors: {
        primaryGreen: "#0DA487",
        secondaryRed: "#FF7272",
        darkGreen: "#0E947A",
        lightGreen: "#D6F8F1",
        orange: "#FFA53B",
        yellow: "#FFA53B",
        textBlack: "#212529",
        textGray: "#4A5568",
        backgroundWhite: "#FFFFFF",
        backgroundLightGray: "#F8F8F8",
        backgroundLightYellow: "#F6F5F0",
        lightGray: "#6c757d",
        darkGray: "#e9ecef",
        lineGray: "#ececec",
        text2222: "#222222",
        text3333: "#333333",
        text7777: "#777",
        textddd: "#ddd",
        textwhite: "#fff",
        textred: "#C92127",
        textbg: "#f0f0f0",
        texthot: "#FCDDEF",

        "theme-color": "#5ecee4",
        "them-gray": "#f8f8f8",
        "theme-color2":
          "linear-gradient(90.56deg, var(#0e947a) 8.46%, var(#0da487;) 62.97%)",
        "text-black": "#5e5a54",
        "theme-border": "#c1c1c1",
        "theme-mxh": "#4a5568",
        "theme-fill": "#ffb321",
      },
    },
  },
  plugins: [],
};

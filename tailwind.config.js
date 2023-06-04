/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // ## Screen sizes
      screens: {
        sm: "375px",
        md: "600px",
        lg: "976px",
        lx: "1440px",
      },
      // colors
      colors: {
        clLightBG: "#ffffff",
        clDarkBG: "#212121",
      },
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "open-sans": [
          "Open Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
        ],
        roboto: ["Roboto", "ui-sans-serif", "system-ui", "-apple-system"],
        colors: {
          primary: "rgba(30, 40, 50, 1)",
        },
      },
    },
    plugins: [],
  },
};

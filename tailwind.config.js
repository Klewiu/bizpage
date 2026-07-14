/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        alabaster: "#d8dbe2",
        powder: "#a9bcd0",
        pacific: "#58a4b0",
        charcoal: "#373f51",
        carbon: "#1b1b1e",
      },
      boxShadow: {
        soft: "0 18px 40px -18px rgba(27, 27, 30, 0.35)",
      },
    },
  },
  plugins: [],
};

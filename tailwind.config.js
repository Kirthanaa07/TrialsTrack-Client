const { nextui } = require('@nextui-org/react');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.html", "./src/**/*.js", "./styles/**/*.css,./ node_modules / @nextui - org / theme / dist/**/ *.{ js, ts, jsx, tsx }'],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [nextui()],

};

// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#7d3865",
        secondary: "#c1a7b0",
      },
      textColor: {
        'primary': '#7d3865',
        'secondary': '#c1a7b0',
      },
      backgroundColor: {
        'primary': '#7d3865',
        'secondary': '#c1a7b0',
      },
      backgroundImage: {
        'gradient-primary': 'var(--primary-gradient)',
        'gradient-light': 'var(--light-gradient)',
      }
    },
  },
  plugins: [],
};

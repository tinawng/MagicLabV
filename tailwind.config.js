module.exports = {
  darkMode: false,
  theme: {
    transitionDuration: {
      DEFAULT: '250ms',
    },
    extend: {
      colors: {
        brand: {
          '900': '#fff',
          '800': '#A7ABAF', // Text [h1, h2], enabled button
          '700': '#8E9297',
          '600': '#8C8F95', // Ligth text [h3]
          '500': '#8A8E93', // Very list text [h4, h5]
          '400': '#232428', // Button Border
          '300': '#393C43', // Separator
          '200': '#36393F', // Accent Background
          '150': '#34373C', // White Background hover
          '100': '#2F3136', // Background
          '90': '#202225',  // Darker background (nav)
        }
      },
      fontSize: {
        '2xs': '.5rem',
      },
    }
  },
  variants: {
  },
  plugins: [],
}

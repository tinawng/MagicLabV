module.exports = {
  darkMode: false,
  theme: {
    transitionDuration: {
      DEFAULT: '250ms',
    },
    extend: {
      colors: {
        brand: {
          '900': '#000',    // Button

          '800': '#131314', // Text [h1, h2]
          '600': '#46474E', // Ligth text [h3]
          '500': '#6E7074', // Very list text [h4, h5]
          '400': '#CBCBCB', // Button Border
          '300': '#E8E8E9', // Separator
          '200': '#F3F4F4', // Accent Background

          '100': '#fff',    // Background

          'accent': '#518ECC',
        }
      },
      fontSize: {
        '2xs': '.6rem',
      },
    }
  },
  variants: {
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

module.exports = {
  content: [
    './app/**/*.{html,js,tsx,ts}',
    './components/**/*.{html,js,tsx,ts}'
  ],
  theme: {
    extend: {
      screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
       },
      colors: {
        'dimGray': '#707070',
        'blue': '#1fb6ff',
        'background' : '#fff6fe',
        'pink': '#ff49db',
        'primary': '#b8147e',
        'green': '#13ce66',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
        'lightGray': '#D1CDCD',
        'surface': '#ffcffb',
        'neutral' : '#ffe2fc'
      },
      fontFamily: {
        man: ['ManropeR', 'ManropeM'],
        serif: ['Merriweather', 'serif'],
        airbo: 'AirBold',
        airm: 'AirMedium',
        airl: 'AirLight',
        airbl: 'AirBlack',
        airbobl: 'AirBoldBlack'
      },
      fontSize: {
        default: '13px',
        h0: '36px',
        h1: '24px',
        h2: '17px',
        h3: '15px',
        h4: '14px',
        h5: '13px',
      }
    },
  },
  plugins: [],
} satisfies Config


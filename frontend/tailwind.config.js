/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
        sans: ['Raleway', 'sans-serif'],
      },
      colors: {
        primary: {
          50: "#E7E5EB",
          100: "#DCDAE2",
          200: "#BFBACA",
          300: "#9F97AF",
          400: "#69607D",
          500: "#6D6482",
          600: "#726888",
          700: "#756A8A",
          800: "#7C7292",
          900: "#7F7595",
          950: "#7F7595"
        },
        neutral: {
          50: '#D9DCDD',
          100: '#C0C5C6',
          400: '#A7ADAF',
          500: '#8E9698',
          600: '#5C676A',
          700: '#04151A',
        },
        secondary: {
          50: "#F3EAE7",
          100: "#EDDFD9",
          200: "#E1CAC1",
          300: "#D4B3A6",
          400: "#C49886",
          500: "#BF907D",
          600: "#BE8D79",
          700: "#B9846F",
          800: "#B47B65",
          900: "#B0755E",
          950: "#AD6F57"
        },
        stroke: {
          light: '#F7F7F9',
          medium: '#EEF0F4',
          dark: '#0F0F0F',
        },
        success: {
          50: "#D1E5D7",
          100: "#C4DECC",
          200: "#A7CEB2",
          300: "#8CBF9C",
          400: "#71B084",
          500: "#5EA674",
          600: "#509063",
          700: "#457D56",
          800: "#3A6948",
          900: "#2F553B",
          950: "#2A4B34"
        },
        warning: {
          50: "#F5E5EA",
          100: "#F0D6DE",
          200: "#E2B0BF",
          300: "#D2849B",
          400: "#B34164",
          500: "#B74366",
          600: "#BB4468",
          700: "#BE4B6E",
          800: "#BF4F71",
          900: "#C05374",
          950: "#C35A7A"
        },
        info: {
          50: "#F4F2F0",
          100: "#F2EFED",
          200: "#EEE9E7",
          300: "#ECE7E4",
          400: "#E8E2DF",
          500: "#DDD4D0",
          600: "#D2C7C1",
          700: "#C5B6AF",
          800: "#B7A49A",
          900: "#A58E82",
          950: "#9D8376"
        },
        error: {
          50: "#F8C5B9",
          100: "#F5AE9D",
          200: "#F0836A",
          300: "#EB5837",
          400: "#D73A15",
          500: "#C33313",
          600: "#B12E11",
          700: "#99280F",
          800: "#87230D",
          900: "#701D0B",
          950: "#661B0A"
        },
      },
    },
  },
  plugins: [],
}

import { pink } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          inter: ['Inter', 'sans-serif'],
        },
        colors: {
          windowsblue: '#081554',
          lightwindowsblue:'#294892',

        },
      },
    },
    plugins: [],
  }
  
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito Sans', 'sans-serif'],
      },
      colors: {
        'scrollbar': {
          base: '#292524',  // stone-800
          thumb: '#a87f58', // Your custom brown color
          track: '#1c1917',  // stone-900
        }
      }
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-custom': {
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: 'var(--scrollbar-track)',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'var(--scrollbar-thumb)',
            borderRadius: '4px',
            '&:hover': {
              backgroundColor: 'var(--scrollbar-thumb-hover)',
            },
          },
          '--scrollbar-track': '#1c1917',
          '--scrollbar-thumb': '#a87f58',
          '--scrollbar-thumb-hover': '#8b6646',
        },
      });
    },
  ],
};

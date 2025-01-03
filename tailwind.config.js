/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',         // Include the main HTML file
    './src/**/*.{js,jsx}',  // Include all JS and JSX files in the src folder
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          light: '#D6A6FF',  // Light purple
          DEFAULT: '#6A0DAD',  // Default purple
          dark: '#4B0082',  // Dark purple
        },
        gold: {
          light: '#f5cc00',  // Light gold
          DEFAULT: '#FFD700',  // Default gold
          dark: '#B8860B',  // Dark gold
          100: '#ecd598',  // Light gold
        },
      },
      fontFamily: {
        cabin: ['Cabin', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

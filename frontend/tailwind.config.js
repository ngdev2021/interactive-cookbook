module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      // center: true, // Center the container
      margin: '0 auto', // Auto-center the content
      // padding: '1rem', // Add padding
      screens: {
        sm: '600px',
        md: '728px',
        lg: '984px',
        xl: '1280px', // Override the xl breakpoint
        '2xl': '1400px', // Add a custom 2xl breakpoint
      },
    },
    extend: {},
  },
  plugins: [],
};

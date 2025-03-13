/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {}, // Use @tailwindcss/postcss instead of tailwindcss directly
    autoprefixer: {},
  },
};

export default config;

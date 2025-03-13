/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: {
    tailwindcss: {}, // Use @tailwindcss/postcss instead of tailwindcss directly
    autoprefixer: {},
    '@tailwindcss/postcss':{}
  },
};
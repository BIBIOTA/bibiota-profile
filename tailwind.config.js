/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
		'./docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
  ],
  options: {
    safelist: ['html', 'body'],
  },
  theme: {
    extend: {},
  },
  plugins: [],
}

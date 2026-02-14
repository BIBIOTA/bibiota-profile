/** @type {import('tailwindcss').Config} */
export default {
  content: [
		'./docs/.vitepress/**/*.{js,ts,vue}',
		'./docs/**/*.md',
  ],
  safelist: ['html', 'body'],
  theme: {
    extend: {},
  },
  plugins: [],
}

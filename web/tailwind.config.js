/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/**/*.{js,jsx,ts,tsx}",
	],
	theme: {
		extend: {},
		colors: {
			primary: '#141e30',
			secondary: '#4EF4F4',
			terciary: '#e3b6b6',
			rosa: '#F5CECE',
			danger: '#d42252',
			warning: '#ffc107',
			info: '#05F2F2',
			success: '#3BAD21',
			light: '#EFF6FF',
			dark: '#000000',
		}
	},
	plugins: [
		require('@tailwindcss/forms')
	],
}

module.exports = {
	mode: 'jit',
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				dark: '#0C0C0C',
				primary: '#F37E00'
			}
		},
		cursor: {
			auto: 'url(cursor.png), auto',
			default: 'url(cursor.png), auto',
			pointer: 'url(hand.png), auto',
			text: 'url(cursor.png), auto'
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
}

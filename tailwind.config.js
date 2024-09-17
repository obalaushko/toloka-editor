/** @type {import('tailwindcss').Config} */

import withMT from '@material-tailwind/react/utils/withMT'

export default withMT({
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				redbull: {
					blue: '#242b3d', // Темно-синій
					red: '#f93453', // Темно-червоний
					yellow: '#dc8d3b', // Жовтий
					gray: '#1C1C1C', // Темно-сірий
					white: '#ecedff', // Білий
				},
			},
		},
	},
	plugins: [],
})

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
				tolokaLight: {
					backgroundColor: '#fbfbfb',
					accentColor: '#e9e9e6',
					lightAccentColor: '#f5f5f5',
					primaryColor: '#a1ba25',
					textColor: '#000000'
				},
				tolokaDark: {
					primary_0: '#a1ba25',
					primary_20: '#adc144',
					primary_40: '#b8c95e',
					primary_60: '#c3d175',
					primary_80: '#ced88c',
					primary_100: '#d8e0a3',
					surface_0: '#121212',
					surface_20: '#282828',
					surface_40: '#3f3f3f',
					surface_60: '#575757',
					surface_80: '#717171',
					surface_100: '#8b8b8b',
					mixed_0: '#1f2017',
					mixed_20: '#34352c',
					mixed_40: '#4a4b43',
					mixed_60: '#61625b',
					mixed_80: '#7a7a74',
					mixed_100: '#93938e',
					textColorLight: '#fff',
					textColorDark: '#000'
				}
			},
		},
	},
	plugins: [],
})

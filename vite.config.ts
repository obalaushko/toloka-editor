import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		https: {
			key: '', // Provide a valid key here
		},
	},
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@components': path.resolve(__dirname, './src/components'),
			'@pages': path.resolve(__dirname, './src/pages'),
			'@assets': path.resolve(__dirname, './src/assets'),
			'@store': path.resolve(__dirname, './src/store'),
			'@layout': path.resolve(__dirname, './src/layout'),
			'@types': path.resolve(__dirname, './src/types'),
			'@utils': path.resolve(__dirname, './src/utils'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@constants': path.resolve(__dirname, './src/constants'),
			'@api': path.resolve(__dirname, './src/api'),
			'@router': path.resolve(__dirname, './src/router'),
		},
	},
	plugins: [react(), basicSsl()],
})

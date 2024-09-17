import AppRouter from './router/AppRouter.tsx'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<div className="App bg-redbull-blue">
			<AppRouter />
			<ToastContainer autoClose={3000} limit={3} position="top-right" />
		</div>
	)
}

export default App

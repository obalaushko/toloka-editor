import { Outlet } from 'react-router-dom'
import NavBar from './Navbar.tsx'

const LayoutBase = () => {
	return (
		<div className="web-app">
			<NavBar />
			<Outlet />
		</div>
	)
}

export default LayoutBase

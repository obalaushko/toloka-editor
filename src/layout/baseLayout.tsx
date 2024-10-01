import { Outlet } from 'react-router-dom'
import NavBar from './Navbar.tsx'

const LayoutBase = () => {
	return (
		<div className="web-app">
			<NavBar />
			<div className="page-content">
				<Outlet />
			</div>
		</div>
	)
}

export default LayoutBase

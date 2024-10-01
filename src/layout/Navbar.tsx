import { routes } from '@/router/routes.ts'
import { Button } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'


const NavBar = () => {
	return (
		<div className="navbar z-50 bg-redbull-yellow fixed left-0 top-0 flex h-16 w-full">
			<div className="homepage flex items-center mx-4">
				<NavLink to={routes.welcome}>Homepage</NavLink>
			</div>
			<div className="links flex items-center mx-4">
				<NavLink to={routes.editor}>Редактор</NavLink>
			</div>
			<div className="actions ml-auto flex items-center">
				<Button className="bg-redbull-red mx-6">Створити реліз</Button>
			</div>
		</div>
	)
}

export default NavBar

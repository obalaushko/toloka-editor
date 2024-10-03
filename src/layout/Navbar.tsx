import { routes } from '@/router/routes.ts'
import { Button } from '@material-tailwind/react'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
	return (
		<div className="navbar bg-tolokaDark-mixed_20 fixed left-0 top-0 z-50 flex h-16 w-full">
			<div className="homepage text-tolokaDark-textColorLight mx-4 flex items-center">
				<NavLink to={routes.welcome}>Homepage</NavLink>
			</div>
			<div className="links text-tolokaDark-textColorLight mx-4 flex items-center">
				<NavLink to={routes.editor}>Редактор</NavLink>
			</div>
			<div className="actions ml-auto flex items-center">
				<Button className="bg-tolokaDark-primary_80 text-tolokaDark-surface_0 mx-6">
					Створити реліз
				</Button>
			</div>
		</div>
	)
}

export default NavBar

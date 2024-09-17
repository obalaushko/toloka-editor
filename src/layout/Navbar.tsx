import { Button } from '@material-tailwind/react'

const NavBar = () => {
	return (
		<div className="navbar bg-redbull-yellow fixed left-0 top-0 flex h-16 w-full">
			<div className="actions ml-auto flex items-center">
				<Button className="bg-redbull-red mx-6">Створити реліз</Button>
			</div>
		</div>
	)
}

export default NavBar

import { Spinner } from '@material-tailwind/react'

const LoadingPage = () => {
	return (
		<div className="flex h-screen items-center justify-center">
			<Spinner className="h-12 w-12" />
		</div>
	)
}

export default LoadingPage

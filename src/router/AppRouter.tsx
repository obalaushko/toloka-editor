import LoadingPage from '@/components/Skeleton/Loading'
import { Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { routes } from './routes.ts'
import LayoutBase from '@/layout/baseLayout.tsx'
import HomePage from '@/pages/HomePage.tsx'
import EditorPage from '@/pages/Editor.tsx'

const AppRouter = () => {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingPage />}>
				<Routes>
					<Route path={routes.welcome} element={<LayoutBase />}>
						<Route path={routes.welcome} index element={<HomePage />} />
						<Route path={routes.editor} index element={<EditorPage />} />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default AppRouter

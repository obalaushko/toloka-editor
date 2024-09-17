import { IconButton } from '@material-tailwind/react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { useState } from 'react'
const EditorPage = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(false);

	return (
		<div className="mt-16 h-screen">
			<div className="controlpanel">
				<IconButton onClick={() => setFullScreen((state) => !state)}>Full</IconButton>
			</div>
			<Allotment defaultSizes={[300, 500, 500]}>
				<Allotment.Pane minSize={200} maxSize={350} visible={!fullScreen}>
					<div>
						<h2 className="text-xl text-redbull-white m-4">Компоненти</h2>
					</div>
				</Allotment.Pane>
				<Allotment.Pane visible={!fullScreen}>
					<div>
						<h2 className="text-xl text-redbull-white m-4">Редактор</h2>
					</div>
				</Allotment.Pane>
				<Allotment.Pane>
					<div>
						<h2 className="text-xl text-redbull-white m-4">Перегляд</h2>
					</div>
				</Allotment.Pane>
			</Allotment>
		</div>
	)
}

export default EditorPage

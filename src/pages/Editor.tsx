import MyEditor from '@/components/Editor/MyEditor.tsx'
import { IconButton } from '@material-tailwind/react'
import { Allotment } from 'allotment'
import 'allotment/dist/style.css'
import { useState } from 'react'
const EditorPage = () => {
	const [fullScreen, setFullScreen] = useState<boolean>(false)

	return (
		<div className="h-screen pb-16 pt-16">
			<div className="controlpanel">
				<IconButton onClick={() => setFullScreen((state) => !state)}>
					Full
				</IconButton>
			</div>
			<Allotment defaultSizes={[500, 500]}>
				<Allotment.Pane minSize={300} visible={!fullScreen}>
					<div className="h-full px-4">
						<MyEditor />
					</div>
				</Allotment.Pane>
				<Allotment.Pane>
					<div>
						<h2 className="m-4 text-xl text-redbull-white">
							Перегляд
						</h2>
					</div>
				</Allotment.Pane>
			</Allotment>
		</div>
	)
}

export default EditorPage

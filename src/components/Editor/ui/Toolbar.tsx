import { CustomEditor, Format } from '@/types/custom-types.js'
import { Button } from '@material-tailwind/react'
import React from 'react'
import { useSlate } from 'slate-react'

const Toolbar: React.FC = () => {
	const editor = useSlate() as CustomEditor

	const toggleMark = (event: React.MouseEvent, format: Format) => {
		event.preventDefault()
		editor.toggleMark(format)
	}

	return (
		<div className="toolbar mb-4 flex space-x-2">
			<Button
				onMouseDown={(event) => toggleMark(event, 'bold')}
				size="sm"
			>
				Bold
			</Button>
			<Button
				onMouseDown={(event) => toggleMark(event, 'italic')}
				size="sm"
			>
				Italic
			</Button>
			<Button
				onMouseDown={(event) => toggleMark(event, 'underline')}
				size="sm"
			>
				Underline
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault()
					editor.toggleCodeBlock()
				}}
				size="sm"
			>
				Code Block
			</Button>
			<Button
				onMouseDown={(event) => {
					event.preventDefault()
					editor.toggleSpoilerBlock()
				}}
				size="sm"
				variant="gradient"
				color="light-blue"
			>
				Spoiler
			</Button>
		</div>
	)
}

export default Toolbar

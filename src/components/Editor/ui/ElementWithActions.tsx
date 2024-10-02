// src/components/ElementWithActions.tsx

import React from 'react'
import { RenderElementProps } from 'slate-react'
// import { RenderElementProps, useSlateStatic, ReactEditor } from 'slate-react'
// import { IconButton } from '@material-tailwind/react'
// import { Transforms } from 'slate'

export const ElementWithActions: React.FC<RenderElementProps> = (props) => {
	const { attributes, children } = props
	// const { attributes, children, element } = props
	// const editor = useSlateStatic()
	// const [isHovering, setIsHovering] = useState(false)

	return (
		<div
			{...attributes}
			className="relative pl-8"
			// onMouseEnter={() => setIsHovering(true)}
			// onMouseLeave={() => setIsHovering(false)}
		>
			{/* {isHovering && (
				<>
					
					<IconButton
						className="absolute left-0 -ml-12"
						size="sm"
						variant="text"
						// Додайте логіку перетягування тут
					>
						<i className="fas fa-grip-lines text-gray-500 hover:text-blue-500"></i>
					</IconButton>
					
					<IconButton
						className="absolute left-0 -ml-6"
						size="sm"
						variant="text"
						onClick={(e) => {
							e.stopPropagation()
							const path = ReactEditor.findPath(editor, element)
							Transforms.removeNodes(editor, { at: path })
						}}
					>
						<i className="fas fa-trash text-gray-500 hover:text-red-500"></i>
					</IconButton>
				</>
			)} */}
			
			{children}
		</div>
	)
}

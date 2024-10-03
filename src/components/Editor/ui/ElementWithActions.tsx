// src/components/ElementWithActions.tsx

import React, { useState } from 'react'
import { RenderElementProps } from 'slate-react'
import { IconButton } from '@material-tailwind/react'
import { MdDragIndicator } from 'react-icons/md'

export const ElementWithActions: React.FC<RenderElementProps> = (props) => {
	const { attributes, children } = props

	const [isHovering, setIsHovering] = useState(false)

	return (
		<div
			{...attributes}
			className="relative px-8"
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			{isHovering && (
				<IconButton
					className="!absolute -top-[5px] -left-1 text-xl"
					size="sm"
					variant="text"
					// Додайте логіку перетягування тут
				>
					<MdDragIndicator className="text-gray-500" />
				</IconButton>
			)}

			{children}
		</div>
	)
}

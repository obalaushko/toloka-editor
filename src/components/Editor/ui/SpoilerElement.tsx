import React, { useState, useEffect, useRef } from 'react'
import { RenderElementProps, useSlateStatic, ReactEditor } from 'slate-react'
import { Transforms } from 'slate'
import { Collapse, IconButton } from '@material-tailwind/react'
import { SpoilerElementType } from '@/types/custom-types.js'
import { moveCursorToNextLine } from '../utils/editorUtils.ts'
export const SpoilerElement: React.FC<RenderElementProps> = (props) => {
	const { attributes, children, element } = props
	const editor = useSlateStatic()
	const [isVisible, setIsVisible] = useState(false)
	const [isHovering, setIsHovering] = useState(false)

	const inputRef = useRef<HTMLInputElement>(null)

	const isSpoiler = element.type === 'spoiler'

	useEffect(() => {
		if (!isSpoiler) return

		const spoilerElement = element as SpoilerElementType
		const path = ReactEditor.findPath(editor, element)

		// Спочатку встановлюємо фокус на заголовок, якщо потрібно
		if (spoilerElement.focusTitle) {
			inputRef.current?.focus()
			// Видаляємо властивість focusTitle
			Transforms.setNodes(editor, { focusTitle: false }, { at: path })
		}

		// Перевіряємо, чи спойлер порожній, але не видаляємо його одразу після створення
		// const isEmpty =
		// 	Node.string(element).trim() === '' &&
		// 	(spoilerElement.title ?? '') === ''
		// if (isEmpty && !spoilerElement.focusTitle) {
		// 	Transforms.removeNodes(editor, { at: path })
		// }
	}, [editor, element, isSpoiler])

	if (!isSpoiler) {
		return <div {...attributes}>{children}</div>
	}

	const spoilerElement = element as SpoilerElementType

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const path = ReactEditor.findPath(editor, element)
		const newProperties = { title: event.target.value }
		Transforms.setNodes(editor, newProperties, { at: path })
	}

	return (
		<div
			{...attributes}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
			className="relative mb-2 cursor-pointer"
		>
			{/* Заголовок спойлера */}
			<div
				contentEditable={false}
				className={`flex items-center rounded p-1 ${
					isHovering ? 'bg-gray-100' : 'bg-transparent'
				}`}
			>
				{/* Кнопка видалення */}
				<IconButton
					className={`mr-2 transition-all ${
						isHovering ? 'opacity-100' : 'opacity-0'
					}`}
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
				{/* Іконка сховати/показати */}
				<IconButton
					className={`mr-2 transition-all ${
						isHovering ? 'opacity-100' : 'opacity-0'
					}`}
					size="sm"
					variant="text"
					onClick={(e) => {
						e.stopPropagation()
						setIsVisible(!isVisible)
					}}
				>
					{isVisible ? (
						<i className="fas fa-chevron-down text-gray-500" />
					) : (
						<i className="fas fa-chevron-right text-gray-500" />
					)}
				</IconButton>

				{/* Заголовок, який можна редагувати */}
				<input
					type="text"
					value={spoilerElement.title ?? ''}
					onChange={handleTitleChange}
					onKeyDown={(e) => {
						if (e.key === 'Enter') {
						  e.preventDefault()
						  moveCursorToNextLine(editor, element) // Використовуємо функцію
						}
					  }}
					className="w-full border-0 bg-transparent text-lg font-bold placeholder-gray-400 outline-none"
					placeholder="Заголовок спойлера"
				/>
			</div>

			{/* Вміст спойлера */}
			<Collapse open={isVisible}>
				<div className="mt-2 border-l-2 border-gray-300 pl-4 pt-2">
					{children}
				</div>
			</Collapse>
		</div>
	)
}

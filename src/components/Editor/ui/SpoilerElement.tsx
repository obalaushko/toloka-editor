import React, { useState, useEffect, useRef } from 'react'
import { RenderElementProps, useSlateStatic, ReactEditor } from 'slate-react'
import { Transforms } from 'slate'
import { Collapse, IconButton } from '@material-tailwind/react'
import { SpoilerElementType } from '@/types/custom-types.js'
import { moveCursorToNextLine } from '../utils/editorUtils.ts'

import classNames from 'classnames'
import { MdKeyboardArrowRight, MdDeleteForever } from 'react-icons/md'

export const SpoilerElement: React.FC<RenderElementProps> = (props) => {
	const { attributes, children, element } = props
	const editor = useSlateStatic()
	const [isVisible, setIsVisible] = useState(true)
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
				className={classNames(
					'flex items-center rounded p-1',
					isHovering || isVisible
						? 'bg-tolokaDark-mixed_40'
						: 'bg-transparent'
				)}
			>
				{/* Кнопка видалення */}
				<IconButton
					className={classNames(
						'mr-2 text-gray-500 transition-all duration-300 hover:text-red-500',
						{
							'opacity-100': isHovering || isVisible,
							'opacity-0': !isHovering && !isVisible,
						}
					)}
					size="sm"
					variant="text"
					onClick={(e) => {
						e.stopPropagation()
						const path = ReactEditor.findPath(editor, element)
						Transforms.removeNodes(editor, { at: path })
					}}
				>
					<MdDeleteForever className="text-xl" />
				</IconButton>
				{/* Іконка сховати/показати */}
				<IconButton
					className={classNames('mr-2 transition-all', {
						'opacity-100': isHovering || isVisible,
						'opacity-0': !isHovering && !isVisible,
					})}
					size="sm"
					variant="text"
					onClick={(e) => {
						e.stopPropagation()
						setIsVisible(!isVisible)
					}}
				>
					<MdKeyboardArrowRight
						className={classNames(
							'text-2xl text-gray-500 transition-all duration-300',
							{
								'rotate-90': isVisible,
								'rotate-0': !isVisible,
							}
						)}
					/>
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
					className="w-full border-0 bg-transparent text-lg font-bold placeholder-gray-500 outline-none"
					placeholder="Заголовок спойлера"
				/>
			</div>

			{/* Вміст спойлера */}
			<Collapse open={isVisible}>
				<div className="mt-2 cursor-text border-l-2 border-gray-400 pt-2">
					{children}
				</div>
			</Collapse>
		</div>
	)
}

// src/editor/withCustomCommands.ts

import { CustomEditor, Format } from '@/types/custom-types.js'
import { Editor, Transforms, Element as SlateElement } from 'slate'

export const withCustomCommands = (editor: Editor) => {
	const e = editor as Editor & CustomEditor

	e.toggleCodeBlock = () => {
		const isCodeBlockActive = isBlockActive(editor, 'code')
		Transforms.setNodes(
			editor,
			{ type: isCodeBlockActive ? 'paragraph' : 'code' },
			{
				match: (n) =>
					SlateElement.isElement(n) && Editor.isBlock(editor, n),
			}
		)
	}

	e.toggleMark = (format: Format) => {
		const isActive = isMarkActive(editor, format)
		if (isActive) {
			Editor.removeMark(editor, format)
		} else {
			Editor.addMark(editor, format, true)
		}
	}

	e.toggleSpoilerBlock = () => {
		const isSpoilerBlockActive = isBlockActive(editor, 'spoiler')
		if (!isSpoilerBlockActive) {
			Transforms.insertNodes(editor, [
				{
					type: 'spoiler',
					title: '',
					focusTitle: true,
					children: [{ type: 'paragraph', children: [{ text: '' }] }],
				},
				{
					type: 'paragraph',
					children: [{ text: '' }],
				},
			])
		} else {
			Transforms.setNodes(
				editor,
				{ type: 'paragraph' },
				{
					match: (n) =>
						SlateElement.isElement(n) && Editor.isBlock(editor, n),
				}
			)
		}
	}

	return e
}

const isMarkActive = (editor: Editor, format: Format) => {
	const marks = Editor.marks(editor)
	return marks ? marks[format] === true : false
}

const isBlockActive = (editor: Editor, blockType: string) => {
	const [match] = Editor.nodes(editor, {
		match: (n) => SlateElement.isElement(n) && n.type === blockType,
	})
	return !!match
}

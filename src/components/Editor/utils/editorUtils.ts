// src/editor/editorUtils.ts

import { CustomEditor } from '@/types/custom-types.js'
import { KeyboardEvent } from 'react'
import { ReactEditor } from 'slate-react'
import { Editor, Transforms, Element as SlateElement, Path, Node } from 'slate'

export const handleKeyDown = (
	event: KeyboardEvent<HTMLDivElement>,
	editor: CustomEditor
) => {
	if (event.ctrlKey) {
		switch (event.key) {
			case '`':
				event.preventDefault()
				editor.toggleCodeBlock()
				break
			case 'b':
				event.preventDefault()
				editor.toggleMark('bold')
				break
			case 'i':
				event.preventDefault()
				editor.toggleMark('italic')
				break
			case 'u':
				event.preventDefault()
				editor.toggleMark('underline')
				break
			// Додайте інші випадки за потребою
		}
	} else if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
		// Логіка для переміщення курсору за спойлер
		const { selection } = editor
		if (selection) {
			const [currentNode] = Editor.node(editor, selection.focus.path)
			if (
				SlateElement.isElement(currentNode) &&
				currentNode.type === 'spoiler'
			) {
				const nextPath = Path.next(selection.focus.path.slice(0, 1))
				const nextNode = Node.get(editor, nextPath)
				if (nextNode) {
					Transforms.select(editor, nextPath)
					event.preventDefault()
				}
			}
		}
	}
}

export function moveCursorToNextLine(editor: CustomEditor, element: SlateElement) {
	const path = ReactEditor.findPath(editor, element)
	const nextPath = Path.next(path)
  
	// Перевіряємо, чи існує вузол за nextPath
	if (!Node.has(editor, nextPath)) {
	  // Якщо ні, вставляємо новий параграф
	  Transforms.insertNodes(
		editor,
		{ type: 'paragraph', children: [{ text: '' }] },
		{ at: nextPath }
	  )
	}
  
	// Переміщаємо курсор на наступний рядок
	Transforms.select(editor, Editor.start(editor, nextPath))
	ReactEditor.focus(editor)
  }
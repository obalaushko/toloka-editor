import React, { useMemo, useCallback } from 'react'
import {
	createEditor,
	Descendant,
	Transforms,
	Editor,
	Element as SlateElement,
} from 'slate'
import { Slate, Editable, withReact, RenderElementProps } from 'slate-react'

import '@types/custom-types.d.ts'
import { CodeElement, DefaultElement } from './CustomElements.tsx'

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
]

const MyEditor: React.FC = () => {
	const editor = useMemo(() => withReact(createEditor()), [])

	const renderElement = useCallback((props: RenderElementProps) => {
		switch (props.element.type) {
			case 'code':
				return <CodeElement {...props} />
			default:
				return <DefaultElement {...props} />
		}
	}, [])

	return (
		<Slate
			editor={editor}
			initialValue={initialValue}
			onValueChange={(value) => console.log(value)}
		>
			<Editable
				className="h-full min-h-[200px] overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Напишіть щось..."
				renderElement={renderElement}
				onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) => {
					if (event.key === '`' && event.ctrlKey) {
						event.preventDefault()
						// Determine whether any of the currently selected blocks are code blocks.
						const [match] = Editor.nodes(editor, {
							match: (n) => SlateElement.isElement(n) && n.type === 'code',
						  });
						// Toggle the block type depending on whether there's already a match.
						Transforms.setNodes(
							editor,
							{ type: match ? 'paragraph' : 'code' },
							{
							  match: (n) => SlateElement.isElement(n) && Editor.isBlock(editor, n),
							}
						  );
					}
				}}
			/>
		</Slate>
	)
}

export default MyEditor

import React, { useMemo, useCallback } from 'react'
import { createEditor, Descendant } from 'slate'
import {
	Slate,
	Editable,
	withReact,
	RenderElementProps,
	RenderLeafProps,
} from 'slate-react'

import { CodeElement, DefaultElement } from './ui/CustomElements.tsx'
import { withCustomCommands } from './withCustomCommands.ts'
import { Leaf } from './Leaf.tsx'
import Toolbar from './ui/Toolbar.tsx'
import { handleKeyDown } from './utils/editorUtils.ts'
import { SpoilerElement } from './ui/SpoilerElement.tsx'
import { ElementWithActions } from './ui/ElementWithActions.tsx'
import { withHistory } from 'slate-history';

const initialValue: Descendant[] = [
	{
		type: 'paragraph',
		children: [{ text: '' }],
	},
]

const MyEditor: React.FC = () => {
	const editor = useMemo(
		() => withCustomCommands(withReact(withHistory(createEditor()))),
		[]
	)

	const renderElement = useCallback((props: RenderElementProps) => {
		switch (props.element.type) {
			case 'code':
				return (
					<ElementWithActions {...props}>
						<CodeElement {...props} />
					</ElementWithActions>
				)
			case 'spoiler':
				return (
					<ElementWithActions {...props}>
						<SpoilerElement {...props} />
					</ElementWithActions>
				)
			default:
				return (
					<ElementWithActions {...props}>
						<DefaultElement {...props} />
					</ElementWithActions>
				)
		}
	}, [])

	const renderLeaf = useCallback((props: RenderLeafProps) => {
		return <Leaf {...props} />
	}, [])

	return (
		<Slate editor={editor} initialValue={initialValue}>
			<Toolbar />
			<Editable
				className="h-full min-h-[200px] overflow-y-auto overflow-x-hidden rounded-md border border-gray-300 bg-white p-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
				placeholder="Напишіть щось..."
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={(event) => handleKeyDown(event, editor)}
			/>
		</Slate>
	)
}

export default MyEditor

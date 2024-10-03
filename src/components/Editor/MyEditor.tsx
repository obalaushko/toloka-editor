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
import { withHistory } from 'slate-history'



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
		<Slate
			editor={editor}
			initialValue={initialValue}
		>
			<Toolbar />
			<Editable
				className="editable bg-tolokaDark-mixed_20 text-tolokaDark-textColorLight h-full min-h-[200px] py-4 px-2 overflow-y-auto overflow-x-hidden rounded-md border-0 outline-0"
				placeholder="Напишіть щось..."
				renderElement={renderElement}
				renderLeaf={renderLeaf}
				onKeyDown={(event) => handleKeyDown(event, editor)}
			/>
		</Slate>
	)
}

export default MyEditor

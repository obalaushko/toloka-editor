// src/types/custom-types.d.ts

import 'slate'
import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

declare module 'slate' {
	interface CustomTypes {
		Editor: CustomEditor
		Element: CustomElement
		Text: CustomText
	}
}

export type Format = keyof Omit<CustomText, 'text'>

export interface CustomEditor extends BaseEditor, ReactEditor {
	toggleCodeBlock: () => void
	toggleMark: (format: Format) => void
	toggleSpoilerBlock: () => void
}

export type SpoilerElementType = {
	type: 'spoiler'
	title?: string
	focusTitle?: boolean
	children: Descendant[]
}

export type CustomElement =
	| { type: 'paragraph'; children: Descendant[] }
	| { type: 'code'; children: Descendant[] }
	| SpoilerElementType

export type CustomText = {
	text: string
	bold?: boolean
	italic?: boolean
	underline?: boolean
	// Додайте інші властивості за потребою
}

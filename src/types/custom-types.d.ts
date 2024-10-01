// src/custom-types.d.ts

import { BaseEditor, Descendant } from 'slate';
import { ReactEditor } from 'slate-react';

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: ParagraphElement | CodeElement;
    Text: CustomText;
  }
}

export type ParagraphElement = {
  type: 'paragraph';
  children: Descendant[];
};

export type CodeElement = {
  type: 'code';
  children: Descendant[];
};

export type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  // Додайте інші властивості за потребою
};

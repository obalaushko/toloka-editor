import React from 'react';
import { RenderElementProps } from 'slate-react';

export const CodeElement: React.FC<RenderElementProps> = ({ attributes, children }) => {
  return (
    <pre {...attributes}>
      <code>{children}</code>
    </pre>
  );
};

export const DefaultElement: React.FC<RenderElementProps> = ({ attributes, children }) => {
  return <p {...attributes}>{children}</p>;
};

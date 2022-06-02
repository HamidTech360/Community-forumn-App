//@ts-nocheck
import React, { useMemo, useState } from "react";
import { createEditor, Descendant } from "slate";
import { Slate, Editable, withReact } from "slate-react";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
];

const Editor = () => {
  const editor = useMemo(() => withReact(createEditor()), []);

  return (
    <Slate editor={editor} value={initialValue}>
      <Editable />
    </Slate>
  );
};

export default Editor;

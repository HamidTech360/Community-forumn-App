import { Editor, Transforms, Path, Range, Element } from "slate";
import { ReactEditor } from "slate-react";

export const createLinkNode = (href, showInNewTab, text) => ({
  type: "link",
  href,
  target: showInNewTab,
  children: [{ text }]
});

export const insertLink = (editor, { urlTitleValue, urlAddressValue }) => {
  if (!urlAddressValue) return;

  const { selection } = editor;

  const link = createLinkNode(urlAddressValue, "_blank", urlTitleValue);

  ReactEditor.focus(editor);

  if (!!selection) {
    const [parent, parentPath] = Editor.parent(editor, selection.focus.path);

    // Remove the Link node if we're inserting a new link node inside of another
    if (parent.type === "link") {
      removeLink(editor);
    }

    if (editor.isVoid(parent)) {
      Transforms.insertNodes(
        editor,
        { type: "paragraph", children: [link] },
        {
          at: Path.next(parentPath),
          select: true
        }
      );
    } else if (Range.isCollapsed(selection)) {
      // Insert the new link in our last known location
      Transforms.insertNodes(editor, link, { select: true });
    } else {
      // Wrap the currently selected range of text into a Link
      Transforms.wrapNodes(editor, link, { split: true });
      Transforms.collapse(editor, { edge: "end" });
    }
  } else {
    // Insert the new link node at the bottom of the Editor when selection
    // is falsy
    Transforms.insertNodes(editor, { type: "paragraph", children: [link] });
  }
};

export const removeLink = (editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
    match: n => !Editor.isEditor(n) && Element.isElement(n) && n.type === "link"
  });
};

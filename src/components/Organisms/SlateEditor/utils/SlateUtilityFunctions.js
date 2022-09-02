import { Editor, Transforms, Element as SlateElement } from "slate";
import Link from "../Elements/Link/Link";
import Image from "../Elements/Embed/Image";
import Video from "../Elements/Embed/Video";
import styles from "../../../../styles/SlateEditor/SlateUtilityFunctions_Slate.module.scss";
import { useFocused, useSelected } from "slate-react";

const alignment = ["alignLeft", "alignRight", "alignCenter"];
const list_types = ["orderedList", "unorderedList"];

export const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format);
  const isList = list_types.includes(format);
  const isIndent = alignment.includes(format);
  const isAligned = alignment.some(alignmentType =>
    isBlockActive(editor, alignmentType)
  );

  /*If the node is already aligned and change in indent is called we should unwrap it first and split the node to prevent
    messy, nested DOM structure and bugs due to that.*/
  if (isAligned && isIndent) {
    Transforms.unwrapNodes(editor, {
      match: n =>
        alignment.includes(
          !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
        ),
      split: true
    });
  }

  /* Warping the nodes for alignment, to allow it to co-exist with other block level operations*/
  if (isIndent) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    });
    return;
  }
  Transforms.unwrapNodes(editor, {
    match: n =>
      list_types.includes(
        !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
      ),
    split: true
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format
  });

  if (isList && !isActive) {
    Transforms.wrapNodes(editor, {
      type: format,
      children: []
    });
  }
};
export const addMarkData = (editor, data) => {
  Editor.addMark(editor, data.format, data.value);
};
export const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};
export const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

export const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === format
  });

  return !!match;
};

export const getMarked = (leaf, children) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }
  if (leaf.italic) {
    children = <em>{children}</em>;
  }
  if (leaf.strikethrough) {
    children = (
      <span style={{ textDecoration: "line-through" }}>{children}</span>
    );
  }
  if (leaf.underline) {
    children = <u>{children}</u>;
  }
  if (leaf.superscript) {
    children = <sup>{children}</sup>;
  }
  if (leaf.subscript) {
    children = <sub>{children}</sub>;
  }
  if (leaf.code) {
    children = (
      <code
        style={{
          backgroundColor: "rgb(233, 231, 231)",
          borderRadius: "5px",
          display: "inline"
        }}
      >
        {children}
      </code>
    );
  }
  if (leaf.heading) {
    children = <h3 style={{ display: "inline" }}>{children}</h3>;
  }
  if (leaf.emoji) {
    children = <span style={{ display: "inline" }}>{children}</span>;
  }
  return children;
};

export const getBlock = props => {
  const { element, children, attributes } = props;

  switch (element.type) {
    case "blockquote":
      return (
        <blockquote className={styles.blockquote} {...attributes}>
          {children}
        </blockquote>
      );
    case "alignLeft":
      return (
        <div style={{ listStylePosition: "inside" }} {...attributes}>
          {children}
        </div>
      );
    case "alignCenter":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            listStylePosition: "inside",
            flexDirection: "column"
          }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "alignRight":
      return (
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            listStylePosition: "inside",
            flexDirection: "column"
          }}
          {...attributes}
        >
          {children}
        </div>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "orderedList":
      return (
        <ol type="1" {...attributes}>
          {children}
        </ol>
      );
    case "unorderedList":
      return <ul {...attributes}>{children}</ul>;
    case "link":
      return <Link {...props} />;

    case "image":
      return <Image {...props} alt="image" />;
    case "video":
      return <Video {...props} />;
    case "mention":
      return <Mention {...props} />;
    default:
      return <div {...attributes}>{children}</div>;
  }
};

const Mention = ({ attributes, children, element }) => {
  const selected = useSelected();
  const focused = useFocused();
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element?.character?.replace(" ", "-")}`}
      style={{
        padding: "3px 3px 2px",
        margin: "0 1px",
        verticalAlign: "baseline",
        display: "inline-block",
        borderRadius: "4px",
        // backgroundColor: "#eee",
        backgroundColor: "#e8f5fa",
        fontSize: "0.9em",
        boxShadow: selected && focused ? "0 0 0 2px #B4D5FF" : "none"
      }}
    >
      {children}@{element?.character}
    </span>
  );
};

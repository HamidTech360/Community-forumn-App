//@ts-nocheck
import React, { useCallback, useMemo, useState } from "react";
import { BaseEditor, createEditor } from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import Toolbar from "./Toolbar/Toolbar";
import { getMarked, getBlock } from "./utils/SlateUtilityFunctions.js";
import withLinks from "./plugins/withLinks.js";
import withEmbeds from "./plugins/withEmbeds.js";

import styles from "../../../styles/SlateEditor/Editor_Slate.module.scss";

import { CtrlShiftCombo } from "./utils/CtrlShiftCombo";
import FooterButtons from "./footerButtons/FooterButtons";
import { useRouter } from "next/router";

// Best Practice Is To Declear & Export Custom Types
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

export type ParagraphElement = {
  type: "paragraph";
  children: CustomText[];
};

export type HeadingElement = {
  type: "heading";
  level: number;
  children: CustomText[];
};

export type CustomElement = ParagraphElement | HeadingElement;

export type FormattedText = { text: string; bold?: true };

// In this example, CustomText is equal to FormattedText but in a real editor, there can be more types of text like text in a code block which may not allow formatting for example
export type CustomText = FormattedText;

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const Element = (props) => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

const Editor = () => {
  const router = useRouter();
  const editor = useMemo(
    () => withHistory(withEmbeds(withLinks(withReact(createEditor())))),
    []
  );
  // Below ifelse would prevent "cannot find a descendant path [0] error"
  if (editor.children.length === 0) {
    editor.children.push({
      type: "paragraph",
      children: [{ text: "" }],
    });
  }
  const [value, setValue] = useState([
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ]);

  const handleEditorChange = (newValue) => {
    setValue(newValue);
  };

  const renderElement = useCallback((props) => <Element {...props} />, []);

  const renderLeaf = useCallback((props) => {
    return <Leaf {...props} />;
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className={`col-12 shadow ${styles.main}`}>
          <Slate editor={editor} value={value} onChange={handleEditorChange}>
            <Toolbar position="top" />
            <div className={styles.editorWrapper}>
              <Editable
                id={`${router.asPath}-slateRefId`}
                style={{
                  marginTop: ".3rem",
                  height: "18rem",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                }}
                placeholder="Start writing your thoughts"
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => CtrlShiftCombo(event, editor)}
              />
            </div>
            <div className="row">
              <div className="col-12 col-lg-3" style={{ marginTop: "-.4rem" }}>
                <Toolbar position="bottom" />
              </div>
              <FooterButtons editorID={`${router.asPath}-slateRefId`} />
            </div>
          </Slate>
        </div>
      </div>
    </div>
  );
};

export default Editor;

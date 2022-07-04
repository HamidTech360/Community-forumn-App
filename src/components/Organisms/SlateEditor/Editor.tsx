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

const Editor = ({ slim }: { slim: boolean }) => {
  const router = useRouter();
  const editorID = `${router.asPath}-slateRefId`;
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
    <div className={slim ? "container-fluid" : "container"}>
      <div className="row justify-content-center">
        {/* <div className={`col-2 shadow ${styles.main} d-inline`}>
          <Slate editor={editor} value={value} onChange={handleEditorChange}>
            {slim && <Toolbar position="slim" />}
          </Slate>
        </div> */}
        <div className={`col-12 shadow ${styles.main}`}>
          <Slate editor={editor} value={value} onChange={handleEditorChange}>
            <div className="row">
              <div
                className={`${slim ? "col-1 col-md-2 col-lg-1" : "d-none"}`}
                // style={{
                //   borderRightStyle: "solid",
                //   borderColor: "gray",
                //   borderWidth: "1px",
                //   margin: "0 -1rem 0 0",
                // }}
                // style={{ backgroundColor: "white", border: "none" }}
                style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
              >
                {slim && <Toolbar position="slim" />}
              </div>
              <div className={`${slim ? "col-10" : "col-12"}`}>
                {!slim && <Toolbar position="top" />}
                <div className={styles.editorWrapper}>
                  <Editable
                    id={editorID}
                    className={`${
                      !slim ? styles.editable : styles.editableSlim
                    }`}
                    // style={{
                    //   marginTop: ".3rem",
                    //   height: "18rem",
                    //   overflowY: "auto",
                    //   scrollBehavior: "smooth",
                    // }}
                    placeholder="Start writing your thoughts"
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    onKeyDown={(event) => CtrlShiftCombo(event, editor)}
                  />
                </div>
                <div className="row mb-2 mx-1">
                  <div
                    className="col-12 col-lg-3"
                    style={{ marginTop: "-.4rem" }}
                  >
                    {!slim && <Toolbar position="bottom" />}
                  </div>
                  {!slim && <FooterButtons editorID={editorID} />}
                </div>
                {/* <div
                  className="col-1 "
                  style={{
                    alignSelf: "flex-end",
                    marginLeft: "-1.5rem",
                    marginBottom: "1rem",
                  }}
                >
                  {slim && <FooterButtons editorID={editorID} />}
                </div> */}
              </div>
            </div>
          </Slate>
        </div>
      </div>
    </div>
  );
};

export default Editor;

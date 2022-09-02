import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Editor as slateEditor,
  BaseEditor,
  BaseText,
  createEditor,
  Descendant,
  Range,
  Transforms
} from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import Toolbar from "./Toolbar/Toolbar";
import { getMarked, getBlock } from "./utils/SlateUtilityFunctions.js";
import withLinks from "./plugins/withLinks.js";
import withEmbeds from "./plugins/withEmbeds.js";
// import withMentions from "./plugins/withMentions";
import {
  setIndex,
  selectIndex,
  setSearch,
  selectSearch,
  setTarget,
  selectTarget
  // setFollowedUserDetails,
  // selectFollowedUserDetails
} from "@/reduxFeatures/app/mentionsSlice";

import styles from "../../../styles/SlateEditor/Editor_Slate.module.scss";

import { CtrlShiftCombo } from "./utils/CtrlShiftCombo";
import FooterButtons from "./footerButtons/FooterButtons";
import { useRouter } from "next/router";
import deserializeFromHtml from "./utils/serializer";

import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useSelector } from "@/redux/store";
import Portal from "./Elements/Mentions/Portals";
// import useMentionUsers from "@/hooks/useMentionUsers";
// import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { useDispatch } from "react-redux";

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

// export type CustomElement = ParagraphElement | HeadingElement;
export type CustomElement = ParagraphElement | HeadingElement | MentionElement;

export type MentionElement = {
  type: "mention";
  character: string;
  children: CustomText[];
};

// export type FormattedText = { text: string; bold?: true };
export type FormattedText = { text: string; bold?: true; italic?: true };

// In this example, CustomText is equal to FormattedText but in a real editor, there can be more types of text like text in a code block which may not allow formatting for example
export type CustomText = FormattedText;

export type EmptyText = {
  text: string;
};

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    // Text: CustomText | EmptyText;
    Text: BaseText & { placeholder?: string };
    // Text: (BaseText & { placeholder?: string }) | EmptyText;
  }
}

const Element = props => {
  return getBlock(props);
};
const Leaf = ({ attributes, children, leaf }) => {
  children = getMarked(leaf, children);
  return <span {...attributes}>{children}</span>;
};

const Editor = ({ slim, pageAt }: { slim: boolean; pageAt: string }) => {
  const ref = useRef<HTMLDivElement | null>();
  const dispatch = useDispatch();
  const editSlatePost = useSelector(selectSlatePostToEdit);
  const router = useRouter();
  const editorID = `${router.asPath}-slateRefId`;

  const index = useSelector(selectIndex);
  const search = useSelector(selectSearch);
  const target = useSelector(selectTarget);
  // const chars = useSelector(selectFollowedUserDetails);
  const chars = CHARACTERS?.filter(c =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  // const user = useSelector(selectUser);
  // const followedUsers = user.following;
  // Populate Users Been Followed For @Mentions
  // useMentionUsers();

  // console.log("followedUserDetails+++:", followedUserDetails);
  // console.log("chars+++:", chars);

  // useEffect(() => {
  //   // Populate Users Been Followed For @Mentions
  //   if (!chars) {
  //     (async function () {
  //       const chars = [];
  //       await followedUsers.filter((user) => {
  //         const firstLastName = `${user?.firstName} ${user?.lastName}`;
  //         let followedUserName = user?.username
  //           ? user?.username
  //           : firstLastName;
  //         followedUserName.toLowerCase().startsWith(search.toLowerCase());
  //         // .slice(0, 10);
  //         chars.push({
  //           userName: followedUserName,
  //           userId: user?._id,
  //         });
  //       });
  //       dispatch(setFollowedUserDetails(chars));
  //       console.log("chars", chars);
  //     })();
  //   }
  // }, [chars]);

  const renderElement = useCallback(props => <Element {...props} />, []);

  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  // Create Editor Instance
  const editor = useMemo(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    () =>
      withHistory(
        withEmbeds(withLinks(withReact(withMentions(createEditor()))))
      ),
    []
  );

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const onKeyDown = useCallback(
    event => {
      console.log("EVENT:", event);
      console.log("TARGET:", target);
      console.log("INDEX:", index);
      if (target) {
        console.log("chars:", chars);
        console.log("search:", search);
        switch (event.key) {
          case "ArrowDown":
            console.log("ArrowDown:");
            event.preventDefault();
            const prevIndex = index >= chars?.length - 1 ? 0 : index + 1;
            console.log("ArrowDown @ index:", prevIndex);
            dispatch(setIndex(prevIndex));
            break;
          case "ArrowUp":
            console.log("ArrowUp:");
            event.preventDefault();
            const nextIndex = index <= 0 ? chars?.length - 1 : index - 1;
            dispatch(setIndex(nextIndex));
            break;
          case "Tab":
          case "Enter":
            console.log("Enter:");
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            dispatch(setTarget(null));
            break;
          case "Escape":
            console.log("Escape:");
            event.preventDefault();
            dispatch(setTarget(null));
            break;
        }
      }
    },
    // [index, search, target]
    [index, search, target, chars, dispatch, editor]
  );

  // Below ifelse would prevent "cannot find a descendant path [0] error"
  if (editor.children.length === 0) {
    editor.children.push({
      type: "paragraph",
      children: [{ text: "" }]
    });
  }
  // console.log(
  //   "deserializeFromHtml(editSlatePost.post):",
  //   deserializeFromHtml(editSlatePost?.post)
  // );

  const initialState: Descendant[] = editSlatePost?.post
    ? deserializeFromHtml(editSlatePost?.post)
    : editSlatePost?.postBody
    ? deserializeFromHtml(editSlatePost?.postBody)
    : [
        {
          type: "paragraph",
          children: [{ text: "" }]
        }
      ];
  // console.log("initialState:", initialState);
  const [value, setValue] = useState(initialState);

  const handleEditorChange = newValue => {
    // ++++++++++++++++++++++++++++++++++++
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      console.log("TRUE HERE");
      const [start] = Range.edges(selection);
      const wordBefore = slateEditor.before(editor, start, { unit: "word" });
      const before = wordBefore && slateEditor.before(editor, wordBefore);
      const beforeRange = before && slateEditor.range(editor, before, start);
      const beforeText = beforeRange && slateEditor.string(editor, beforeRange);
      const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
      const after = slateEditor.after(editor, start);
      const afterRange = slateEditor.range(editor, start, after);
      const afterText = slateEditor.string(editor, afterRange);
      const afterMatch = afterText.match(/^(\s|$)/);

      if (beforeMatch && afterMatch) {
        dispatch(setTarget(beforeRange));
        dispatch(setSearch(beforeMatch[1]));
        dispatch(setIndex(0));
        return;
      }
    }

    dispatch(setTarget(null));
    // ++++++++++++++++++++++++++++++++++++
    setValue(newValue);
  };

  useEffect(() => {
    if (target && chars?.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [chars?.length, editor, index, search, target]);

  return (
    <div className={slim ? "container-fluid px-0 mx-0" : "container"}>
      <div className={`row justify-content-center ${slim && "px-0 mx-0"}`}>
        <div
          className={`${slim ? "col-10 col-md-11 px-0 me-0" : "col-12"} ${
            styles.main
          }`}
          style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
        >
          <Slate editor={editor} value={value} onChange={handleEditorChange}>
            <div className="row">
              {slim && (
                <div
                  className={`${slim ? "col-1 col-md-2 col-lg-1" : "d-none"}`}
                  style={{ alignSelf: "flex-end", marginBottom: "1rem" }}
                >
                  <Toolbar position="slim" />
                </div>
              )}
              <div
                className={`${
                  slim ? "col-10 pe-1 pe-sm-0 pe-md-2 pe-lg-0" : "col-12"
                }`}
              >
                {!slim && <Toolbar position="top" />}
                <div
                  className={`${styles.editorWrapper} ${
                    slim && "pe-0 pe-md-2 pe-lg-0"
                  }`}
                >
                  <Editable
                    id={editorID}
                    className={`${
                      !slim ? styles.editable : styles.editableSlim
                    }`}
                    placeholder={slim ? "" : "Start writing your thoughts"}
                    renderElement={renderElement}
                    renderLeaf={renderLeaf}
                    spellCheck
                    autoFocus
                    // onKeyDown={(event) => CtrlShiftCombo(event, editor)}
                    onKeyDown={event => {
                      if (!event.ctrlKey) {
                        // +++++++++++++====================================
                        onKeyDown(event);
                        // +++++++++++++====================================
                        return;
                      }
                      CtrlShiftCombo(event, editor);
                    }}
                  />
                  {/* ++++++++++++++++++++++++++++++ */}
                  {target && chars?.length > 0 && (
                    <Portal>
                      {console.log("GREATER...")}
                      <div
                        ref={ref}
                        style={{
                          top: "-9999px",
                          left: "-9999px",
                          position: "absolute",
                          zIndex: 9999,
                          padding: "3px",
                          background: "white",
                          borderRadius: "4px",
                          boxShadow: "0 1px 5px rgba(0,0,0,.2)"
                        }}
                        data-cy="mentions-portal"
                      >
                        {chars?.map((char, i) => (
                          <div
                            key={char}
                            style={{
                              padding: "1px 3px",
                              borderRadius: "3px",
                              background:
                                i === index ? "#B4D5FF" : "transparent",
                              borderBottom: "1px solid black"
                            }}
                          >
                            {char}
                          </div>
                        ))}
                      </div>
                    </Portal>
                  )}
                  {/* ++++++++++++++++++++++++++++++ */}
                </div>
                {!slim && (
                  <div className="row mb-2 mx-1">
                    <div
                      className="col-12 col-lg-3"
                      style={{ marginTop: "-.4rem" }}
                    >
                      <Toolbar position="bottom" />
                    </div>
                    <FooterButtons
                      editorID={editorID}
                      pageAt={pageAt}
                      editorContentValue={value}
                    />
                  </div>
                )}
              </div>
            </div>
          </Slate>
        </div>
        {slim && (
          <div
            className="col-2 col-md-1 d-grid"
            style={{
              alignSelf: "flex-end",
              marginBottom: "1rem"
            }}
          >
            <FooterButtons
              editorID={editorID}
              pageAt={pageAt}
              editorContentValue={value}
            />
          </div>
        )}
      </div>
    </div>
  );
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

const withMentions = editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === "mention" ? true : isVoid(element);
  };

  return editor;
};

const insertMention = (editor, character) => {
  const mention: MentionElement = {
    type: "mention",
    character,
    children: [{ text: "" }]
  };
  Transforms.insertNodes(editor, mention);
  Transforms.move(editor);
};

const CHARACTERS = [
  "Aayla Secura",
  "Adi Gallia",
  "Admiral Dodd Rancit",
  "Admiral Firmus Piett",
  "Admiral Gial Ackbar",
  "Admiral Ozzel",
  "Admiral Raddus",
  "Admiral Terrinald Screed",
  "Admiral Trench",
  "Admiral U.O. Statura"
];
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export default Editor;

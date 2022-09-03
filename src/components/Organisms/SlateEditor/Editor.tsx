import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  Editor as slateEditor,
  BaseText,
  createEditor,
  Descendant,
  Range,
  Transforms
} from "slate";
import { withHistory } from "slate-history";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";
import Toolbar from "./Toolbar/Toolbar";
import { getMarked, getBlock } from "./utils/SlateUtilityFunctions.js";
import withLinks from "./plugins/withLinks.js";
import withEmbeds from "./plugins/withEmbeds.js";
import withMentions from "./plugins/withMentions";
import {
  setIndex,
  selectIndex,
  setSearch,
  selectSearch,
  setTarget,
  selectTarget
} from "@/reduxFeatures/app/mentionsSlice";

import styles from "../../../styles/SlateEditor/Editor_Slate.module.scss";

import { CtrlShiftCombo } from "./utils/CtrlShiftCombo";
import FooterButtons from "./footerButtons/FooterButtons";
import { useRouter } from "next/router";
import deserializeFromHtml from "./utils/serializer";

import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useSelector } from "@/redux/store";
import Portal, { insertMention, PortalDiv } from "./Elements/Mentions/Portals";
import { useDispatch } from "react-redux";
import { MentionUserApiSearch } from "../App/ApiSearch/globalApiSearch";
import { CustomEditor, CustomElement } from "./utils/slateTypes";

declare module "slate" {
  interface CustomTypes {
    Editor: CustomEditor;
    Element: CustomElement;
    // Text: CustomText | EmptyText;
    Text: BaseText & { placeholder?: string };
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
  const [listMention, setListMention] = useState([]);
  const [mentionedUsersList, setMentionedUsersList] = useState([]);

  useEffect(() => {
    // Axios fetch users by search
    if (search.length > 0) {
      const fetchMentionUser = async () => {
        const mentionUser = await MentionUserApiSearch(search);
        setListMention(mentionUser);
      };
      fetchMentionUser();
    }

    return () => {
      dispatch(setSearch(""));
    };
  }, [search, dispatch]);

  useEffect(() => {
    if (listMention?.length > 0) {
      // Populate Users Been Followed For @Mentions
      const usersList = [];
      listMention?.filter(user => {
        const firstLastName = `${user?.firstName} ${user?.lastName}`;
        firstLastName.toLowerCase().startsWith(search.toLowerCase());

        usersList.push({
          userName: firstLastName,
          userId: user?._id
        });
      });
      // Users to display
      setMentionedUsersList(usersList);
    } else {
      setMentionedUsersList([]);
    }
  }, [listMention, search]);

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />;
  }, []);

  // Create Editor Instance
  const editor = useMemo(
    () =>
      withHistory(
        withEmbeds(withLinks(withReact(withMentions(createEditor()))))
      ),
    []
  );

  const onKeyDown = useCallback(
    event => {
      if (target || search) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex =
              index >= mentionedUsersList?.length - 1 ? 0 : index + 1;
            dispatch(setIndex(prevIndex));
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex =
              index <= 0 ? mentionedUsersList?.length - 1 : index - 1;
            dispatch(setIndex(nextIndex));
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, mentionedUsersList[index]);
            dispatch(setTarget(null));
            break;
          case "Escape":
            event.preventDefault();
            dispatch(setTarget(null));
            break;
        }
      }
    },
    [index, search, target, mentionedUsersList, dispatch, editor]
  );

  // Below ifelse would prevent "cannot find a descendant path [0] error"
  if (editor.children.length === 0) {
    editor.children.push({
      type: "paragraph",
      children: [{ text: "" }]
    });
  }

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
  const [value, setValue] = useState(initialState);

  const handleEditorChange = newValue => {
    const { selection } = editor;

    if (selection && Range.isCollapsed(selection)) {
      // If Mentions
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

    // NO-Mentions. Normal text
    dispatch(setTarget(null));

    setValue(newValue);
  };

  useEffect(() => {
    // Mentions List Dropdown Is Active
    if (target && mentionedUsersList?.length > 0) {
      const el = ref.current;
      const domRange = ReactEditor.toDOMRange(editor, target);
      const rect = domRange.getBoundingClientRect();
      el.style.top = `${rect.top + window.pageYOffset + 24}px`;
      el.style.left = `${rect.left + window.pageXOffset}px`;
    }
  }, [mentionedUsersList?.length, editor, index, search, target]);

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
                    onKeyDown={event => {
                      if (!event.ctrlKey) {
                        onKeyDown(event);
                        return;
                      }
                      CtrlShiftCombo(event, editor);
                    }}
                  />
                  {target && mentionedUsersList?.length > 0 && (
                    <Portal>
                      <PortalDiv
                        domRef={ref}
                        mentionedUsersList={mentionedUsersList}
                        index={index}
                        editor={editor}
                        target={target}
                      />
                    </Portal>
                  )}
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

export default Editor;

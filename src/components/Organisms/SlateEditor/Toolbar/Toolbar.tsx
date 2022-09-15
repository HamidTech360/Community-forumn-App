import React, { useEffect, useState } from "react";
import { Transforms } from "slate";
import { ReactEditor, useSlate } from "slate-react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  isBlockActive
} from "../utils/SlateUtilityFunctions.js";
import defaultToolbarGroups from "./toolbarGroups.js";
import defaultToolbarGroupsWithPostImage from "./toolbarGroupsWithPostImage.js";
import defaultToolbarGroupsBottom from "./toolbarGroupsBottom";
import defaultToolbarGroupsSlim from "./toolbarGroupsSlim";
import LinkButton from "../Elements/Link/LinkButton";
import Embed from "../Elements/Embed/Embed";
import EmojiButton from "../Elements/Emoji/EmojiButton";

import { useSelector } from "@/redux/store";
import { selectReFocusChatEditor } from "@/reduxFeatures/app/chatSlice";

import styles from "../../../../styles/SlateEditor/toolbar.module.scss";
import EmbedPostImage from "../Elements/Embed/EmbedPostImage";
import { useRouter } from "next/router";
const Toolbar = ({ position }) => {
  const router = useRouter();
  const reFocusChatEditor = useSelector(selectReFocusChatEditor);

  const editor = useSlate();
  const [toolbarGroups] = useState(
    position === "top"
      ? router.asPath.includes("/feed") ||
        router.asPath.includes("/groups") ||
        router.asPath.includes("/profile")
        ? defaultToolbarGroups
        : router.asPath.includes("/explore") || router.asPath.includes("/gist")
        ? defaultToolbarGroupsWithPostImage
        : null
      : position === "bottom"
      ? defaultToolbarGroupsBottom
      : position === "slim"
      ? defaultToolbarGroupsSlim
      : null
  );

  /*
   ** Set focus to slate editor
   ** Clear Editors innerHtml after ever chat in /chat
   */
  useEffect(() => {
    const editorSelection = { path: [0, 0], offset: 0 };

    if (!editor.selection) {
      Transforms.select(editor, editorSelection);
    } else {
      Transforms.select(editor, editor.selection);
    }
    // Set Focus on Editor. This is to prevent editor.selection Error when Editor isn't in focus
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ReactEditor.focus(editor);
  }, [editor, reFocusChatEditor]);

  const BlockButton = ({ format, toolTip }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={e => {
          e.preventDefault();
          toggleBlock(editor, format);
        }}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`Add ${
          format[0].toUpperCase() + format.substring(1)
        } ${toolTip}`}
      >
        <Icon icon={format} />
      </Button>
    );
  };
  const MarkButton = ({ format, toolTip }) => {
    return (
      <Button
        active={isMarkActive(editor, format)}
        format={format}
        onMouseDown={e => {
          e.preventDefault();
          toggleMark(editor, format);
        }}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title={`Add ${
          format[0].toUpperCase() + format.substring(1)
        } ${toolTip}`}
      >
        <Icon icon={format} />
      </Button>
    );
  };

  return (
    <div className={styles.toolbar}>
      {toolbarGroups.map((group, index) => (
        <span key={index} className={styles.toolbarGrp}>
          {group?.map(element => {
            switch (element.type) {
              case "block":
                return <BlockButton key={element.id} {...element} />;
              case "mark":
                return <MarkButton key={element.id} {...element} />;
              case "link":
                return (
                  <LinkButton
                    key={element.id}
                    active={isBlockActive(editor, "link")}
                    editor={editor}
                  />
                );
              case "embed":
                return (
                  <Embed
                    key={element.id}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "embedPostImage":
                return (
                  <EmbedPostImage
                    key={element.id}
                    format={element.format}
                    editor={editor}
                  />
                );
              case "emoji":
                return (
                  <EmojiButton
                    key={element.id}
                    active={isBlockActive(editor, "emoji")}
                    format={element.format}
                    editor={editor}
                  />
                );
              default:
                return null;
            }
          })}
        </span>
      ))}
    </div>
  );
};

export default Toolbar;

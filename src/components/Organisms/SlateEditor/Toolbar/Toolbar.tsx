//@ts-nocheck
import React, { useState } from "react";
import { useSlate } from "slate-react";
import Button from "../common/Button";
import Icon from "../common/Icon";
import {
  toggleBlock,
  toggleMark,
  isMarkActive,
  isBlockActive,
} from "../utils/SlateUtilityFunctions.js";
import defaultToolbarGroups from "./toolbarGroups.js";
import defaultToolbarGroupsBottom from "./toolbarGroupsBottom";
import defaultToolbarGroupsSlim from "./toolbarGroupsSlim";
import LinkButton from "../Elements/Link/LinkButton";
import Embed from "../Elements/Embed/Embed";
import EmojiButton from "../Elements/Emoji/EmojiButton";

import styles from "../../../../styles/SlateEditor/toolbar.module.scss";
const Toolbar = ({ position }) => {
  const editor = useSlate();
  const [toolbarGroups, setToolbarGroups] = useState(
    position === "top"
      ? defaultToolbarGroups
      : position === "bottom"
      ? defaultToolbarGroupsBottom
      : position === "slim"
      ? defaultToolbarGroupsSlim
      : null
  );

  const BlockButton = ({ format, toolTip }) => {
    return (
      <Button
        active={isBlockActive(editor, format)}
        format={format}
        onMouseDown={(e) => {
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
        onMouseDown={(e) => {
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
          {group.map((element) => {
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

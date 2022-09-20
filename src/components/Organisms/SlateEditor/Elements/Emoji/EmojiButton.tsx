import { useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions.js";
import { Transforms } from "slate";
import styles2 from "../../../../../styles/SlateEditor/button_Slate.module.scss";
import { Modal } from "react-bootstrap";
import EmojiPicker from "./EmojiPicker";
import { insertEmoji } from "../../utils/emoji";
import { ReactEditor } from "slate-react";

const EmojiButton = props => {
  const [show, setShow] = useState(false);
  const [editorSelection, setEditorSelection] = useState({
    anchor: {
      path: [0, 0],
      offset: 0
    },
    focus: {
      path: [0, 0],
      offset: 0
    }
  });

  const { editor } = props;

  const handleEmoji = props => {
    // If editor.selection === null, then replace null with editorSelection
    if (editor.selection) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      setEditorSelection(Transforms.select(editor, editor.selection));
    } else {
      Transforms.select(editor, editorSelection);
    }
    // Set Focus on Editor. This is to prevent editor.selection Error when Editor isn't in focus
    editorSelection && ReactEditor.focus(editor);

    setShow(false);

    // handleInsertEmoji(props.native);
    insertEmoji(editor, props.native);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <div>
        <Button
          id="emojiBtn"
          variant="primary"
          onClick={handleShow}
          className={styles2.button}
          active={isBlockActive(editor, "emoji")}
          format={"emoji"}
        >
          <Icon icon="emoji" />
        </Button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>
          <EmojiPicker onEmojiSelect={handleEmoji} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EmojiButton;

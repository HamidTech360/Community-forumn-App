import { useRef, useState } from "react";
import { insertLink } from "../../utils/link.js";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions.js";
import { Transforms } from "slate";

import styles from "../../../../../styles/SlateEditor/LinkButton_Slate.module.scss";
import styles2 from "../../../../../styles/SlateEditor/button_Slate.module.scss";
import { Modal, Button as BsBtn, Form } from "react-bootstrap";
import { ReactEditor } from "slate-react";

const LinkButton = props => {
  // const urlTitle = useRef(null);
  const urlAddress = useRef(null);

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

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
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

    setShow(true);
  };

  const submitUrl = e => {
    e.preventDefault();

    const urlTitleValue = urlAddress.current.value;
    const urlAddressValue = urlAddress.current.value;

    editor.selection && Transforms.select(editor, editor.selection);
    editor.selection && ReactEditor.focus(editor);

    insertLink(editor, {
      urlTitleValue,
      urlAddressValue
    });

    // Only close after  form validation
    handleClose();
  };

  return (
    <>
      {/* Link Toolbar */}
      <div className={styles.popupWrapper}>
        <Button
          id="linkBtn"
          variant="primary"
          onClick={handleShow}
          className={styles2.button}
          active={isBlockActive(editor, "link")}
          format={"link"}
        >
          <Icon icon="link" />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header
          style={{
            border: "none",
            backgroundColor: "lightgray",
            fontWeight: "900",
            marginBottom: "-1rem"
          }}
          closeButton
        >
          <Modal.Title>
            Add{" "}
            <small>
              {" "}
              Link <Icon icon="link" />{" "}
            </small>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitUrl}>
          <Modal.Body>
            <Form.Group className="my-3" controlId="formBasicLink">
              <Form.Control
                ref={urlAddress}
                type="url"
                placeholder="URL"
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginTop: "-1rem"
            }}
          >
            <BsBtn variant="danger" className="me-auto" onClick={handleClose}>
              Cancel
            </BsBtn>
            <BsBtn variant="primary" type="submit">
              Save
            </BsBtn>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default LinkButton;

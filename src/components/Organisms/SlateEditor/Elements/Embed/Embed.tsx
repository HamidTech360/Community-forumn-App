import React, { useRef, useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

import styles from "../../../../../styles/SlateEditor/Embed_Slate.module.scss";
import { Modal, Button as BsBtn, Form } from "react-bootstrap";
import MediaUpload from "@/components/Organisms/MediaUpload";
import { setMediaUpload } from "@/reduxFeatures/app/mediaUploadSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";

const Embed = ({ editor, format }) => {
  const urlInputRef = useRef();
  const dispatch = useDispatch();
  const editSlatePost = useSelector(selectSlatePostToEdit);

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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    // Clear Uploaded Media
    dispatch(setMediaUpload([]));
    setShow(false);
  };

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

    setShow(prev => !prev);
  };

  const submitEmbed = e => {
    e.preventDefault();

    // let embedTitleValue = embedTitle.current.value;
    // let embedAddressValue = embedAddress.current.value;

    // editor.selection && Transforms.select(editor, editor.selection);
    // editor.selection && ReactEditor.focus(editor);

    // insertEmbed(
    //   editor,
    //   { alt: embedTitleValue, url: embedAddressValue },
    //   format
    // );
    setShow(prev => !prev);
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

  return (
    <>
      <div ref={urlInputRef} className={styles.popupWrapper}>
        <Button
          active={isBlockActive(editor, format)}
          style={{
            borderBottom: "none"
          }}
          format={format}
          onClick={handleShow}
          // Disable Media Upload While Editing Post
          disabled={editSlatePost ? true : false}
        >
          <Icon icon={format} />
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header
          style={{
            border: "none",
            backgroundColor: "transparent",
            marginBottom: "-1rem"
          }}
          closeButton
        >
          <Modal.Title>
            Upload <small> image/video </small> <Icon icon={format} />
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitEmbed}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicAlt">
              <div>
                {/* Media Upload */}
                <MediaUpload />
                {/* <p
                  style={{ textAlign: "center", opacity: "0.7", width: "100%" }}
                >
                  OR
                </p> */}
              </div>
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicAlt">
              <Form.Label style={{ fontWeight: "600" }}>Alt:</Form.Label>
              <Form.Control
                ref={embedTitle}
                type="text"
                placeholder="Title"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLink">
              <Form.Label style={{ fontWeight: "600" }}>Link:</Form.Label>
              <Form.Control
                ref={embedAddress}
                type="url"
                placeholder="URL"
                required
              />
            </Form.Group> */}
          </Modal.Body>

          <Modal.Footer
            style={{
              border: "none",
              backgroundColor: "transparent",
              marginTop: "-1rem",
              marginRight: "2.5rem",
              marginLeft: "2.5rem"
            }}
          >
            <BsBtn variant="danger" className="me-auto" onClick={handleClose}>
              Clear <small>(all)</small>
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

export default Embed;

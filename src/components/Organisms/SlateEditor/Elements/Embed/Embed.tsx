import React, { useRef, useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import { insertEmbed } from "../../utils/embed.js";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

import styles from "../../../../../styles/SlateEditor/Embed_Slate.module.scss";
import { Modal, Button as BsBtn, Form } from "react-bootstrap";
import MediaUpload from "@/components/Organisms/MediaUpload";
import PostImageUpload from "@/components/Organisms/MediaUpload/PostImageUpload";
import {
  selectPostImageUpload,
  setMediaUpload,
  setPostImageUpload
} from "@/reduxFeatures/app/mediaUploadSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";

const Embed = ({ editor, format }) => {
  const urlInputRef = useRef<HTMLDivElement>(null);
  // const embedTitle = useRef<HTMLInputElement>(null);
  // const embedAddress = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const editSlatePost = useSelector(selectSlatePostToEdit);
  const uploadedPostImage = useSelector(selectPostImageUpload);

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
    dispatch(setPostImageUpload([]));
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

    uploadedPostImage.forEach((file: File & { preview: string }) => {
      const embedTitleValue = file.name;
      const embedAddressValue = file.preview;

      editor.selection && Transforms.select(editor, editor.selection);
      editor.selection && ReactEditor.focus(editor);

      insertEmbed(
        editor,
        { alt: embedTitleValue, url: embedAddressValue },
        format
      );
    });

    // Clear Post Image
    dispatch(setPostImageUpload([]));
    // Close Modal
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
            backgroundColor: "lightgray"
          }}
          closeButton
        >
          <Modal.Title style={{ fontWeight: "700" }}>
            Media Upload <Icon icon="media" />
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitEmbed}>
          <Modal.Body>
            <div style={{ maxHeight: "450px", overflowY: "auto" }}>
              <Modal.Title style={{ opacity: "0.8" }}>
                Feature <small> image/video </small> <Icon icon="media" />
              </Modal.Title>

              <Form.Group className="mb-3" controlId="formBasicAlt">
                <div>
                  {/* Media Upload */}
                  <MediaUpload />
                </div>
              </Form.Group>

              <h4 style={{ textAlign: "center", opacity: "0.8" }}>and/or</h4>

              <Modal.Title style={{ opacity: "0.8", marginBottom: "1rem" }}>
                Post <small> image </small> <Icon icon={format} />
              </Modal.Title>

              <Form.Group className="mb-3" controlId="formBasicAlt2">
                <div>
                  {/* Post Image Upload */}
                  <PostImageUpload />
                </div>
              </Form.Group>
            </div>
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

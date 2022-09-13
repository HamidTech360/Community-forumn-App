import React, { useRef, useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";
import { insertEmbed } from "../../utils/embed.js";
import { Transforms } from "slate";
import { ReactEditor } from "slate-react";

import styles from "../../../../../styles/SlateEditor/Embed_Slate.module.scss";
import { Modal, Button as BsBtn, Form, ProgressBar } from "react-bootstrap";
import MediaUpload from "@/components/Organisms/MediaUpload";
import PostImageUpload from "@/components/Organisms/MediaUpload/PostImageUpload";
import {
  selectPostImageUpload,
  selectProgressBarNumPost,
  selectProgressVariantPost,
  setMediaUpload,
  setPostImageUpload,
  setProgressBarNumPost,
  setProgressVariantPost
} from "@/reduxFeatures/app/mediaUploadSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useRouter } from "next/router";
import axios from "axios";
import config from "@/config";

const EmbedMedia = ({ editor, format }) => {
  const router = useRouter();
  const urlInputRef = useRef<HTMLDivElement>(null);
  // const embedTitle = useRef<HTMLInputElement>(null);
  // const embedAddress = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const editSlatePost = useSelector(selectSlatePostToEdit);
  const uploadedPostImage = useSelector(selectPostImageUpload);
  const progressVariant = useSelector(selectProgressVariantPost);
  const progressBarNum = useSelector(selectProgressBarNumPost);

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

    if (uploadedPostImage.length > 0) {
      // Form Data
      const formData = new FormData();
      uploadedPostImage.forEach(async (file: File & { preview: string }) => {
        console.log("file:", file);

        formData.append("image", file);

        try {
          // Set Progress Bar Color
          dispatch(setProgressVariantPost("primary"));

          const response = await axios.post(
            `${config.serverUrl}/api/upload`,
            formData,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
              },
              // Axios Progress
              onUploadProgress: function (progressEvent: {
                loaded: number;
                total: number;
              }) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // Update ProgressBar
                dispatch(setProgressBarNumPost(percentCompleted));
              }
            }
          );

          console.log("Upload response:", response);

          const embedTitleValue = file.name;
          const embedAddressValue = file.preview;

          editor.selection && Transforms.select(editor, editor.selection);
          editor.selection && ReactEditor.focus(editor);

          insertEmbed(
            editor,
            { alt: embedTitleValue, url: embedAddressValue },
            // { alt: embedTitleValue, url: response.data.image },
            format
          );

          // Clear Post Image
          dispatch(setPostImageUpload([]));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariantPost("danger"));
          console.log("error:", error);
        }
      });
    }

    // Close Modal
    setShow(prev => !prev);
  };

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
          <Modal.Body style={{ maxHeight: "450px", overflowY: "auto" }}>
            {/* Enable Post Image Upload For Explore & Gist */}
            {router.asPath.includes("/explore") ||
            router.asPath.includes("/gist") ? (
              <>
                <h4 style={{ textAlign: "center", opacity: "0.8" }}>and/or</h4>

                <Modal.Title style={{ opacity: "0.8", marginBottom: "1rem" }}>
                  Post <small> image </small> <Icon icon={format} />
                </Modal.Title>

                <Form.Group className="mb-3" controlId="formBasicAlt2">
                  {/* ProgressBar: Only when there is Post Image upload in progress */}
                  {uploadedPostImage?.length > 0 && progressBarNum > 0 ? (
                    <ProgressBar
                      variant={progressVariant}
                      className="my-1"
                      now={progressBarNum}
                      label={`${progressBarNum}%`}
                    />
                  ) : null}
                  <div>
                    {/* Post Image Upload */}
                    <PostImageUpload />
                  </div>
                </Form.Group>
              </>
            ) : null}
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

export default EmbedMedia;

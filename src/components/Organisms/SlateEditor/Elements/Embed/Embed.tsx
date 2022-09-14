import React, { useRef, useState } from "react";
import Button from "../../common/Button";
import Icon from "../../common/Icon";
import { isBlockActive } from "../../utils/SlateUtilityFunctions";

import styles from "../../../../../styles/SlateEditor/Embed_Slate.module.scss";
import { Modal, Button as BsBtn, Form } from "react-bootstrap";
import MediaUpload from "@/components/Organisms/MediaUpload";
import { setMediaUpload } from "@/reduxFeatures/app/mediaUploadSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useRouter } from "next/router";
import FeatureMediaUpload from "@/components/Organisms/MediaUpload/FeatureMediaUpload";

const Embed = ({ editor, format }) => {
  const router = useRouter();
  const urlInputRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const editSlatePost = useSelector(selectSlatePostToEdit);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    // Clear Uploaded Media
    dispatch(setMediaUpload([]));
    setShow(false);
  };

  const handleShow = () => setShow(prev => !prev);

  const submitEmbed = e => {
    e.preventDefault();

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
            {router.asPath.includes("/feed") ||
            router.asPath.includes("/groups") ||
            router.asPath.includes("/profile") ? (
              // Media Upload <Icon icon="media" />
              <>
                Add <small>Image(s)</small> <Icon icon="image" />
              </>
            ) : router.asPath.includes("/explore") ||
              router.asPath.includes("/gist") ? (
              <>
                Add <small>Feature Image</small> <Icon icon="image" />
              </>
            ) : null}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitEmbed}>
          <Modal.Body style={{ maxHeight: "450px", overflowY: "auto" }}>
            <Form.Group className="mb-3" controlId="formBasicAlt">
              {router.asPath.includes("/feed") ||
              router.asPath.includes("/groups") ||
              router.asPath.includes("/profile") ? (
                //   Media Upload
                <FeatureMediaUpload />
              ) : router.asPath.includes("/explore") ||
                router.asPath.includes("/gist") ? (
                //   Media Upload
                <MediaUpload />
              ) : null}
            </Form.Group>
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

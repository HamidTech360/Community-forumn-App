import React from "react";
import Editor from "../../SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";

import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import {
  selectCreatePostModal,
  setShowCreatePostModal
} from "@/reduxFeatures/app/createPost";
import styles2 from "@/styles/feed.module.scss";

// Open Feed Post Modal Editor
const FeedPostEditorModal = ({ pageAt }) => {
  const dispatch = useDispatch();

  const showModal = useSelector(selectCreatePostModal);

  return (
    <Modal
      show={showModal}
      className={styles2.GistModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
    >
      <span className={styles2.closeBtn}>
        {" "}
        <FaTimes
          color="#207681"
          style={{ cursor: "pointer" }}
          size={35}
          onClick={() => dispatch(setShowCreatePostModal(false))}
        />{" "}
      </span>
      <div className="col-12 px-4 mt-2 mb-4">
        <Editor slim={false} pageAt={pageAt} />
      </div>
    </Modal>
  );
};

export default FeedPostEditorModal;

import { MdOutlineCancel } from "react-icons/md";
import { BiArrowBack } from "react-icons/bi";
import { ModalRow } from "@/hooks/useModalWithData";
import styles from "@/styles/profile.module.scss";

// Open Feed Post Modal Body For Reading More
export function FeedPostEditorModal_Modal({
  modalOpen,
  selected,
  modalToggle: toggle,
  mutate
}) {
  return (
    <div>
      <Modal
        show={modalOpen}
        className={`${styles.FeedModal}`}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        <span className={styles.closeBtn}>
          {" "}
          <BiArrowBack
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        {/* modalToggle & mutate Needs Props For Modal Post Deletion Update */}
        <ModalRow selected={selected} modalToggle={toggle} mutate={mutate} />
      </Modal>
    </div>
  );
}

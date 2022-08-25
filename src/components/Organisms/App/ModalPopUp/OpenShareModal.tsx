import { ModalRowShare } from "@/hooks/useModalWithData";
import { Modal } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";
import { MdOutlineCancel } from "react-icons/md";
import styles from "@/styles/profile.module.scss";

function OpenShareModal({ modalOpenShare, toggleShare, selectedShare }) {
  return (
    <div>
      <Modal
        show={modalOpenShare}
        className={styles.FeedModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="sm"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggleShare()}
          />{" "}
        </span>
        <span className={styles.closeBtn}>
          {" "}
          <BiArrowBack
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggleShare()}
          />{" "}
        </span>
        <ModalRowShare selectedShare={selectedShare} />
      </Modal>
    </div>
  );
}

export default OpenShareModal;

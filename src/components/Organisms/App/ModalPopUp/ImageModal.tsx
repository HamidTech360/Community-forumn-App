import React from "react";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setImageModalOpen,
  selectImageModalOpen,
  setImageModalImg,
  selectImageModalImg,
} from "@/reduxFeatures/app/postModalCardSlice";

import styles from "@/styles/profile.module.scss";
// import Image from "next/image";
import { Image, Modal } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";

function ImageModal() {
  const dispatch = useDispatch();
  const imageModalOpen = useSelector(selectImageModalOpen);
  const imageModalImg = useSelector(selectImageModalImg);
  return (
    <Modal
      className="bg-secondary"
      show={imageModalOpen}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      scrollable={true}
    >
      <span className="ms-auto m-2">
        <MdOutlineCancel
          style={{ cursor: "pointer" }}
          size={30}
          onClick={() => dispatch(setImageModalOpen(false))}
        />{" "}
      </span>

      <div className="row">
        <div className="col-12 mx-auto">
          <Image
            src={imageModalImg}
            alt={"image"}
            className={styles.imgModal}
            fluid
          />
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;

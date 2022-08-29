import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setImageModalOpen,
  selectImageModalOpen,
  setImageModalImg,
  selectImageModalImg,
} from "@/reduxFeatures/app/postModalCardSlice";

import { Image, Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { MdOutlineCancel } from "react-icons/md";

function ImageModal() {
  const dispatch = useDispatch();
  const imageModalOpen = useSelector(selectImageModalOpen);
  const imageModalImg = useSelector(selectImageModalImg);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Set Carousel Start point
    setIndex(imageModalImg?.activeIndex);

    return () => {
      // Reset Carousel Data
      dispatch(setImageModalImg({ media: [], activeIndex: 0 }));
    };
  }, []);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

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
        <div className="col-12">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {imageModalImg?.media?.map((postImage, index) => (
              <Carousel.Item key={index}>
                <Image
                  src={postImage}
                  alt={"image"}
                  className="d-block w-100"
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;

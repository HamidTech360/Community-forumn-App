import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setImageModalOpen,
  selectImageModalOpen,
  setImageModalImg,
  selectImageModalImg
} from "@/reduxFeatures/app/postModalCardSlice";

import { Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { MdOutlineCancel } from "react-icons/md";
import {
  selectPopulateAcceptedImagesTypes,
  selectPopulateAcceptedVideosTypes
} from "@/reduxFeatures/app/appSlice";
import Image from "next/image";

function ImageModal() {
  const dispatch = useDispatch();
  const imageModalOpen = useSelector(selectImageModalOpen);
  const imageModalImg = useSelector(selectImageModalImg);
  const [index, setIndex] = useState(0);
  const populateAcceptedImagesTypes = useSelector(
    selectPopulateAcceptedImagesTypes
  );
  const populateAcceptedVideosTypes = useSelector(
    selectPopulateAcceptedVideosTypes
  );

  useEffect(() => {
    // Set Carousel Start point
    setIndex(imageModalImg?.activeIndex);

    return () => {
      // Reset Carousel Data
      dispatch(setImageModalImg({ media: [], activeIndex: 0 }));
    };
  }, [dispatch, imageModalImg?.activeIndex]);

  const handleSelect = selectedIndex => {
    setIndex(selectedIndex);
  };

  return (
    <Modal
      className="bg-secondary align-items-center"
      show={imageModalOpen}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <span className="ms-auto m-2">
        <MdOutlineCancel
          style={{ cursor: "pointer" }}
          size={30}
          onClick={() => dispatch(setImageModalOpen(false))}
        />
      </span>

      <div className="row">
        <div className="col-12">
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {imageModalImg?.media?.map((postImage, index) => (
              <Carousel.Item key={index}>
                {populateAcceptedImagesTypes.includes(
                  `.${postImage
                    .split(".")
                    [postImage.split(".").length - 1].toLowerCase()}`
                ) ? (
                  <Image
                    src={postImage}
                    alt={"image"}
                    objectFit="contain"
                    className="d-block w-100"
                    width={520}
                    height={520}
                  />
                ) : populateAcceptedVideosTypes.includes(
                    `.${postImage
                      .split(".")
                      [postImage.split(".").length - 1].toLowerCase()}`
                  ) ? (
                  <video
                    preload="metadata"
                    key={index}
                    src={postImage}
                    style={{ objectFit: "cover" }}
                    controls
                  >
                    Your browser does not support the video tag.
                  </video>
                ) : null}
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </Modal>
  );
}

export default ImageModal;

import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setImageModalOpen,
  selectImageModalOpen,
  setImageModalImg,
  selectImageModalImg,
} from "@/reduxFeatures/app/postModalCardSlice";
// import Image from "next/image";
import { Image } from "react-bootstrap";
import ImageModal from "./ModalPopUp/ImageModal";

const MediaDisplay = ({ media: mediaComingIn, breakPoint }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661586689413.jpeg",
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661586689567.jpeg",
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661586689625.jpeg",
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661586763841.jpeg",
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661586764016.jpeg",
    "https://setlinn.s3.us-east-1.amazonaws.com/media-1661352420043.png",

    "https://images.unsplash.com/photo-1533003505519-6a9b92ed4911?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTE4MDA&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1504883303951-581cbf120aa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIyOTY&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    "https://images.unsplash.com/photo-1517328894681-0f5dfabd463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8Y2l0eSxuaWdodHx8fHx8fDE2NDI3NTIzMDU&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
  ]);

  const imageModalOpen = useSelector(selectImageModalOpen);

  useEffect(() => {
    setImages(mediaComingIn);
  }, [mediaComingIn]);

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: breakPoint,
          750: breakPoint,
          900: breakPoint,
        }}
      >
        <Masonry>
          {images?.map((img, index) => (
            <Image
              key={index}
              className="p-1"
              src={img}
              alt="Uploaded Media"
              width={"100%"}
              height={"100%"}
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(
                  setImageModalImg({
                    media: images,
                    activeIndex: index,
                  })
                );
                dispatch(setImageModalOpen(true));
              }}
            />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default MediaDisplay;

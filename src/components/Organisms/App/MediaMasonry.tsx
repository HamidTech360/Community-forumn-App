import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch } from "@/redux/store";
import {
  setImageModalOpen,
  setImageModalImg
} from "@/reduxFeatures/app/postModalCardSlice";
// import Image from "next/image";
import { Image } from "react-bootstrap";

const MediaDisplay = ({ media: mediaComingIn, breakPoint }) => {
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(mediaComingIn);
  }, [mediaComingIn]);

  return (
    <>
      <ResponsiveMasonry
        columnsCountBreakPoints={{
          350: breakPoint,
          750: breakPoint,
          900: breakPoint
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
              style={{ cursor: "pointer", objectFit: "cover" }}
              onClick={() => {
                dispatch(
                  setImageModalImg({
                    media: images,
                    activeIndex: index
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

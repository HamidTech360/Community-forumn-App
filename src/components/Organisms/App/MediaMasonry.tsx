import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setImageModalOpen,
  setImageModalImg
} from "@/reduxFeatures/app/postModalCardSlice";
// import Image from "next/image";
import { Image } from "react-bootstrap";
import {
  selectPopulateAcceptedImagesTypes,
  selectPopulateAcceptedVideosTypes
} from "@/reduxFeatures/app/appSlice";
// import { selectAcceptedMediaTypes } from "@/reduxFeatures/app/appSlice";

const MediaDisplay = ({ media: mediaComingIn, breakPoint }) => {
  const dispatch = useDispatch();
  // const acceptedMediaTypes = useSelector(selectAcceptedMediaTypes);
  const populateAcceptedImagesTypes = useSelector(
    selectPopulateAcceptedImagesTypes
  );
  const populateAcceptedVideosTypes = useSelector(
    selectPopulateAcceptedVideosTypes
  );
  const [images, setImages] = useState([]);
  // const [imageMedia, setImageMedia] = useState([]);
  // const [videoMedia, setVideoMedia] = useState([]);

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
   // <span key={index}>
            <>
              {populateAcceptedImagesTypes.includes(
                `.${img.split(".")[img.split(".").length - 1].toLowerCase()}`
              ) ? (
                <Image
                  key={index}
                  className="p-1"
                  src={img}
                  alt="Uploaded Media"
                  width={"100%"}
                  height={"100%"}
                  style={{ cursor: "pointer", objectFit: "cover", maxHeight:'500px' }}
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
              ) : populateAcceptedVideosTypes.includes(
                  `.${img.split(".")[img.split(".").length - 1].toLowerCase()}`
                ) ? (
                <video
                  preload="metadata"
                  key={index}
                  src={img}
                  style={{ objectFit: "cover" }}
                  controls
                >
                  Your browser does not support the video tag.
                </video>
              ) : null}
            </>
            // </span>

          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};

export default MediaDisplay;

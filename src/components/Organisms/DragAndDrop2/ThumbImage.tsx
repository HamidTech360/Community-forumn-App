import {
  setMediaUpload,
  setAcceptingFiles,
  selectAcceptingFiles,
} from "@/reduxFeatures/app/mediaUpload";
import { FaTimes } from "react-icons/fa";

import styles from "@/styles/Uploader/uploader.module.scss";
import Image from "next/image";
import { useDispatch, useSelector } from "@/redux/store";
// import { Image } from "react-bootstrap";

// const ThumbImage = ({ file, index, acceptingFiles, setAcceptingFiles }) => {
const ThumbImage = ({ acceptingFiles }) => {
  const dispatch = useDispatch();
  //   const acceptingFiles = useSelector(selectAcceptingFiles);
  return (
    <>
      {acceptingFiles.map((file, index) => (
        <div
          id={`${file.name}-${String(index)}`}
          className={`${styles.thumb} m-1`}
          key={`${file.name}-${String(index)}`}
        >
          {console.log("Files:", acceptingFiles)}
          <FaTimes
            color="magenta"
            style={{
              cursor: "pointer",
              position: "absolute",
              marginLeft: "1.4rem",
              zIndex: 1,
            }}
            onClick={(e) => {
              // console.log("CLICKED");
              let removedIndex;
              let newlyAccepted = acceptingFiles.filter((pre, idx) => {
                if (pre.preview !== file.preview) {
                  return pre;
                } else {
                  // Save index & use it to filter acceptingFilesBase64
                  removedIndex = idx;
                }
              });
              console.log("newlyAccepted:", newlyAccepted);
              dispatch(setAcceptingFiles(newlyAccepted));

              //   let newlyAcceptedBase64 = acceptingFilesBase64.filter((pre, idx) => {
              //     // console.log("Base64-PRE:", pre);
              //     if (removedIndex !== idx) {
              //       return pre;
              //     }
              //   });
              //   console.log("newlyAcceptedBase64:", newlyAcceptedBase64);
              //   setAcceptingFilesBase64(newlyAcceptedBase64);
            }}
          />
          <div className={styles.thumbInner}>
            <Image
              alt="Image Preview"
              src={file.preview}
              className={styles.img}
              width={40}
              height={40}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default ThumbImage;

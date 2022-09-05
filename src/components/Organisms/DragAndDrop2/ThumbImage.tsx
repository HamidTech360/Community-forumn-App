import { setAcceptingFiles } from "@/reduxFeatures/app/mediaUpload";
import { FaTimes } from "react-icons/fa";

import styles from "@/styles/Uploader/uploader.module.scss";
import Image from "next/image";
import { useDispatch } from "@/redux/store";
// import { Image } from "react-bootstrap";

// const ThumbImage = ({ file, index, acceptingFiles, setAcceptingFiles }) => {
const ThumbImage = ({ acceptingFiles }) => {
  const dispatch = useDispatch();
  //   const acceptingFiles = useSelector(selectAcceptingFiles);
  return (
    <>
      {acceptingFiles.map((file: File & { preview: string }, index: number) => (
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
              zIndex: 1
            }}
            onClick={() => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const newlyAccepted = acceptingFiles.filter(
                (pre: { preview: string }) => {
                  return pre;
                }
              );
              console.log("newlyAccepted:", newlyAccepted);
              dispatch(setAcceptingFiles(newlyAccepted));
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

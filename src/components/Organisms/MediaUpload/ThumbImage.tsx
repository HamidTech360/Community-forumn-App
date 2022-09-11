import { FaTimes } from "react-icons/fa";

import styles from "@/styles/Uploader/uploader.module.scss";
import Image from "next/image";
import { useDispatch } from "@/redux/store";
import {
  setMediaUpload,
  setPostImageUpload
} from "@/reduxFeatures/app/mediaUploadSlice";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const ThumbImage = ({ uploadedMedia, fromWhere }) => {
  const dispatch = useDispatch();

  return (
    <>
      {typeof uploadedMedia[0] === "object" && uploadedMedia[0] !== null
        ? uploadedMedia.map(
            // New Post Media Display
            (file: File & { preview: string }, index: number) => (
              <OverlayTrigger
                key={`${file.name}-${String(index)}`}
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={props => (
                  <Tooltip id="button-tooltip" {...props}>
                    {file.name}
                  </Tooltip>
                )}
              >
                <div
                  id={`${file.name}-${String(index)}`}
                  className={`${styles.thumb} m-1`}
                  key={`${file.name}-${String(index)}`}
                >
                  <div className={styles.thumbInner}>
                    <Image
                      alt="Image Preview"
                      src={file.preview}
                      className={styles.img}
                      objectFit="contain"
                      width={40}
                      height={40}
                    />
                    <FaTimes
                      color="magenta"
                      style={{
                        cursor: "pointer",
                        // position: "absolute",
                        position: "relative",
                        // paddingLeft: "1.4rem",
                        // paddingRight: "9px",
                        zIndex: 1
                      }}
                      onClick={() => {
                        const newlyAccepted = uploadedMedia.filter(
                          (pre: { preview: string }) => {
                            if (pre.preview !== file.preview) {
                              return pre;
                            }
                          }
                        );

                        if (fromWhere === "uploadedMedia") {
                          dispatch(setMediaUpload(newlyAccepted));
                        } else if (fromWhere === "postImage") {
                          dispatch(setPostImageUpload(newlyAccepted));
                        }
                      }}
                    />
                  </div>
                </div>
              </OverlayTrigger>
            )
          )
        : Array.isArray(uploadedMedia)
        ? uploadedMedia.map((img: string, index: number) => (
            // Editing Post Media Display
            <OverlayTrigger
              key={`${img}-${String(index)}`}
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={props => (
                <Tooltip id="button-tooltip" {...props}>
                  {img}
                </Tooltip>
              )}
            >
              <div
                id={`${img}-${String(index)}`}
                className={`${styles.thumb} m-1`}
                key={`${img}-${String(index)}`}
              >
                <div className={styles.thumbInner}>
                  <Image
                    alt="Image Preview"
                    src={img}
                    className={styles.img}
                    objectFit="contain"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </OverlayTrigger>
          ))
        : null}
    </>
  );
};

export default ThumbImage;

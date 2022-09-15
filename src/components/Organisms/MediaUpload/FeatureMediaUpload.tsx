import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "@/styles/Uploader/uploader.module.scss";

import { focusedStyle, acceptStyle, rejectStyle } from "./MediaUploadStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectMediaUpload,
  setMediaUpload
} from "@/reduxFeatures/app/mediaUploadSlice";
import { selectAcceptedMediaTypes } from "@/reduxFeatures/app/appSlice";
import ThumbImage from "./ThumbImage";
const FeatureMediaUpload = () => {
  const dispatch = useDispatch();
  const acceptedMediaTypes = useSelector(selectAcceptedMediaTypes);
  const uploadedMedia = useSelector(selectMediaUpload);
  // const populateAcceptedImagesTypes = useSelector(
  //   selectPopulateAcceptedImagesTypes
  // );
  // const populateAcceptedVideosTypes = useSelector(
  //   selectPopulateAcceptedVideosTypes
  // );
  const [rejectingFiles, setRejectingFiles] = useState([]);
  const maxFilesAccepted = 3;

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    const media2Upload = [
      ...uploadedMedia,
      ...acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
          /* NOTE:
           ** Make sure to revoke the data uri's Wherever you are using this Component to avoid memory leaks Using...
           ** "uploadedMedia".forEach(file => URL.revokeObjectURL(file.preview));
           ** Am not revoking it here to prevent broken image in Slate Editor & this component, while moving from Slate to this component to select more media
           */
        })
      )
    ];

    if (media2Upload.length <= maxFilesAccepted) {
      dispatch(setMediaUpload(media2Upload));
    } else {
      dispatch(
        setMediaUpload(
          media2Upload.slice(media2Upload.length - maxFilesAccepted)
        )
      );
    }

    setRejectingFiles(pre => [...pre, ...fileRejections]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      maxFiles: maxFilesAccepted,
      accept: acceptedMediaTypes,
      maxSize: 30000 * 1024 //30000KB || 30MB
      // maxSize: mimeSize
    });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const fileRejectionItems = rejectingFiles.map(({ file, errors }, index) => (
    <small key={`${file.path}-${index}`}>
      <li>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => (
            <li className="text-danger" key={e.code}>
              {e.message}
            </li>
          ))}
        </ul>
      </li>
    </small>
  ));

  return (
    <div className="container">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={styles.dragBox} style={style}>
          <AiOutlineCloudUpload size={30} color="#0B5351" />
          <span className={styles.dragBoxText}>
            Drag and drop Media here, or click to select
          </span>
        </div>
      </div>
      <br />
      <div className="container">
        {uploadedMedia.length > 0 && (
          <aside className={styles.thumbsContainer}>
            {/* Thumbnails Image */}
            <ThumbImage
              uploadedMedia={uploadedMedia}
              fromWhere="uploadedMedia"
            />
          </aside>
        )}
        {fileRejectionItems.length > 0 && (
          <aside className="mt-3 row col-12">
            <h6>
              <u> Rejected files </u>
            </h6>
            <ul>{fileRejectionItems}</ul>
          </aside>
        )}
      </div>
    </div>
  );
};
export default FeatureMediaUpload;

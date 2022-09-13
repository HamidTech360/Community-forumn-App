import React, { useCallback, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import styles from "@/styles/Uploader/uploader.module.scss";

import { focusedStyle, acceptStyle, rejectStyle } from "./MediaUploadStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectMediaUpload,
  setMediaUpload
  // setAcceptingFiles,
  // selectAcceptingFiles,
} from "@/reduxFeatures/app/mediaUploadSlice";
import { selectAcceptedMediaTypes } from "@/reduxFeatures/app/appSlice";
import ThumbImage from "./ThumbImage";
const MediaUpload = () => {
  const dispatch = useDispatch();
  const acceptedMediaTypes = useSelector(selectAcceptedMediaTypes);
  const uploadedMedia = useSelector(selectMediaUpload);
  // const [acceptingFiles, setAcceptingFiles] = useState([]);
  const [rejectingFiles, setRejectingFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    dispatch(
      setMediaUpload([
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
      ])
    );

    setRejectingFiles(pre => [...pre, ...fileRejections]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      // validator: nameLengthValidator,
      maxFiles: 10,
      accept: acceptedMediaTypes,
      maxSize: 300000 * 1024 //3000KB || 3MB
    });
  // console.log("isDragAccept:", isDragAccept);

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
            Drag and drop files here, or click to select files
          </span>
        </div>
      </div>
      <br />
      {uploadedMedia.length > 0 && (
        <aside className={styles.thumbsContainer}>
          {/* Thumbnails Image */}
          <ThumbImage uploadedMedia={uploadedMedia} />
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
  );
};
export default MediaUpload;

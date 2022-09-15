import React, { useCallback, useMemo, useState } from "react";
import { useDropzone as useDropzonePostImage } from "react-dropzone";
import styles from "@/styles/Uploader/uploader.module.scss";

import { focusedStyle, acceptStyle, rejectStyle } from "./MediaUploadStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectPostImageUpload,
  setPostImageUpload
} from "@/reduxFeatures/app/mediaUploadSlice";
import ThumbImage from "./ThumbImage";
import { selectPopulateAcceptedImagesTypes } from "@/reduxFeatures/app/appSlice";
const PostImageUpload = () => {
  const dispatch = useDispatch();
  const uploadedPostImage = useSelector(selectPostImageUpload);
  const acceptedImagesTypes = useSelector(selectPopulateAcceptedImagesTypes);
  const [rejectingFilesPostImage, setRejectingFilesPostImage] = useState([]);
  const maxFilesAcceptedPostImage = 1;

  const onDropPostImage = useCallback((acceptedFiles, fileRejections) => {
    dispatch(
      setPostImageUpload([
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
            /* NOTE:
             ** Make sure to revoke the data uri's Wherever you are using this Component to avoid memory leaks Using...
             ** "uploadedPostImage".forEach(file => URL.revokeObjectURL(file.preview));
             ** Am not revoking it here to prevent broken image in Slate Editor & this component, while moving from Slate to this component to select more media
             */
          })
        )
      ])
    );

    setRejectingFilesPostImage(pre => [...pre, ...fileRejections]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    getRootProps: getRootPropsPostImage,
    getInputProps: getInputPropsPost,
    isFocused: isFocusedPostImage,
    isDragAccept: isDragAcceptPostImage,
    isDragReject: isDragRejectPostImage
  } = useDropzonePostImage({
    onDrop: onDropPostImage,
    maxFiles: maxFilesAcceptedPostImage,
    accept: acceptedImagesTypes,
    maxSize: 3000 * 1024 //3000KB || 3MB
  });

  const stylePostImage = useMemo(
    () => ({
      ...(isFocusedPostImage ? focusedStyle : {}),
      ...(isDragAcceptPostImage ? acceptStyle : {}),
      ...(isDragRejectPostImage ? rejectStyle : {})
    }),
    [isFocusedPostImage, isDragAcceptPostImage, isDragRejectPostImage]
  );

  const fileRejectionItemsPostImage = rejectingFilesPostImage.map(
    ({ file, errors }, index) => (
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
    )
  );

  return (
    <div className="container">
      <div {...getRootPropsPostImage()}>
        <input {...getInputPropsPost()} />
        <div className={styles.dragBox} style={stylePostImage}>
          <AiOutlineCloudUpload size={30} color="#0B5351" />
          <span className={styles.dragBoxText}>Add Post Image</span>
        </div>
      </div>
      <br />
      <div className="row col-12">
        {uploadedPostImage.length > 0 && (
          <aside className={styles.thumbsContainer}>
            {/* Thumbnails Image */}
            <ThumbImage
              uploadedMedia={uploadedPostImage}
              fromWhere="postImage"
            />
          </aside>
        )}
        {fileRejectionItemsPostImage.length > 0 && (
          <aside className="mt-3 row col-12">
            <h6>
              <u> Rejected files </u>
            </h6>
            <ul>{fileRejectionItemsPostImage}</ul>
          </aside>
        )}
      </div>
    </div>
  );
};
export default PostImageUpload;

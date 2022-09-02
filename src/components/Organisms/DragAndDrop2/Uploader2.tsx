import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";
import styles from "@/styles/Uploader/uploader.module.scss";

import { focusedStyle, acceptStyle, rejectStyle } from "./Drag&DropStyles";
import { AiOutlineCloudUpload } from "react-icons/ai";
import Image from "next/image";
import { useDispatch } from "@/redux/store";
import {
  setMediaUpload
  // setAcceptingFiles,
  // selectAcceptingFiles,
} from "@/reduxFeatures/app/mediaUpload";

const Uploader2 = () => {
  const dispatch = useDispatch();
  // const acceptingFiles = useSelector(selectAcceptingFiles);
  const [acceptingFiles, setAcceptingFiles] = useState([]);
  const [acceptingFilesBase64, setAcceptingFilesBase64] = useState([]);
  const [rejectingFiles, setRejectingFiles] = useState([]);

  useEffect(() => {
    // Set Upload Media
    dispatch(setMediaUpload(acceptingFiles));
  }, [acceptingFiles, dispatch]);

  // useEffect(() => {
  //   // Set Upload Media
  //   dispatch(setMediaUpload(acceptingFilesBase64));
  //   console.log("acceptingFilesBase64:", acceptingFilesBase64);
  // }, [acceptingFilesBase64]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    // Normal File
    // dispatch(
    setAcceptingFiles(pre => [
      ...pre,
      ...acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    ]);
    // );

    // Base64 File
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      // reader.readAsDataURL
      reader.onload = () => {
        setAcceptingFilesBase64(pre => [...pre, reader.result]);
        // dispatch(setFilesAcceptedBase64((pre) => [...pre, reader.result]));
      };
      reader.readAsDataURL(file);
    });

    setRejectingFiles(pre => [...pre, ...fileRejections]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      // validator: nameLengthValidator,
      maxFiles: 10,
      accept: {
        "image/jpeg": [".jpeg", ".jpg"],
        "image/png": [".png"],
        "image/gif": [".gif"],
        "video/3gpp": [".3gp"],
        "video/3gpp2": [".3g2"],
        "video/mp4": [".mp4"],
        "video/mpeg": [".mpeg"],
        "video/mov": [".mov"]
      },
      maxSize: 3000 * 1024 //3000KB || 3MB
    });

  const style = useMemo(
    () => ({
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const thumbs = acceptingFiles.map((file, index) => (
    //   <ThumbImage
    // file={file}
    // index={index}
    // acceptingFiles={acceptingFiles}
    // setAcceptingFiles={setAcceptingFiles}
    // />
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
          // console.log("CLICKED");
          let removedIndex: number;
          const newlyAccepted = acceptingFiles.filter(pre => {
            return pre;
          });
          console.log("newlyAccepted:", newlyAccepted);
          setAcceptingFiles(newlyAccepted);
          // dispatch(setAcceptingFiles(newlyAccepted));

          const newlyAcceptedBase64 = acceptingFilesBase64.filter(
            (pre, idx) => {
              // console.log("Base64-PRE:", pre);
              if (removedIndex !== idx) {
                return pre;
              }
            }
          );
          console.log("newlyAcceptedBase64:", newlyAcceptedBase64);
          setAcceptingFilesBase64(newlyAcceptedBase64);
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
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks. Will run on unmount
    return () =>
      acceptingFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

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
      {acceptingFiles.length > 0 && (
        <aside className={styles.thumbsContainer}>
          <span>{thumbs}</span>
          {/* <span>
            lll
            <ThumbImage acceptingFiles={acceptingFiles} />
          </span> */}
        </aside>
      )}
      {fileRejectionItems.length > 0 && (
        <aside className="mt-3">
          <h6>
            {" "}
            <u> Rejected files </u>
          </h6>
          <ul>{fileRejectionItems}</ul>
        </aside>
      )}

      {/* <button
        onClick={() => {
          let formData = new FormData();
          let formData2 = new FormData();
          acceptingFiles.forEach((file) => {
            formData.append("file", file);
          });
          console.log("formData.getAll", formData.getAll("file"));
          dispatch(setMediaUpload(formData.getAll("file")));
          // console.log(formData.getAll("file") === acceptingFiles);
        }}
      >
        ttt
      </button>

      <form>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            let formData = new FormData();
            formData.append("file", e.target.files[0], e.target.files[0].name);

            console.log("formData:", formData.getAll("file"));
            dispatch(setMediaUpload(formData));
          }}
          // onChange={(e) => document.write(JSON.stringify(e.target.files[0]))}
        ></input>
        <button type="submit">Submit</button>
      </form> */}
    </div>
  );
};
export default Uploader2;

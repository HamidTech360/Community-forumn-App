// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import { FaTimes } from "react-icons/fa";
// import Icon from "../../common/Icon";

// import { useDispatch, useSelector } from "@/redux/store";
// import {
//   setFilesAccepted,
//   // selectFiles,
//   setFilesAcceptedBase64,
//   // selectFilesBase64,
// } from "@/reduxFeatures/app/dragAndDropSlice";

// import {
//   baseStyle,
//   focusedStyle,
//   acceptStyle,
//   rejectStyle,
//   thumbsContainer,
//   thumb,
//   thumbInner,
//   img,
// } from "./Drag&DropStyles";

// const maxLength = 20;

// function nameLengthValidator(file) {
//   if (file.name.length > maxLength) {
//     return {
//       code: "name-too-large",
//       message: (
//         <span className="text-danger">
//           Name is larger than {maxLength} characters
//         </span>
//       ),
//     };
//   }

//   return null;
// }

// const acceptedFileType = (format) => {
//   if (format === "image") {
//     return { "image/*": [".jpeg", ".png", ".jif"] };
//   } else if (format === "video") {
//     return { "video/*": [".mp4", ".3gp"] };
//   }
// };

const DragAndDropFiles = ({ format }) => {
  // const dispatch = useDispatch();
  // // const filesAccepted = useSelector(selectFiles);
  // // const filesAcceptedBase64 = useSelector(selectFilesBase64);

  // const [acceptingFiles, setAcceptingFiles] = useState([]);
  // const [acceptingFilesBase64, setAcceptingFilesBase64] = useState([]);
  // const [rejectingFiles, setRejectingFiles] = useState([]);

  // const onDrop = useCallback((acceptedFiles, fileRejections) => {
  //   setAcceptingFiles((pre) => [
  //     ...pre,
  //     ...acceptedFiles.map((file) =>
  //       Object.assign(file, {
  //         preview: URL.createObjectURL(file),
  //       })
  //     ),
  //   ]);
  //   // dispatch(
  //   //   setFilesAccepted((pre) => [
  //   //     ...pre,
  //   //     ...acceptedFiles.map((file) =>
  //   //       Object.assign(file, {
  //   //         preview: URL.createObjectURL(file),
  //   //       })
  //   //     ),
  //   //   ])
  //   // );

  //   acceptedFiles.forEach((file) => {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       setAcceptingFilesBase64((pre) => [...pre, reader.result]);
  //       // dispatch(setFilesAcceptedBase64((pre) => [...pre, reader.result]));
  //     };
  //     reader.readAsDataURL(file);
  //   });

  //   setRejectingFiles((pre) => [...pre, ...fileRejections]);
  // }, []);

  // useEffect(() => {
  //   // console.log("acceptingFilesBase64:", acceptingFilesBase64);
  //   // console.log("typeof accepting--Files:", typeof acceptingFiles);
  //   // console.log("accepting--Files:", acceptingFiles[4].preview);
  //   dispatch(setFilesAccepted([acceptingFiles]));
  //   dispatch(setFilesAcceptedBase64(acceptingFilesBase64));
  // }, [acceptingFiles, acceptingFilesBase64]);

  // const {
  //   acceptedFiles,
  //   getRootProps,
  //   getInputProps,
  //   isFocused,
  //   isDragAccept,
  //   isDragReject,
  //   fileRejections,
  // } = useDropzone({
  //   accept: acceptedFileType(format),
  //   maxFiles: 10,
  //   maxSize: 512000,
  //   validator: nameLengthValidator,
  //   onDrop,
  // });

  // const style = useMemo(
  //   () => ({
  //     ...baseStyle,
  //     ...(isFocused ? focusedStyle : {}),
  //     ...(isDragAccept ? acceptStyle : {}),
  //     ...(isDragReject ? rejectStyle : {}),
  //   }),
  //   [isFocused, isDragAccept, isDragReject]
  // );

  // const thumbs = acceptingFiles.map((file, index) => (
  //   <>
  //     <div id={`${file.name}-${String(index)}`} style={thumb} key={file.name}>
  //       {/* <FaTimes
  //         color="magenta"
  //         style={{
  //           cursor: "pointer",
  //           position: "absolute",
  //           marginLeft: "1.8rem",
  //         }}
  //         onClick={(e) => {
  //           setFilesAccepted(
  //             filesAccepted.filter((file, point) => {
  //               if (point !== index) {
  //                 return file;
  //               }
  //             })
  //           );

  //           setFilesAcceptedBase64(
  //             filesAcceptedBase64.filter((file, point) => {
  //               if (point !== index) {
  //                 return file;
  //               }
  //             })
  //           );
  //         }}
  //       /> */}
  //       <div style={thumbInner}>
  //         <img
  //           src={file.preview}
  //           style={img}
  //           // Revoke data uri after image is loaded
  //           onLoad={() => {
  //             URL.revokeObjectURL(file.preview);
  //           }}
  //         />
  //       </div>
  //     </div>
  //   </>
  // ));

  // useEffect(() => {
  //   // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
  //   return () =>
  //     acceptingFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  // }, []);

  // // const acceptedFileItems = filesAccepted.map((file) => (
  // //   <li key={file.path}>
  // //     {console.log("file:", file)}
  // //     {file.path} - {file.size} bytes
  // //   </li>
  // // ));

  // // const fileRejectionItems = fileRejections.map(({ file, errors }) => (
  // const fileRejectionItems = rejectingFiles.map(({ file, errors }, index) => (
  //   <small>
  //     <li key={`${file.path}-${index}`}>
  //       {file.path} - {file.size} bytes
  //       <ul>
  //         {errors.map((e) => (
  //           <li className="text-danger" key={e.code}>
  //             {e.message}
  //           </li>
  //         ))}
  //       </ul>
  //     </li>
  //   </small>
  // ));

  return (
    <div className="container-fluid">
      {/* <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Icon icon="upload" /> <div>Upload {format}</div>
      </div>
      <br />
      {acceptingFiles.length > 0 && (
        <aside style={thumbsContainer}>
          <span>{thumbs}</span>
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
      )} */}
    </div>
  );
};
export default DragAndDropFiles;

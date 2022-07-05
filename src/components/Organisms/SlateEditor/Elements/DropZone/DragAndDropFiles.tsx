// import React from "react";
// import { useDropzone } from "react-dropzone";
// import Icon from "../../common/Icon";

// // function Basic(props) {
// function DragAndDropFiles(props) {
//   const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

//   const files = acceptedFiles.map((file) => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   return (
//     <section className="container">
//       <div
//         style={{ cursor: "pointer", display: "flex" }}
//         {...getRootProps({ className: "dropzone" })}
//       >
//         <input {...getInputProps()} />
//         {/* <p>Drag n drop some files here, or click to select files</p> */}
//         {/* <h2 className="bg-secondary d-flex"> */}
//         <Icon icon="upload" size={40} /> <div>Upload files</div>
//         {/* </h2> */}
//       </div>
//       <br />
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </section>
//   );
// }
// {
//   /* <Basic />; */
// }

// export default DragAndDropFiles;

// +++++++++++++++++++++++++++++++++ 2 +++++++++++++++++++++++++++++++++++++++++++++++++

import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import Icon from "../../common/Icon";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const maxLength = 20;

function nameLengthValidator(file) {
  if (file.name.length > maxLength) {
    return {
      code: "name-too-large",
      //   message: `Name is larger than ${maxLength} characters`,
      message: (
        <span className="text-danger">
          Name is larger than {maxLength} characters
        </span>
      ),
    };
  }

  return null;
}

const DragAndDropFiles = ({ format }) => {
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    fileRejections,
  } = useDropzone({
    accept: { "image/*": [".jpeg", ".png"] },
    maxFiles: 2,
    validator: nameLengthValidator,
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  //   const files = acceptedFiles.map((file) => (
  //     <li key={file.path}>
  //       {file.path} - {file.size} bytes
  //     </li>
  // ));

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {console.log("file:", file)}
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li className="text-danger" key={e.code}>
            {e.message}
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="container-fluid">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <Icon icon="upload" /> <div>Upload {format}</div>
        {/* <p>Drag n drop some files here, or click to select files</p> */}
        {/* <em>(Only *.jpeg and *.png images will be accepted)</em> */}
      </div>
      <br />
      {/* <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside> */}

      <aside>
        {console.log("acceptedFileItems:", acceptedFileItems)}
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </div>
  );
};
export default DragAndDropFiles;
// ++++++++++++++++++++++++++++++++++++++++++ 3 ++++++++++++++++++++++++++++++++++++

// import React, { createRef } from "react";
// import Dropzone from "react-dropzone";

// const dropzoneRef = createRef();
// const openDialog = () => {
//   // Note that the ref is set async,
//   // so it might be null at some point
//   if (dropzoneRef.current) {
//     dropzoneRef.current.open();
//   }
// };

// // Disable click and keydown behavior on the <Dropzone>
// <Dropzone ref={dropzoneRef} noClick noKeyboard>
//   {({ getRootProps, getInputProps, acceptedFiles }) => {
//     return (
//       <div className="container">
//         <div {...getRootProps({ className: "dropzone" })}>
//           <input {...getInputProps()} />
//           <p>Drag n drop some files here</p>
//           <button type="button" onClick={openDialog}>
//             Open File Dialog
//           </button>
//         </div>
//         <aside>
//           <h4>Files</h4>
//           <ul>
//             {acceptedFiles.map((file) => (
//               <li key={file.path}>
//                 {file.path} - {file.size} bytes
//               </li>
//             ))}
//           </ul>
//         </aside>
//       </div>
//     );
//   }}
// </Dropzone>;

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// import React from 'react';
// import {useDropzone} from 'react-dropzone';

// function Dropzone(props) {
//   const {getRootProps, getInputProps, open, acceptedFiles} = useDropzone({
//     // Disable click and keydown behavior
//     noClick: true,
//     noKeyboard: true
//   });

//   const files = acceptedFiles.map(file => (
//     <li key={file.path}>
//       {file.path} - {file.size} bytes
//     </li>
//   ));

//   return (
//     <div className="container">
//       <div {...getRootProps({className: 'dropzone'})}>
//         <input {...getInputProps()} />
//         <p>Drag 'n' drop some files here</p>
//         <button type="button" onClick={open}>
//           Open File Dialog
//         </button>
//       </div>
//       <aside>
//         <h4>Files</h4>
//         <ul>{files}</ul>
//       </aside>
//     </div>
//   );
// }

// <Dropzone />

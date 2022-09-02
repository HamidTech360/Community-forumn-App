import React, { useCallback, useEffect, useState } from "react";
import { FileError, FileRejection, useDropzone } from "react-dropzone";
import SingleFileUploadWithProgress from "./SingleFileUploadWithProgress";
import { Col, Row } from "react-bootstrap";
import { useField } from "formik";
import UploadError from "./UploadError";
import styles from "@/styles/Uploader/uploader.module.scss";
import { AiOutlineCloudUpload } from "react-icons/ai";

let currentId = 0;

function getNewId() {
  return ++currentId;
}

export interface UploadableFile {
  id: number;
  file: File;
  errors: FileError[];
  url?: string;
  preview?: { img: string };
}

function MultipleFileUploadField({ name }: { name: string }) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, helpers] = useField(name);

  const [files, setFiles] = useState<UploadableFile[]>([]);

  const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
    console.log("accFiles+++", accFiles);
    const mappedAcc = accFiles.map(file => {
      return {
        file,
        errors: [],
        id: getNewId(),
        preview: Object.assign({ img: URL.createObjectURL(file) })
      };
    });

    const mappedRej = rejFiles.map(r => ({ ...r, id: getNewId() }));

    setFiles(curr => [...curr, ...mappedAcc, ...mappedRej]);
  }, []);

  useEffect(() => {
    helpers.setValue(files);
    helpers.setTouched(true);
  }, [files, helpers]);

  function onUpload(file: File, url: string) {
    setFiles(curr =>
      curr.map(fw => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  }

  function onDelete(file: File) {
    setFiles(curr => curr.filter(fw => fw.file !== file));
  }

  const { getRootProps, getInputProps } = useDropzone({
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
      "video/mpeg": [".mpeg"]
    },
    maxSize: 3000 * 1024 //3000KB || 3MB
  });

  // const thumbs = files.map((file, index) => {
  //   file?.preview?.img && (
  //     <div key={index} className="col-2">
  //       {console.log("file:::", file)}
  //       <aside className={styles.thumbsContainer}>
  //         <div className={styles.thumb}>
  //           <div className={styles.thumbInner}>
  //             <Image
  //               alt={file.name}
  //               src={file?.preview?.img}
  //               className={styles.img}
  //               width={"50%"}
  //               height={"50%"}

  //               // Revoke data uri after image is loaded
  //               // onLoad={() => {
  //               //  URL.revokeObjectURL(file?.preview?.img);
  //               // }}
  //             />
  //           </div>
  //         </div>
  //       </aside>
  //     </div>
  //   );
  // });

  return (
    <React.Fragment>
      <Row className="my-2">
        <Col>
          <div {...getRootProps()}>
            <input {...getInputProps()} />

            <div className={styles.dragBox}>
              <AiOutlineCloudUpload size={30} color="#0B5351" />
              <span className={styles.dragBoxText}>
                Drag and drop files here, or click to select files
              </span>
            </div>
          </div>
        </Col>
      </Row>

      {/* Display Thumbnails at the top */}
      {/* {files.length > 0 && <div className="row d-flex">{thumbs}</div>} */}

      {files.map(fileWrapper => (
        <Row key={fileWrapper.id} className="my-2">
          <Col>
            {fileWrapper.errors.length ? (
              <UploadError
                file={fileWrapper.file}
                errors={fileWrapper.errors}
                onDelete={onDelete}
              />
            ) : (
              <SingleFileUploadWithProgress
                onDelete={onDelete}
                onUpload={onUpload}
                file={fileWrapper.file}
                preview={fileWrapper.preview}
              />
            )}
          </Col>
        </Row>
      ))}
    </React.Fragment>
  );
}

export default MultipleFileUploadField;

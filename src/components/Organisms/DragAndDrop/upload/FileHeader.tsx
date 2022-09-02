import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import styles from "@/styles/Uploader/uploader.module.scss";
import Image from "next/image";

export interface FileHeaderProps {
  file: File;
  onDelete: (file: File) => void;
  preview?: { img: string };
  // preview?: any;
}

function FileHeader({ file, onDelete, preview }: FileHeaderProps) {
  // console.log("preview:", preview);
  return (
    <Row className="justify-content-between align-items-center mb-2">
      {preview?.img && (
        <Col
          sm={1}
          // onClick={() => console.log("clicked")}
        >
          <aside className={styles.thumbsContainer}>
            <div className={styles.thumb}>
              <div className={styles.thumbInner}>
                <Image
                  alt={file.name}
                  src={preview?.img}
                  className={styles.img}
                  width={"50%"}
                  height={"50%"}

                  // Revoke data uri after image is loaded
                  // onLoad={() => {
                  //   URL.revokeObjectURL(preview.img);
                  // }}
                />
              </div>
            </div>
          </aside>
        </Col>
      )}
      <Col sm={7} className="me-auto">
        {file?.name}
      </Col>
      <Col sm={2}>
        <Button
          size="sm"
          variant="outline-danger"
          onClick={() => onDelete(file)}
        >
          Delete
        </Button>
      </Col>
    </Row>
  );
}

export default FileHeader;

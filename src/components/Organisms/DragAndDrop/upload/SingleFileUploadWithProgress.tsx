import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import ProgressBar from "react-bootstrap/ProgressBar";
import FileHeader from "./FileHeader";

export interface SingleFileUploadWithProgressProps {
  file: File;
  onDelete: (file: File) => void;
  onUpload: (file: File, url: string) => void;
  preview?: { img: string };
}

function SingleFileUploadWithProgress({
  file,
  onDelete,
  onUpload,
  preview
}: SingleFileUploadWithProgressProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
      // console.log("file!!!:", file);
      // console.log("url:", url);
    }

    upload();
  }, [file, onUpload]);
  return (
    <Row className="my-2">
      <Col>
        <FileHeader file={file} onDelete={onDelete} preview={preview} />
        <ProgressBar
          // animated
          variant="primary"
          now={progress}
          label={`${progress}%`}
        />
      </Col>
    </Row>
  );
}

export default SingleFileUploadWithProgress;

function uploadFile(file: File, onProgress: (percentage: number) => void) {
  const url = "https://api.cloudinary.com/v1_1/demo/image/upload";
  const key = "docs_upload_example_us_preset";

  return new Promise<string>((res, rej) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url);

    xhr.onload = () => {
      const resp = JSON.parse(xhr.responseText);
      // url - where cloudinary save the file
      res(resp.secure_url);
      //   res(resp);
    };
    xhr.onerror = evt => rej(evt);
    xhr.upload.onprogress = event => {
      if (event.lengthComputable) {
        const percentage = (event.loaded / event.total) * 100;
        onProgress(Math.round(percentage));
      }
    };

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", key);

    xhr.send(formData);
  });
}

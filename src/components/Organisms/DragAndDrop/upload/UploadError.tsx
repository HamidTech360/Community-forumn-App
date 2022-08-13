import React from "react";
import { ProgressBar } from "react-bootstrap";
import { FileError } from "react-dropzone";
import FileHeader from "./FileHeader";

export interface UploadErrorProps {
  file: File;
  onDelete: (file: File) => void;
  errors: FileError[];
}

function UploadError({ file, onDelete, errors }: UploadErrorProps) {
  return (
    <React.Fragment>
      <FileHeader file={file} onDelete={onDelete} />
      <ProgressBar
        // animated
        variant="danger"
        now={100}
      />

      {errors.map((error, idx) => (
        <div key={idx} className="text-danger">
          {error.message}
        </div>
      ))}
    </React.Fragment>
  );
}

export default UploadError;

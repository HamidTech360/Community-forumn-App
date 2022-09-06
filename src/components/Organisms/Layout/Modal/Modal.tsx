import React from "react";
import { Button, Modal as M } from "react-bootstrap";
const Modal = ({
  body,
  show,
  close
}: {
  body: React.ReactNode;
  show: boolean;
  close: () => void;
}) => {
  return (
    <M size="xl" centered show={show} onHide={close}>
      <Button
        variant="light"
        size="lg"
        style={{ fontSize: "1.5rem" }}
        onClick={() => close()}
        className="position-fixed"
      >
        &larr;
      </Button>
      <M.Body className="show-grid">{body}</M.Body>
    </M>
  );
};

export default Modal;

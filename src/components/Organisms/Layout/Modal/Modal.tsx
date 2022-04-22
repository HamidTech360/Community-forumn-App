import React from "react";
import { Col, Image, Modal as M, Row } from "react-bootstrap";
import { useModalWithData } from "../../../../hooks/useModalWithData";
const Modal = ({
  body,
  show,
  close,
}: {
  body: React.ReactNode;
  show: boolean;
  close: () => void;
}) => {
  return (
    <M size="xl" centered show={show} onHide={close}>
      <M.Body className="show-grid">{body}</M.Body>
    </M>
  );
};

export default Modal;

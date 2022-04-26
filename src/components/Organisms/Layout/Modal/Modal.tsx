import { useRouter } from "next/router";
import React from "react";
import { Button, Col, Image, Modal as M, Row } from "react-bootstrap";
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
  const router = useRouter();
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

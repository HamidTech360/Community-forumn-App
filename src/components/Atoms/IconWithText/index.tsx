import React, { ReactNode } from "react";
import { Col, Row } from "react-bootstrap";

const IconWithText = ({ icon, text }: Record<string, string | ReactNode>) => {
  return (
    <Row>
      <Col md={1} xs={2}>
        <i className={`bi ${icon} contact-icon`}></i>
      </Col>
      <Col md={11} xs={10}>
        <p>{text}</p>
      </Col>
    </Row>
  );
};

export default IconWithText;

/* eslint-disable react/jsx-key */
import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";

const GistCard = ({ gist }: Record<string, any>) => {
  return (
    <Card className="mt-4 p-2">
      <Row>
        <Col xs={2}>
          <Logo />
        </Col>
        <Col xs={7}>
          <small>Started by {gist.author.author}</small>
          <br />
          <h4 className="text-primary">{gist.title}</h4>
        </Col>
        <Col xs={3} className="d-flex gap-3">
          <span>{gist.date}</span> <i className="bi bi-calendar" />
        </Col>
      </Row>
      <Card.Body>{gist.body}</Card.Body>
      <div className="d-flex ml-auto justify-content-end">
        <Button variant="primary">Join conversation</Button>
      </div>
    </Card>
  );
};

export default GistCard;

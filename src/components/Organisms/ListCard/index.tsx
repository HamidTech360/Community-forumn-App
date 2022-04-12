import React, { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface IProps {
  title: ReactNode;
  body: ReactNode;
}

const ListCard = ({ title, body }: IProps) => {
  return (
    <Card>
      <Card.Title>{title}</Card.Title>
      <Card.Body>{body}</Card.Body>
    </Card>
  );
};

export default ListCard;

import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";

const Comment = ({ comment }: Record<string, any>) => {
  return (
    <Card
      className="px-2"
      style={{ border: "none", background: "none", lineHeight: "1.2" }}
    >
      <div className="d-flex align-items-center justify-content-start gap-2 mt-1">
        <Image
          src={comment?._embedded?.user[0]?.avatar_urls?.full}
          alt="User avatar"
          width={50}
          height={50}
          fluid
          roundedCircle
        />
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            {comment?._embedded?.user[0]?.name}
          </h6>
          <small>
            <Age time={comment?.date} />
          </small>
        </div>
      </div>
      <Card.Body dangerouslySetInnerHTML={{ __html: comment.content.raw }} />
      <div className="buttons d-flex gap-2 justify-content-end mr-4">
        <span className="text-muted">Like</span>
        <span className="text-muted">Reply</span>
      </div>
    </Card>
  );
};

export default Comment;

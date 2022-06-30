import { useRouter } from "next/router";
import React from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";

const Comment = ({ comment }: Record<string, any>) => {
  const router = useRouter();
  return (
    <Card
      className="px-2"
      style={{ border: "none", background: "none", lineHeight: "1.2" }}
    >
      <div className="d-flex align-items-center justify-content-start gap-2 mt-1">
        <Image
          // src={comment?._embedded?.user[0]?.avatar_urls?.full}
          src={comment?.image && comment.image}
          alt="User avatar"
          width={50}
          height={50}
          fluid
          roundedCircle
        />
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            {/* {comment?._embedded?.user[0]?.name} */}
            {comment?.name && comment.name}
          </h6>
          <small>
            {/* <Age time={comment?.date} /> */}
            <Age time={comment?.date && comment.date.toLocaleString()} />
          </small>
        </div>
      </div>
      {router.asPath === "/blog-post" ? (
        <Card.Body
          // dangerouslySetInnerHTML={{
          //   __html: DOMPurify.sanitize(comment.content),
          // }}
          dangerouslySetInnerHTML={{
            __html: comment.content,
          }}
        />
      ) : (
        <Card.Body
          // dangerouslySetInnerHTML={{
          //   __html: DOMPurify.sanitize(comment.content.raw),
          // }}
          dangerouslySetInnerHTML={{
            __html: comment.content.raw,
          }}
        />
      )}

      <div className="buttons d-flex gap-2 justify-content-end mr-4">
        <small className="text-muted">
          Like{" "}
          {comment.like.length > 0 && (
            <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
              {comment.like.length}
            </small>
          )}
        </small>
        <small className="text-muted">
          Reply{" "}
          {comment.reply.length > 0 && (
            <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
              {comment.reply.length}
            </small>
          )}
        </small>
      </div>
    </Card>
  );
};

export default Comment;

import React from "react";
import timeAge from "time-age";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import Link from "next/link";
import Age from "../../../Atoms/Age";

// interface IGist {
//   gist: {
//     author: {
//       author?: string;
//       image?: string;
//     };
//     title: string;
//     date: string;
//     body: string;
//   };
// }
const GistCard = ({
  gist,
  primary,
}: {
  gist: Record<string, any>;
  primary?: boolean;
}) => {
  return (
    <div>
      <Card
        className="mt-4 p-3"
        style={{
          border: "none",
          borderRadius: "10px",
        }}
      >
        <Row>
          <Col xs={3} md={2}>
            <Image
              src={gist?._embedded?.user[0].avatar_urls.full}
              fluid
              alt="Avatar"
              roundedCircle
            />
          </Col>
          <Col xs={7} md={7}>
            <small>Started by {gist?._embedded?.user[0].name}</small>
            <br />
            <h4 className="text-primary">{gist?.title.raw}</h4>
          </Col>
          <Col xs={3}>
            <small className="d-flex gap-1">
              <Age time={gist?.date} /> <i className="bi bi-bookmark-dash" />
            </small>
          </Col>
        </Row>
        <Card.Body
          dangerouslySetInnerHTML={{ __html: gist?.content.raw }}
          style={{
            lineHeight: "1.3rem",
            height: primary ? "inherit" : "7.4rem",
            overflow: "hidden",
          }}
        />
        {!primary && (
          <div className="d-flex ml-auto justify-content-end mt-2">
            <Link href={`/gist/${gist.id}`} passHref>
              <Button variant="primary">Join conversation</Button>
            </Link>
          </div>
        )}
      </Card>
    </div>
  );
};

export default GistCard;

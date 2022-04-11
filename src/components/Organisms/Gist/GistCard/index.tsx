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
        <Row className="d-flex align-items-center">
          <Col xs={2} md={1} className="px-2">
            <Image
              src={gist?._embedded?.user[0]?.avatar_urls.full}
              width={50}
              height={50}
              alt="Avatar"
              roundedCircle
            />
          </Col>
          <Col xs={7} md={8} className="px-4">
            <small>Started by {gist?._embedded?.user[0].name}</small>
            <br />
            <h5 className="text-primary">
              {gist?.title.raw.replace("&amp;", "&")}
            </h5>
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
            marginTop: "-1rem",
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

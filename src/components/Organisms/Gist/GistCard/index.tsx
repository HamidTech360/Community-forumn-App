import React from "react";
import timeAge from "time-age";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import Link from "next/link";
import Age from "../../../Atoms/Age";
import striptags from "striptags";
import { DirectiveLocation } from "graphql";
import styles from "@/styles/gist.module.scss"
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
        <div className="d-flex flex-row gap-2">
          <div className="ps-2">
            <Image
              src={gist?._embedded?.user[0]?.avatar_urls?.full}
              width={50}
              height={50}
              alt="Avatar"
              roundedCircle
              className= {styles.img}
            />
          </div>
          <div className={styles.div}>
            <small>Started by {gist?._embedded?.user[0].name}</small>
            <br />
            <h5 className={`text-primary ${styles.title}`}>
              {gist?.title.raw.replace("&amp;", "&")}
            </h5>
          </div>
          <div className="ms-auto">
            <small className={`d-flex ${styles.time}`}>
              <Age time={gist?.date} /> <i className="bi bi-bookmark-dash" />
            </small>
          </div>
        </div>
        <Card.Body
          dangerouslySetInnerHTML={{
            __html: striptags(
              gist?.content.raw,
              "<a> <b> <em> <p> <strong> <i>"
            ).slice(0, 500),
          }}
          style={{
            marginTop: "-1rem",
            lineHeight: "1.3rem",
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

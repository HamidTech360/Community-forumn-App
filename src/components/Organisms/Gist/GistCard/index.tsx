import React from "react";
import timeAge from "time-age";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { BsBookmarkDash } from "react-icons/bs";
import Link from "next/link";
import Age from "../../../Atoms/Age";
import striptags from "striptags";
import { DirectiveLocation } from "graphql";
import styles from "@/styles/gist.module.scss";
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
const GistCard = ({ gist, author, primary }: any) => {
  return (
    <Card
      className="mt-4 p-3 shadow-sm"
      style={{
        border: "none",
        borderRadius: "10px",
        marginLeft: "-.4rem",
        marginRight: "-.2rem",
      }}
    >
      <div className="row d-flex flex-row mb-0 mb-md-2">
        <div className="col-1 me-3 pt-2 pt-md-3 align-items-center">
          <Image
            src={"/images/imagePlaceholder.jpg"}
            width={50}
            height={50}
            alt="Avatar"
            roundedCircle
            className={styles.img}
          />
        </div>
        <div className={`col-9 col-sm-10 col-md-7 ${styles.div}`}>
          <small className="text-secondary">
            Started by {author?.firstName} {author?.lastName}
          </small>
          <br />
          <h5 className={`text-primary mt-1 ${styles.title}`}>
            {gist?.title?.replace("&amp;", "&")}
          </h5>
        </div>
        <div className="col-12 col-md-3 ms-5 ms-md-auto mb-2 text-muted">
          <small className={`d-flex ${styles.time}`}>
            <Age time={gist?.createdAt} /> <BsBookmarkDash className="ms-2" />
          </small>
        </div>
      </div>
      <Card.Body
        dangerouslySetInnerHTML={{
          __html: striptags(gist?.post, "<a> <b> <em> <p> <strong> <i>").slice(
            0,
            500
          ),
        }}
        style={{
          marginTop: "-1rem",
          lineHeight: "1.3rem",
          whiteSpace: "pre-line",
        }}
      />
      {!primary && (
        <div className="d-flex justify-content-end mt-2">
          <Link href={`/gist/${gist?._id}`} passHref>
            <Button variant="primary">Join conversation</Button>
          </Link>
        </div>
      )}
    </Card>
  );
};

export default GistCard;

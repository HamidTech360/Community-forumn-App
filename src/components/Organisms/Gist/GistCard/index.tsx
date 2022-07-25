import React from "react";
import timeAge from "time-age";
import { useRouter } from "next/router";
import { Button, Card, Col, Row, Image } from "react-bootstrap";
import { BsBookmarkDash } from "react-icons/bs";
import Link from "next/link";
import Age from "../../../Atoms/Age";
import striptags from "striptags";
import DOMPurify from "dompurify";
//import { DirectiveLocation } from "graphql";
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
const GistCard = ({ gist, primary, trimmed }: any) => {
  console.log(gist);
  const sanitizer = DOMPurify.sanitize;
  const router = useRouter();

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: gist?.author?._id,
      },
    });
  };

  return (
    <Card
      className="mt-4 p-3 shadow-sm w-100"
      style={{
        border: "none",
        borderRadius: "10px",
        marginLeft: "-.4rem",
        marginRight: "-.2rem",
      }}
    >
      <Card.Title>
        <div className="d-flex flex-wrap gap-3 px-2 mb-0 mb-md-2">
          <div className="pt-2 pt-md-3 align-items-center">
            <Image
              src={"/images/imagePlaceholder.jpg"}
              width={50}
              height={50}
              alt="Avatar"
              roundedCircle
              className={styles.img}
              onClick={redirectPage}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className={` ${styles.div}`}>
            <small
              className={`${styles.title} text-secondary text-capitalize `}
              onClick={redirectPage}
              style={{ cursor: "pointer" }}
            >
              Started by {gist?.author?.firstName} {gist?.author?.lastName}
            </small>
            <br />
            <h5 className={`text-primary mt-1 ${styles.title}`}>
              {gist?.title?.replace("&amp;", "&")}
            </h5>
          </div>
          <div className="ms-auto mb-2 text-muted">
            <small className={`d-flex text-center ${styles.time}`}>
              <Age time={gist?.createdAt} /> <BsBookmarkDash className="ms-2" />
            </small>
          </div>
        </div>
      </Card.Title>

      {gist?.post && (
        <Card.Body
          dangerouslySetInnerHTML={{
            __html: sanitizer(
              trimmed
                ? gist.post.slice(0, 500) || gist.post.slice(0, 500)
                : gist.post || gist.post
            ),
          }}
          style={{
            marginTop: "-1rem",
            lineHeight: "1.3rem",
            whiteSpace: "pre-line",
          }}
        />
      )}

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

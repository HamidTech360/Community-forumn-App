import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Card as BCard } from "react-bootstrap";
import DOMPurify from "dompurify";

interface ICard {
  _id: string;
  title: string;
  image: string;
  author?: { _id: string; firstName: string; lastName: string };
  body: string;
  size?: string;
}

const Card = ({ _id, image, title, author, body, size }: ICard) => {
  const sanitizer = DOMPurify.sanitize;
  const router = useRouter();

  const redirectPage = () => {
    router.push({
      pathname: `/profile/[id]`,
      query: {
        id: author?._id
      }
    });
  };

  return (
    <>
      <BCard
        // className="shadow-sm"
        style={{
          // boxShadow:
          //   size === "small"
          //     ? "0"
          //     : "0px 8.21687px 8.21687px rgba(0, 0, 0, 0.1)",

          border: size === "small" ? "none" : "1px solid rgba(0, 0, 0, 0.125)",

          width: "100%",
          minHeight: "380px"
        }}
      >
        <BCard.Img
          src={image}
          alt={title}
          style={{
            height: "200px",

            objectFit: "cover"
          }}
          onClick={redirectPage}
        />
        <BCard.Body>
          <div className="text p-3">
            <h6
              className="text-primary"
              style={{ textTransform: "capitalize" }}
            >
              {title?.toLowerCase()}
            </h6>
            <span className="text-muted">
              <small
                style={{
                  marginTop: "-2rem",
                  fontSize: "0.8rem",
                  cursor: "pointer"
                }}
                onClick={redirectPage}
              >
                by &nbsp;{author?.firstName}&nbsp;
                {author?.lastName}
              </small>{" "}
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: sanitizer(body) }}
              style={{
                height: "4.5rem",
                lineHeight: "1.5rem",
                overflow: "hidden",
                color: "#8E8E8E",
                fontSize: "0.9rem"
              }}
            />
          </div>
          <Link href={`/explore/${_id}`} passHref>
            <span
              className="d-flex justify-content-end text-primary absolute-bottom"
              style={{ cursor: "pointer" }}
            >
              Read More &nbsp;<i className="bi bi-chevron-double-right"></i>
            </span>
          </Link>
        </BCard.Body>
      </BCard>
    </>
  );
};

export default Card;

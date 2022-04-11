import React from "react";
import PropTypes from "prop-types";
import { Card as BCard } from "react-bootstrap";
import Link from "next/link";

const Card = ({ image, title, author, id }: Record<string, any>) => {
  return (
    <>
      <BCard
        style={{
          width: "261px",
          minHeight: "270px",
        }}
      >
        <BCard.Img
          src={image}
          alt={title.raw}
          style={{
            height: "130px",

            objectFit: "cover",
          }}
        />

        <div className="text px-3 pt-2">
          <h4
            className="text-primary"
            style={{ textTransform: "capitalize", fontSize: "1.2rem" }}
          >
            {title.raw.replace("&amp;", "&")}
          </h4>
          <span className="text-muted">by &nbsp;{author}</span>
        </div>
        <Link href={`/gist/${id}`} passHref>
          <span className="d-flex justify-content-end text-primary absolute-bottom">
            Read More &nbsp; <i className="bi bi-chevron-double-right"></i>
          </span>
        </Link>
      </BCard>
    </>
  );
};

export default Card;

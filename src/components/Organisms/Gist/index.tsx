import React from "react";
import PropTypes from "prop-types";
import { Card as BCard } from "react-bootstrap";
import Link from "next/link";

import { BsChevronDoubleRight } from "react-icons/bs";

const Card = ({ image, title, author, id }: Record<string, any>) => {
  // console.log(author);

  return (
    <>
      <BCard
        style={{
          width: "271px",
          height: "250px",
        }}
      >
        <BCard.Img
          src={image}
          alt={title?.raw}
          style={{
            height: "130px",
            objectFit: "cover",
          }}
        />

        <div className="text px-3 pt-2">
          <h4
            className="text-primary"
            style={{ textTransform: "capitalize", fontSize: "1rem" }}
          >
            {title?.replace("&amp;", "&")}
          </h4>
          <span
            className="text-muted"
            style={{ fontSize: ".8rem", marginTop: "-5rem" }}
          >
            by &nbsp;{author}
          </span>
        </div>
        <Link href={`/gist/${id}`} passHref>
          <span
            className="d-flex btn mt-auto me-2 justify-content-end text-primary absolute bottom-0"
            style={{ fontSize: ".9rem" }}
          >
            Read More &nbsp; <BsChevronDoubleRight className="mt-1" />
          </span>
        </Link>
      </BCard>
    </>
  );
};

export default Card;

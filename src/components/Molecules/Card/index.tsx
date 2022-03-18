import React from "react";
import PropTypes from "prop-types";
import { Card as BCard } from "react-bootstrap";
interface ICard {
  title: string;
  image: string;
  author?: string;
  body: string;
  size?: string;
}
const Card = ({ image, title, author, body, size }: ICard) => {
  return (
    <>
      <BCard
        style={{
          boxShadow:
            size === "small"
              ? "0"
              : "0px 8.21687px 8.21687px rgba(0, 0, 0, 0.1)",
          width: size === "small" ? "261px" : "inherit",
          minHeight: "400px",
        }}
      >
        <BCard.Img
          src={image}
          alt={title}
          style={{
            height: size === "small" ? "110px" : "150px",

            objectFit: "cover",
          }}
        />

        <div className="text p-3">
          <h4 className="text-primary" style={{ textTransform: "capitalize" }}>
            {title.toLowerCase()}
          </h4>
          <span className="text-muted">by &nbsp;{author}</span>
          <div
            dangerouslySetInnerHTML={{ __html: body }}
            style={{
              height: "4.5rem",
              lineHeight: "1.5rem",
              overflow: "hidden",
              color: "#8E8E8E",
            }}
          />
        </div>
        <span className="d-flex justify-content-end text-primary absolute-bottom">
          ...Read More &nbsp;<i className="bi bi-chevron-double-right"></i>
        </span>
      </BCard>
    </>
  );
};

export default Card;

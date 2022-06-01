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

          width: "100%",
          minHeight: "380px",
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
        <BCard.Body>
          <div className="text p-3">
            <h6
              className="text-primary"
              style={{ textTransform: "capitalize" }}
            >
              {title.toLowerCase()}
            </h6>
            <span className="text-muted">
              <small style={{ marginTop: "-2rem", fontSize: "0.8rem" }}>
                by &nbsp;{author}
              </small>{" "}
            </span>
            <div
              dangerouslySetInnerHTML={{ __html: body }}
              style={{
                height: "4.5rem",
                lineHeight: "1.5rem",
                overflow: "hidden",
                color: "#8E8E8E",
                fontSize: "0.9rem",
              }}
            />
          </div>
          <span className="d-flex justify-content-end text-primary absolute-bottom">
            Read More &nbsp;<i className="bi bi-chevron-double-right"></i>
          </span>
        </BCard.Body>
      </BCard>
    </>
  );
};

export default Card;

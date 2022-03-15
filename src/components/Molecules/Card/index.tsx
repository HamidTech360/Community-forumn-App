/* eslint-disable react/jsx-key */
import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import { timeLog } from "console";
import { Card as BCard } from "react-bootstrap";
interface ICard {
  title: string;
  image: string;
  author: string;
  body?: string;
}
const Card = ({ image, title, author, body }: ICard) => {
  return (
    <>
      <BCard className="card">
        <BCard.Img src={image} alt={title} />

        <div className="text p-3">
          <h3>{title}</h3>
          {body}
        </div>
      </BCard>
    </>
  );
};

export default Card;

/* eslint-disable react/jsx-key */
import React from "react";

interface IBannerProps {
  title: string;
  image: string;
}
const Banner = ({ title, image }: IBannerProps) => {
  return (
    <>
      <div className={`banner `}>
        <h1>{title}</h1>
      </div>
      <style jsx>
        {`
          .banner {
            background-image: url(${image});
            height: 40vh;
            background-size: cover;
            background-position: bottom center;
            display: grid;
            place-items: center;
          }

          h1 {
            color: #f4f4f4;
            text-transform: uppercase;
            font-weight: bold;
          }
        `}
      </style>
    </>
  );
};

export default Banner;

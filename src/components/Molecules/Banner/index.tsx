import React from "react";

interface IBannerProps {
  title: string;
  image: string;
  effective?: string;
  revised?: string;
}
const Banner = ({ title, image, effective, revised }: IBannerProps) => {
  return (
    <>
      <div className={`banner`}>
        <h1 style={{ marginBottom: "-7rem" }}>{title}</h1>

        {effective && revised ? (
          <aside className="text-light">
            <p style={{ marginBottom: "-.1rem" }}>
              <span className="lead">Effective:</span> {effective}{" "}
            </p>
            <p>
              <span className="lead">Revised:</span> {revised}{" "}
            </p>
          </aside>
        ) : null}
      </div>
      <style jsx>
        {`
          .banner {
            background: rgba(66, 78, 78, 1) url(${image});
            background-blend-mode: overlay;
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

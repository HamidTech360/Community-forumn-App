import React from "react";
import { Image } from "react-bootstrap";
import styles from "@/styles/mediaTemplate.module.css";

const Media = () => {
  const imageList = [
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
    {
      image: "imagePlaceholder.jpg",
    },
  ];
  return (
    <div className={`row d-flex justify-content-start justify-content-sm-evenly ${styles.media}`}>
      {imageList.map((item, i) => (
        <div
          key={i}
          className="col-6 col-sm-4 col-md-3 col-lg-2 my-2 mx-1 ms-4 ms-sm-0"
        >
          <Image
            src={`/images/${
              i + 1 >= 1 && i + 1 <= 4 ? `masonry${i + 1}.png` : item.image
            }`}
            className={`${styles.image} shadow`}
            height={100}
            width={130}
            alt="placeholder"
          />
        </div>
      ))}
    </div>
  );
};

export default Media;

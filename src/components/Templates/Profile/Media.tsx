import React from "react";
import { Image } from "react-bootstrap";
import styles from "../../../styles/mediaTemplate.module.css";

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
  ];
  return (
    <div>
      <div className={styles.mediaImages}>
        <div className={styles.imageGrid}>
          {imageList.map((item, i) => (
            <div className={styles.imageGridItem}>
              <Image
                src={`/images/${
                  i + 1 >= 1 && i + 1 <= 4 ? `masonry${i + 1}.png` : item.image
                }`}
                className={styles.image}
                alt="placeholder"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;

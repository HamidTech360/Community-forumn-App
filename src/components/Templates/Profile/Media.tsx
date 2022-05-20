import React from "react";
import styles from '../../../styles/mediaTemplate.module.css'

const Media = () => {
  const imageList = [
    {
      image:'imagePlaceholder.jpg'
    },
    {
      image:'imagePlaceholder.jpg'
    },
    {
      image:'imagePlaceholder.jpg'
    },
    {
      image:'imagePlaceholder.jpg'
    },
    {
      image:'imagePlaceholder.jpg'
    },
    {
      image:'imagePlaceholder.jpg'
    },
  ]
  return (
    <div>
      <div className={styles.mediaImages}>
          <div className={styles.imageGrid}>
             {
               imageList.map((item, i)=>
               <div className={styles.imageGridItem}>
                  <img src={`/images/${item.image}`} className={styles.image} alt="placeholder" />
                </div>
               )
             }
          </div>
      </div>
    </div>
  )
};

export default Media;

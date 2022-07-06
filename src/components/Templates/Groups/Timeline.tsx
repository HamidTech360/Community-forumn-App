import React from "react";
import styles from "@/styles/timeline.module.scss";
import Posts from "@/components/Templates/Profile/Timeline";

const Timeline = () => {
  return (
    <>
      <div>
        <h5 className={styles.head}>Posts</h5>
        <Posts Posts={[]} />
      </div>
    </>
  );
};

export default Timeline;

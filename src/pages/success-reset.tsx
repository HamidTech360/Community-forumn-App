import React from "react";
import { Image } from 'react-bootstrap'
import styles from "../styles/success-reset.module.scss";

const SuccessReset = () => {
  return ( 
    <>
      <div className = {styles.body}>
        <Image
          src="/assets/ellipse-intro-top.png"
          className={styles.vector1}
          alt=""
        />

        <div className = {styles.page}>
          <h1>Success!</h1>
          <p>Your new password has been created</p>

          <button>Back To Login</button>
        </div>
          <Image
          src="/assets/ellipse-intro-right.png"
          className={styles.vector2}
          alt=""
        />
      </div>
    </>
  )
};

export default SuccessReset;

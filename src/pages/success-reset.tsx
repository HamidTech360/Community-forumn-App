import React from "react";
import styles from "../styles/success-reset.module.scss";

const SuccessReset = () => {
  return ( 
    <>
      <div className = {styles.body}>
        <div className = {styles.page}>
          <h1>Success!</h1>
          <p>Your new password has been created</p>

          <button>Back To Login</button>
        </div>
      </div>
    </>
  )
};

export default SuccessReset;

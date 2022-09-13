import Head from "next/head";
import React from "react";
import { Image, Button } from "react-bootstrap";
import styles from "../styles/success-reset.module.scss";
import Link from "next/link";

const SuccessReset = () => {
  return (
    <>
      <Head>
        <title>Reset: Success</title>
      </Head>
      <div className={styles.body}>
        <Image
          src="/assets/ellipse-intro-top.png"
          className={styles.vector1}
          alt=""
        />

        <div className={styles.page}>
          <h1>Success!</h1>
          <p>Your new password has been created</p>

          <Link href={"/login"}>
          <Button style={{fontSize:'15px'}} >Back To Login</Button>
          </Link>
        </div>
        <Image
          src="/assets/ellipse-intro-right.png"
          className={styles.vector2}
          alt=""
        />
      </div>
    </>
  );
};

export default SuccessReset;

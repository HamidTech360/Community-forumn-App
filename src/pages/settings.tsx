import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { Card, Container, Nav } from "react-bootstrap";
import styles from "../styles/settings.module.scss"


const Settings = () => {

    const router = useRouter();
    const { path } = router.query;  

    return (            
        <>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        hhhhhh01
      </Container>
    </>
  );
};

export default Settings;

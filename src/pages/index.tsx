/* eslint-disable react/jsx-key */
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Logo from "../components/Atoms/Logo";
import Articles from "../components/Organisms/Landing/Articles";
import Intro from "../components/Organisms/Landing/Intro";
import Services from "../components/Organisms/Landing/Service";
import Footer from "../components/Organisms/Layout/Footer";
import styles from "../styles/Landing.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Settlin - Study and work abroad</title>
        <meta
          name="description"
          content="Connect and interact with people in the study, work and live abroad community and get all the information that you need."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <Intro />
          <Services />
          <Articles />
        </>
      </main>
    </>
  );
};

export default Home;

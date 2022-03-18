import { InferGetStaticPropsType } from "next";
import Head from "next/head";
import Image from "next/image";
import { Container } from "react-bootstrap";
import Logo from "../components/Atoms/Logo";
import Articles from "../components/Organisms/Landing/Articles";
import Intro from "../components/Organisms/Landing/Intro";
import Services from "../components/Organisms/Landing/Service";
import Footer from "../components/Organisms/Layout/Footer";
import styles from "../styles/Landing.module.scss";

const Home = ({ articles }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
          <Articles articles={articles} />
        </>
      </main>
    </>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://setlinn.com/graphql", {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        posts {
          nodes {
            author {
              node {
                name
              }
            }
            title
            excerpt
            featuredImage {
              node {
                mediaItemUrl
              }
            }
          }
        }
      }
      `,
    }),
  });

  const {
    data: {
      posts: { nodes },
    },
  } = await res.json();

  return {
    props: {
      articles: nodes,
      revalidate: 1,
    },
  };
}

export default Home;

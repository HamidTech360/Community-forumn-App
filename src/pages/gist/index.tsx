import Head from "next/head";
import { useEffect } from "react";
import { Col, Container, Card as BCard, Row } from "react-bootstrap";
import Card from "../../components/Organisms/Gist";
import EndlessCarousel from "../../components/Molecules/Carousel";
import GistCard from "../../components/Organisms/Gist/GistCard";
import styles from "../../styles/gist.module.scss";

const Gist = ({ gists }: { gists: Record<string, any>[] }) => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  return (
    <section className={styles.gist}>
      <Head>
        <title>Gists</title>
      </Head>
      <h1 className="d-flex justify-content-center align-center">Gist</h1>
      <Container>
        <h2>Popular Gists</h2>
        <div className={` ${styles.cards}`}>
          <EndlessCarousel gap="mx-auto">
            {gists?.map((post, key) => (
              <Card
                key={`article-${key}`}
                id={post?.id}
                image={
                  post?.bbp_media
                    ? post?.bbp_media[0]!.attachment_data?.thumb
                    : "/images/formbg.png"
                }
                title={post?.title}
                author={post?._embedded?.user[0].name}
              />
            ))}
          </EndlessCarousel>
        </div>
        <Row className="mt-5">
          <Col md={4} className="desktop-only">
            <BCard
              className="py-4 px-5 justify-content-center"
              style={{ border: "none" }}
            >
              <h5>Browse categories</h5>

              <p style={{ listStyleType: "none" }}>
                {[1, 2, 3, 4, 5].map((item, key) => (
                  <li key={`category-${key}`}>Lorem, ipsum.</li>
                ))}
              </p>
            </BCard>
          </Col>
          <Col md={8} className={styles.cards}>
            <div className="d-flex justify-content-between">
              <h2>New Gists</h2>
              <select className="outline-primary">
                <option>Canada</option>
              </select>
            </div>
            {gists.map((post, key) => (
              <GistCard gist={post} key={`gist-${key}`} />
            ))}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export async function getStaticProps() {
  const gistsFetch = await fetch(
    `${process.env.REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID
    &per_page=10`,
    { method: "GET" }
  );
  const gists = await gistsFetch.json();

  return {
    props: {
      gists,

      revalidate: 1,
    },
  };
}

export default Gist;

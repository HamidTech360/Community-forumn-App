import Head from "next/head";
import { useEffect } from "react";
import { Col, Container, Card as BCard, Row } from "react-bootstrap";
import Card from "../../components/Organisms/Gist";
import EndlessCarousel from "../../components/Molecules/Carousel";
import GistCard from "../../components/Organisms/Gist/GistCard";
import styles from "../../styles/gist.module.scss";

const Gist = ({
  gists,
  categories,
}: {
  gists: Record<string, any>[];
  categories: Record<string, any>[];
}) => {
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
                image={post?.bbp_media![0].attachment_data.thumb}
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
                {categories.map((item, key) => (
                  <li key={`category-${key}`}>{item.name}</li>
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
  const res = await fetch(process.env.GRAPHQL!, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        


          categories {
            nodes {
              name
            }
          }
        
      }
      `,
    }),
  });

  const gistsFetch = await fetch(
    `${process.env.REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID
    &per_page=10`,
    { method: "GET" }
  );
  const gists = await gistsFetch.json();
  const {
    data: {
      categories: { nodes: categories },
    },
  } = await res.json();

  return {
    props: {
      gists,
      categories,
      revalidate: 1,
    },
  };
}

export default Gist;

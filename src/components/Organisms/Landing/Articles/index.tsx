import React from "react";
import { Button, Container } from "react-bootstrap";
import styles from "../../../../styles/Landing.module.scss";
import Card from "../../../Molecules/Card";
import EndlessCarousel from "../../../Molecules/Carousel";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Articles = ({ articles }: { articles?: Record<string, any> }) => {
  return (
    <section className={styles.articles}>
      <Container>
        <h1 className={`${styles.heading} my-5 `}>Newest Articles</h1>
        <div className="mb-5 d-flex justify-content-center align-items-center gap-2">
          <Button variant="primary" size="lg">
            Explore
          </Button>
          <Button variant="outline" size="lg">
            Gist
          </Button>
        </div>
        <div className={`gap-5 ${styles.cards}`}>
          <EndlessCarousel>
            {articles?.map((post: any, key: number) => (
              <Card
                _id={post._id}
                key={`article-${key}`}
                image={post.image || "/images/formbg.png"}
                title={post.postTitle}
                body={post.postBody}
                author={post.author}
                size=""
              />
            ))}
          </EndlessCarousel>
        </div>
      </Container>
    </section>
  );
};

export default Articles;

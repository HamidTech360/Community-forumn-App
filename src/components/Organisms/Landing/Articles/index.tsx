/* eslint-disable react/jsx-key */
import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../../../../styles/Landing.module.scss";
import Card from "../../../Molecules/Card";
import EndlessCarousel from "../../../Molecules/Carousel";

const posts = [
  {
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: "by Mike Dike",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: "by Mike Dike",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: "by Mike Dike",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: "by Mike Dike",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
];
const Articles = () => {
  return (
    <section className={styles.articles}>
      <Container>
        <h1 className={`${styles.heading} my-5 `}>Newest Articles</h1>
        <div className="mb-5 d-flex justify-content-center align-items-center gap-2">
          <Button variant="primary" size="lg">
            Explore
          </Button>
          <Button variant="outline-primary" size="lg">
            Gist
          </Button>
        </div>
        <div className={`gap-5 ${styles.cards}`}>
          <EndlessCarousel>
            {posts.map((post, key) => (
              <Card
                key={`article-${key}`}
                image={post.image}
                title={post.title}
                body={post.body}
                author={post.author}
              />
            ))}
          </EndlessCarousel>
        </div>
      </Container>
    </section>
  );
};

export default Articles;

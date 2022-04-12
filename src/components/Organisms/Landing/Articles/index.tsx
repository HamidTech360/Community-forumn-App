import React from "react";
import { Button, Container } from "react-bootstrap";
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
const Articles = ({ articles }: { articles: Record<string, any> }) => {
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
                key={`article-${key}`}
                image={
                  post.featuredImage?.node.mediaItemUrl || "/images/formbg.png"
                }
                title={post.title}
                body={post.excerpt}
                author={post.author.node.name}
              />
            ))}
          </EndlessCarousel>
        </div>
      </Container>
    </section>
  );
};

export default Articles;

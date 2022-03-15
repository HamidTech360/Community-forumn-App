/* eslint-disable react/jsx-key */
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Card from "../components/Molecules/Card";
import EndlessCarousel from "../components/Molecules/Carousel";
import GistCard from "../components/Organisms/Gist/GistCard";
import styles from "../styles/gist.module.scss";

const posts = [
  {
    date: "3 days ago",
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: {
      author: "Mike Dike",
      image: "/images/mike.png",
    },
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    date: "3 days ago",
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: {
      author: "Mike Dike",
      image: "/images/mike.png",
    },
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    date: "3 days ago",
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: "by Mike Dike",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
  {
    date: "3 days ago",
    image: "/images/article.png",
    title: "5 ways to work Abroad",
    author: {
      author: "Mike Dike",
      image: "/images/mike.png",
    },
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum varius aliquam habitasse gravida. Tincidunt sollicitudin leo quis id in amet, auctor.",
  },
];

const gist = () => {
  return (
    <>
      <section className={styles.gist}>
        <h1 className="d-flex justify-content-center align-center">Gist</h1>
        <Container>
          <h2>Popular Gists</h2>
          <div className={`gap-5 ${styles.cards}`}>
            <EndlessCarousel>
              {posts.map((post, key) => (
                <Card
                  key={`article-${key}`}
                  image={post.image}
                  title={post.title}
                  author={post.author.author}
                />
              ))}
            </EndlessCarousel>
          </div>
          <Row className="mt-4">
            <Col md={4}></Col>
            <Col md={8}>
              <div className="d-flex justify-content-between">
                <h2>New Gists</h2>
                <select className="outline-primary">
                  <option>Canada</option>
                </select>
              </div>
              {posts.map((post, key) => (
                <GistCard gist={post} key={`gist-${key}`} />
              ))}
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default gist;

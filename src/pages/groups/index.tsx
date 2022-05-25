import React, { useEffect } from "react";
import styles from "@/styles/groups.module.scss";
import { Card, CardImg, Container, Form, Image } from "react-bootstrap";
import Timeline from "@/components/Templates/Profile/Timeline";

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
const Groups = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <div className="mt-5">
      <Container>
        <Card
          style={{ maxWidth: "280px", border: "none" }}
          className="d-none d-lg-block p-3 position-fixed left-0"
        >
          <div className="d-flex justify-content-between my-2">
            {" "}
            <text className="bold">Your groups</text>
            <text className="text-primary">See more</text>
          </div>
          <Form.Control placeholder="search" />
        </Card>
        <div style={{ marginLeft: "300px" }}>
          <div className={`d-flex gap-3 mb-3`}>
            {posts.map((post, index) => (
              <Card
                key={`card-${index}`}
                style={{ height: "280px", border: "none" }}
              >
                <CardImg src={post.image} alt="" style={{ height: "60%" }} />
                <Card.Body className="d-flex flex-column">
                  <text className="bold">{post.title}</text>
                  <small className="text-muted">
                    Admin: {post.author.split(" ")[1]}
                  </small>
                  <Image
                    width={20}
                    height={20}
                    alt="members"
                    src="/assets/icons/users.svg"
                  />
                </Card.Body>
              </Card>
            ))}
          </div>
          <main className={styles.posts}>
            <Timeline />
          </main>
        </div>
      </Container>
    </div>
  );
};

export default Groups;

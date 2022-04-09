import { GetStaticProps, InferGetStaticPropsType } from "next";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Tabs,
  Tab,
  Alert,
} from "react-bootstrap";
import Card from "../../components/Molecules/Card";
import styles from "../../styles/explore.module.scss";
const Explore = ({
  categories,
  users,
}: {
  categories: Record<string, any>[];
  users: Record<string, any>[];
}) => {
  const [key, setKey] = useState<string>("all");
  const [posts, setPosts] = useState<Record<string, any>[]>([]);
  useEffect(() => {
    console.log(users);
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const fetchData = useCallback(async () => {
    const res = await fetch("https://setlinn.com/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        query: ` {
          
              posts ${key !== "all" ? `(where: {categoryId: ${key}})` : ``} {
                
                  nodes {
                    author {
                      node {
                        name
                      }
                    }
                    excerpt
                    id
                    date
                    featuredImage {
                      node {
                        mediaItemUrl
                      }
                    }
                    title
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

    setPosts(nodes);
  }, [key, posts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return (
    <div>
      <section className={`d-flex align-items-center ${styles.intro}`}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={` ${styles.text}`}>
                <h1 className={`${styles.textPrimary} text-primary`}>
                  Read, Write, Connect
                </h1>
                <p className="text-muted">
                  Read and post thoughts on any topic while connecting with
                  millions of readers and writers across the world
                </p>
                <div className="d-flex gap-3">
                  <Button variant="primary">Start writing</Button>
                  <Button variant="light">Explore</Button>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Container className="image-container">
                <Image
                  src="/assets/blog-post/pana.svg"
                  alt="Vector Icon"
                  fluid
                />
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={styles.topicsSection}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Topics that matter to you
          </h1>
          <div className={styles.topics}>
            <Tabs
              onSelect={(k) => setKey(k!)}
              activeKey={key}
              id="uncontrolled-tab-example"
              className="justify-content-center d-flex gap-2"
              defaultActiveKey={"all"}
            >
              <Tab title="All" eventKey="all" key="all" />
              {categories.map((category) => (
                <Tab
                  eventKey={category.categoryId}
                  title={category.name}
                  key={category.id}
                />
              ))}
            </Tabs>
            <Row className="d-flex justify-content-start">
              {posts?.map((post, key) => (
                <Col md={4} className={`my-4 ${styles.card}`}>
                  <Card
                    image={post.featuredImage.node.mediaItemUrl}
                    title={post.title}
                    body={post.excerpt}
                    author={post.author.node.name}
                  />
                </Col>
              ))}
              {!posts.length && <p>No posts under this category </p>}
            </Row>
          </div>
        </Container>
      </section>
      <section className={styles.write}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Top writers you should follow
          </h1>
          <Row>
            {users.map((user, key) => (
              <Col md={6} lg={4} sm={12} key={`author-${key}`} className="mt-4">
                <div className="d-flex gap-3 align-items-center justify-content-evenly">
                  <Image
                    width={50}
                    height={50}
                    src={user.avatar_urls["96"]}
                    roundedCircle
                    alt={user.name}
                  />

                  <span className="mt-1">{user.name}</span>

                  <Button variant="outline-primary">Follow</Button>
                </div>
                <hr />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(process.env.GRAPHQL!, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        categories {
          nodes {
            id
            name
            categoryId
          }
        }
      }
      `,
    }),
  });

  const {
    data: {
      categories: { nodes: categories },
    },
  } = await res.json();

  const users = await (await fetch(`${process.env.REST!}/wp/v2/users`)).json();

  return {
    props: {
      categories,
      users,
    },
    revalidate: 1,
  };
};

export default Explore;

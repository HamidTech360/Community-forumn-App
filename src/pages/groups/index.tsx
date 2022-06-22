import React, { useEffect } from "react";
import styles from "@/styles/groups.module.scss";
import { Button, Card, CardImg, Container, Form, Image } from "react-bootstrap";
import Timeline from "@/components/Templates/Profile/Timeline";
import AuthContent from "@/components/Auth/AuthContent";
import Link from "next/link";
import Head from "next/head";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";
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
];
const Groups = () => {
  const router = useRouter();
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <AuthContent>
      <Head>
        <title>Groups</title>
      </Head>
      <div className="mt-5">
        <Container className={styles.wrapper}>
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

          <div className={styles.posts}>
            <div className={`d-none d-md-flex gap-3 mb-3`}>
              {posts.map((post, index) => (
                <Link href="/groups/1/timeline" passHref>
                  <Card
                    key={`card-${index}`}
                    style={{ height: "280px", border: "none" }}
                  >
                    <CardImg
                      src={post.image}
                      alt=""
                      style={{ height: "60%" }}
                    />
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
                </Link>
              ))}
            </div>
            <main>
              <div
                className={`${styles.addNewGroupBtn} row col-6 col-md-4 col-lg-3 ms-auto me-2`}
              >
                <Link href="/groups/new" passHref>
                  <Button
                    variant="outline-primary"
                    className=" btn-sm"
                    onClick={() =>
                      sessionStorage.setItem(
                        "newGroup_coming4rm",
                        JSON.stringify(router.asPath)
                      )
                    }
                  >
                    <AiOutlineUsergroupAdd size={23} /> Create New Group
                  </Button>
                </Link>
              </div>
              <Timeline />
            </main>
          </div>
        </Container>
      </div>
    </AuthContent>
  );
};

export default Groups;

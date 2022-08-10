import React, { useEffect, useState } from "react";
import MessageButton from "@/components/Atoms/messageButton";
import styles from "@/styles/groups.module.scss";
import { Button, Card, CardImg, Container, Form, Image } from "react-bootstrap";
import Timeline from "@/components/Templates/Profile/Timeline";
import AuthContent from "@/components/Auth/AuthContent";
import Link from "next/link";
import Head from "next/head";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import config from "@/config";
import axios from "axios";
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
  const [groups, setGroups] = useState([]);
  const [Posts, setPosts] = useState([]);
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    (async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/groups/user`,
          // `${config.serverUrl}/api/feed/groups`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setGroups(response.data.groups);
        console.log("response:", response.data);

        const randomPosts = await axios.get(
          // `${config.serverUrl}/api/posts/group/random`
          `${config.serverUrl}/api/feed/groups`
        );
        console.log("randomPosts:", randomPosts.data);
        setPosts(randomPosts.data.posts);
      } catch (error) {
        console.error(error.response?.data);
      }
    })();
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <AuthContent>
      <Head>
        <title>Groups</title>
      </Head>
      <MessageButton />
      <div className="mt-5">
        <Container className={styles.wrapper}>
          <Card
            style={{ maxWidth: "280px", borderRadius: "10px" }}
            className="d-none d-lg-block p-3 position-fixed left-0"
          >
            <div className="d-flex justify-content-between my-2">
              {" "}
              <p className="bold">Your groups</p>
              <p className="text-primary">See more</p>
            </div>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "10px",
              }}
            >
              <Form.Control placeholder="search" />
            </div>
            <div className={`${styles.groupLists}`}>
              {groups.map((item, i) => (
                <Link href={`/groups/${item._id}/timeline`} key={i} passHref>
                  <div className={styles.groupCard}>
                    <div>
                      {/* <img */}
                      <Image
                        src="/images/groups2.png"
                        className={styles.groupProfileImg}
                        alt=""
                      />
                    </div>
                    <div>
                      <div>{item.name} </div>
                      <div className={styles.groupAdminName}>
                        Admin: {item.admin?.firstName}{" "}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          <div className={styles.posts}>
            <div className={`d-none d-md-flex gap-3 mb-3 px-4`}>
              {Posts.slice(0, 4).map((post, index) => (
                <Link
                  key={`card-${index}`}
                  href={`/groups/${post.groupId}/timeline`}
                  passHref
                >
                  <Card style={{ height: "280px", borderRadius: "10px" }}>
                    <CardImg
                      src={"/images/article.png"}
                      alt=""
                      style={{ height: "60%" }}
                    />
                    <Card.Body className="d-flex flex-column">
                      <p className="bold">{post.postTitle}</p>
                      <small className="text-muted">
                        Admin: {post.author.firstName}
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
              <Timeline Posts={Posts} />
            </main>
          </div>
        </Container>
      </div>
    </AuthContent>
  );
};

export default Groups;

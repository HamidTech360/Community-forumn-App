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
import { FaUser } from "react-icons/fa";
import usePagination from "@/hooks/usePagination";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";
import { useSelector } from "@/redux/store";

const Groups = () => {
  const router = useRouter();
  const [groups, setGroups] = useState([]);
  const [posts, setPosts] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const newlyCreatedPost = useSelector(selectNewGroupFeed);

  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating
  } = usePagination("/api/feed/groups", "posts");

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(posts) !== JSON.stringify(paginatedData)) {
        setPosts(paginatedData);
      }
    }
  }, [paginatedData, posts]);

  useEffect(() => {
    mutate();
  }, [mutate, newlyCreatedPost]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    (async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/groups/user`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          }
        );

        setGroups(response.data.groups);

        const randomPosts = await axios.get(
          `${config.serverUrl}/api/feed/groups`
        );

        setPosts(randomPosts.data.posts);
        console.log(randomPosts.data);
      } catch (error) {
        // console.error(error.response?.data);
      }
    })();
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const handleSearch = async e => {
    console.log(e.currentTarget.value);

    if (e.currentTarget.value !== "") {
      try {
        const { data } = await axios.get(
          `${config.serverUrl}/api/search/?type=group&keyword=${e.currentTarget.value}`
        );

        setSearchResult(data);
      } catch (error) {
        // console.error(error.response?.data);
      }
    } else {
      setSearchResult([]);
    }
  };

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
            className="d-none d-md-block p-3 position-fixed left-0"
          >
            <div className="d-flex justify-content-between my-2">
              {" "}
              <p className="bold">Your groups</p>
            </div>
            <div
              style={{
                border: "1px solid rgba(0, 0, 0, 0.125)",
                borderRadius: "10px"
              }}
            >
              <Form.Control
                placeholder="search"
                onChange={e => handleSearch(e)}
              />
            </div>
            <div className={`${styles.groupLists}`}>
              {(searchResult.length <= 0 ? groups : searchResult).map(
                (item, i) => (
                  <Link href={`/groups/${item._id}/timeline`} key={i} passHref>
                    <div className={styles.groupCard}>
                      <Image
                        src={item.images?.cover || "/images/groups2.png"}
                        className={styles.groupProfileImg}
                        alt=""
                      />

                      <div>
                        <div>{item.name} </div>
                        <div className={styles.groupAdminName}>
                          Admin: {item.admin?.lastName}{" "}
                        </div>
                      </div>
                    </div>
                  </Link>
                )
              )}
            </div>
          </Card>

          <div className={styles.posts}>
            <div className={`d-none d-md-flex gap-3 mb-3 `}>
              {posts.slice(0, 4).map((post, index) => (
                <Link
                  key={`card-${index}`}
                  href={`/groups/${post.group._id}/timeline`}
                  passHref
                >
                  <Card style={{ height: "280px", borderRadius: "10px" }}>
                    <CardImg
                      src={post.group.images?.avatar || "/images/article.png"}
                      alt=""
                      style={{ height: "60%", objectFit: "cover" }}
                    />
                    <Card.Body className="d-flex flex-column px-2">
                      <p className="bold">{post.postTitle}</p>
                      <h6>{post.group.name}</h6>
                      <small className="text-muted">
                        <FaUser color="black" /> {post.author?.firstName}
                      </small>
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
              <Timeline
                Posts={posts}
                paginatedData={paginatedData}
                isReachedEnd={isReachedEnd}
                error={error}
                fetchNextPage={fetchNextPage}
                mutate={mutate}
                isValidating={isValidating}
              />
            </main>
          </div>
        </Container>
      </div>
    </AuthContent>
  );
};

export default Groups;

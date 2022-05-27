import useUser from "@/hooks/useUser";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
import Modal from "@/components/Organisms/Layout/Modal/Modal";

import { usePagination } from "@/hooks/usePagination";
import styles from "./feed.module.scss";

const Feed = () => {
  const { user } = useUser();
  const { posts, setPage, hasMore, isFetchingMore } = usePagination();

  const [scrollInitialised, setScrollInitialised] = useState(false);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialised(true);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    window.addEventListener("scroll", checkScroll);

    return () => {
      document.body.style.backgroundColor = "initial";
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    const scrollArea = document.querySelector("#intersection");
    const cards = document.querySelectorAll(".card");
    const targetItem = cards?.item(cards.length - 3);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { root: scrollArea, rootMargin: "0px", threshold: 1.0 }
    );

    if (targetItem) observer.observe(targetItem);

    return () => {
      if (targetItem) observer.unobserve(targetItem);
      observer.disconnect();
    };
  }, [posts, scrollInitialised, setPage]);

  return (
    <AuthContent>
      <Head>
        <title>Feed</title>
      </Head>
      <Container>
        <div className={`padding-top mt-3 ${styles.wrapper}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-md-flex flex-column gap-4 vh-100"
            >
              <UserCard user={user!} />
              <Discussions />
            </div>
          </>

          <main className={styles.posts} id="posts">
            <CreatePost />
            <div
              id="instersection"
              style={{
                height: "30vh",
                width: "100%",
                position: "fixed",
                bottom: 0,
              }}
            ></div>
            {/* <InfiniteScroll
              dataLength={Number(posts?.length)} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              initialScrollY={0}
              loader={
                <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                  </p>
                }
              > */}
            {posts?.map((post) => (
              <PostCard post={post} key={`activity-post-${post.id}`} trimmed />
            ))}
            {isFetchingMore && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {!hasMore && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )}
            {/* </InfiniteScroll> */}
          </main>
          <div
            style={{ width: 270 }}
            className="position-fixed d-none d-xl-flex  end-0 me-5  vh-100 "
          >
            <Discussions />
          </div>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Feed;

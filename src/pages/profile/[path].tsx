import React from "react";
import { Container, Spinner } from "react-bootstrap";
import PostCard from "@/components/Organisms/App/PostCard";
import CreatePost from "@/components/Organisms/CreatePost";
import styles from "@/styles/feed.module.scss";
import Head from "next/head";
import UserCard from "@/components/Organisms/App/UserCard";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import { usePagination } from "@/hooks/usePagination";
const Profile = () => {
    const { posts, setPage, hasMore, isFetchingMore } = usePagination();
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        <div className={`padding-top mt-3 ${styles.feed}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-md-flex flex-column gap-4 vh-100"
            >
         
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

            {posts?.map((post) => (
              <PostCard
                post={post}
                key={`activity-post-${post.id}`}
                onClick={() => {
                  setModalOpen(true);
                  setSelected(post);
                }}
              />
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

export default Profile;

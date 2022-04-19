import axios from "axios";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthContent from "../../components/Auth/AuthContent";
import PostCard from "../../components/Organisms/App/PostCard";
import UserCard from "../../components/Organisms/App/UserCard";
import CreatePost from "../../components/Organisms/CreatePost";
import useAuth from "../../hooks/useAuth";
import styles from "./feed.module.scss";
const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Record<string, any>[]>();
  const [pages, setPages] = useState(0);
  const [start, setStart] = useState(1);
  const fetchData = async () => {
    try {
      const { data, headers } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST}/buddyboss/v1/activity?_fields=content_stripped,user_id,name,content,date,user_avatar,bp_media_ids,title,id,type&per_page=10&page=${start}`
      );
      setPosts(data);
      setPages(Number(headers["x-wp-totalpages"]));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      document.body.style.backgroundColor = "#f6f6f6";
      await fetchData();
      return () => {
        document.body.style.backgroundColor = "initial";
      };
    })();
  });
  return (
    <AuthContent>
      <Head>
        <title>Feed</title>
      </Head>
      <Container>
        <div className={`padding-top ${styles.feed} gap-3`}>
          <div
            className="position-fixed d-none d-md-block"
            style={{ width: 250 }}
          >
            <UserCard user={user!} />
          </div>

          <main className={styles.posts} id="posts">
            <CreatePost />
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
            > */}{" "}
            {posts?.map((post, key) => (
              <PostCard post={post} key={`activity-post-${key}`} />
            ))}
            {/* </InfiniteScroll> */}
          </main>
          <div>
            <UserCard user={user!} />
          </div>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Feed;

import axios from "axios";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import AuthContent from "../../components/Auth/AuthContent";
import Discussions from "../../components/Organisms/App/Discussions/Discussions";
import PostCard from "../../components/Organisms/App/PostCard";
import UserCard from "../../components/Organisms/App/UserCard";
import CreatePost from "../../components/Organisms/CreatePost";
import Modal from "../../components/Organisms/Layout/Modal/Modal";
import useAuth from "../../hooks/useAuth";
import { useModalWithData } from "../../hooks/useModalWithData";
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

  const fetchMore = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST}/buddyboss/v1/activity?_fields=content_stripped,user_id,name,content,date,user_avatar,bp_media_ids,title,id,type&per_page=10&page=${start}`
      );
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { modalOpen, setModalOpen, setSelected, selected } = useModalWithData();
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
        <div className={`padding-top ${styles.feed}`}>
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
            <InfiniteScroll
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
            >
              {posts?.map((post, key) => (
                <PostCard
                  post={post}
                  key={`activity-post-${key}`}
                  onClick={() => {
                    setModalOpen(true);
                    setSelected(post);
                  }}
                />
              ))}
            </InfiniteScroll>
          </main>
          <div
            style={{ width: 250 }}
            className="position-fixed d-none d-xl-flex  end-0 me-5 vh-100 "
          >
            <Discussions />
          </div>
        </div>
        <Modal
          show={modalOpen}
          close={() => setModalOpen(false)}
          body={
            <Row className="p-4 d-flex align-items-center">
              <Col lg={6}>
                <Image
                  style={{ borderRadius: 0 }}
                  src={"/images/formbg.png"}
                  fluid
                  alt={selected.title}
                />
              </Col>

              <Col lg={6}>
                <PostCard post={selected} />
              </Col>
            </Row>
          }
        />
      </Container>
    </AuthContent>
  );
};

export const getStaticProps = async () => {
  return {
    props: {},
  };
};

export default Feed;

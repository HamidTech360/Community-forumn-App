/* eslint-disable react-hooks/exhaustive-deps */
// import useUser from "@/hooks/useUser";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import { Container, Spinner, Modal, Form } from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

import { usePagination } from "@/hooks/usePagination";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/feed.module.scss";
import formStyles from "../../styles/templates/new-group/formField.module.css";
import Follow from "@/components/Organisms/App/Follow";
import Editor from "@/components/Organisms/SlateEditor/Editor";

import { useDispatch, useSelector } from "@/redux/store";
import {
  setShowFeedModal,
  selectFeedModal,
  selectNewFeed,
} from "@/reduxFeatures/api/feedSlice";

const Feed = () => {
  const data = useSelector(selectUser);
  //const { posts, setPage, hasMore, isFetchingMore } = usePagination();
  const [scrollInitialised, setScrollInitialised] = useState(false);
  const [posts, setPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const showModal = useSelector(selectFeedModal);
  const newFeedPost = useSelector(selectNewFeed);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialised(true);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/posts`);

        setPosts(response.data.posts);
      } catch (error) {
        console.log(error.response?.data);
      }
    })();

    document.body.style.backgroundColor = "#f6f6f6";
    window.addEventListener("scroll", checkScroll);

    return () => {
      document.body.style.backgroundColor = "initial";
      window.removeEventListener("scroll", checkScroll);
    };
  }, [newFeedPost]);

  const DisplayModal = () => {
    // setShowModal(true);
    dispatch(setShowFeedModal(true));
  };

  return (
    <AuthContent>
      <ToastContainer />
      <Head>
        <title>Feed</title>
      </Head>
      <Container>
        <div className={`mt-3 ${styles.wrapper}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-lg-flex flex-column gap-4 vh-100"
            >
              <UserCard user={data!} />
              <Discussions posts={posts} />
            </div>
          </>

          <main className={styles.posts} id="posts">
            <CreatePost DisplayModal={DisplayModal} />
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
            {posts?.map((post, index) => (
              <PostCard
                post={post}
                key={`activity-post-${index}-${post.id}`}
                trimmed
              />
            ))}
            {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            {/* {!hasMore && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )} */}
            {/* </InfiniteScroll> */}
          </main>
          <div
            style={{ width: 270 }}
            className="position-fixed d-none d-xxl-flex  end-0 me-5  vh-100 "
          >
            <Follow />
          </div>
        </div>
      </Container>

      <Modal
        show={showModal}
        className={styles.GistModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <span className={styles.closeBtn}>
          {" "}
          <FaTimes
            color="#207681"
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => dispatch(setShowFeedModal(false))}
          />{" "}
        </span>
        <div className="col-12 px-4 mt-2 mb-4">
          <Editor slim={false} />
        </div>
      </Modal>
    </AuthContent>
  );
};

export default Feed;

/* eslint-disable react-hooks/exhaustive-deps */
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import {
  Container,
  Spinner,
  Modal,
  Form,
  Image,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import ModalCard from "@/components/Organisms/App/ModalCard";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
import { toast, ToastContainer } from "react-toastify";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import { MdOutlineCancel } from "react-icons/md";
// import { usePagination } from "@/hooks/usePagination";
import usePagination, { Loader } from "@/hooks/usePagination2";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/feed.module.scss";
// import formStyles from "../../styles/templates/new-group/formField.module.css";
import Follow from "@/components/Organisms/App/Follow";
import { useDispatch, useSelector } from "@/redux/store";
import { selectNewFeed } from "@/reduxFeatures/api/feedSlice";

// import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useModalWithData } from "@/hooks/useModalWithData";
import InfiniteScroll from "react-infinite-scroll-component";
// import { FaTimes } from "react-icons/fa";

const Feed = () => {
  const data = useSelector(selectUser);
  const dispatch = useDispatch();
  const newFeed = useSelector(selectNewFeed);
  //const { posts, setPage, hasMore, isFetchingMore } = usePagination();
  const [scrollInitialised, setScrollInitialised] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();

  const [formData, setFormData] = useState({
    post: "",
  });

  const { paginatedData, isReachedEnd, error, fetchNextPage } =
    usePagination("/api/feed");

  // const checkScroll = () => {
  //   if (window.scrollY > 100) {
  //     setScrollInitialised(true);
  //   }
  // };

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    // window.addEventListener("scroll", checkScroll);

    return () => {
      document.body.style.backgroundColor = "initial";
      // window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  // useEffect(() => {
  //   // Auto-Update new post to feed
  //   console.log("newFeed:", newFeed);
  //   // if (newFeed) {
  //   setPosts([newFeed?.feed, ...posts]);
  //   // }
  // }, [newFeed]);

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(posts) !== JSON.stringify(paginatedData)) {
        setPosts(paginatedData);
      }
    }
  }, [paginatedData]);

  return (
    <AuthContent>
      <ToastContainer />
      <Head>
        <title>Feed</title>
      </Head>
      <MessageButton />
      <Container>
        <div className="row mt-lg-5">
          {/* <div className={`mt-3 ${styles.wrapper}`}> */}
          <div className="d-none d-lg-flex col-lg-3 col-xl-2 me-xl-4">
            <div
              // style={{ width: 230 }}
              // className="position-fixed d-none d-lg-flex flex-column vh-100"
              className={`${styles.userCardDiscussion} position-fixed d-flex flex-column vh-100`}
            >
              <div className="col-xs-12">
                <UserCard user={data!} />
              </div>
              <div className="col-xs-12">
                <Discussions posts={posts} />
              </div>
            </div>
          </div>

          <main
            className={`${styles.posts} col-12 col-lg-7 col-xl-7 ms-xl-5 ms-xxl-4`}
            id="posts"
          >
            <CreatePost pageAt={"/feed"} />
            <div
              id="instersection"
              style={{
                height: "30vh",
                width: "100%",
                position: "fixed",
                bottom: 0,
              }}
            ></div>

            <InfiniteScroll
              next={fetchNextPage}
              hasMore={!isReachedEnd}
              loader={<Loader />}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
              dataLength={paginatedData?.length ?? 0}
              initialScrollY={0}
              className="shadow"
            >
              {posts?.map((post, index) => (
                <PostCard
                  post={post}
                  key={`activity-post-${index}-${post?.id}`}
                  trimmed
                />
              ))}
            </InfiniteScroll>

            {error && (
              <p style={{ textAlign: "center" }}>
                <b>Oops! Something went wrong</b>
              </p>
            )}
          </main>
          <div
            // style={{ width: 270 }}
            // className="position-fixed d-none d-xxl-flex end-0 me-5 vh-100 "
            className="d-none d-lg-flex col-lg-3 col-xl-3 position-fixed end-0 ps-lg-5 ps-xxl-3 me-xl-2 ms-xxl-4 vh-100"
          >
            <Follow />
          </div>
        </div>
      </Container>

      <Modal
        show={modalOpen}
        className={styles.FeedModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="xl"
        scrollable={true}
      >
        <span className={styles.openBtn}>
          {" "}
          <MdOutlineCancel
            style={{ cursor: "pointer" }}
            size={30}
            onClick={() => toggle()}
          />{" "}
        </span>
        {selected.images ? (
          <Row>
            <Col lg={6}></Col>
            <Col lg={6}>
              {" "}
              <ModalCard post={selected} />
            </Col>
          </Row>
        ) : (
          <Row>
            <Col lg={12} className="px-5">
              <ModalCard post={selected} />
            </Col>
          </Row>
        )}
      </Modal>
    </AuthContent>
  );
};

export default Feed;

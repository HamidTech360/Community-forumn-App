/* eslint-disable react-hooks/exhaustive-deps */
// import useUser from "@/hooks/useUser";
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
} from "react-bootstrap";
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
// import formStyles from "../../styles/templates/new-group/formField.module.css";
import Follow from "@/components/Organisms/App/Follow";
// import Editor from "@/components/Organisms/SlateEditor/Editor";

import { useDispatch, useSelector } from "@/redux/store";
import {
  // setShowFeedModal,
  // selectFeedModal,
  selectNewFeed,
} from "@/reduxFeatures/api/feedSlice";

const Feed = () => {
  const data = useSelector(selectUser);
  const dispatch = useDispatch();
  // const showModal = useSelector(selectFeedModal);
  const newFeed = useSelector(selectNewFeed);
  //const { posts, setPage, hasMore, isFetchingMore } = usePagination();
  const [scrollInitialised, setScrollInitialised] = useState(false);
  const [posts, setPosts] = useState([]);

  const [isFetching, setIsFetching] = useState(true);
  // const [uploading, setUploading] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  // const [formData, setFormData] = useState({
  //   post: "",
  // });
  // const [newFeed, setNewFeed] = useState();

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialised(true);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.post == "")
  //     return toast.error("Field cannot be empty", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       toastId: "1",
  //     });
  //   setUploading(true);
  //   console.log(formData);

  //   try {
  //     const response = await axios.post(
  //       `${config.serverUrl}/api/feed`,
  //       { ...formData },
  //       {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     toast.success("Post uploaded successfully", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       toastId: "1",
  //     });
  //     setNewFeed(response.data);
  //     // setShowModal(false);
  //     dispatch(setShowFeedModal(false));
  //     setUploading(false);
  //     // fetchPost()
  //   } catch (error) {
  //     console.log(error.response?.data);
  //     toast.error("Failed to upload post", {
  //       position: toast.POSITION.TOP_RIGHT,
  //       toastId: "1",
  //     });
  //     // setShowModal(false);
  //     dispatch(setShowFeedModal(false));
  //     setUploading(false);
  //   }
  // };

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`${config.serverUrl}/api/feed`);
        // console.log(response.data);

        setPosts(response.data.feeds);
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();

    document.body.style.backgroundColor = "#f6f6f6";
    window.addEventListener("scroll", checkScroll);

    return () => {
      document.body.style.backgroundColor = "initial";
      window.removeEventListener("scroll", checkScroll);
    };
    // }, [handleSubmit]);
  }, [newFeed]);

  // const DisplayModal = () => {
  //   // setShowModal(true);
  // };

  // const handleChange = (e) => {
  //   const clone = { ...formData };
  //   clone[e.currentTarget.name] = e.currentTarget.value;
  //   setFormData(clone);
  //   console.log(formData);
  // };

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
              // style={{ width: 250 }}
              // className="position-fixed d-none d-lg-flex flex-column vh-100"
              className="position-fixed d-flex flex-column vh-100"
            >
              <UserCard user={data!} />
              <Discussions posts={posts} />
            </div>
          </div>

          <main
            className={`${styles.posts} col-12 col-lg-7 col-xl-7 ms-xl-5 ms-xxl-4`}
            id="posts"
          >
            {/* <div className="p-4 mx-2 d-flex gap-2 align-items-center bg-white radius-10">
              <>
                <Image
                  src={data?.avatar?.url || "/images/formbg.png"}
                  alt="image"
                  width={50}
                  height={50}
                  roundedCircle
                />
              </>
              <>
                <Form style={{ width: "100%" }}>
                  <Form.Control
                    className={`radius-20  ${styles.form}`}
                    style={{ width: "100%" }}
                    placeholder={`Hey ${
                      data?.firstName && data.firstName.split(" ")[0]
                    }! wanna say something?`}
                    onClick={() => dispatch(setShowFeedModal(true))}
                  />
                </Form>
              </>
            </div> */}

            {/* <CreatePost DisplayModal={DisplayModal} /> */}
            <CreatePost pageAt="/feed" />
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
            // style={{ width: 270 }}
            // className="position-fixed d-none d-xxl-flex end-0 me-5 vh-100 "
            className="d-none d-lg-flex col-lg-3 col-xl-3 position-fixed end-0 ps-lg-5 ps-xxl-0 me-xl-2 vh-100 ms-xl-5 ms-xxl-4"
          >
            <Follow />
          </div>
          {/* </div> */}
        </div>
      </Container>

      {/* <Modal
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
        </span> */}
      {/* <div className={styles.newGistModal}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className={formStyles.formGroup}>
              <Form.Control
                className={formStyles.bigForm}
                as="textarea"
                name="post"
                type="text"
                required
                placeholder="Write something"
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

            <Button variant="primary" className="d-flex mx-auto" type="submit">
              {uploading ? "uploading..." : "Continue"}
            </Button>
          </Form>
        </div> */}
      {/* <div className="col-12 px-4 mt-2 mb-4">
          <Editor slim={false} pageAt="/feed" />
        </div>
      </Modal> */}
    </AuthContent>
  );
};

export default Feed;

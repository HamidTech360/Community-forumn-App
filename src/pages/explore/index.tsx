/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { RiMessage2Fill } from "react-icons/ri";
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
import config from "../../config";
import React, { useCallback, useEffect, useState } from "react";
import {
  Col,
  Container,
  Row,
  Image,
  Button,
  Tabs,
  Tab,
  Modal,
  Spinner,
  Form,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Card from "../../components/Molecules/Card";
import axios from "axios";
import styles from "../../styles/explore.module.scss";
import formStyles from "../../styles/templates/new-group/formField.module.css";
import "react-toastify/dist/ReactToastify.css";
import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setPosts,
  selectPost,
  setShowPostModal,
  selectShowPostModal,
  setPostTitle,
  selectPostTitle,
  setIsFetching,
  selectIsFetching,
} from "@/reduxFeatures/api/postSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import usePaginationExplore, { Loader } from "@/hooks/usePaginationExplore";
import InfiniteScroll from "react-infinite-scroll-component";

const Explore = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPost = useSelector(selectPost);
  const showPostModal = useSelector(selectShowPostModal);
  const user = useSelector(selectUser);
  // const isFetching = useSelector(selectIsFetching);

  const [categories, setCategories] = useState([
    { name: "How to work abroad" },
    { name: "Engineering" },
    { name: "Technology" },
    { name: "Visa acquisition" },
    { name: "How to work abroad" },
  ]);
  const [key, setKey] = useState<string>("all");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const { paginatedData, isReachedEnd, error, fetchNextPage } =
    usePaginationExplore("/api/posts");

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedData)) {
        dispatch(setPosts(paginatedData));
      }
    }
  }, [paginatedData]);

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     try {
  //       const response = await axios.get(`${config.serverUrl}/api/posts`);
  //       dispatch(setPosts(response.data.posts));
  //       // setIsFetching(false);
  //       dispatch(setIsFetching(false));
  //       console.log(response.data.posts);
  //     } catch (error) {
  //       console.log(error.response?.data);
  //     }
  //   };
  //   fetchPost();
  //   //(async function () {
  //   //   try {
  //   //     const response = await axios.get(`${config.serverUrl}/api/users`, {});
  //   //     // console.log("response.data+++:", response.data.users);
  //   //     setUsers(response.data.users);
  //   //     dispatch(setIsFetching(false));
  //   //   } catch (error) {
  //   //     //console.error(error.response?.data);
  //   //     // setIsFetching(false);
  //   //     dispatch(setIsFetching(false));
  //   //   }
  //   // })();
  // }, [dispatch]);

  const handleChange = (e) => {
    dispatch(setPostTitle(e.currentTarget.value));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   dispatch(setIsFetching(true));
  //   // setUploading(true);
  //   try {
  //     const response = await axios.post(
  //       `${config.serverUrl}/api/posts`,
  //       { ...formData },
  //       {
  //         headers: {
  //           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     );
  //     // console.log(response.data.posts);
  //     dispatch(setPosts(response.data.posts));
  //     dispatch(setIsFetching(false));
  //   } catch (error) {
  //     console.error(error.response?.data);
  //     dispatch(setIsFetching(false));
  //   }
  // };

  return (
    <div>
      <MessageButton />
      <ToastContainer />

      <Head>
        <title>Explore</title>
      </Head>

      <section className={`d-flex align-items-center ${styles.intro}`}>
        <Container>
          <Row>
            <Col md={6}>
              <div className={` ${styles.text}`}>
                <h1 className={`${styles.textPrimary} text-primary`}>
                  Read, Write, Connect
                </h1>
                <p className="text-muted">
                  Read and post thoughts on any topic while connecting with
                  millions of readers and writers across the world
                </p>
                <div className="d-flex gap-3">
                  {/* <Button variant="primary" onClick={() => setShowModal(true)}> */}
                  <Button
                    variant="primary"
                    onClick={() => dispatch(setShowPostModal(true))}
                  >
                    Start writing
                  </Button>
                  <Button variant="light">Explore</Button>
                </div>
              </div>
            </Col>
            <Col md={6}>
              <Container className="img-container">
                <Image
                  src="/assets/blog-post/pana.svg"
                  alt="Vector Icon"
                  fluid
                />
              </Container>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={styles.topicsSection}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Topics that matter to you
          </h1>
          <div className={styles.topics}>
            <Tabs
              onSelect={(k) => setKey(k!)}
              activeKey={key}
              id="uncontrolled-tab-example"
              className="justify-content-center d-flex gap-2"
              defaultActiveKey={"all"}
            >
              <Tab title="All" eventKey="all" key="all" />
              {categories.map((category, i) => (
                <Tab eventKey={i} title={category.name} key={i} />
              ))}
            </Tabs>
            {/* {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )} */}
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
            >
              <Row className="d-flex justify-content-start w-100">
                {showPost?.map((post, key) => (
                  <Col
                    key={`posts_${key}`}
                    md={4}
                    className={`my-4 ${styles.card}`}
                  >
                    <Card
                      _id={post._id}
                      image={"/images/postPlaceholder.jpg"}
                      title={post.postTitle}
                      body={post.postBody}
                      author={post.author}
                      size="any"
                    />
                  </Col>
                ))}
              </Row>
            </InfiniteScroll>

            {error && (
              <p style={{ textAlign: "center" }}>
                <b>Oops! Something went wrong</b>
              </p>
            )}
            {/* {!showPost?.length && <p>No posts under this category </p>} */}
          </div>
        </Container>
      </section>
      <section className={styles.write}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Top writers you should follow
          </h1>
          <Row>
            {users?.map((user, key) => (
              <Col md={6} lg={4} sm={12} key={`author-${key}`} className="mt-4">
                <div className="d-flex gap-3 align-items-center justify-content-evenly">
                  <Image
                    width={50}
                    height={50}
                    src={"/images/imagePlaceholder.jpg"}
                    roundedCircle
                    alt={user?.firstName}
                  />

                  <span className="mt-1">
                    {user?.firstName} {user?.lastName}
                  </span>

                  <Button variant="outline-primary">Follow</Button>
                </div>
                <hr />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <Modal
        show={showPostModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
        className="p-3"
      >
        <span className={styles.closeBtn}>
          {" "}
          <FaTimes
            color="#207681"
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => dispatch(setShowPostModal(false))}
          />{" "}
        </span>

        <div className="row justify-content-center mx-1">
          <div
            className="col-11 col-sm-10 col-xl-11 col-xxl-10"
            style={{ padding: "12px 0px" }}
          >
            <Form>
              <Form.Group>
                <Form.Label className={formStyles.formLabel}>
                  Post Title
                </Form.Label>
                <Form.Control
                  id="createPostID"
                  size="lg"
                  name="postTitle"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  style={{
                    backgroundColor: "rgb(248, 244, 244)",
                    borderRadius: "10px",
                  }}
                  required
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-12 mt-2 mb-4 px-lg-4">
            <Editor slim={false} pageAt="/explore" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Explore;

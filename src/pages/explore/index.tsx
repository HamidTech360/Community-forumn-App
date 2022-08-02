/* eslint-disable react-hooks/exhaustive-deps */
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { RiMessage2Fill } from "react-icons/ri";
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
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
  Pagination,
} from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import Card from "../../components/Molecules/Card";
import Followers from "@/components/Organisms/Followers";
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
  selectNewPost,
} from "@/reduxFeatures/api/postSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
// import usePagination, { Loader } from "@/hooks/usePagination";
import usePaginationPage, { LoaderPage } from "@/hooks/usePaginationPage";
// import InfiniteScroll from "react-infinite-scroll-component";
import config from "@/config";
import ReactPaginate from "react-paginate";

const Explore = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPost = useSelector(selectPost);
  const showPostModal = useSelector(selectShowPostModal);
  // const user = useSelector(selectUser);
  // const isFetching = useSelector(selectIsFetching);

  const newPost = useSelector(selectNewPost);
  const [categories, setCategories] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [key, setKey] = useState<string>("all");
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    postTitle: "",
    postBody: "",
  });

  const [pageIndex, setPageIndex] = useState(0);

  // const { paginatedData, isReachedEnd, error, fetchNextPage, isValidating } =
  //   usePagination("/api/posts", "posts");
  const { paginatedPageData, isLoadingPageData, errorPage } = usePaginationPage(
    "/api/posts",
    pageIndex
  );

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  // useEffect(() => {
  //   if (showPost?.length > 0) {
  //     // Fetch Updated Gist Using useSWRInfinite
  //     fetchNextPage();
  //     // Update State
  //     // setPosts(paginatedData);
  //   }
  // }, [newPost]);

  // useEffect(() => {
  //   if (paginatedData) {
  //     if (JSON.stringify(showPost) !== JSON.stringify(paginatedData)) {
  //       dispatch(setPosts(paginatedData));
  //     }
  //   }
  // }, [paginatedData]);

  useEffect(() => {
    dispatch(setPosts(paginatedPageData));

    let pageCount = showPost?.numPages;

    // if (pageCount <= 6) {
    //   // return all numbers
    // } else {
    //   // pageIndex
    // }
  }, [paginatedPageData]);

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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        setCategories(data.allCategories);
        //console.log(data.allCategories);
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, []);

  const handleChange = (e) => {
    dispatch(setPostTitle(e.currentTarget.value));
  };

  const filterPost = (item) => {
    console.log("key is", key, item);
    setKey(item);
    if (item === "all") {
      setFilteredPosts([]);
      return;
    }

    const filtered = showPost?.posts.filter((post) => post.category === item);
    console.log("filtered post:", filtered);

    if (filtered.length <= 0) {
      alert("No Item in this category");
    }

    setFilteredPosts(filtered);
  };

  const handlePageChange = (page) => {
    // console.log("Page Clicked:", page.selected);
    setPageIndex(page.selected);
  };

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
                  <a href="#explore">
                    <Button variant="light">Explore</Button>
                  </a>
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
      <section id="explore" className={styles.topicsSection}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Topics that matter to you
          </h1>
          <div className={styles.topics}>
            <Tabs
              onSelect={(k) => filterPost(k!)}
              activeKey={key}
              id="uncontrolled-tab-example"
              className="justify-content-center d-flex gap-2"
              defaultActiveKey={"all"}
            >
              <Tab title="All" eventKey="all" key="all" />
              {categories.map((category, i) => (
                <Tab
                  onClick={() => filterPost(category)}
                  eventKey={category.name}
                  title={category.name}
                  key={i}
                />
              ))}
            </Tabs>
            {/* {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )} */}
            {/* <InfiniteScroll
              next={fetchNextPage}
              hasMore={!isReachedEnd}
              loader={<Loader />}
              endMessage={
                <p style={{ textAlign: "center", color: "gray" }}>
                  <b>Yay! You have seen it all...</b>
                </p>
              }
              dataLength={paginatedData?.length ?? 0}
            >
              <Row className="d-flex justify-content-start w-100">
                {(filteredPosts.length > 0 ? filteredPosts : showPost)?.map(
                  (post, key) => (
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
                  )
                )}
              </Row>
              {isValidating && (
                <p style={{ textAlign: "center", color: "gray" }}>
                  <b>Fetching Post...</b>
                </p>
              )}
              {error && (
                <p
                  style={{
                    textAlign: "center",
                    color: "gray",
                    marginTop: "1.2rem",
                  }}
                >
                  <b>Oops! Something went wrong</b>
                </p>
              )}
            </InfiniteScroll> */}
            {/* {!showPost?.length && <p>No posts under this category </p>} */}
            {/* {console.log("paginatedPageData:", paginatedPageData)}
            {paginatedPageData.map((page) => (
              <>
                <Row className="d-flex justify-content-start w-100">
                  {(filteredPosts.length > 0 ? filteredPosts : showPost)?.map(
                    (post, key) => (
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
                    )
                  )}
                </Row>
              </>
            ))} */}

            <Row className="d-flex justify-content-start w-100">
              {showPost?.posts.map((post, key) => (
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

            {isLoadingPageData && <LoaderPage />}

            {errorPage && (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: "1.2rem",
                }}
              >
                <b>Oops! Something went wrong</b>
              </p>
            )}

            {/* {console.log("showPost:", showPost)} */}
          </div>

          <ReactPaginate
            previousLabel="<< Pre"
            nextLabel="Next >>"
            breakLabel="..."
            pageCount={showPost?.numPages}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            activeLinkClassName="bg-primary text-light"
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/explore/${page}` : "#"
            }
            hrefAllControls
            forcePage={pageIndex}
            renderOnZeroPageCount={null}
          />
        </Container>
      </section>

      <section>
        <Followers />
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

const activatedStyle = {
  backgroundColor: "blue",
  color: "white",
};

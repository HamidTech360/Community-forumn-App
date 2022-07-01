import { GetStaticProps, InferGetStaticPropsType } from "next";
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

const Explore = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPost = useSelector(selectPost);
  const showPostModal = useSelector(selectShowPostModal);
  const user = useSelector(selectUser);
  const isFetching = useSelector(selectIsFetching);

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
  useEffect(() => {
    console.log(users);
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    fetchPost();
    (async function () {
      try {
        const response = await axios.get(`/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        // console.log("response.data+++:", response.data.users);
        setUsers(response.data.users);
        dispatch(setIsFetching(false));
      } catch (error) {
        console.error(error.response?.data);
        // setIsFetching(false);
        dispatch(setIsFetching(false));
      }
    })();
  }, []);

  const handleChange = (e) => {
    dispatch(setPostTitle(e.currentTarget.value));
  };
  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      // console.log(response.data.posts);
      dispatch(setPosts(response.data.posts));
      dispatch(setIsFetching(false));
    } catch (error) {
      console.error(error.response?.data);
      dispatch(setIsFetching(false));
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log("formData:", formData);
  //   console.log("e.target:", e.target);
  // setUploading(true);
  // try {
  //   const response = await axios.post(
  //     `/api/posts`,
  //     { ...formData },
  // { showPostTitle, showPostBody},
  //     {
  //       headers: {
  //         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //       },
  //     }
  //   );
  //   console.log(response.data);
  //   toast.success("Post uploaded successfully", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     toastId: "1",
  //   });
  //   setShowModal(false);
  //   setUploading(false);
  //   fetchPost();
  // } catch (error) {
  //   console.log(error.response?.data);
  //   toast.error("Failed to upload post", {
  //     position: toast.POSITION.TOP_RIGHT,
  //     toastId: "1",
  //   });
  //   setShowModal(false);
  //   setUploading(false);
  // }
  // };

  return (
    <div>
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
            {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <Row className="d-flex justify-content-start">
              {/* {posts?.map((post, key) => ( */}
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
                    author={users.find((i) => post.user == i._id)?.firstName}
                    size="any"
                  />
                </Col>
              ))}
              {/* {!posts.length && <p>No posts under this category </p>} */}
              {!showPost?.length && <p>No posts under this category </p>}
            </Row>
          </div>
        </Container>
      </section>
      <section className={styles.write}>
        <Container>
          <h1 className="d-flex justify-content-center">
            Top writers you should follow
          </h1>
          <Row>
            {users.map((user, key) => (
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
        <div className="row justify-content-center">
          <div
            className="col-10 col-xl-11 col-xxl-12"
            style={{ padding: "12px 0px" }}
          >
            <Form className="mx-0 px-0">
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
                  style={{ backgroundColor: "rgb(248, 244, 244)" }}
                  required
                />
              </Form.Group>
            </Form>
          </div>
          <div className="col-12 px-4 mt-2 mb-4">
            <Editor slim={false} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

// export const getStaticProps = async () => {
//   const res = await fetch(
//     `${process.env.REST}/wp/v2/categories?per_page=10&_fields=id,name`
//   );
//   const categories = await res.json();

//   const users = await (await fetch(`${process.env.REST!}/wp/v2/users`)).json();

//   return {
//     props: {
//       categories,
//       users,
//     },
//     revalidate: 1,
//   };
// };

export default Explore;

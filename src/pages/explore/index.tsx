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

const Explore = ({}) => {
  const [categories, setCategories] = useState([
    { name: "How to work abroad" },
    { name: "Engineering" },
    { name: "Technology" },
    { name: "Visa acquisition" },
    { name: "How to work abroad" },
  ]);
  const [key, setKey] = useState<string>("all");
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    //alert('fetching');

    fetchPost();
    (async function () {
      try {
        const response = await axios.get(`/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log(response.data);
        setUsers(response.data.users);
      } catch (error) {
        console.log(error.ressponse?.data);
        setIsFetching(false);
      }
    })();
  }, []);

  const handleChange = (e) => {
    const data = { ...formData };
    data[e.currentTarget.name] = e.currentTarget.value;
    setFormData(data);
    //console.log(formData);
  };
  const fetchPost = async () => {
    try {
      const response = await axios.get(`/api/posts`);
      console.log(response.data.posts);
      // const allPosts = [...posts,...response.data.posts]
      setPosts(response.data.posts);
      setIsFetching(false);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await axios.post(
        `/api/posts`,
        { ...formData },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Post uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      setShowModal(false);
      setUploading(false);
      fetchPost();
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to upload post", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      setShowModal(false);
      setUploading(false);
    }
  };

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
                  <Button variant="primary" onClick={() => setShowModal(true)}>
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
              {posts?.map((post, key) => (
                <Col
                  key={`posts_${key}`}
                  md={4}
                  className={`my-4 ${styles.card}`}
                >
                  <Card
                    image={"/images/postPlaceholder.jpg"}
                    title={post.postTitle}
                    body={post.postBody}
                    author={users.find((i) => post.user == i._id)?.firstName}
                    size="any"
                  />
                </Col>
              ))}
              {!posts.length && <p>No posts under this category </p>}
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
          show={showModal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
       >
      <span className={styles.closeBtn} > <FaTimes color = '#207681'style={{cursor:'pointer'}} size={35} onClick={()=>setShowModal(false)} /> </span>
         <div className={styles.newGistModal}>
             <Form 
                  onSubmit={(e)=>handleSubmit(e)}
              >
                <Form.Group className={formStyles.formGroup}>
                  <Form.Label className={formStyles.formLabel}> Post Title</Form.Label>
                  <Form.Control
                    size="lg"
                    name="postTitle"
                    type="text"
                    required
                    onChange={(e)=>handleChange(e)}
                  />
                </Form.Group>

            <Form.Group className={formStyles.formGroup}>
              <Form.Control
                className={formStyles.bigForm}
                as="textarea"
                name="postBody"
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

          {/* {state.isSuccess && <Alert style={{marginTop:'20px', textAlign:'center'}} variant="success">Upload successfull</Alert>}
              {state.error && <Alert style={{marginTop:'20px', textAlign:'center'}} variant="danger">Upload failed</Alert>} */}
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

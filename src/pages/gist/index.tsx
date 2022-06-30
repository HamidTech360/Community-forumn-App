/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useSelector } from "@/redux/store";
import {
  Col,
  Container,
  Card as BCard,
  Row,
  Spinner,
  Modal,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import Card from "../../components/Organisms/Gist";
import EndlessCarousel from "../../components/Molecules/Carousel";
import GistCard from "../../components/Organisms/Gist/GistCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import config from '../../config'

//STYLES
import styles from "../../styles/gist.module.scss";
import formStyles from "../../styles/templates/new-group/formField.module.css";
import "react-toastify/dist/ReactToastify.css";

import {
  uploadFailed,
  uploadStart,
  uploadSuccess,
  uploadCleanUp,
  selectGistData,
  selectGistIsLoading,
  selectGistError,
  selectGistIsSuccess,
} from "@/reduxFeatures/api/gistSlice";

const Gist = ({ gists }: { gists: Record<string, any>[] }) => {
  const customId = "toastId";
  const dispatch = useDispatch();
  const gistData = useSelector(selectGistData);
  const gistIsLoading = useSelector(selectGistIsLoading);
  const gistError = useSelector(selectGistError);
  const gistIsSuccess = useSelector(selectGistIsSuccess);

  const [showModal, setShowModal] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [allGists, setAllGists] = useState([]);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    title:'',
    post:''
  })

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    (async function () {
      try {
        const gistResponse = await axios.get(`${config.serverUrl}/api/gists`);
        const userResponse = await axios.get(`${config.serverUrl}/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUsers(userResponse.data.users);
        setAllGists(gistResponse.data);
        setIsFetching(false);
        console.log(gistResponse.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    (async function () {
      try {
        const gistResponse = await axios.get(`${config.serverUrl}/api/gists`);
        const userResponse = await axios.get(`${config.serverUrl}/api/user`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        setUsers(userResponse.data.users);
        setAllGists(gistResponse.data);
        setIsFetching(false);
        console.log(gistResponse.data);
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    if (gistIsSuccess) {
      toast.success("Gist uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: customId,
      });
      setShowModal(false);

      (async function () {
        const response = await axios.get(`${config.serverUrl}/api/gists`);
        setAllGists(response.data);
      })();

      dispatch(uploadCleanUp({}));
    } else if (gistError) {
      toast.error("Error uploading", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: customId,
      });
      dispatch(uploadCleanUp({}));
    }
  }, [gistIsSuccess, gistError]);

  const handleChange = (e) => {
    const clone = { ...formData };
    clone[e.currentTarget.name] = e.currentTarget.value;
    setFormData(clone);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(uploadStart({}));

    try {
      const response = await axios.post(`${config.serverUrl}/api/gists`, formData, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      dispatch(uploadSuccess(response.data));
    } catch (error) {
      dispatch(uploadFailed(error.response?.data));
    }
  };

  return (
    <section className={styles.gist}>
      <ToastContainer />
      <Head>
        <title>Gists</title>
      </Head>

      <h1 className="d-flex justify-content-center align-center">Gist</h1>
      <Container>
        <h2>Popular Gists</h2>
        <div>
          <EndlessCarousel gap="mx-auto">
            {allGists?.map((item, key) => (
              <Card
                key={`article-${key}`}
                id={item?._id}
                image={
                  item?.bbp_media
                    ? item?.bbp_media[0]!.attachment_data?.thumb
                    : "/images/formbg.png"
                }
                title={item.title}
                author={'users.find((i) => item.user == i._id)'}
              />
            ))}
          </EndlessCarousel>
        </div>
        <Row className="mt-5">
          <Col md={3} className="desktop-only">
            <BCard
              className={`pt-1 px-1 shadow-sm ${styles.wrapper}`}
              style={{ position: "sticky", top: "5rem" }}
            >
              <BCard.Header className="shadow-sm border-0">
                <h5>Browse categories</h5>
              </BCard.Header>

              <BCard.Body className="mt-3">
                <p style={{ listStyleType: "none" }}>
                  {[1, 2, 3, 4, 5].map((item, key) => (
                    <li key={`category-${key}`}>Lorem, ipsum - {key}.</li>
                  ))}
                </p>
              </BCard.Body>
            </BCard>
          </Col>
          <Col md={9}>
            {/* <BCard.Header className="shadow-sm border-0"> */}
            <div className="d-flex justify-content-between">
              {/* <h2>New Gists</h2> */}

              <Button variant="none" onClick={() => setShowModal(true)}>
                <AiOutlinePlusCircle
                  color="#207681"
                  size={35}
                  className={styles.create}
                />
                <span
                  className="newGistText"
                  style={{
                    marginLeft: "10px",
                    fontSize: "14px",
                    fontWeight: "700",
                  }}
                >
                  Create Gist
                </span>
              </Button>
              <select className="outline-primary">
                <option>Canada</option>
              </select>
            </div>
            {/* </BCard.Header> */}
            {/* <BCard.Body className={styles.cardBody}> */}
            {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <div className="w-100 justify-content-center">
              {allGists.map((post, key) => (
                <GistCard
                  gist={post}
                  author={'users.find((i) => post.user == i._id)'}
                  key={`gist-${key}`}
                />
              ))}
            </div>

            {/* </BCard.Body> */}
          </Col>
        </Row>
      </Container>

      <Modal
        // size="md"
        show={showModal}
        className={styles.GistModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <span className={styles.closeBtn}>
          {" "}
          <FaTimes
            color="#207681"
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => setShowModal(false)}
          />{" "}
        </span>
        <div className={styles.newGistModal}>
          <Form onSubmit={(e) => handleSubmit(e)}>
            <Form.Group className={formStyles.formGroup}>
              <Form.Label className={formStyles.formLabel}>
                {" "}
                Gist Title
              </Form.Label>
              <Form.Control
                size="lg"
                name="title"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>

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
              {gistIsLoading ? "uploading..." : "Continue"}
            </Button>
          </Form>
        </div>
      </Modal>
    </section>
  );
};

// export async function getStaticProps() {
//   const gistsFetch = await fetch(
//     `${process.env.REST}/buddyboss/v1/topics?_embed=user&order=desc&orderby=ID
//     &per_page=10`,
//     { method: "GET" }
//   );
//   const gists = await gistsFetch.json();

//   return {
//     props: {
//       gists,

//       revalidate: 1,
//     },
//   };
// }

export default Gist;

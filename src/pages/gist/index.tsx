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
import config from "../../config";

//STYLES
import styles from "../../styles/gist.module.scss";
import formStyles from "../../styles/templates/new-group/formField.module.css";
import "react-toastify/dist/ReactToastify.css";

import {
  uploadCleanUp,
  selectGistData,
  selectGistIsLoading,
  selectGistError,
  selectGistIsSuccess,
  setShowGistModal,
  selectShowGistModal,
  setGistTitle,
  setIsFetching,
  selectIsFetching,
} from "@/reduxFeatures/api/gistSlice";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import Editor from "@/components/Organisms/SlateEditor/Editor";
import { useRouter } from "next/router";

const Gist = ({ gists }: { gists: Record<string, any>[] }) => {
  const router = useRouter();
  const customId = "toastId";
  const dispatch = useDispatch();
  const gistData = useSelector(selectGistData);
  const gistIsLoading = useSelector(selectGistIsLoading);
  const gistError = useSelector(selectGistError);
  const gistIsSuccess = useSelector(selectGistIsSuccess);

  const showGistModal = useSelector(selectShowGistModal);
  const user = useSelector(selectUser);
  const isFetching = useSelector(selectIsFetching);

  const [allGists, setAllGists] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    post: "",
  });

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    (async function () {
      try {
        // const gistResponse = await axios.get("/api/gists");
        const gistResponse = await axios.get(`${config.serverUrl}/api/gists`);

        // const userResponse = await axios.get("/api/user", {
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // });
        // console.log("gistResponse:", gistResponse.data);
        // console.log("userResponse:", userResponse.data.users);

        // setUsers(userResponse.data.users);
        setAllGists(gistResponse.data);
        setIsFetching(false);
        // console.log(gistResponse.data);
      } catch (error) {
        console.error(error.response?.data);
        setIsFetching(false);
      }
    })();
    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    if (gistIsSuccess) {
      (async function () {
        const response = await axios.get(`${config.serverUrl}/api/gists`);
        setAllGists(response.data);
      })();

      dispatch(uploadCleanUp({}));
      dispatch(setShowGistModal(false));
    }
  }, [gistIsSuccess]);

  const handleChange = (e) => {
    dispatch(setGistTitle(e.currentTarget.value));
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
                author={`${item.author?.firstName} ${item.author?.lastName}`}
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

              <BCard.Body className="mt-3 mx-2">
                <div style={{ listStyleType: "none" }}>
                  {[1, 2, 3, 4, 5].map((item, key) => (
                    <li key={`category-${key}`}>Lorem, ipsum - {key}.</li>
                  ))}
                </div>
              </BCard.Body>
            </BCard>
          </Col>
          <Col md={9}>
            <div className="d-flex justify-content-between">
              <Button
                variant="none"
                onClick={() => dispatch(setShowGistModal(true))}
              >
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
            {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )}
            <div className="w-100 justify-content-center">
              {allGists.map((post, key) => (
                <GistCard gist={post} key={`gist-${key}`} trimmed />
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <Modal
        show={showGistModal}
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
            onClick={() => dispatch(setShowGistModal(false))}
          />{" "}
        </span>

        <div className="row justify-content-center">
          <div
            className="col-10 col-xl-11 col-xxl-10"
            style={{ padding: "12px 0px" }}
          >
            <Form className="mx-0 px-0">
              <Form.Group>
                <Form.Label className={formStyles.formLabel}>
                  Gist Title
                </Form.Label>
                <Form.Control
                  id="createGistID"
                  size="lg"
                  name="title"
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

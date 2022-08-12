/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import MessageButton from "@/components/Atoms/messageButton";
import { useEffect, useState, useMemo } from "react";

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
import usePagination, { Loader } from "@/hooks/usePagination";

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
import InfiniteScroll from "react-infinite-scroll-component";

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
  const [filteredGists, setFilteredGists] = useState([]);
  const [gistCategories, setGistCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    post: "",
  });

  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating,
  } = usePagination("/api/gists", "gists");

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        setGistCategories([
          { name: "All", type: "gist" },
          ...data.allCategories,
        ]);
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, []);

  useEffect(() => {
    if (gistIsSuccess) {
      if (allGists?.length > 0) {
        // Fetch Updated Gist Using useSWRInfinite
        mutate();

        // Update State
        setAllGists(paginatedData);

        dispatch(uploadCleanUp({}));
        // dispatch(setShowGistModal(false));
      }
    }
  }, [gistIsSuccess]);

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(allGists) !== JSON.stringify(paginatedData)) {
        // console.log("paginatedData - 1:", paginatedData);
        setAllGists(paginatedData);
      }
    }
  }, [paginatedData]);

  const handleChange = (e) => {
    dispatch(setGistTitle(e.currentTarget.value));
  };

  const filterCategory = (item) => {
    console.log(item);

    const filtered = allGists.filter((gist) => gist.categories === item.name);
    if (filtered.length <= 0) {
      alert("No Item in this category");
    }
    // console.log('filtered gists:', filteredGists);

    setFilteredGists(filtered);
  };

  return (
    <section className={styles.gist}>
      <ToastContainer />
      <Head>
        <title>Gists</title>
      </Head>
      <MessageButton />
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
                title={item?.title}
                author={`${item?.author?.firstName} ${item?.author?.lastName}`}
              />
            ))}
          </EndlessCarousel>
        </div>
        <Row className="mt-5">
          <Col md={3} className="desktop-only">
            <BCard
              // className={`pt-1 px-1 shadow-sm ${styles.wrapper}`}
              className={`pt-1 px-1 ${styles.wrapper}`}
              style={{
                position: "sticky",
                top: "5rem",
                border: "1px solid rgba(0, 0, 0, 0.125)",
              }}
            >
              <BCard.Header className="shadow-sm border-0">
                <h5>Browse categories</h5>
              </BCard.Header>

              <BCard.Body className="mt-3 mx-2">
                <div style={{ listStyleType: "none" }}>
                  {gistCategories.map((item, key) => (
                    <li
                      onClick={() => filterCategory(item)}
                      style={{ marginBottom: "15px", cursor: "pointer" }}
                      key={key}
                    >
                      {item.name}
                    </li>
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

            <InfiniteScroll
              next={fetchNextPage}
              hasMore={!isReachedEnd}
              loader={<Loader />}
              endMessage={
                <p style={{ textAlign: "center", color: "gray" }}>
                  <b>Yay! You have seen it all...</b>
                </p>
              }
              dataLength={paginatedData?.length ?? 0}
              // initialScrollY={0}
            >
              <div className="justify-content-center">
                {(filteredGists.length > 0 ? filteredGists : allGists).map(
                  (post, key) => (
                    <GistCard gist={post} key={`gist-${key}`} trimmed />
                  )
                )}
              </div>

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
            </InfiniteScroll>
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

        <div className="row justify-content-center mx-1">
          <div
            className="col-11 col-sm-10 col-xl-11 col-xxl-10"
            style={{ padding: "12px 0px" }}
          >
            <Form>
              <Form.Group>
                <Form.Label className={formStyles.formLabel}>
                  Gist Title
                </Form.Label>
                <div
                  style={{
                    border: "1px solid rgba(0, 0, 0, 0.125)",
                    borderRadius: "10px",
                  }}
                >
                  <Form.Control
                    id="createGistID"
                    size="lg"
                    name="title"
                    type="text"
                    onChange={(e) => handleChange(e)}
                    style={{
                      backgroundColor: "rgb(248, 244, 244)",
                      borderRadius: "10px",
                    }}
                    required
                  />
                </div>
              </Form.Group>
            </Form>
          </div>
          <div className="col-12 mt-2 mb-4 px-lg-4">
            <Editor slim={false} pageAt="/gist" />
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

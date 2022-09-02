/* eslint-disable react-hooks/exhaustive-deps */
import Head from "next/head";
import MessageButton from "@/components/Atoms/messageButton";
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
  Button
} from "react-bootstrap";
import Card from "../../components/Organisms/Gist";
import EndlessCarousel from "../../components/Molecules/Carousel";
import GistCard from "../../components/Organisms/Gist/GistCard";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ToastContainer } from "react-toastify";
import config from "../../config";
import usePagination, { Loader } from "@/hooks/usePagination";

//STYLES
import styles from "../../styles/gist.module.scss";
import "react-toastify/dist/ReactToastify.css";

import {
  uploadCleanUp,
  selectGistIsSuccess,
  setShowGistModal,
  selectShowGistModal,
  selectIsFetching
} from "@/reduxFeatures/api/gistSlice";
// import Editor from "@/components/Organisms/SlateEditor/Editor";
import InfiniteScroll from "react-infinite-scroll-component";
import GistPostEditorModal from "@/components/Organisms/App/ModalPopUp/GistPostEditorModal";

const Gist = () => {
  const dispatch = useDispatch();
  const gistIsSuccess = useSelector(selectGistIsSuccess);

  const showGistModal = useSelector(selectShowGistModal);
  const isFetching = useSelector(selectIsFetching);

  const [allGists, setAllGists] = useState([]);
  const [filteredGists, setFilteredGists] = useState([]);
  const [gistCategories, setGistCategories] = useState([]);

  const [activeGist, setActiveGist] = useState("All");

  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating
  } = usePagination("/api/gists", "gists");

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        setGistCategories([
          { name: "All", type: "gist" },
          ...data.allCategories
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
      }
    }
  }, [gistIsSuccess]);

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(allGists) !== JSON.stringify(paginatedData)) {
        setAllGists(paginatedData);
      }
    }
  }, [paginatedData]);

  const filterCategory = item => {
    // console.log("item.name", item.name);
    setActiveGist(item.name);

    if (item.name === "All") {
      return setFilteredGists(allGists);
    }

    const filtered = allGists.filter(gist => gist.categories === item.name);
    if (filtered.length <= 0) {
      alert(`No Item in ${item.name} category`);
    }

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
          <EndlessCarousel>
            {allGists?.map((item, key) => (
              <Card
                key={`article-${key}`}
                id={item?._id}
                image={item?.media[0] ? item?.media[0] : "/images/formbg.png"}
                title={item?.title}
                author={`${item?.author?.firstName} ${item?.author?.lastName}`}
              />
            ))}
          </EndlessCarousel>
        </div>
        <Row className="mt-5">
          <Col md={3} className="d-none d-md-inline">
            <BCard
              className={`pt-1 px-1 ${styles.wrapper}`}
              style={{
                position: "sticky",
                top: "5rem",
                border: "1px solid rgba(0, 0, 0, 0.125)"
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
                      className={
                        item.name === activeGist
                          ? "text-primary fs-4"
                          : "text-dark fs-6"
                      }
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
                    fontWeight: "700"
                  }}
                >
                  Create Gist
                </span>
              </Button>
              <select className="outline-primary me-3">
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
            >
              <div className="justify-content-center">
                {(filteredGists.length > 0 ? filteredGists : allGists).map(
                  (post, key) => (
                    <GistCard key={`gist-${key}`} gist={post} trimmed />
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
                    marginTop: "1.2rem"
                  }}
                >
                  <b>Oops! Something went wrong</b>
                </p>
              )}
            </InfiniteScroll>
          </Col>
        </Row>
      </Container>

      {/* Open Editor Modal */}
      {showGistModal && <GistPostEditorModal pageAt="/gist" />}
    </section>
  );
};

export default Gist;

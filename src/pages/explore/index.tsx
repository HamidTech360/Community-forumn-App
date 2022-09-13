/* eslint-disable react-hooks/exhaustive-deps */
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Image, Button, Tabs, Tab } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import Card from "../../components/Molecules/Card";
import Followers from "@/components/Organisms/Followers";
import axios from "axios";
import styles from "../../styles/explore.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setPosts,
  selectPost,
  setShowPostModal,
  selectShowPostModal,
  selectNewPost
} from "@/reduxFeatures/api/postSlice";

import usePaginationBlogAll, {
  usePaginationBlogStudyAbroad,
  usePaginationBlogWorkAbroad,
  usePaginationBlogLiveAbroad,
  usePaginationBlogPgStudies,
  usePaginationBlogPtJobs,
  usePaginationBlogHousing,
  LoaderPage
} from "@/hooks/usePaginationBlog";

import config from "@/config";
import ReactPaginate from "react-paginate";
import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";

const Explore = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPost = useSelector(selectPost);
  const showPostModal = useSelector(selectShowPostModal);

  const newPost = useSelector(selectNewPost);
  const [categories, setCategories] = useState([]);

  const [key, setKey] = useState<string>("all");

  // React Numbered Paginator Display
  const [paginatorDisplay, setPaginatorDisplay] = useState({
    previous: "<<",
    next: ">>",
    pageMargin: 1,
    pageRange: 2
  });

  // Selected Category
  const [paginateCategory, setPaginateCategory] = useState("paginatedBlogAll");

  // PageIndex To Fetch
  const [pageIndexAll, setPageIndexAll] = useState(0);
  const [pageIndexStudyAbroad, setPageIndexStudyAbroad] = useState(0);
  const [pageIndexWorkAbroad, setPageIndexWorkAbroad] = useState(0);
  const [pageIndexLiveAbroad, setPageIndexLiveAbroad] = useState(0);
  const [pageIndexPgStudies, setPageIndexPgStudies] = useState(0);
  const [pageIndexHousing, setPageIndexHousing] = useState(0);
  const [pageIndexPtJobs, setPageIndexPtJobs] = useState(0);

  // const [initPageCategoryIndex, setInitPageCategoryIndex] = useState(0);

  // SWR usePagination
  const { paginatedBlogAll, mutateBlogAll, isLoadingBlogAll, errorBlogAll } =
    usePaginationBlogAll("/api/posts", pageIndexAll);
  const {
    paginatedBlogStudyAbroad,
    mutateBlogStudyAbroad,
    isLoadingBlogStudyAbroad,
    errorBlogStudyAbroad
  } = usePaginationBlogStudyAbroad(
    "/api/posts?category=study_abroad",
    pageIndexStudyAbroad
  );
  const {
    paginatedBlogWorkAbroad,
    mutateBlogWorkAbroad,
    isLoadingBlogWorkAbroad,
    errorBlogWorkAbroad
  } = usePaginationBlogWorkAbroad(
    "/api/posts?category=work_abroad",
    pageIndexWorkAbroad
  );
  const {
    paginatedBlogLiveAbroad,
    mutateBlogLiveAbroad,
    isLoadingBlogLiveAbroad,
    errorBlogLiveAbroad
  } = usePaginationBlogLiveAbroad(
    "/api/posts?category=live_abroad",
    pageIndexLiveAbroad
  );
  const {
    paginatedBlogPgStudies,
    mutateBlogPgStudies,
    isLoadingBlogPgStudies,
    errorBlogPgStudies
  } = usePaginationBlogPgStudies(
    "/api/posts?category=pg_studies",
    pageIndexPgStudies
  );
  const {
    paginatedBlogHousing,
    mutateBlogHousing,
    isLoadingBlogHousing,
    errorBlogHousing
  } = usePaginationBlogHousing("/api/posts?category=housing", pageIndexHousing);
  const {
    paginatedBlogPtJobs,
    mutateBlogPtJobs,
    isLoadingBlogPtJobs,
    errorBlogPtJobs
  } = usePaginationBlogPtJobs("/api/posts?category=pt_jobs", pageIndexPtJobs);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    // Fetch & Set Categories
    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        setCategories(data.allCategories);
        // console.log("all categories data", data.allCategories);
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, []);

  useEffect(() => {
    // Set Page Paginator Number Display Based On Screen Size
    if (window.innerWidth < 768) {
      setPaginatorDisplay({
        previous: "<<",
        next: ">>",
        pageMargin: 1,
        pageRange: 2
      });
    } else if (window.innerWidth < 1024) {
      setPaginatorDisplay({
        previous: "<< Pre",
        next: "Next >>",
        pageMargin: 2,
        pageRange: 3
      });
    } else if (window.innerWidth >= 1024) {
      setPaginatorDisplay({
        previous: "<< Pre",
        next: "Next >>",
        pageMargin: 3,
        pageRange: 4
      });
    }
  }, []);

  const filterCategory = (item: string) => {
    setKey(item);

    let paginatedKey = "All";

    if (item === "all") {
      paginatedKey = "All";
    } else if (item === "Study abroad") {
      paginatedKey = "StudyAbroad";
    } else if (item === "Work abroad") {
      paginatedKey = "WorkAbroad";
    } else if (item === "Live abroad") {
      paginatedKey = "LiveAbroad";
    } else if (item === "Postgraduate Studies") {
      paginatedKey = "PgStudies";
    } else if (item === "Housing") {
      paginatedKey = "Housing";
    } else if (item === "Part time jobs") {
      paginatedKey = "PtJobs";
    }

    setPaginateCategory(`paginatedBlog${paginatedKey}`);
  };

  useEffect(() => {
    // Re-render Only The Changed Category For New Post Only If Tab Is Active
    if (paginateCategory === "paginatedBlogAll") {
      mutateBlogAll();
    } else if (paginateCategory === "paginatedBlogStudyAbroad") {
      if (newPost.category === "study_abroad") {
        mutateBlogStudyAbroad();
      }
    } else if (paginateCategory === "paginatedBlogWorkAbroad") {
      if (newPost.category === "work_abroad") {
        mutateBlogWorkAbroad();
      }
    } else if (paginateCategory === "paginatedBlogLiveAbroad") {
      if (newPost.category === "live_abroad") {
        mutateBlogLiveAbroad();
      }
    } else if (paginateCategory === "paginatedBlogPgStudies") {
      if (newPost.category === "pg_studies") {
        mutateBlogPgStudies();
      }
    } else if (paginateCategory === "paginatedBlogHousing") {
      if (newPost.category === "housing") {
        mutateBlogHousing();
      }
    } else if (paginateCategory === "paginatedBlogPtJobs") {
      if (newPost.category === "pt_jobs") {
        mutateBlogPtJobs();
      }
    }
  }, [newPost]);

  useEffect(() => {
    // Set Post Category To Render
    if (paginateCategory === "paginatedBlogAll") {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogAll)) {
        dispatch(setPosts(paginatedBlogAll));
      }
    } else if (paginateCategory === "paginatedBlogStudyAbroad") {
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogStudyAbroad)
      ) {
        dispatch(setPosts(paginatedBlogStudyAbroad));
      }
    } else if (paginateCategory === "paginatedBlogWorkAbroad") {
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogWorkAbroad)
      ) {
        dispatch(setPosts(paginatedBlogWorkAbroad));
      }
    } else if (paginateCategory === "paginatedBlogLiveAbroad") {
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogLiveAbroad)
      ) {
        dispatch(setPosts(paginatedBlogLiveAbroad));
      }
    } else if (paginateCategory === "paginatedBlogPgStudies") {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogPgStudies)) {
        dispatch(setPosts(paginatedBlogPgStudies));
      }
    } else if (paginateCategory === "paginatedBlogHousing") {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogHousing)) {
        dispatch(setPosts(paginatedBlogHousing));
      }
    } else if (paginateCategory === "paginatedBlogPtJobs") {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogPtJobs)) {
        dispatch(setPosts(paginatedBlogPtJobs));
      }
    }
  }, [
    paginateCategory,
    paginatedBlogAll,
    paginatedBlogStudyAbroad,
    paginatedBlogWorkAbroad,
    paginatedBlogLiveAbroad,
    paginatedBlogPgStudies,
    paginatedBlogPtJobs,
    paginatedBlogHousing
  ]);

  const handlePageChange = page => {
    console.log("Page Clicked:", page.selected);

    if (paginateCategory === "paginatedBlogAll") {
      if (pageIndexAll !== page.selected) router.replace("#explore");
      setPageIndexAll(page.selected);
    } else if (paginateCategory === "paginatedBlogStudyAbroad") {
      if (pageIndexStudyAbroad !== page.selected) router.replace("#explore");
      setPageIndexStudyAbroad(page.selected);
    } else if (paginateCategory === "paginatedBlogWorkAbroad") {
      if (pageIndexWorkAbroad !== page.selected) router.replace("#explore");
      setPageIndexWorkAbroad(page.selected);
    } else if (paginateCategory === "paginatedBlogLiveAbroad") {
      if (pageIndexLiveAbroad !== page.selected) router.replace("#explore");
      setPageIndexLiveAbroad(page.selected);
    } else if (paginateCategory === "paginatedBlogPgStudies") {
      if (pageIndexPgStudies !== page.selected) router.replace("#explore");
      setPageIndexPgStudies(page.selected);
    } else if (paginateCategory === "paginatedBlogHousing") {
      if (pageIndexHousing !== page.selected) router.replace("#explore");
      setPageIndexHousing(page.selected);
    } else if (paginateCategory === "paginatedBlogPtJobs") {
      if (pageIndexPtJobs !== page.selected) router.replace("#explore");
      setPageIndexPtJobs(page.selected);
    }
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
              onSelect={k => filterCategory(k)}
              activeKey={key}
              id="uncontrolled-tab-example"
              className="justify-content-center d-flex gap-2"
              defaultActiveKey={"all"}
            >
              <Tab title="All" eventKey="all" key="all" />
              {categories.map(category => (
                <Tab
                  key={category.name}
                  eventKey={category.name}
                  title={category.name}
                />
              ))}
            </Tabs>

            <Row className="d-flex justify-content-start">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
              {showPost?.posts.map((post: Record<string, any>, key: number) => (
                <Col
                  key={`posts_${key}`}
                  md={4}
                  className={`my-4 ${styles.card}`}
                >
                  <Card
                    _id={post._id}
                    image={post.media[0] || "/images/postPlaceholder.jpg"}
                    title={post.postTitle}
                    body={post.postBody}
                    author={post.author}
                    size="any"
                  />
                </Col>
              ))}
            </Row>

            {isLoadingBlogAll ||
            isLoadingBlogStudyAbroad ||
            isLoadingBlogWorkAbroad ||
            isLoadingBlogLiveAbroad ||
            isLoadingBlogPgStudies ||
            isLoadingBlogPtJobs ||
            isLoadingBlogHousing ? (
              <LoaderPage />
            ) : null}

            {errorBlogAll ||
            errorBlogStudyAbroad ||
            errorBlogWorkAbroad ||
            errorBlogLiveAbroad ||
            errorBlogPgStudies ||
            errorBlogPtJobs ||
            errorBlogHousing ? (
              <p
                style={{
                  textAlign: "center",
                  color: "gray",
                  marginTop: "1.2rem"
                }}
              >
                <b>Oops! Something went wrong</b>
              </p>
            ) : null}
          </div>

          <ReactPaginate
            previousLabel={paginatorDisplay.previous}
            nextLabel={paginatorDisplay.next}
            breakLabel="..."
            pageCount={isNaN(showPost?.numPages) ? 0 : showPost?.numPages}
            marginPagesDisplayed={paginatorDisplay.pageMargin}
            pageRangeDisplayed={paginatorDisplay.pageRange}
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
            activeClassName="bg-primary text-light"
            activeLinkClassName="bg-primary text-light"
            hrefBuilder={(page, pageCount) =>
              page >= 1 && page <= pageCount ? `/explore/${page}` : "#"
            }
            hrefAllControls
            renderOnZeroPageCount={null}
          />
        </Container>
      </section>

      <section className="row col-5 col-md-4 col-lg-3 mx-auto mt-5">
        <Button
          variant="primary"
          className="fs-5"
          onClick={() => dispatch(setShowPostModal(true))}
        >
          Share your thoughts
        </Button>
      </section>

      <section>
        <Followers />
      </section>

      {/* Open Slate Modal Editor */}
      {showPostModal && <ExplorePostEditorModal pageAt="/explore" />}
    </div>
  );
};

export default Explore;

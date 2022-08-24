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
import usePaginationBlogAll, {
  usePaginationBlogStudyAbroad,
  usePaginationBlogWorkAbroad,
  usePaginationBlogLiveAbroad,
  usePaginationBlogPgStudies,
  usePaginationBlogPtJobs,
  usePaginationBlogHousing,
  LoaderPage,
} from "@/hooks/usePaginationBlog";
// import InfiniteScroll from "react-infinite-scroll-component";
import config from "@/config";
import ReactPaginate from "react-paginate";
import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";

const Explore = ({}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPost = useSelector(selectPost);
  const showPostModal = useSelector(selectShowPostModal);
  // const user = useSelector(selectUser);
  // const isFetching = useSelector(selectIsFetching);

  const newPost = useSelector(selectNewPost);
  const [categories, setCategories] = useState([]);
  // const [filteredPosts, setFilteredPosts] = useState([]);
  const [key, setKey] = useState<string>("all");
  // const [users, setUsers] = useState([]);
  // const [formData, setFormData] = useState({
  //   postTitle: "",
  //   postBody: "",
  // });

  // React Numbered Paginator Display
  const [paginatorDisplay, setPaginatorDisplay] = useState({
    previous: "<<",
    next: ">>",
    pageMargin: 1,
    pageRange: 2,
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

  // SWR usePagination
  const { paginatedBlogAll, mutateBlogAll, isLoadingBlogAll, errorBlogAll } =
    usePaginationBlogAll("/api/posts", pageIndexAll);
  const {
    paginatedBlogStudyAbroad,
    mutateBlogStudyAbroad,
    isLoadingBlogStudyAbroad,
    errorBlogStudyAbroad,
  } = usePaginationBlogStudyAbroad(
    "/api/posts?category=study_abroad",
    pageIndexStudyAbroad
  );
  const {
    paginatedBlogWorkAbroad,
    mutateBlogWorkAbroad,
    isLoadingBlogWorkAbroad,
    errorBlogWorkAbroad,
  } = usePaginationBlogWorkAbroad(
    "/api/posts?category=work_abroad",
    pageIndexWorkAbroad
  );
  const {
    paginatedBlogLiveAbroad,
    mutateBlogLiveAbroad,
    isLoadingBlogLiveAbroad,
    errorBlogLiveAbroad,
  } = usePaginationBlogLiveAbroad(
    "/api/posts?category=live_abroad",
    pageIndexLiveAbroad
  );
  const {
    paginatedBlogPgStudies,
    mutateBlogPgStudies,
    isLoadingBlogPgStudies,
    errorBlogPgStudies,
  } = usePaginationBlogPgStudies(
    "/api/posts?category=pg_studies",
    pageIndexPgStudies
  );
  const {
    paginatedBlogHousing,
    mutateBlogHousing,
    isLoadingBlogHousing,
    errorBlogHousing,
  } = usePaginationBlogHousing("/api/posts?category=housing", pageIndexHousing);
  const {
    paginatedBlogPtJobs,
    mutateBlogPtJobs,
    isLoadingBlogPtJobs,
    errorBlogPtJobs,
  } = usePaginationBlogPtJobs("/api/posts?category=pt_jobs", pageIndexPtJobs);

  // useEffect(() => {
  //   console.log("showPost:", showPost);
  // }, []);

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
        pageRange: 2,
      });
    } else if (window.innerWidth < 1024) {
      setPaginatorDisplay({
        previous: "<< Pre",
        next: "Next >>",
        pageMargin: 2,
        pageRange: 3,
      });
    } else if (window.innerWidth >= 1024) {
      setPaginatorDisplay({
        previous: "<< Pre",
        next: "Next >>",
        pageMargin: 3,
        pageRange: 4,
      });
    }
  }, []);

  const filterCategory = (item) => {
    console.log("key is", item);
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

    // Set Paginated Categories
    setPaginateCategory(`paginatedBlog${paginatedKey}`);

    // const filtered = showPost?.posts.filter((post) => post.category === item);
    // console.log("filtered post:", filtered);

    // const filtered = showPost.filter((post) => post.category === item);
    // console.log("filtered post:", filtered);

    // if (filtered.length <= 0) {
    //   alert("No Item in this category");
    // }

    // setFilteredPosts(filtered);
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
    // if (paginatedBlogAll) {
    //   if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogAll)) {
    //     dispatch(setPosts(paginatedBlogAll));
    //   }
    // }

    // ++++++++++++++++++++++++++++++++++
    // console.log("paginateCategory:", paginateCategory);

    // Set Post Category To Render
    if (paginateCategory === "paginatedBlogAll") {
      // if (paginatedBlogAll) {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogAll)) {
        dispatch(setPosts(paginatedBlogAll));
      }
      // }
    } else if (paginateCategory === "paginatedBlogStudyAbroad") {
      // if (paginatedBlogStudyAbroad) {
      // console.log("paginatedBlogStudyAbroad:");
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogStudyAbroad)
      ) {
        dispatch(setPosts(paginatedBlogStudyAbroad));
      }
      // }
    } else if (paginateCategory === "paginatedBlogWorkAbroad") {
      // if (paginatedBlogWorkAbroad) {
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogWorkAbroad)
      ) {
        dispatch(setPosts(paginatedBlogWorkAbroad));
      }
      // }
    } else if (paginateCategory === "paginatedBlogLiveAbroad") {
      // if (paginatedBlogLiveAbroad) {
      if (
        JSON.stringify(showPost) !== JSON.stringify(paginatedBlogLiveAbroad)
      ) {
        dispatch(setPosts(paginatedBlogLiveAbroad));
      }
      // }
    } else if (paginateCategory === "paginatedBlogPgStudies") {
      // if (paginatedBlogPgStudies) {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogPgStudies)) {
        dispatch(setPosts(paginatedBlogPgStudies));
      }
      // }
    } else if (paginateCategory === "paginatedBlogHousing") {
      // if (paginatedBlogHousing) {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogHousing)) {
        dispatch(setPosts(paginatedBlogHousing));
      }
      // }
    } else if (paginateCategory === "paginatedBlogPtJobs") {
      // if (paginatedBlogPtJobs) {
      if (JSON.stringify(showPost) !== JSON.stringify(paginatedBlogPtJobs)) {
        dispatch(setPosts(paginatedBlogPtJobs));
      }
    }
    // }
  }, [
    paginateCategory,
    paginatedBlogAll,
    paginatedBlogStudyAbroad,
    paginatedBlogWorkAbroad,
    paginatedBlogLiveAbroad,
    paginatedBlogPgStudies,
    paginatedBlogPtJobs,
    paginatedBlogHousing,
  ]);

  // useEffect(() => {
  //   // Set Post To Render
  //   // console.log("paginatedStudyAbroadData:", paginatedStudyAbroadData);
  //   dispatch(setPosts(paginatedBlogAll));
  // }, [paginatedBlogAll]);
  // }, [paginateCategory]);

  // useEffect(() => {
  //   console.log("paginatedBlogAll:", paginatedBlogAll);
  //   console.log("paginatedBlogStudyAbroad:", paginatedBlogStudyAbroad);
  //   console.log("paginatedBlogWorkAbroad:", paginatedBlogWorkAbroad);
  //   console.log("paginatedBlogLiveAbroad:", paginatedBlogLiveAbroad);
  //   console.log("paginatedBlogPgStudies:", paginatedBlogPgStudies);
  //   console.log("paginatedBlogPtJobs:", paginatedBlogPtJobs);
  //   console.log("paginatedBlogHousing:", paginatedBlogHousing);
  // }, [
  //   paginatedBlogAll,
  //   paginatedBlogStudyAbroad,
  //   paginatedBlogWorkAbroad,
  //   paginatedBlogLiveAbroad,
  //   paginatedBlogPgStudies,
  //   paginatedBlogPtJobs,
  //   paginatedBlogHousing,
  // ]);

  // const handleChange = (e) => {
  //   dispatch(setPostTitle(e.currentTarget.value));
  // };

  const handlePageChange = (page) => {
    // console.log("Page Clicked:", page.selected);

    // setPageIndexAll(page.selected);
    //
    // if (pageIndexAll !== page.selected) router.replace("#explore");

    // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    // Only scroll to top on selected category page change
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
              onSelect={(k) => filterCategory(k!)}
              activeKey={key}
              id="uncontrolled-tab-example"
              className="justify-content-center d-flex gap-2"
              defaultActiveKey={"all"}
            >
              <Tab title="All" eventKey="all" key="all" />
              {categories.map((category, i) => (
                <Tab
                  key={i}
                  onClick={() => filterCategory(category)}
                  eventKey={category.name}
                  title={category.name}
                />
              ))}
            </Tabs>

            <Row className="d-flex justify-content-start">
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

            {/* {isLoadingBlogAll && <LoaderPage />} */}
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
                  marginTop: "1.2rem",
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
            pageCount={showPost?.numPages}
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
            activeLinkClassName="bg-primary text-light"
            // eslint-disable-next-line no-unused-vars
            hrefBuilder={(page, pageCount, selected) =>
              page >= 1 && page <= pageCount ? `/explore/${page}` : "#"
            }
            hrefAllControls
            // forcePage={pageIndexAll}
            forcePage={
              paginateCategory === "paginatedBlogAll"
                ? pageIndexAll
                : paginateCategory === "paginatedBlogStudyAbroad"
                ? paginatedBlogStudyAbroad
                : paginateCategory === "paginatedBlogWorkAbroad"
                ? paginatedBlogWorkAbroad
                : paginateCategory === "paginatedBlogLiveAbroad"
                ? paginatedBlogLiveAbroad
                : paginateCategory === "paginatedBlogPgStudies"
                ? paginatedBlogPgStudies
                : paginateCategory === "paginatedBlogHousing"
                ? paginatedBlogHousing
                : paginateCategory === "paginatedBlogPtJobs"
                ? paginatedBlogPtJobs
                : null
            }
            renderOnZeroPageCount={null}
          />
        </Container>
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

/* eslint-disable react-hooks/exhaustive-deps */
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import { Container, Spinner } from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
import { toast, ToastContainer } from "react-toastify";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

// import { usePagination } from "@/hooks/usePagination";
import usePagination, { Loader } from "@/hooks/usePagination2";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/feed.module.scss";
import Follow from "@/components/Organisms/App/Follow";
import { useDispatch, useSelector } from "@/redux/store";
import { selectNewFeed } from "@/reduxFeatures/api/feedSlice";

const Feed = () => {
  const data = useSelector(selectUser);
  const dispatch = useDispatch();
  const newFeed = useSelector(selectNewFeed);
  //const { posts, setPage, hasMore, isFetchingMore } = usePagination();
  const [scrollInitialised, setScrollInitialised] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [numPages, setNumPages] = useState(0);
  const [errorState, setErrorState] = useState(null);
  const [loadingMoreState, setLoadingMoreState] = useState(null);
  const [sizeState, setSizeState] = useState(0);

  const [isFetching, setIsFetching] = useState(true);

  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialised(true);
    }
  };

  const {
    paginatedData,
    isReachedEnd,
    loadingMore,
    size,
    setSize,
    error,
    mutate,
    isValidating,
  } = usePagination("/api/feed", sizeState);

  // console.log("paginatedData:", paginatedData);

  useEffect(() => {
    if (paginatedData) {
      setPosts(paginatedData[0]?.feed);
    }
    if (size) {
      setSizeState(size);
      // console.log("SIZZZZE");
      if (paginatedData) {
        setPosts(paginatedData[0]?.feed);
      }
    }
    if (loadingMore) {
      setLoadingMoreState(loadingMore);
    }
    if (error) {
      // console.log("ERROR:", error);
      setErrorState(error);
    }
    // // const {} = usePagination(`/api/feed?=page=${pageParam}`)
    // (async function () {
    //   try {
    //     const response = await axios.get(`${config.serverUrl}/api/feed`);
    //     // console.log(response.data);
    //     setPosts(response.data.feed);
    //     // setNumPages(response.data.numPages - 1);
    //     // console.log("response.data.numPages:", response.data.numPages - 1);
    //     // console.log("response.data.feed:", response.data.feed);
    //   } catch (error) {
    //     // console.log(error.response?.data);
    //   }
    // })();
    // document.body.style.backgroundColor = "#f6f6f6";
    // window.addEventListener("scroll", checkScroll);
    // return () => {
    //   document.body.style.backgroundColor = "initial";
    //   window.removeEventListener("scroll", checkScroll);
    // };
    // // }, [handleSubmit]);
  }, [newFeed, paginatedData, error, loadingMore, size, sizeState]);

  return (
    <AuthContent>
      <ToastContainer />
      <Head>
        <title>Feed</title>
      </Head>
      <MessageButton />
      <Container>
        <div className="row mt-lg-5">
          {/* <div className={`mt-3 ${styles.wrapper}`}> */}
          <div className="d-none d-lg-flex col-lg-3 col-xl-2 me-xl-4">
            <div
              // style={{ width: 230 }}
              // className="position-fixed d-none d-lg-flex flex-column vh-100"
              className={`${styles.userCardDiscussion} position-fixed d-flex flex-column vh-100`}
            >
              <div className="col-xs-12">
                <UserCard user={data!} />
              </div>
              <div className="col-xs-12">
                <Discussions posts={posts} />
              </div>
            </div>
          </div>

          <main
            className={`${styles.posts} col-12 col-lg-7 col-xl-7 ms-xl-5 ms-xxl-4`}
            id="posts"
          >
            <CreatePost pageAt="/feed" />
            {/* <div
              id="instersection"
              style={{
                height: "30vh",
                width: "100%",
                position: "fixed",
                bottom: 0,
              }}
            ></div> */}
            {/* <InfiniteScroll
              dataLength={Number(posts?.length)} //This is important field to render the next data
              next={fetchData}
              hasMore={true}
              initialScrollY={0}
              loader={
                <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </div>
                }
                endMessage={
                  <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                  </p>
                }
              > */}

            {errorState && (
              <p style={{ textAlign: "center" }}>
                <b>Oops! Something went wrong (STATE)</b>
              </p>
            )}

            {error && (
              <p style={{ textAlign: "center" }}>
                <b>Oops! Something went wrong</b>
              </p>
            )}

            {!posts && <Loader />}
            {!paginatedData && <Loader />}

            {posts?.map((post, index) => (
              <PostCard
                post={post}
                key={`activity-post-${index}-${post.id}`}
                trimmed
              />
            ))}

            {loadingMoreState && <Loader />}
            {loadingMore && <Loader />}

            {/* {isFetching && (
              <div className="m-2 p-2 d-flex justify-content-center">
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            )} */}

            {/* {!hasMore && (
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            )} */}
            {/* </InfiniteScroll> */}
          </main>
          <div
            // style={{ width: 270 }}
            // className="position-fixed d-none d-xxl-flex end-0 me-5 vh-100 "
            className="d-none d-lg-flex col-lg-3 col-xl-3 position-fixed end-0 ps-lg-5 ps-xxl-3 me-xl-2 ms-xxl-4 vh-100"
          >
            <Follow />
            {!isReachedEnd && (
              // <button onClick={() => setSize(size + 1)}>Load More</button>
              <button onClick={() => setSize(sizeState + 1)}>Load More</button>
            )}
            {console.log("size:", size)}
            {console.log("isReachedEnd:", isReachedEnd)}
            {/* {console.log("loadingMore:", loadingMore)} */}
          </div>
          {/* </div> */}
        </div>
      </Container>
    </AuthContent>
  );
};

export default Feed;

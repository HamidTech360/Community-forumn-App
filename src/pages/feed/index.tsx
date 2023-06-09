/* eslint-disable react-hooks/exhaustive-deps */
import MessageButton from "@/components/Atoms/messageButton";
import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import config from "../../config";
import { Container } from "react-bootstrap";
import AuthContent from "@/components/Auth/AuthContent";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import PostCard from "@/components/Organisms/App/PostCard";
import UserCard from "@/components/Organisms/App/UserCard";
import CreatePost from "@/components/Organisms/CreatePost";
import { ToastContainer } from "react-toastify";
import {
  selectUser,
  setFollowers,
  setFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import usePagination, { Loader } from "@/hooks/usePagination";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/feed.module.scss";
import Follow from "@/components/Organisms/App/Follow";
import { useDispatch, useSelector } from "@/redux/store";
import { selectNewFeed } from "@/reduxFeatures/api/feedSlice";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";
import { useModalWithData } from "@/hooks/useModalWithData";
import { FeedPostEditorModal_Modal } from "../../components/Organisms/App/ModalPopUp/FeedPostEditorModal";

const Feed = () => {
  const router = useRouter();

  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const newFeed = useSelector(selectNewFeed);
  const [posts, setPosts] = useState([]);
  const { modalOpen, toggle, selected, setSelected } = useModalWithData();
  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating
  } = usePagination("/api/feed", "feed");

  // Update users followers & following in AuthUser because it's a frontend resolved data
  useEffect(() => {
    if (stateUser) {
      const currentlyFollowing = stateUser.following.map(follow => {
        return follow._id;
      });
      const currentFollowers = stateUser.followers.map(follow => {
        return follow._id;
      });

      dispatch(setFollowers(currentFollowers));
      dispatch(setFollowing(currentlyFollowing));
    }
  }, [stateUser]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    if (Object.entries(newFeed).length !== 0) {
      if (posts?.length > 0) {
        mutate();
        setPosts(paginatedData);
      }
    }
  }, [newFeed]);

  useEffect(() => {
    // Refresh On Post delete Or Change
    mutate();
  }, [posts]);

  useEffect(() => {
    console.log("paginatedData:", paginatedData);
    if (paginatedData) {
      if (JSON.stringify(posts) !== JSON.stringify(paginatedData)) {
        setPosts(paginatedData);
      }
    }
  }, [paginatedData]);

  useEffect(() => {
    const query = router.query.active;
    if (query) {
      (async function () {
        try {
          const response = await axios.get(
            `${config.serverUrl}/api/feed/${query}`
          );
          console.log(response.data);
          setSelected(response.data);
          toggle();
        } catch (error) {
          console.log(error.response?.data);
        }
      })();
    }
  }, [router.query]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDeletePost = async (item: Record<string, any>) => {
    setPosts(posts.filter(el => el._id !== item._id));

    try {
      await axios.delete(`${config.serverUrl}/api/feed?id=${item._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
    } catch (error) {
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async item => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(item));

    if (router.asPath === "/feed") {
      // Open Feed Post Modal
      document.getElementById("createFeedPost").click();
    }
  };

  return (
    <AuthContent>
      <ToastContainer />
      {modalOpen && (
        <FeedPostEditorModal_Modal
          modalOpen={modalOpen}
          selected={selected}
          modalToggle={toggle}
          mutate={mutate}
        />
      )}
      <Head>
        <title>Feed</title>
      </Head>
      <MessageButton />
      <Container>
        <div className="row mt-md-4 mt-lg-5 ">
          <div className="d-none d-md-flex col-md-4 col-lg-3 col-xl-2 me-md-5 me-lg-0 me-xl-4">
            <div
              className={`${styles.userCardDiscussion} position-fixed d-flex flex-column vh-100`}
            >
              <div className="col-xs-12">
                <UserCard />
              </div>
              <div className="col-xs-12">
                <Discussions />
              </div>
            </div>
          </div>

          <main
            className={`${styles.posts} col-12 col-md-7 col-lg-7 col-xl-7 ms-xl-5 ms-xxl-4`}
            id="posts"
          >
            <CreatePost pageAt={"/feed"} />

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
              {posts?.map((post, index) => (
                <PostCard
                  post={post}
                  key={`activity-post-${index}-${post?.id}`}
                  trimmed
                  handleDeletePost={handleDeletePost}
                  handleEditPost={handleEditPost}
                  mutate={mutate}
                />
              ))}
              {isValidating && (
                <p style={{ textAlign: "center", color: "gray" }}>
                  <b>Fetching Post...</b>
                </p>
              )}
              {!isValidating && !isReachedEnd ? (
                <p
                  className="text-primary"
                  style={{ textAlign: "center", color: "gray" }}
                  onClick={() => mutate()}
                >
                  <b>See more...</b>
                </p>
              ) : null}
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
          </main>
          <div className="d-none d-lg-flex col-lg-3 col-xl-3 position-fixed end-0 ps-lg-5 ps-xxl-3 me-xl-2 ms-xxl-4 vh-100">
            <Follow />
          </div>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Feed;

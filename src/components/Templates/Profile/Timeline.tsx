import React, { useEffect, useState, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
// import { usePagination } from "../../../hooks/usePagination-old";
import PostCard from "../../Organisms/App/PostCard";
import CreatePost from "../../Organisms/CreatePost";
import styles from "@/styles/profile.module.scss";
import Link from "next/link";
import axios from "axios";
import config from "@/config";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useDispatch, useSelector } from "@/redux/store";
import {
  selectShowPostModal,
  setShowPostModal,
} from "@/reduxFeatures/api/postSlice";
// import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";
import ExplorePostEditorModal from "../../../components/Organisms/App/ModalPopUp/ExplorePostEditorModal";
import {
  setShowCreatePostModal,
  selectCreatePostModal,
} from "@/reduxFeatures/app/createPost";
import FeedPostEditorModal from "@/components/Organisms/App/ModalPopUp/FeedPostEditorModal";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "@/hooks/usePaginationProfileTL";

const Timeline = ({
  Posts: postComingIn,
  paginatedData,
  isReachedEnd,
  error,
  fetchNextPage,
  mutate,
  isValidating,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPostModal = useSelector(selectShowPostModal);
  const [Posts, setPostComingIn] = useState(postComingIn);
  const showModal = useSelector(selectCreatePostModal);
  // const intersection = useRef();

  useEffect(() => {
    if (postComingIn) {
      setPostComingIn(postComingIn);
    }
  }, [postComingIn]);

  const handleDeletePost = async (item) => {
    const newPosts = Posts.filter((el) => el._id !== item._id);
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/feed?id=${item._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setPostComingIn(newPosts);
    } catch (error) {
      setPostComingIn(Posts);
      // console.log(error.response?.data);
    }
  };

  const handleEditPost = async (item) => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(item));

    // OPEN EDITOR
    if (router.asPath === "/feed") {
      document.getElementById("createFeedPost").click();
    } else if (router?.pathname.includes("profile")) {
      dispatch(setShowPostModal(true));
    } else if (router?.pathname.includes("groups")) {
      dispatch(setShowCreatePostModal(true));
    }
  };

  return (
    <div className={styles.profileWrapper}>
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
        {Posts?.map((post, index) => (
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
              marginTop: "1.2rem",
            }}
          >
            <b>Oops! Something went wrong</b>
          </p>
        )}
      </InfiniteScroll>

      {/* Open Editor Modal */}
      {showModal && <FeedPostEditorModal pageAt={router.asPath} />}
    </div>
  );
};

export default Timeline;

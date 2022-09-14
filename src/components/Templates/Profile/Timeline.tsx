import React, { useEffect, useState } from "react";
import PostCard from "../../Organisms/App/PostCard";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";

import { useRouter } from "next/router";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { setShowPostModal } from "@/reduxFeatures/api/postSlice";
import {
  setShowCreatePostModal,
  selectCreatePostModal
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
  isValidating
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [Posts, setPostComingIn] = useState(postComingIn);
  const showModal = useSelector(selectCreatePostModal);

  useEffect(() => {
    if (postComingIn) {
      setPostComingIn(postComingIn);
    }
  }, [postComingIn]);

  const handleDeletePost = async item => {
    const newPosts = Posts.filter(el => el._id !== item._id);
    try {
      await axios.delete(`${config.serverUrl}/api/feed?id=${item._id}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accessToken")}`
        }
      });
      setPostComingIn(newPosts);
    } catch (error) {
      setPostComingIn(Posts);
    }
  };

  const handleEditPost = async item => {
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
              marginTop: "1.2rem"
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

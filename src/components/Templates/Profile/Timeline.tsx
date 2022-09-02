import React, { useEffect, useState } from "react";
// import { usePagination } from "../../../hooks/usePagination-old";
import PostCard from "../../Organisms/App/PostCard";
import styles from "@/styles/profile.module.scss";
import axios from "axios";
import config from "@/config";

import { useRouter } from "next/router";
import { setSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { setShowPostModal } from "@/reduxFeatures/api/postSlice";
// import ExplorePostEditorModal from "@/components/Organisms/App/ModalPopUp/ExplorePostEditorModal";
import {
  setShowCreatePostModal,
  selectCreatePostModal
} from "@/reduxFeatures/app/createPost";
import FeedPostEditorModal from "@/components/Organisms/App/ModalPopUp/FeedPostEditorModal";

const Timeline = ({ Posts: postComingIn }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [Posts, setPostComingIn] = useState(postComingIn);
  const showModal = useSelector(selectCreatePostModal);
  // const intersection = useRef();

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
      // console.log(error.response?.data);
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
      {Posts?.map((post, index) => (
        <PostCard
          post={post}
          key={`activity-post-${index}-${post.id}`}
          trimmed
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
          mutate
        />
      ))}

      {/* Open Editor Modal */}
      {showModal && <FeedPostEditorModal pageAt={router.asPath} />}
    </div>
  );
};

export default Timeline;

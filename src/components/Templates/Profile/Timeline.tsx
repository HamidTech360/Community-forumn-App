import React, { useEffect, useState, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination-old";
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

const Timeline = ({ Posts }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const showPostModal = useSelector(selectShowPostModal);
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const { posts, hasMore, isFetchingMore } = usePagination();
  const intersection = useRef();
  // const [Posts, setPosts] = useState([])
  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialized(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkScroll);

    return () => {
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  useEffect(() => {
    const scrollArea = intersection.current;
    const cards = document.querySelectorAll(".card");
    const targetItem = cards?.item(cards.length - 3);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // setPage((prevPage) => prevPage + 1);
          }
        });
      },
      { root: scrollArea, rootMargin: "0px", threshold: 1.0 }
    );

    if (targetItem) observer.observe(targetItem);

    return () => {
      if (targetItem) observer.unobserve(targetItem);
      observer.disconnect();
    };
  }, [posts, scrollInitialized]);

  const handleDeletePost = async (item) => {
    const newPosts = Posts.filter((el) => el._id !== item._id);
    console.log(posts, newPosts);
    Posts = [...newPosts];
    // setTimeLinePosts(newPosts)
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/feed?id=${item._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(data, item._id);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const handleEditPost = async (item) => {
    // Notify Slate Editor Of Post Editing
    dispatch(setSlatePostToEdit(item));

    // if (router.asPath === "/feed") {
    //   document.getElementById("createFeedPost").click();
    // }

    if (router?.pathname.includes("profile")) {
      // Open Explore Post Modal
      dispatch(setShowPostModal(true));
    }
  };

  return (
    <div className={styles.profileWrapper}>
      {/* <CreatePost DisplayModal={""} /> */}
      <div
        ref={intersection}
        style={{
          height: "10vh",
          width: "100%",
          position: "fixed",
          bottom: 0,
        }}
      ></div>
      {console.log("POST+++", Posts)}
      {Posts?.map((post, index) => (
        <PostCard
          post={post}
          key={`activity-post-${index}-${post.id}`}
          trimmed
          handleDeletePost={handleDeletePost}
          handleEditPost={handleEditPost}
        />
      ))}
      {isFetchingMore && (
        <div className="m-2 p-2 d-flex justify-content-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
      {!hasMore && (
        <p style={{ textAlign: "center" }}>
          <b>Yay! You have seen it all</b>
        </p>
      )}
      {showPostModal && <ExplorePostEditorModal />}
    </div>
  );
};

export default Timeline;

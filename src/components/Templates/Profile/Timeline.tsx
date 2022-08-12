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

const Timeline = ({ Posts }) => {
  const router = useRouter();
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const { posts, hasMore, isFetchingMore } = usePagination();
  const intersection = useRef();
  // const [Posts, setPosts] = useState([])
  const checkScroll = () => {
    if (window.scrollY > 100) {
      setScrollInitialized(true);
    }
  };

  // useEffect(()=>{
  //   (async ()=>{
  //     try{
  //       const response = await axios.get(`${config.serverUrl}/api/posts/group/random`)
  //       console.log(response.data.posts);
  //       setPosts(response.data.posts)
  //     }catch(error){
  //       console.log(error.response?.data)
  //     }
  //   })()
  // },[])

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
      {/* {console.log("POST+++", Posts)} */}
      {Posts?.map((post, index) => (
        <PostCard
          post={post}
          key={`activity-post-${index}-${post.id}`}
          trimmed
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
    </div>
  );
};

export default Timeline;

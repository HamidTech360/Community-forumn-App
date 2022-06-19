import React, { useEffect, useState, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination";
import PostCard from "../../Organisms/App/PostCard";
import CreatePost from "../../Organisms/CreatePost";
import styles from "@/styles/profile.module.scss";
import Link from "next/link";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useRouter } from "next/router";

const Timeline = () => {
  const router = useRouter();
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const { posts, hasMore, isFetchingMore } = usePagination();
  const intersection = useRef();

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

  return (
    <div className={styles.profileWrapper}>
      <div
        className={`${styles.addNewGroupBtn} row col-6 col-md-4 col-lg-3 ms-auto me-2`}
      >
        <Link href="/groups/new" passHref>
          <Button
            variant="outline-primary"
            className=" btn-sm"
            onClick={() =>
              sessionStorage.setItem(
                "newGroup_coming4rm",
                JSON.stringify(router.asPath)
              )
            }
          >
            <AiOutlineUsergroupAdd size={23} /> Create New Group
          </Button>
        </Link>
      </div>
      <CreatePost />
      <div
        ref={intersection}
        style={{
          height: "10vh",
          width: "100%",
          position: "fixed",
          bottom: 0,
        }}
      ></div>
      {posts?.map((post) => (
        <PostCard post={post} key={`activity-post-${post.id}`} trimmed />
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

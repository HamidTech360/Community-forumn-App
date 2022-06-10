import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { usePagination } from "../../../hooks/usePagination";
import PostCard from "../../Organisms/App/PostCard";
import CreatePost from "../../Organisms/CreatePost";

const Timeline = () => {
  const [scrollInitialized, setScrollInitialized] = useState(false);
  const { posts, setPage, hasMore, isFetchingMore } = usePagination();
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
    const scrollArea = document.querySelector("#intersection");
    const cards = document.querySelectorAll(".card");
    const targetItem = cards?.item(cards.length - 3);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPage((prevPage) => prevPage + 1);
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
  }, [posts, scrollInitialized, setPage]);

  return (
    <div>
      <CreatePost />
      <div
        id="intersection"
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

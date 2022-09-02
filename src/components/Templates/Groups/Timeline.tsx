import React, { useState, useEffect } from "react";
import styles from "@/styles/timeline.module.scss";
import Posts from "@/components/Templates/Profile/Timeline";
// import CreatePost from "@/components/Organisms/CreatePost";

import { useSelector } from "@/redux/store";
// import { selectNewCreatePost } from "@/reduxFeatures/app/createPost";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";
import { useRouter } from "next/router";
import usePagination from "@/hooks/usePagination";

const Timeline = ({ groupId }: { groupId?: string }) => {
  const [timeLinePosts, setTimeLinePosts] = useState([]);

  const newlyCreatedPost = useSelector(selectNewGroupFeed);

  const router = useRouter();
  const { id } = router.query;
  const [queryId, setQueryId] = useState(id);
  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  const {
    paginatedData,
    isReachedEnd,
    error,
    fetchNextPage,
    mutate,
    isValidating
  } = usePagination(`/api/feed/groups/${groupId}`, "posts");

  useEffect(() => {
    if (paginatedData) {
      if (JSON.stringify(timeLinePosts) !== JSON.stringify(paginatedData)) {
        setTimeLinePosts(paginatedData);
      }
    }
  }, [paginatedData, timeLinePosts]);

  useEffect(() => {
    mutate();
  }, [mutate, newlyCreatedPost, queryId]);

  return (
    <>
      <div>
        <h5 className={styles.head}>Posts</h5>
        <Posts
          Posts={timeLinePosts}
          paginatedData={paginatedData}
          isReachedEnd={isReachedEnd}
          error={error}
          fetchNextPage={fetchNextPage}
          mutate={mutate}
          isValidating={isValidating}
        />
      </div>
    </>
  );
};

export default Timeline;

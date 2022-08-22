import React, { useState, useEffect } from "react";
import styles from "@/styles/timeline.module.scss";
import Posts from "@/components/Templates/Profile/Timeline";
// import CreatePost from "@/components/Organisms/CreatePost";
import axios from "axios";
import config from "@/config";

import { useSelector } from "@/redux/store";
// import { selectNewCreatePost } from "@/reduxFeatures/app/createPost";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";
import { useRouter } from "next/router";

const Timeline = ({ groupId }: any) => {
  const [timeLinePosts, setTimeLinePosts] = useState([]);

  const newlyCreatedPost = useSelector(selectNewGroupFeed);

  const router = useRouter();
  const { id } = router.query;
  const [queryId, setQueryId] = useState(id);
  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  useEffect(() => {
    /* Add New Post To The Top (before axios fetch in other to enable fast rerender)
     ** This is a Preset as Author's name would return undefined as only author's id is returned in newlyCreatedPost
     ** Author's name would be fixed upon axios fetxh
     */
    if (Object.entries(newlyCreatedPost).length !== 0) {
      let currentTimeline = [...timeLinePosts];
      currentTimeline.unshift(newlyCreatedPost);
      setTimeLinePosts(currentTimeline);
    }
  }, [newlyCreatedPost]);

  useEffect(() => {
    (async function () {
      const response = await axios.get(
        `${config.serverUrl}/api/feed/groups/${groupId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      setTimeLinePosts(response.data.posts);
    })();
  }, [newlyCreatedPost, queryId]);

  return (
    <>
      <div>
        <h5 className={styles.head}>Posts</h5>
        {/* <CreatePost /> */}
        <Posts Posts={timeLinePosts} />
      </div>
    </>
  );
};

export default Timeline;

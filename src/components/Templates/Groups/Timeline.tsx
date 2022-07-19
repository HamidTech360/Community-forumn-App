import React, { useState, useEffect } from "react";
import styles from "@/styles/timeline.module.scss";
import Posts from "@/components/Templates/Profile/Timeline";
// import CreatePost from "@/components/Organisms/CreatePost";
import axios from "axios";
import config from "@/config";

import { useSelector } from "@/redux/store";
// import { selectNewCreatePost } from "@/reduxFeatures/app/createPost";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";

const Timeline = ({ groupId }: any) => {
  const [timeLinePosts, setTimeLinePosts] = useState([]);
  //console.log('group Id from timeline is '+ groupId);

  // const newCreatePost = useSelector(selectNewCreatePost);
  const newCreatePost = useSelector(selectNewGroupFeed);

  useEffect(() => {
    (async function () {
      const response = await axios.get(
        // `${config.serverUrl}/api/posts/group/one/${groupId}`,
        `${config.serverUrl}/api/feed/groups/${groupId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log("+++:", response.data);
      setTimeLinePosts(response.data.posts);
    })();
  }, [newCreatePost]);
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

import React, { useState, useEffect } from "react";
import Timeline from "./Timeline";
import axios from "axios";
import config from "@/config";

const Bookmarks = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/bookmarks`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        console.log("bookmarks:", data);
        setPosts(data.posts.bookmarks);
      } catch (error) {
        console.log(error.response.data);
      }
    })();
  }, []);
  return (
    <div>
      <Timeline
        Posts={posts}
        paginatedData={null}
        isReachedEnd={true}
        error={null}
        fetchNextPage={null}
        mutate={null}
        isValidating={null}
      />
    </div>
  );
};

export default Bookmarks;

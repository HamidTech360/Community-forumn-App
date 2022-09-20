import React, { useEffect, useState } from "react";
import ModalCard from "@/components/Organisms/App/ModalCard";
import config from "@/config";
import axios from "axios";

import { Col } from "react-bootstrap";
import { useRouter } from "next/router";
import AuthContent from "@/components/Auth/AuthContent";

function FeedPost() {
  const router = useRouter();
  const { id } = router.query;
  const [feedComingIn, setFeedComingIn] = useState(undefined);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const feedPost = await axios.get(
            `${config.serverUrl}/api/feed/${id}`,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );

          setFeedComingIn(feedPost.data);
        } catch (error) {
          // console.log(error.response?.data);
        }
      })();
    }
  }, [id]);

  const modalToggle = () => {
    router.push("/feed");
  };
  const mutate = () => {
    router.push("/feed");
  };

  return (
    <div>
      <AuthContent>
        <Col lg={12} className="mx-auto mt-5">
          {feedComingIn && (
            <ModalCard
              post={feedComingIn}
              modalToggle={modalToggle}
              mutate={mutate}
            />
          )}
        </Col>
      </AuthContent>
    </div>
  );
}

export default FeedPost;

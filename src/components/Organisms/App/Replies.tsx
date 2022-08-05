/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import axios from "axios";

import styles from "@/styles/utils.module.scss";

const Replies = ({ reply: replyComingIn }: Record<string, any>) => {
  const [liked, setLiked] = useState(false);
  const [reply, setReplyComingIn] = useState(replyComingIn);
  const user = useSelector(selectUser);
  const sanitizer = DOMPurify.sanitize;
  // console.log(reply);

  // Auto Render Reply after post
  useEffect(() => {
    setReplyComingIn(replyComingIn);
  }, [replyComingIn]);

  const handleLike = async () => {
    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=comment&id=${reply?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!reply?.likes.includes(user?._id)) {
        let newReply = { ...reply };
        newReply?.likes.push(user?._id);

        setLiked(true);
        setReplyComingIn(newReply);
      }
    } catch (error) {
      // console.error(error.response?.data);
    }
  };

  const handleUnLike = async () => {
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/likes/?type=comment&id=${reply?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (reply?.likes.includes(user?._id)) {
        let newReply = { ...reply };
        let newLikesArr = newReply?.likes.filter((newC) => {
          return newC !== user?._id;
        });

        newReply.likes = newLikesArr;

        setLiked(false);
        setReplyComingIn(newReply);
      }
    } catch (error) {
      // console.error(error.response?.data);
    }
  };

  useEffect(() => {
    if (reply?.likes?.includes(user?._id)) {
      setLiked(true);
    }
  }, []);
  return (
    <Card
      className={`${styles.replies} mt-3 `}
      style={{
        border: "none",
        width: "90%",
        background: "none",
        lineHeight: "1.2",
      }}
    >
      <hr
        className="w-75 mx-auto text-primary"
        style={{ marginTop: "-.2rem" }}
      />

      <div className="d-flex align-items-center justify-content-start gap-2 mt-1">
        <Image
          src="/images/friends3.png"
          alt="User avatar"
          width={50}
          height={50}
          fluid
          roundedCircle
        />
        <div>
          <h6 style={{ fontWeight: "bold" }}>
            {reply?.author?.firstName && reply?.author?.firstName}{" "}
            {reply?.author?.lastName && reply?.author?.lastName}
            <br />
            <small
              style={{ color: "gray", fontSize: "12px", fontWeight: "400" }}
            >
              <Age time={reply?.createdAt} />
            </small>
          </h6>
        </div>
      </div>
      <Card.Body
        className="container px-md-5"
        dangerouslySetInnerHTML={{
          __html: sanitizer(reply?.content),
        }}
      />

      <div className="buttons d-flex gap-2 justify-content-end mr-4">
        <small
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => {
            if (liked) {
              handleUnLike();
            } else {
              handleLike();
            }
          }}
        >
          {reply.likes?.length > 0 && (
            <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
              {reply.likes?.length}
            </small>
          )}{" "}
          Like
        </small>
      </div>
    </Card>
  );
};

export default Replies;

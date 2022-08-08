/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Card, Col, Image, Row } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";
import Replies from "./Replies";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "@/styles/utils.module.scss";

const Comment = ({ comment: commentComingIn }: Record<string, any>) => {
  const [liked, setLiked] = useState(false);
  const [comment, setCommentComingIn] = useState(commentComingIn);
  const user = useSelector(selectUser);
  const router = useRouter();
  const sanitizer = DOMPurify.sanitize;

  const [modalPost, setModalPost] = useState<Record<string, any>>({});
  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);

  // Auto Render Comment after post
  useEffect(() => {
    setCommentComingIn(commentComingIn);
  }, [commentComingIn]);

  useEffect(() => {
    if (comment?.likes?.includes(user?._id)) {
      setLiked(true);
    }
  }, []);

  // console.log("comment", comment);
  // console.log("commentComingIn:", commentComingIn);

  const handleLike = async () => {
    try {
      const { data } = await axios.get(
        `${config.serverUrl}/api/likes/?type=comment&id=${comment?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (!comment?.likes.includes(user?._id)) {
        // console.log("Not Included");
        let newComment = { ...comment };
        newComment?.likes.push(user?._id);

        setLiked(true);
        setCommentComingIn(newComment);
      }
    } catch (error) {
      // console.error(error.response?.data);
    }
  };

  const handleUnLike = async () => {
    try {
      const { data } = await axios.delete(
        `${config.serverUrl}/api/likes/?type=comment&id=${comment?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (comment?.likes.includes(user?._id)) {
        // console.log("Included");
        let newComment = { ...comment };
        // newComment?.likes.push(user?._id);
        let newLikesArr = newComment?.likes.filter((newC) => {
          // console.log("newC:", newC);
          return newC !== user?._id;
        });

        newComment.likes = newLikesArr;

        // console.log("newComment:", newComment);
        setLiked(false);
        setCommentComingIn(newComment);
      }
    } catch (error) {
      // console.error(error.response?.data);
    }
  };

  const postComment = async () => {
    const body = {
      content: commentPost,
    };

    if (body.content == "") {
      return toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=reply&id=${comment?._id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      // console.log("res:", res);
      let replies = comment?.replies;
      replies?.unshift(res.data);
      // console.log("{ ...comment, replies }:", { ...comment, replies });
      setModalPost({ ...comment, replies });
      setCommentComingIn({ ...comment, replies });
      setLoading(false);
      setShowComment(false);
      setCommentPost("");
      (document.getElementById("articleTextarea") as HTMLInputElement).value =
        "";
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Card
      className="px-2"
      style={{ border: "none", background: "none", lineHeight: "1.2" }}
    >
      <hr className="w-75 mx-auto text-muted" />
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
            {comment?.author?.firstName && comment?.author?.firstName}{" "}
            {comment?.author?.lastName && comment?.author?.lastName}
            <br />
            <small
              style={{ color: "gray", fontSize: "12px", fontWeight: "400" }}
            >
              <Age time={comment?.createdAt} />
            </small>
          </h6>
        </div>
      </div>
      {/* {console.log("comment?.content", comment?.content)} */}
      <Card.Body
        className="container px-md-5"
        dangerouslySetInnerHTML={{
          __html: sanitizer(comment?.content),
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
          {comment?.likes?.length > 0 && (
            <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
              {comment?.likes?.length}
            </small>
          )}{" "}
          {liked ? "Unlike" : "Like"}
        </small>

        <small
          className="text-muted"
          style={{ cursor: "pointer" }}
          onClick={() => setShowComment(!showComment)}
        >
          Reply{" "}
          {comment?.replies?.length > 0 && (
            <span>
              <small className="badge rounded-pill bg-primary px-2 py-1 text-white">
                {comment?.replies?.length}
              </small>
            </span>
          )}
        </small>
      </div>
      <div
        className={`buttons d-flex gap-2 justify-content-end mr-4 ${styles.comment}`}
      >
        {comment?.replies.length > 0 ? (
          <small
            style={{ cursor: "pointer" }}
            onClick={() => setShowReplies(!showReplies)}
          >
            {showReplies ? (
              <span>hide replies</span>
            ) : (
              <span>view replies</span>
            )}
          </small>
        ) : (
          ""
        )}
      </div>
      {showReplies && (
        <div>
          {comment.replies?.length > 0 &&
            comment.replies?.map((reply, index) => {
              // console.log("Comment Reply:", reply);
              return <Replies key={`comment_${index}`} reply={reply} />;
            })}
        </div>
      )}
      {showComment && (
        <section>
          <div className="row">
            <div className="col-2 col-md-2">
              <Image
                src={modalPost.authorImage || "/images/imagePlaceholder.jpg"}
                className="img-fluid"
                roundedCircle={true}
                alt="Author's Image"
              />
            </div>
            <div className="col-7 col-md-10">
              <div className="form-floating shadow">
                <textarea
                  id="articleTextarea"
                  className="form-control"
                  placeholder="."
                  onChange={(e) => setCommentPost(e.target.value)}
                  style={{ height: "80px" }}
                ></textarea>
                <label htmlFor="articleTextarea">Reply here</label>
              </div>
            </div>
            <div className="col-3 col-md-2 ms-auto d-md-grid">
              <button
                className="btn btn-sm btn-primary mt-3 d-inline"
                onClick={postComment}
              >
                Send
                {loading && (
                  <div
                    className="spinner-grow spinner-grow-sm text-light"
                    role="status"
                  ></div>
                )}
              </button>
            </div>
          </div>
        </section>
      )}
    </Card>
  );
};

export default Comment;

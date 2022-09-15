/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import Age from "../../Atoms/Age";
import DOMPurify from "dompurify";
import Replies from "./Replies";
import { useDispatch, useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "@/styles/utils.module.scss";
import { PostMenuModal } from "./PostMenu";
import {
  selectCommentIsDeleted,
  selectCommentIsEdited
} from "@/reduxFeatures/app/postModalCardSlice";
import PostIsEdited from "@/components/Templates/PostIsEdited";
import Avatar from "@/components/Atoms/Avatar";
import {
  selectMentionedUsers,
  setMentionedUsers
} from "@/reduxFeatures/app/mentionsSlice";
import TextAreaWithMentions from "../TextAreaWithMentions";

const Comment = ({
  comment: commentComingIn,
  currentlyFollowing,
  handleEditComment,
  handleDeleteComment,
  changeFollowingStatus
}: Record<string, any>) => {
  const dispatch = useDispatch();
  const [liked, setLiked] = useState(false);
  const [comment, setCommentComingIn] = useState(commentComingIn);
  const [resetTextAreaValue, setResetTextAreaValue] = useState(0);
  const user = useSelector(selectUser);
  const commentIsEdited = useSelector(selectCommentIsEdited);
  const commentIsDeleted = useSelector(selectCommentIsDeleted);
  const sanitizer = DOMPurify.sanitize;

  const [commentPost, setCommentPost] = useState("");
  const [showComment, setShowComment] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [loading, setLoading] = useState(false);
  const mentionedUsers = useSelector(selectMentionedUsers);

  // Auto Render Comment after new post
  useEffect(() => {
    setCommentComingIn(commentComingIn);
  }, [commentComingIn]);

  // Auto Render Comment after post Edit
  useEffect(() => {
    if (comment?._id === commentIsEdited?._id) {
      setCommentComingIn(commentIsEdited);
    }
  }, [commentIsEdited]);

  // Auto Render Comment after Post Deletion
  useEffect(() => {
    if (comment?._id === commentIsDeleted?._id) {
      setCommentComingIn(commentIsDeleted);
    }
  }, [commentIsDeleted]);

  useEffect(() => {
    // Monitor & Set Like Status
    if (comment?.likes?.includes(user?._id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [comment]);

  const handleLike = async () => {
    try {
      await axios.get(
        `${config.serverUrl}/api/likes/?type=comment&id=${comment?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      if (!comment?.likes.includes(user?._id)) {
        const newComment = { ...comment };
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
      await axios.delete(
        `${config.serverUrl}/api/likes/?type=comment&id=${comment?._id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );

      if (comment?.likes.includes(user?._id)) {
        const newComment = { ...comment };
        const newLikesArr = newComment?.likes.filter(newC => {
          return newC !== user?._id;
        });

        newComment.likes = newLikesArr;

        setLiked(false);
        setCommentComingIn(newComment);
      }
    } catch (error) {
      // console.error(error.response?.data);
    }
  };

  const postComment = async () => {
    /*
     ** Mentioned Users To Send Notification
     ** Below Map() Is Important To Confirm The Mentioned User Hasn't Been Deleted
     */
    const usersToSendNotification: any = [];
    if (mentionedUsers.length > 0) {
      await mentionedUsers.forEach(user => {
        if (commentPost?.includes(user.userName)) {
          usersToSendNotification.push(user?.userId);
        }
      });
    }

    const body = {
      content: commentPost,
      mentions: usersToSendNotification
    };
    console.log("body:", body);

    if (body.content == "") {
      return toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
    }

    try {
      setLoading(true);
      const res = await axios.post(
        `${config.serverUrl}/api/comments?type=reply&id=${comment?._id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      const replies = comment?.replies;
      replies?.unshift(res.data);
      setCommentComingIn({ ...comment, replies });
      setLoading(false);
      setShowComment(false);
      // Reset TextAreaWithMentions value
      setResetTextAreaValue(Math.random() * 10);
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
    } catch (error) {
      // console.error(error);
    }
  };

  return (
    <Card
      className="row px-2"
      style={{ border: "none", background: "none", lineHeight: "1.2" }}
    >
      <hr className="w-75 mx-auto text-muted" />
      <div className="col-12 d-flex align-items-center justify-content-start gap-2 mt-1">
        <Avatar
          src={comment?.author?.images?.avatar}
          name={comment?.author?.firstName}
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
        <div className="col-2 ms-auto me-3">
          {/* Menu Dots */}
          <PostMenuModal
            user={user}
            currentlyFollowing={currentlyFollowing}
            comment={comment}
            handleEditComment={handleEditComment}
            handleDeleteComment={handleDeleteComment}
            changeFollowingStatus={changeFollowingStatus}
          />
        </div>
      </div>

      <Card.Body
        className="container px-md-5"
        dangerouslySetInnerHTML={{
          __html: sanitizer(comment?.content)
        }}
      />

      <div className="px-md-5">
        <PostIsEdited post={comment} />
      </div>

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
              return (
                <Replies
                  key={`comment_${index}`}
                  reply={reply}
                  currentlyFollowing={currentlyFollowing}
                  handleEditComment={handleEditComment}
                  handleDeleteComment={handleDeleteComment}
                  changeFollowingStatus={changeFollowingStatus}
                />
              );
            })}
        </div>
      )}
      {showComment && (
        <section>
          <div className="row">
            <div className="col-2 col-md-2">
              <Avatar
                src={user?.images?.avatar || "/images/imagePlaceholder.jpg"}
                name={user?.firstName}
                width={50}
                height={50}
              />
            </div>
            <div className="col-7 col-md-10">
              <div
                className="form-floating"
                style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
              >
                {/* TextArea */}
                <TextAreaWithMentions
                  commentChanging={setCommentPost}
                  resetTextAreaValue={resetTextAreaValue}
                />
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

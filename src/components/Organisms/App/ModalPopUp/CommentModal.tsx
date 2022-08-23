import React, { useEffect, useState } from "react";
import Editor from "../../SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";
// import {
//   setShowPostModal,
//   selectShowPostModal,
//   setPostTitle,
// } from "@/reduxFeatures/api/postSlice";
import {
  setShowCommentModal,
  selectShowCommentModal,
  selectEditableComment,
  setEditableComment,
  setCommentIsEdited,
} from "@/reduxFeatures/app/postModalCardSlice";

import { Form, Image, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styles from "../../../../styles/explore.module.scss";
import formStyles from "../../../../styles/templates/new-group/formField.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import config from "@/config";

// const CommentModal = ({ modalPost }) => {
const CommentModal = () => {
  const dispatch = useDispatch();
  const showCommentModal = useSelector(selectShowCommentModal);
  const editableComment = useSelector(selectEditableComment);
  const [commentPost, setCommentPost] = useState(null);
  const [loading, setLoading] = useState(false);

  //   const handleChange = (e) => {
  //     // console.log("e.currentTarget.value:", e.currentTarget.value);
  //     dispatch(setPostTitle(e.currentTarget.value));
  //   };

  useEffect(() => {
    if (editableComment) {
      setCommentPost(editableComment);
    }

    return () => {
      setEditableComment(null);
    };
  }, [editableComment]);

  const editComment = async () => {
    const commentPosting = commentPost?.content
      ? commentPost.content
      : commentPost;

    // console.log("commentPost?.content:", commentPosting);

    const body = {
      content: commentPosting,
    };

    if (body.content.trim() == "") {
      return toast.error("Comment cannot be empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
    }

    try {
      setLoading(true);
      const res = await axios.put(
        `${config.serverUrl}/api/comments/${editableComment._id}`,
        body,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      //   Update Modal Comment
      dispatch(setCommentIsEdited(res.data));
      setLoading(false);
      setCommentPost(null);
      dispatch(setShowCommentModal(false));
    } catch (error) {
      //   console.error(error);
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showCommentModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="sm"
      className="p-3"
    >
      <span className="ms-auto p-2">
        {" "}
        <FaTimes
          color="#207681"
          style={{ cursor: "pointer" }}
          size={35}
          onClick={() => dispatch(setShowCommentModal(false))}
        />{" "}
      </span>
      <hr className="m-0" />
      <div className="row justify-content-center mx-1">
        <section>
          <h5 style={{ fontWeight: "bolder" }}>Edit Comment</h5>
          <div className="row">
            <div className="d-none d-md-flex col-md-2">
              <Image
                // src={modalPost?.authorImage || "/images/imagePlaceholder.jpg"}
                src={"/images/imagePlaceholder.jpg"}
                width={50}
                height={50}
                roundedCircle={true}
                alt="Author's Image"
              />
            </div>
            <div className="col-12 col-md-10">
              <div style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}>
                <textarea
                  id="articleTextareaComment"
                  className="form-control"
                  placeholder="."
                  onChange={(e) => setCommentPost(e.target.value)}
                  //   onChange={(e) => console.log(e.target.value)}
                  style={{ height: "100px" }}
                  defaultValue={commentPost?.content}
                ></textarea>
              </div>
            </div>
            <div className="col-5 ms-auto d-grid">
              <button
                className="btn btn-sm btn-primary mt-3 d-inline"
                onClick={editComment}
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
      </div>
    </Modal>
  );
};

export default CommentModal;

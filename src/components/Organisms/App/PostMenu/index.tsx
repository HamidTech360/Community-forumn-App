import { useSelector } from "@/redux/store";
import { selectShowCommentModal } from "@/reduxFeatures/app/postModalCardSlice";
// import { selectShowCommentModal } from "@/reduxFeatures/app/postModalCardSlice";
import React from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { BsFolderFill, BsXCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiFlagFill, RiUserFollowFill } from "react-icons/ri";
// import ChangeFollowingStatus from "../ChangeFollowingStatus";
import CommentModal from "../ModalPopUp/CommentModal";

import styles from "@/styles/profile.module.scss";

const PostCardMenu = ({
  user,
  post,
  followed,
  changeFollowingStatus,
  postReFetched,
  setSelected,
  toggle,
  handleEditPost,
  handleDeletePost,
}) => {
  // const showCommentModal = useSelector(selectShowCommentModal);
  return (
    <NavDropdown
      drop="start"
      style={{ color: "white" }}
      title={
        <Button variant="link" size="lg">
          <HiDotsVertical size={25} />
        </Button>
      }
    >
      <NavDropdown.Item
        className={styles.item}
        style={{ borderBlock: "1px solid gray" }}
        onClick={async () => {
          if (postReFetched) {
            if (postReFetched?._id === post?._id) {
              setSelected(postReFetched);
              toggle();
            } else {
              setSelected(post);
              toggle();
            }
          } else {
            setSelected(post);
            toggle();
          }
        }}
      >
        <BsFolderFill /> Open Post
      </NavDropdown.Item>

      {user?._id !== post?.author?._id ? (
        <>
          <NavDropdown.Item
            className={styles.item}
            style={{ borderBottom: "1px solid gray" }}
          >
            <RiFlagFill /> Report post
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles.item}
            style={{ borderBottom: "1px solid gray" }}
            onClick={async () => changeFollowingStatus(post)}
          >
            {followed ? (
              <>
                <BsXCircleFill />{" "}
                <span id={`followStr-${post?.author?._id}`}>Unfollow</span>
              </>
            ) : (
              <>
                <RiUserFollowFill />{" "}
                <span id={`followStr-${post?.author?._id}`}>Follow</span>
              </>
            )}{" "}
            @{post?.author?.firstName?.split(" ")[0]}
            {post?.author?.lastName?.substring(0, 1)}
          </NavDropdown.Item>
        </>
      ) : null}
      {user._id == post.author._id && (
        <>
          <NavDropdown.Item
            className={styles.item}
            style={{
              borderBottom: "1px solid gray",
            }}
            onClick={() => handleEditPost(post)}
          >
            <FiEdit /> Edit Post
          </NavDropdown.Item>

          <NavDropdown.Item
            style={{ borderBottom: "1px solid gray" }}
            onClick={() => handleDeletePost(post)}
          >
            <span
              style={{
                color: "red",
              }}
            >
              <RiDeleteBin5Line /> Delete Post
            </span>
          </NavDropdown.Item>
        </>
      )}
    </NavDropdown>
  );
};

export default PostCardMenu;

export const PostMenu = ({
  user,
  currentlyFollowing,
  post,
  handleEditPost,
  handleDeletePost,
  changeFollowingStatus,
}) => {
  // const showCommentModal = useSelector(selectShowCommentModal);
  return (
    <NavDropdown
      drop="start"
      style={{ color: "white" }}
      title={
        <Button variant="link" size="lg">
          <HiDotsVertical size={25} />
        </Button>
      }
    >
      {user?._id !== post?.author?._id && user?._id !== post?.author ? (
        <>
          <NavDropdown.Item
            className={styles.item}
            style={{ backgroundColor: "rgb(237, 236, 236)" }}
          >
            <RiFlagFill className="text-muted" /> Report post
          </NavDropdown.Item>
          <NavDropdown.Item
            className={styles.item}
            onClick={async () => changeFollowingStatus(post)}
          >
            {currentlyFollowing?.includes(post?.author?._id) ? (
              <>
                <BsXCircleFill className="text-muted" />{" "}
                <span id={`followStr-modal-${post?.author?._id}`}>
                  {/* NOTE: Don't change the "Unfollow" Text From PascalCase, else unfollowing wouldn't work */}
                  Unfollow
                </span>
              </>
            ) : (
              <>
                <RiUserFollowFill className="text-muted" />{" "}
                <span id={`followStr-modal-${post?.author?._id}`}>
                  {/* NOTE: Don't change the "Follow" Text From PascalCase, else following wouldn't work */}
                  Follow
                </span>
              </>
            )}{" "}
            @{post?.author?.firstName?.split(" ")[0]}
            {post?.author?.lastName?.substring(0, 1)}
          </NavDropdown.Item>
        </>
      ) : null}
      {user?._id == post?.author?._id || user?._id === post?.author ? (
        <>
          <NavDropdown.Item
            // className={styles.item}
            style={{
              borderBottom: "1px solid gray",
            }}
            onClick={() => handleEditPost(post)}
          >
            <FiEdit /> Edit Post
          </NavDropdown.Item>

          <NavDropdown.Item
            style={{ borderBottom: "1px solid gray" }}
            onClick={() => handleDeletePost(post)}
          >
            <span
              style={{
                color: "red",
              }}
            >
              <RiDeleteBin5Line /> Delete Post
            </span>
          </NavDropdown.Item>
        </>
      ) : null}
    </NavDropdown>
  );
};

export const PostMenuModal = ({
  user,
  currentlyFollowing,
  comment,
  handleEditComment,
  handleDeleteComment,
  changeFollowingStatus,
}) => {
  const showCommentModal = useSelector(selectShowCommentModal);
  return (
    <NavDropdown
      drop="start"
      style={{ color: "white" }}
      title={
        <Button variant="link" size="lg">
          <HiDotsVertical size={25} />
        </Button>
      }
    >
      {user?._id !== comment?.author?._id && user?._id !== comment?.author ? (
        <>
          <NavDropdown.Item
            // className={styles.item}
            style={{ backgroundColor: "rgb(237, 236, 236)" }}
          >
            <RiFlagFill className="text-muted" /> Report Comment
          </NavDropdown.Item>
          <NavDropdown.Item
            // className={styles.item}
            onClick={async () => changeFollowingStatus(comment)}
          >
            {currentlyFollowing?.includes(comment?.author?._id) ? (
              <>
                <BsXCircleFill className="text-muted" />{" "}
                <span id={`followStr-modal-${comment?.author?._id}`}>
                  {/* NOTE: Don't change the "Unfollow" Text From PascalCase, else unfollowing wouldn't work */}
                  Unfollow
                </span>
              </>
            ) : (
              <>
                <RiUserFollowFill className="text-muted" />{" "}
                <span id={`followStr-modal-${comment?.author?._id}`}>
                  {/* NOTE: Don't change the "Follow" Text From PascalCase, else following wouldn't work */}
                  Follow
                </span>
              </>
            )}{" "}
            @{comment?.author?.firstName?.split(" ")[0]}
            {comment?.author?.lastName?.substring(0, 1)}
          </NavDropdown.Item>
        </>
      ) : null}
      {user?._id === comment?.author?._id || user?._id === comment?.author ? (
        <>
          <NavDropdown.Item
            // className={styles.item}
            style={{
              borderBottom: "1px solid gray",
            }}
            onClick={() => handleEditComment(comment)}
          >
            <FiEdit /> Edit Comment
          </NavDropdown.Item>

          <NavDropdown.Item
            style={{ borderBottom: "1px solid gray" }}
            onClick={() => handleDeleteComment(comment)}
          >
            <span
              style={{
                color: "red",
              }}
            >
              <RiDeleteBin5Line /> Delete Comment
            </span>
          </NavDropdown.Item>
        </>
      ) : null}

      {/* Comment Modal */}
      {showCommentModal && <CommentModal />}
    </NavDropdown>
  );
};

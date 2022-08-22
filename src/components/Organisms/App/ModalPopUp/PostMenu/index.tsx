import React from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { BsXCircleFill } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { RiDeleteBin5Line, RiFlagFill, RiUserFollowFill } from "react-icons/ri";
import ChangeFollowingStatus from "../../ChangeFollowingStatus";

const PostMenu = ({
  user,
  currentlyFollowing,
  post,
  handleEditPost,
  handleDeletePost,
}) => {
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
      {user?._id !== post?.author?._id ? (
        <>
          <NavDropdown.Item
            // className={styles.item}
            style={{ backgroundColor: "rgb(237, 236, 236)" }}
          >
            <RiFlagFill className="text-muted" /> Report post
          </NavDropdown.Item>
          <NavDropdown.Item
            // className={styles.item}
            onClick={async () => ChangeFollowingStatus(post)}
          >
            {currentlyFollowing.includes(post?.author?._id) ? (
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
      {user?._id == post?.author?._id && (
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
      )}
    </NavDropdown>
  );
};

export default PostMenu;

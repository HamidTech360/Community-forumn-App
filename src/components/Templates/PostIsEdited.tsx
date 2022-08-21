import React from "react";

function PostIsEdited({ post }) {
  return (
    <span>
      {post.createdAt !== post.updatedAt ? (
        <small style={{ color: "gray", fontSize: "12px" }}>(edited)</small>
      ) : null}
    </span>
  );
}

export default PostIsEdited;

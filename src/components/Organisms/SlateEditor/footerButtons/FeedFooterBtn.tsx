//@ts-nocheck
import React, { useState } from "react";
import config from "../../../../config";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { setShowFeedModal, setNewFeed } from "@/reduxFeatures/api/feedSlice";

function FeedFooterBtn({ editorID }) {
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const createPost = async (e) => {
    const editorInnerHtml = document.getElementById(editorID).innerHTML;
    e.preventDefault();
    setUploading(true);

    try {
      const response = await axios.post(
        `${config.serverUrl}/api/posts`,
        { postTitle: " ", postBody: editorInnerHtml },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Post uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      // Auto update feeds in /feed
      dispatch(setNewFeed(response.data));
      dispatch(setShowFeedModal(false));
      setUploading(false);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to upload post", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      setUploading(false);
    }
  };

  return (
    <>
      <Button
        variant="primary"
        style={{ borderRadius: "5px" }}
        className="my-1 me-1"
        onClick={createPost}
      >
        {uploading ? "uploading..." : "Continue"}
      </Button>
    </>
  );
}

export default FeedFooterBtn;

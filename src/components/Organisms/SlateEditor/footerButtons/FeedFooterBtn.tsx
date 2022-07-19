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
    e.preventDefault();

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    let emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (editorInnerHtml === emptyEditorInnerHtml) {
      toast.warn("Type your message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      return;
    }

    if (editorInnerHtml.trim() !== "") {
      setUploading(true);

      try {
        const response = await axios.post(
          // `${config.serverUrl}/api/posts`,
          `${config.serverUrl}/api/feed`,
          // { postTitle: " ", postBody: editorInnerHtml },
          { post: editorInnerHtml },
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

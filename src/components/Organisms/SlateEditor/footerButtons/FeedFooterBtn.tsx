//@ts-nocheck
import React, { useEffect, useState } from "react";
import config from "../../../../config";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { setNewFeed } from "@/reduxFeatures/api/feedSlice";
import { setShowCreatePostModal } from "@/reduxFeatures/app/createPost";
import {
  setSlatePostToEdit,
  selectSlatePostToEdit,
} from "@/reduxFeatures/app/editSlatePostSlice";
import { serialize } from "../utils/serializer";
import { setModalCardPostEdited } from "@/reduxFeatures/app/postModalCardSlice";

function FeedFooterBtn({ editorID, editorContentValue }) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);

  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));
    };
  }, []);

  const createPost = async (e) => {
    e.preventDefault();
    const editorInnerHtml = document.getElementById(editorID).innerHTML;

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

      // Serialize Html
      let serializeNode = {
        children: editorContentValue,
      };
      let edited =
        '<span><small style="color: gray; font-size: 12px">(edited)</small><span>';

      const serializedHtml = serialize(serializeNode);

      // console.log("editorContentValue:", editorContentValue);
      // console.log("serializedHtml:", serializedHtml);

      if (!slatePostToEdit) {
        // New Post
        try {
          const response = await axios.post(
            `${config.serverUrl}/api/feed`,
            { post: serializedHtml },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1",
          });

          // Auto update & Rerender Feed Post
          dispatch(setNewFeed(response.data.feed));
          dispatch(setShowCreatePostModal(false));
          setUploading(false);
        } catch (error) {
          // console.error(error);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Blog Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1",
            });
          } else {
            toast.error("Failed to upload post: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1",
            });
          }
          setUploading(false);
        }
      } else {
        // Edit Post
        try {
          await axios.put(
            `${config.serverUrl}/api/feed/${slatePostToEdit?._id}`,
            { post: serializedHtml + edited },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1",
          });

          // Auto update & Rerender Feed Post
          dispatch(setNewFeed({ postEdited: Math.random() * 50 }));
          // Auto Update modalCard Post While Opened
          dispatch(setModalCardPostEdited(serializedHtml + edited));
          dispatch(setShowCreatePostModal(false));
          setUploading(false);
        } catch (error) {
          // console.error(error);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Blog Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1",
            });
          } else {
            toast.error("Failed to upload post: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1",
            });
          }
          setUploading(false);
        }
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

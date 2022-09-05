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
  selectSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
import { serialize } from "../utils/serializer";
import { setModalCardPostEdited } from "@/reduxFeatures/app/postModalCardSlice";
import { selectMediaUpload } from "@/reduxFeatures/app/mediaUpload";

function FeedFooterBtn({ editorID, editorContentValue }) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const mediaUpload = useSelector(selectMediaUpload);

  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));
    };
  }, [dispatch]);

  const createPost = async e => {
    e.preventDefault();

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (editorInnerHtml === emptyEditorInnerHtml) {
      toast.warn("Type your message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
      return;
    }

    if (editorInnerHtml.trim() !== "") {
      setUploading(true);

      // Serialize Html
      const serializeNode = {
        children: editorContentValue
      };

      const serializedHtml: string = serialize(serializeNode);
      // Form Data
      const formData = new FormData();

      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("post", serializedHtml.toString());

      if (!slatePostToEdit) {
        // New Post
        try {
          const response = await axios.post(
            `${config.serverUrl}/api/feed`,

            {
              post: serializedHtml
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
              }
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update & Rerender Feed Post
          dispatch(setNewFeed(response.data.feed));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          // console.error(error);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Blog Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload post: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          }
          setUploading(false);
        }
      } else {
        // Edit Post
        try {
          await axios.put(
            `${config.serverUrl}/api/feed/${slatePostToEdit?._id}`,
            // { post: serializedHtml, media: [formData] },
            {
              post: serializedHtml
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );
          toast.success("Post edited successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update & Rerender Feed Post
          dispatch(setNewFeed({ postEdited: Math.random() * 50 }));
          // Auto Update & Rerender modalCard Post While Opened
          dispatch(setModalCardPostEdited(serializedHtml));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Blog Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload post: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
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
        {uploading
          ? "uploading..."
          : !slatePostToEdit
          ? "Continue"
          : "Edit Post"}
      </Button>
    </>
  );
}

export default FeedFooterBtn;

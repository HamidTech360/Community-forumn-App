import React, { useEffect, useState } from "react";
import config from "../../../../config";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { setShowCreatePostModal } from "@/reduxFeatures/app/createPost";
import { setNewGroupFeed } from "@/reduxFeatures/api/groupSlice";
import { useRouter } from "next/router";
import { serialize } from "../utils/serializer";
import {
  selectSlatePostToEdit,
  setSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
import { setModalCardPostEdited } from "@/reduxFeatures/app/postModalCardSlice";

function GroupsFooterBtn({ editorID, editorContentValue }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const slatePostToEdit = useSelector(selectSlatePostToEdit);

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

    if (
      editorContentValue[0].children.length === 1 &&
      editorContentValue[0].children[0].text.trim() !== ""
    ) {
      setUploading(true);

      // Serialize Html
      const serializeNode = {
        children: editorContentValue
      };
      const serializedHtml = serialize(serializeNode);

      if (!slatePostToEdit) {
        // New Post
        try {
          const response = await axios.post(
            `${config.serverUrl}/api/feed`,
            { post: serializedHtml, group: router?.query?.id },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update feeds in /feed
          dispatch(setNewGroupFeed(response.data.feed));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload Post: Try Again", {
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
            { post: serializedHtml, group: router?.query?.id },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update & Rerender Groups Post
          dispatch(setNewGroupFeed({ postEdited: Math.random() * 50 }));
          // Auto Update & Rerender modalCard Post While Opened
          dispatch(setModalCardPostEdited(serializedHtml));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Post", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload Post: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          }
          setUploading(false);
        }
      }
    } else {
      toast.warn("Type your message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
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

export default GroupsFooterBtn;

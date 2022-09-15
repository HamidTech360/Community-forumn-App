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
  selectEmptyEditorContentValue,
  selectSlatePostToEdit,
  setSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
import { setModalCardPostEdited } from "@/reduxFeatures/app/postModalCardSlice";
import {
  selectMediaUpload,
  setMediaUpload,
  setProgressBarNum,
  setProgressVariant
} from "@/reduxFeatures/app/mediaUploadSlice";
import {
  selectMentionedUsers,
  setMentionedUsers
} from "@/reduxFeatures/app/mentionsSlice";

function GroupsFooterBtn({ editorID, editorContentValue }) {
  const router = useRouter();
  const [uploading, setUploading] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const dispatch = useDispatch();
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const emptyEditorContentValue = useSelector(selectEmptyEditorContentValue);
  const mediaUpload = useSelector(selectMediaUpload);
  const mentionedUsers = useSelector(selectMentionedUsers);

  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
      // Reset ProgressBar
      dispatch(setProgressVariant("primary"));
      dispatch(setProgressBarNum(0));
    };
  }, [dispatch]);

  useEffect(() => {
    if (router.query.path == "timeline") {
      setGroupId(router.query.id);
    }
  }, [router.query.id, router.query.path]);

  const createPost = async e => {
    e.preventDefault();

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    /*
     ** Mentioned Users To Send Notification
     ** Below Map() Is Important To Confirm The Mentioned User Hasn't Been Deleted
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const usersToSendNotification: any = [];
    if (mentionedUsers.length > 0) {
      await mentionedUsers.forEach(user => {
        if (editorInnerHtml?.includes(user.userName)) {
          usersToSendNotification.push(user?.userId);
        }
      });
    }

    if (
      JSON.stringify(editorContentValue) ===
      JSON.stringify(emptyEditorContentValue)
    ) {
      console.log("editorContentValue:", editorContentValue);
      console.log("emptyEditorContentValue:", emptyEditorContentValue);
      toast.warn("Type your message to proceed...", {
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

      // Form Data
      const formData = new FormData();

      formData.append("post", serializedHtml);
      // formData.append("post", editorInnerHtml);
      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("group", groupId);
      formData.append("SlateContentValue", JSON.stringify(editorContentValue));
      formData.append("mentions", usersToSendNotification);

      if (!slatePostToEdit) {
        // New Post
        try {
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          const response = await axios.post(
            `${config.serverUrl}/api/feed`,
            formData,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
              }, // Axios Progress
              onUploadProgress: function (progressEvent: {
                loaded: number;
                total: number;
              }) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // Update ProgressBar
                dispatch(setProgressBarNum(percentCompleted));
              }
            }
          );
          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update feeds in /feed
          dispatch(setNewGroupFeed(response.data.feed));
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          // Reset Uploaded Media Data
          dispatch(setMediaUpload([]));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

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
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          await axios.put(
            `${config.serverUrl}/api/feed/${slatePostToEdit?._id}`,
            formData,
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "Content-Type": "multipart/form-data"
              },
              // Axios Progress
              onUploadProgress: function (progressEvent: {
                loaded: number;
                total: number;
              }) {
                const percentCompleted = Math.round(
                  (progressEvent.loaded * 100) / progressEvent.total
                );
                // Update ProgressBar
                dispatch(setProgressBarNum(percentCompleted));
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
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          setUploading(false);
          dispatch(setShowCreatePostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

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

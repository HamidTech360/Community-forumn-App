import React, { useState, useEffect } from "react";
import config from "../../../../config";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setShowPostModal,
  selectPostTitle,
  setPostTitle
} from "@/reduxFeatures/api/postSlice";
import { setNewPost } from "@/reduxFeatures/api/postSlice";
import {
  // selectEmptyEditorContentValue,
  selectSlatePostToEdit,
  setSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
// import { serialize } from "../utils/serializer";
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BlogPostFooterBtn({ editorID, editorContentValue }: any) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showPostTitle = useSelector(selectPostTitle);
  const mediaUpload = useSelector(selectMediaUpload);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const mentionedUsers = useSelector(selectMentionedUsers);
  // const emptyEditorContentValue = useSelector(selectEmptyEditorContentValue);

  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));
      // Reset Post Title State when component unmount
      dispatch(setPostTitle(""));
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
      // Reset ProgressBar
      dispatch(setProgressVariant("primary"));
      dispatch(setProgressBarNum(0));
    };
  }, [dispatch]);

  useEffect(() => {
    // Get Post Category Name
    const getCategories = categories.map(category => {
      let categoryName;
      if (category?.tag === slatePostToEdit?.category) {
        // console.log("category.name:", category.name);
        categoryName = category.name;
      }
      return categoryName;
    });

    // Set category for post editing
    if (slatePostToEdit) {
      setSelectedCategory({
        name: getCategories
      });
    }
  }, [categories, slatePostToEdit]);

  useEffect(() => {
    // Set Post Title On Load If slatePostToEdit
    if (slatePostToEdit) {
      // Set Post Title
      (
        document.getElementById("createPostID") as unknown as HTMLInputElement
      ).value = slatePostToEdit.postTitle;

      dispatch(setPostTitle(slatePostToEdit.postTitle));
    }

    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        // console.log(data);
        setCategories(data.allCategories);
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, [dispatch, slatePostToEdit]);

  const createPost = async e => {
    e.preventDefault();
    //console.log(selectedCategory);

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (
      showPostTitle.trim() === "" ||
      editorInnerHtml === emptyEditorInnerHtml
    ) {
      toast.warn("Type your Message Title and Message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
      return;
    }

    if (!selectedCategory) {
      toast.warn("Select A Post Category To Proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
      return;
    }

    if (editorInnerHtml.trim() !== "") {
      setUploading(true);

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
      console.log("usersToSendNotification:", usersToSendNotification);
      console.log("editorContentValue:", editorContentValue);

      // const serializeNode = {
      //   children: editorContentValue
      // };
      const formData = new FormData();
      // const serializedHtml = serialize(serializeNode);

      formData.append("postBody", editorInnerHtml);
      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("category", selectedCategory.tag);
      formData.append("postTitle", showPostTitle);
      formData.append("SlateContentValue", JSON.stringify(editorContentValue));
      formData.append("mentions", usersToSendNotification);
      // formData.append('groupId', groupId)

      if (!slatePostToEdit) {
        // New Post
        try {
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          const response = await axios.post(
            `${config.serverUrl}/api/posts`,
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
          // console.log(response.data);

          toast.success("Post uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update Blog Post in /explore
          dispatch(setNewPost(response.data.post));
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          // Reset Uploaded Media Data
          dispatch(setMediaUpload([]));
          setUploading(false);
          dispatch(setShowPostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

          // console.log(error.response?.data);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a post", {
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
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          await axios.put(
            `${config.serverUrl}/api/posts/${slatePostToEdit?._id}`,
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
          // console.log(response.data.post);

          toast.success("Post edited successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update Blog Post in /explore
          dispatch(setNewPost({ postEdited: Math.random() * 50 }));
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          setUploading(false);
          dispatch(setShowPostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

          // console.log(error.response?.data);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a post", {
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
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <div className="">
        <DropdownButton
          as={ButtonGroup}
          title={selectedCategory ? selectedCategory.name : "Category"}
          id="bg-nested-dropdown-1"
          variant="outline-secondary"
          size="sm"
          className="m-1"
        >
          {categories.map((item, i) => (
            <Dropdown.Item
              onClick={() => setSelectedCategory(item)}
              key={i}
              eventKey="1"
              variant="outline-secondary"
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>
      <div className="">
        <DropdownButton
          as={ButtonGroup}
          title="Tags"
          id="bg-nested-dropdown-2"
          variant="outline-secondary"
          size="sm"
          className="m-1"
        >
          <Dropdown.Item eventKey="1" variant="outline-secondary">
            Dropdown link 1
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link 2</Dropdown.Item>
        </DropdownButton>
      </div>
      <div className="col-12 col-md-3 col-lg-3 mx-0 px-0 d-grid">
        <Button
          variant="outline-primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="m-1"
        >
          Save as draft
        </Button>
      </div>
      <div className="">
        <Button
          variant="primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="my-1 me-1"
          onClick={createPost}
        >
          {uploading
            ? "uploading..."
            : !slatePostToEdit
            ? "Create Post"
            : "Edit Post"}
        </Button>
      </div>
    </div>
  );
}

export default BlogPostFooterBtn;

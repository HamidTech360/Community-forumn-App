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
  selectEmptyEditorContentValue,
  selectSlatePostToEdit,
  setSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
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
import { serialize } from "../utils/serializer";
import { Transforms, Editor } from "slate";
import { ReactEditor, useSlate } from "slate-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BlogPostFooterBtn({ editorID, editorContentValue }: any) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showPostTitle = useSelector(selectPostTitle);
  const mediaUpload = useSelector(selectMediaUpload);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const emptyEditorContentValue = useSelector(selectEmptyEditorContentValue);
  const [categories, setCategories] = useState([]);
  const [saveDraft] = useState(["Save draft", "Pull Draft", "Delete Draft"]);
  const [displaySaveAsDraft, setDisplaySaveAsDraft] = useState(false);
  const [selectedDraft, setSelectedDraft] = useState("Save as draft");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const mentionedUsers = useSelector(selectMentionedUsers);
  const editor = useSlate();
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
    // Manage Items display based on "if thee is a saved draft"
    if (!localStorage.getItem("exploreSaveAsDraft")) {
      setDisplaySaveAsDraft(false);
    } else {
      setDisplaySaveAsDraft(true);
    }
  }, []);

  useEffect(() => {
    // Get Post Category Name
    const getCategories = categories.map(category => {
      let categoryName;
      if (category?.tag === slatePostToEdit?.category) {
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
        setCategories(data.allCategories);
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, [dispatch, slatePostToEdit]);

  const createPost = async e => {
    e.preventDefault();

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (!selectedCategory) {
      toast.warn("Select A Post Category To Proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
      return;
    }

    if (
      showPostTitle.trim() !== "" &&
      JSON.stringify(emptyEditorContentValue) !==
        JSON.stringify(editorContentValue)
    ) {
      setUploading(true);

      /*
       ** Mentioned Users To Send Notification
       ** Below Map() Is Important To Confirm The Mentioned User Hasn't Been Deleted
       */
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const usersToSendNotification: any = [];
      if (mentionedUsers.length > 0) {
        await mentionedUsers.forEach(user => {
          if (editorInnerHtml?.includes(user?.userName)) {
            usersToSendNotification.push(user?.userId);
          }
        });
      }

      let serializedHtml;
      if (editorInnerHtml === emptyEditorInnerHtml) {
        // Serialize editorContentValue only if editorInnerHtml is showing Empty Even though it isn't empty
        const serializeNode = {
          children: editorContentValue
        };

        serializedHtml = await serialize(serializeNode);
      } else {
        serializedHtml = editorInnerHtml;
      }

      const formData = new FormData();

      formData.append("postBody", serializedHtml);
      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("postTitle", showPostTitle);
      formData.append("category", selectedCategory.tag);
      formData.append("slateContentValue", JSON.stringify(editorContentValue));
      formData.append("mentions", usersToSendNotification);

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
          // // Reset Editor to display Editors initialState and not draft on next mount
          // dispatch(setDisplayDraft(0));
          setUploading(false);
          dispatch(setShowPostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

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
          // // Reset Editor to display Editors initialState and not draft on next mount
          // dispatch(setDisplayDraft(0));
          setUploading(false);
          dispatch(setShowPostModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

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
    } else {
      toast.warn("Enter your Post Title and Post to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
    }
  };

  const saveAsDraft = async () => {
    // Return if Editor is empty
    if (
      JSON.stringify(emptyEditorContentValue) ===
      JSON.stringify(editorContentValue)
    ) {
      toast.error("No Post To Save", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1"
      });
      return;
    }

    // Display Draft Selector Title
    setSelectedDraft(saveDraft[0]);

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const exploreSaveAsDraft = {
      postTitle: (document.getElementById("createPostID") as HTMLInputElement)
        .value,
      postBody: editorInnerHtml,
      slateContentValue: editorContentValue,
      category: selectedCategory?.name
    };

    localStorage.setItem(
      "exploreSaveAsDraft",
      JSON.stringify(exploreSaveAsDraft)
    );

    toast.success("Draft successfully Saved", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "1"
    });

    // Show Save as draft selector
    setDisplaySaveAsDraft(true);
  };

  const pullFromDraft = async () => {
    // Display Draft Selector Title
    setSelectedDraft(saveDraft[1]);

    const draft = await JSON.parse(localStorage.getItem("exploreSaveAsDraft"));

    if (!draft) return;

    // Populate Post Title
    (document.getElementById("createPostID") as HTMLInputElement).value =
      draft.postTitle;

    setSelectedCategory({ name: draft.category });

    // Delete Editor Content
    Transforms.delete(editor, {
      at: {
        anchor: Editor?.start(editor, []),
        focus: Editor?.end(editor, [])
      }
    });

    Transforms.insertFragment(editor, draft.slateContentValue);

    // Set Focus on Editor. This is to prevent editor.selection Error when Editor isn't in focus
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    ReactEditor.focus(editor);
  };

  const deleteDraft = () => {
    // Display Draft Selector Title
    setSelectedDraft(saveDraft[2]);

    localStorage.removeItem("exploreSaveAsDraft");

    toast.warn("Draft deleted", {
      position: toast.POSITION.TOP_RIGHT,
      toastId: "1"
    });

    // Hide Save as draft selector
    setDisplaySaveAsDraft(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <DropdownButton
        as={ButtonGroup}
        title={selectedCategory ? selectedCategory.name : "Category"}
        id="bg-nested-dropdown-1"
        variant="secondary"
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
      <DropdownButton
        as={ButtonGroup}
        title={selectedDraft}
        id="bg-nested-dropdown-1"
        variant="outline-primary"
        size="sm"
        className="m-1"
      >
        {saveDraft.map((item, i) => (
          <Dropdown.Item
            key={i}
            eventKey="1"
            variant="outline-secondary"
            className={item === "Delete Draft" && "text-danger"}
            onClick={() => {
              // Only enable pull & delete functionalities if there is a saved draft
              if (item === saveDraft[0]) {
                saveAsDraft();
              } else if (displaySaveAsDraft && item === saveDraft[1]) {
                pullFromDraft();
              } else if (displaySaveAsDraft && item === saveDraft[2]) {
                deleteDraft();
              }
            }}
          >
            {/* Only display the pull & delete option if there is a saved draft */}
            {!displaySaveAsDraft &&
            item !== saveDraft[1] &&
            item !== saveDraft[2]
              ? item
              : displaySaveAsDraft
              ? item
              : null}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      {/* <div className="col-12 col-md-3 col-lg-3 mx-0 px-0 d-grid">
        <Button
          variant="outline-primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="m-1"
          onClick={saveAsDraft}
        >
          Save as draft
        </Button>
      </div> */}
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

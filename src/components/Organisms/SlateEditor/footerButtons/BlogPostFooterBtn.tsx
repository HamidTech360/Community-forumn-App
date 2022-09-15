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
  // selectEmptyEditorContentValue,
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function BlogPostFooterBtn({ editorID, editorContentValue }: any) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showPostTitle = useSelector(selectPostTitle);
  const mediaUpload = useSelector(selectMediaUpload);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const emptyEditorContentValue = useSelector(selectEmptyEditorContentValue);
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
          if (editorInnerHtml?.includes(user.userName)) {
            usersToSendNotification.push(user?.userId);
          }
        });
      }

      const formData = new FormData();

      formData.append("postBody", editorInnerHtml);
      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("postTitle", showPostTitle);
      formData.append("category", selectedCategory.tag);
      formData.append("SlateContentValue", JSON.stringify(editorContentValue));
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
    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const exploreSaveAsDraft = {
      postTitle: showPostTitle,
      postBody: editorInnerHtml,
      SlateContentValue: editorContentValue,
      category: selectedCategory.tag
    };

    localStorage.setItem(
      "exploreSaveAsDraft",
      JSON.stringify(exploreSaveAsDraft)
    );
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
      <div className="col-12 col-md-3 col-lg-3 mx-0 px-0 d-grid">
        <Button
          variant="outline-primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="m-1"
          onClick={saveAsDraft}
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

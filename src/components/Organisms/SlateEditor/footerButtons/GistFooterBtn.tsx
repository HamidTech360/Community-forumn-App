import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownButton,
  Form
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  uploadFailed,
  uploadSuccess,
  setShowGistModal,
  setGistTitle,
  selectGistTitle
} from "@/reduxFeatures/api/gistSlice";
import config from "../../../../config";
import {
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
import countries from "@/data/countries";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GistFooterBtn({ editorID, editorContentValue }: any) {
  const [gistIsLoading, setGistIsUploading] = useState(false);
  const mediaUpload = useSelector(selectMediaUpload);
  const dispatch = useDispatch();
  const showGistTitle = useSelector(selectGistTitle);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const mentionedUsers = useSelector(selectMentionedUsers);
  const [country, setCountry] = useState("");
  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));
      // Reset Post Title State when component unmount
      dispatch(setGistTitle(""));
      // Reset Mentioned Users
      dispatch(setMentionedUsers([]));
      // Reset ProgressBar
      dispatch(setProgressVariant("primary"));
      dispatch(setProgressBarNum(0));
    };
  }, [dispatch]);

  useEffect(() => {
    // Get Post Category name
    const getCategories = categories.filter(category => {
      if (category?.name === slatePostToEdit?.categories) {
        return category?.name;
      }
    });
    // Set category for post editing
    if (slatePostToEdit) {
      setSelectedCategory(getCategories[0]?.name);
    }
  }, [categories, slatePostToEdit]);

  useEffect(() => {
    // Set Post Title On Load If slatePostToEdit
    if (slatePostToEdit) {
      // Set Gist Title
      (document.getElementById("createGistID") as HTMLInputElement).value =
        slatePostToEdit?.title;

      dispatch(setGistTitle(slatePostToEdit.title));
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

  const createGist = async e => {
    e.preventDefault();
    setGistIsUploading(true);
    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    const emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    // console.log("showGistTitle:", showGistTitle);
    if (
      showGistTitle.trim() === "" ||
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

      const formData = new FormData();
      mediaUpload.map((file: File) => {
        formData.append("media", file);
      });
      formData.append("title", showGistTitle);
      formData.append("post", editorInnerHtml);
      formData.append("categories", selectedCategory);
      formData.append("slateState", editorContentValue);
      formData.append("mentions", usersToSendNotification);
      formData.append("country", country);

      if (!slatePostToEdit) {
        // New Post
        try {
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          const response = await axios.post(
            `${config.serverUrl}/api/gists`,
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
          toast.success("Gist uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          dispatch(uploadSuccess(response.data.gist));
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          // Reset Uploaded Media Data
          dispatch(setMediaUpload([]));
          setGistIsUploading(false);
          dispatch(setShowGistModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

          setGistIsUploading(false);
          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Gist", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload Gist: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          }
          dispatch(uploadFailed(error.response?.data));
        }
      } else {
        // Edit Post
        try {
          // Set Progress Bar Color
          dispatch(setProgressVariant("primary"));

          await axios.put(
            `${config.serverUrl}/api/gists/${slatePostToEdit?._id}`,
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
          toast.success("Gist uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update & Rerender Groups Post
          dispatch(uploadSuccess({ postEdited: Math.random() * 50 }));
          // Reset Content in SlatePostToEdit State
          dispatch(setSlatePostToEdit(null));
          // Reset Mentioned Users
          dispatch(setMentionedUsers([]));
          dispatch(setShowGistModal(false));
        } catch (error) {
          // Set Progress Bar Color
          dispatch(setProgressVariant("danger"));

          if (!localStorage.getItem("accessToken")) {
            toast.error("You must login to create a Gist", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          } else {
            toast.error("Failed to upload Gist: Try Again", {
              position: toast.POSITION.TOP_RIGHT,
              toastId: "1"
            });
          }
          dispatch(uploadFailed(error.response?.data));
        }
      }
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <div className="">
        <DropdownButton
          as={ButtonGroup}
          title={selectedCategory ? selectedCategory : "Category"}
          id="bg-nested-dropdown-1"
          variant="outline-secondary"
          className="m-1"
        >
          {categories.map((item, i) => (
            <Dropdown.Item
              key={i}
              eventKey="1"
              onClick={() => setSelectedCategory(item.name)}
              variant="outline-secondary"
            >
              {item.name}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </div>

      <Form.Select
        style={{ width: 120 }}
        onChange={e => setCountry(e.target.value)}
      >
        {countries.map(country => (
          <option key={country.name} value={country.name}>
            {country.emoji}
            {country.name}
          </option>
        ))}
      </Form.Select>

      <div className="col-12 col-md-2 col-lg-2 ms-auto me-2 px-0 d-grid">
        <Button
          variant="outline-primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="m-1"
          onClick={() => dispatch(setShowGistModal(false))}
        >
          Cancel
        </Button>
      </div>
      <div className="">
        <Button
          variant="primary"
          size="sm"
          style={{ borderRadius: "5px" }}
          className="my-1 me-1"
          onClick={createGist}
        >
          {gistIsLoading ? "uploading..." : "Post"}
        </Button>
      </div>
    </div>
  );
}

export default GistFooterBtn;

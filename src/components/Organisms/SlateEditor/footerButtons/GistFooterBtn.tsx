import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  uploadFailed,
  uploadSuccess,
  selectGistIsLoading,
  setShowGistModal,
  setGistTitle,
  selectGistTitle
} from "@/reduxFeatures/api/gistSlice";
import config from "../../../../config";
import {
  selectSlatePostToEdit,
  setSlatePostToEdit
} from "@/reduxFeatures/app/editSlatePostSlice";
import { serialize } from "../utils/serializer";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function GistFooterBtn({ editorID, editorContentValue }: any) {
  const gistIsLoading = useSelector(selectGistIsLoading);

  const dispatch = useDispatch();
  const showGistTitle = useSelector(selectGistTitle);
  const slatePostToEdit = useSelector(selectSlatePostToEdit);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    return () => {
      // Reset Content in SlatePostToEdit State when component unmount
      dispatch(setSlatePostToEdit(null));

      // Reset Post Title State when component unmount
      dispatch(setGistTitle(""));
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
      // Serialize Html
      const serializeNode = {
        children: editorContentValue
      };

      const serializedHtml = serialize(serializeNode);

      if (!slatePostToEdit) {
        // New Post
        try {
          const response = await axios.post(
            `${config.serverUrl}/api/gists`,
            {
              title: showGistTitle,
              post: serializedHtml,
              categories: selectedCategory,
              country: "Ghana"
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );
          toast.success("Gist uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });
          dispatch(uploadSuccess(response.data.gist));
          dispatch(setShowGistModal(false));
        } catch (error) {
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
          await axios.put(
            `${config.serverUrl}/api/gists/${slatePostToEdit?._id}`,
            {
              title: showGistTitle,
              post: serializedHtml,
              categories: selectedCategory,
              country: "Ghana"
            },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            }
          );
          toast.success("Gist uploaded successfully", {
            position: toast.POSITION.TOP_RIGHT,
            toastId: "1"
          });

          // Auto update & Rerender Groups Post
          dispatch(uploadSuccess({ postEdited: Math.random() * 50 }));
          dispatch(setShowGistModal(false));
        } catch (error) {
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
      <div className="">
        <DropdownButton
          as={ButtonGroup}
          title="Country"
          id="bg-nested-dropdown-2"
          variant="outline-secondary"
          className="m-1"
        >
          <Dropdown.Item eventKey="1" variant="outline-secondary">
            Dropdown link 1
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">Dropdown link 2</Dropdown.Item>
        </DropdownButton>
      </div>
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

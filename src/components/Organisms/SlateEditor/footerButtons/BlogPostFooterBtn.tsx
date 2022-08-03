//@ts-nocheck
import React, { useState, useEffect } from "react";
import config from "../../../../config";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setPosts,
  setShowPostModal,
  selectPostTitle,
  setIsFetching,
  selectShowPostModal,
  selectPost,
} from "@/reduxFeatures/api/postSlice";
import { setNewPost } from "@/reduxFeatures/api/postSlice";

function BlogPostFooterBtn({ editorID, handleClick }: any) {
  const router = useRouter();

  const [uploading, setUploading] = useState(false);
  const [groupId, setGroupId] = useState(null);
  const dispatch = useDispatch();
  const showPostTitle = useSelector(selectPostTitle);
  const showPostModal = useSelector(selectShowPostModal);
  const [categories, setCategories] = useState([]);
  const [selectedCategpry, setSelectedCategory] = useState(null);

  useEffect(() => {
    if (router.query.path == "timeline") {
      setGroupId(router.query.id);
    }
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${config.serverUrl}/api/category`);
        // console.log(data);
        setCategories(data.allCategories);
      } catch (error) {
        console.log(error.response?.data);
      }
    })();
  }, []);

  const createPost = async (e) => {
    e.preventDefault();

    const editorInnerHtml = (
      document.getElementById(editorID) as HTMLInputElement
    ).innerHTML;

    let emptyEditorInnerHtml =
      '<div data-slate-node="element"><span data-slate-node="text"><span data-slate-leaf="true"><span data-slate-placeholder="true" contenteditable="false" style="position: absolute; pointer-events: none; width: 100%; max-width: 100%; display: block; opacity: 0.333; user-select: none; text-decoration: none;">Start writing your thoughts</span><span data-slate-zero-width="n" data-slate-length="0">﻿<br></span></span></span></div>';

    if (
      showPostTitle.trim() === "" ||
      editorInnerHtml === emptyEditorInnerHtml
    ) {
      toast.warn("Type your Message Title and Message to proceed", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      return;
    }

    if (editorInnerHtml.trim() !== "") {
      setUploading(true);

      try {
        const response = await axios.post(
          `${config.serverUrl}/api/posts`,
          { postTitle: showPostTitle, postBody: editorInnerHtml, groupId },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response.data.post);

        toast.success("Post uploaded successfully", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "1",
        });

        // Auto update Blog Post in /explore
        dispatch(setNewPost(response.data.post));
        setUploading(false);
        dispatch(setShowPostModal(false));
      } catch (error) {
        // console.log(error.response?.data);
        if (!localStorage.getItem("accessToken")) {
          toast.error("You must login to create a post", {
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
  };

  // try {
  //   // const response = await axios.get(`/api/posts`);
  //   const response = await axios.get(`${config.serverUrl}/api/posts`);
  //   dispatch(setPosts(response.data.posts));
  //   dispatch(setIsFetching(false));
  // } catch (error) {
  //   console.error(error.response?.data);
  //   dispatch(setIsFetching(false));
  // }

  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      <div className="">
        <DropdownButton
          as={ButtonGroup}
          title={selectedCategpry ? selectedCategpry : "Category"}
          id="bg-nested-dropdown-1"
          variant="outline-secondary"
          size="sm"
          className="m-1"
        >
          {categories.map((item, i) => (
            <Dropdown.Item
              onClick={() => setSelectedCategory(item.name)}
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
          {uploading ? "uploading..." : "Create Post"}
        </Button>
      </div>
    </div>
  );
}

export default BlogPostFooterBtn;

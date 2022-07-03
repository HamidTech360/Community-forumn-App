//@ts-nocheck
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setShowPostModal,
  selectShowPostModal,
  setPostTitle,
  selectPostTitle,
  setIsFetching,
} from "@/reduxFeatures/api/postSlice";
import config from "@/config";

function BlogPostFooterBtn({ editorID }) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showPostModal = useSelector(selectShowPostModal);
  const showPostTitle = useSelector(selectPostTitle);

  // console.log("editorID:", editorID);
  // console.log("postTitleID:", postTitleID);
  // console.log("displayInID:", displayInID);
  const router = useRouter;

  // const createPost = () => {
  //   document.getElementById(displayInID).innerHTML = "";

  //   document.getElementById(displayInID).innerHTML =
  //     document.getElementById(editorID).innerHTML;
  // };

  const createPost = async (e) => {
    e.preventDefault();
    // console.log("formData:", formData);
    // console.log("e.target:", e.target);
    const editorInnerHtml = document.getElementById(editorID).innerHTML;
    // const formData = { showPostTitle, editorInnerHtml };
    setUploading(true);
    try {
      const response = await axios.post(
        `${config.serverUrl}/api/posts`,
        { postTitle: showPostTitle, postBody: editorInnerHtml },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      console.log(response.data);
      toast.success("Post uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      // setShowModal(false);
      setUploading(false);
      dispatch(setShowPostModal(false));

      const fetchPost = async () => {
        try {
          const response = await axios.get(`${config.serverUrl}/api/posts`);
          // console.log(response.data.posts);
          // const allPosts = [...posts,...response.data.posts]
          dispatch(setPosts(response.data.posts));
          // setIsFetching(false);
          dispatch(setIsFetching(false));
        } catch (error) {
          console.log(error.response?.data);
        }
      };
      fetchPost();
    } catch (error) {
      console.log(error.response?.data);
      if (!localStorage.getItem("accessToken")) {
        toast.error("You must login to create a  post", {
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
  };

  return (
    <>
      <div className="col-12 col-md-3 col-lg-2 mx-0 px-0 d-grid">
        <DropdownButton
          as={ButtonGroup}
          title="Category"
          id="bg-nested-dropdown-1"
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
      <div className="col-12 col-md-3 col-lg-2 mx-0 px-0 d-grid">
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
      <div className="col-12 col-md-3 col-lg-2 mx-0 px-0 d-grid">
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
    </>
  );
}

export default BlogPostFooterBtn;

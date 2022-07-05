//@ts-nocheck
import React, { useState } from "react";
import config from "../../../../config";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setPosts,
  setShowPostModal,
  selectPostTitle,
  setIsFetching,
} from "@/reduxFeatures/api/postSlice";

function BlogPostFooterBtn({ editorID }) {
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showPostTitle = useSelector(selectPostTitle);

  const createPost = async (e) => {
    e.preventDefault();
    const editorInnerHtml = document.getElementById(editorID).innerHTML;
    setUploading(true);
    try {
      // await axios.post(
      //   `/api/posts`,
      //   { postTitle: showPostTitle, postBody: editorInnerHtml },
      //   {
      //     headers: {
      //       authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      //     },
      //   }
      // );
      await axios.post(
        `${config.serverUrl}/api/posts`,
        { postTitle: showPostTitle, postBody: editorInnerHtml },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Post uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });
      setUploading(false);
      dispatch(setShowPostModal(false));

      // const fetchPost = async () => {
      try {
        // const response = await axios.get(`/api/posts`);
        const response = await axios.get(`${config.serverUrl}/api/posts`);
        dispatch(setPosts(response.data.posts));
        dispatch(setIsFetching(false));
      } catch (error) {
        console.error(error.response?.data);
        dispatch(setIsFetching(false));
      }
      // };
      // fetchPost();
    } catch (error) {
      // console.log(error.response?.data);
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
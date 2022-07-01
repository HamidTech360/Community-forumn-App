//@ts-nocheck
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  uploadFailed,
  uploadSuccess,
  selectGistError,
  selectGistIsSuccess,
  selectGistIsLoading,
  setShowGistModal,
  selectShowGistModal,
  setGistTitle,
  selectGistTitle,
  setIsFetching,
} from "@/reduxFeatures/api/gistSlice";
import config from "@/config";

function GistFooterBtn({ editorID }) {
  const gistIsLoading = useSelector(selectGistIsLoading);
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const showGistModal = useSelector(selectShowGistModal);
  const showGistTitle = useSelector(selectGistTitle);
  const gistError = useSelector(selectGistError);
  const gistIsSuccess = useSelector(selectGistIsSuccess);

  const router = useRouter();

  const createGist = async (e) => {
    e.preventDefault();
    const editorInnerHtml = document.getElementById(editorID).innerHTML;
    setUploading(true);
    try {
      const response = await axios.post(
        `${config.serverUrl}/api/gists`,
        {
          title: showGistTitle,
          post: editorInnerHtml,
          categories: "Migration",
          country: "Ghana",
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Gist uploaded successfully", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: "1",
      });

      setUploading(false);
      dispatch(uploadSuccess(response.data));
    } catch (error) {
      if (!localStorage.getItem("accessToken")) {
        toast.error("You must login to create a  Gist", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "1",
        });
      } else {
        toast.error("Failed to upload Gist: Try Again", {
          position: toast.POSITION.TOP_RIGHT,
          toastId: "1",
        });
        dispatch(uploadFailed(error.response?.data));
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
          title="Country"
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
      <div className="col-12 col-md-3 col-lg-2 mx-0 px-0 d-grid">
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
    </>
  );
}

export default GistFooterBtn;

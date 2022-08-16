//import useUser from "@/hooks/useUser";
import React, { useState } from "react";
import { Card, Form, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import styles from "@/styles/utils.module.scss";
import styles2 from "@/styles/feed.module.scss";
// import formStyles from "../../../styles/templates/new-group/formField.module.css";
import Editor from "@/components/Organisms/SlateEditor/Editor";

import { selectSlatePostToEdit } from "@/reduxFeatures/app/editSlatePostSlice";

import {
  selectCreatePostModal,
  setShowCreatePostModal,
} from "@/reduxFeatures/app/createPost";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";

const CreatePost = ({ pageAt }) => {
  const data = useSelector(selectUser);
  const showModal = useSelector(selectCreatePostModal);
  const dispatch = useDispatch();
  const newCreatePost = useSelector(selectNewGroupFeed);

  return (
    <Card className="p-4">
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Image
            src={data?.images?.avatar || "/images/formbg.png"}
            width={50}
            height={50}
            alt="image"
            roundedCircle
          />
        </>
        <>
          <Form
            className="radius-20"
            style={{ width: "100%", border: "1px solid rgba(0, 0, 0, 0.125)" }}
          >
            <Form.Control
              id="createFeedPost"
              className={`radius-20 ${styles.form}`}
              style={{ width: "100%" }}
              placeholder={`Hey ${
                data?.firstName && data.firstName.split(" ")[0]
              }! wanna say something?`}
              onClick={() => dispatch(setShowCreatePostModal(true))}
              onChange={() => dispatch(setShowCreatePostModal(true))}
            />
          </Form>
        </>
      </div>

      <Modal
        show={showModal}
        className={styles2.GistModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <span className={styles2.closeBtn}>
          {" "}
          <FaTimes
            color="#207681"
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => dispatch(setShowCreatePostModal(false))}
          />{" "}
        </span>
        <div className="col-12 px-4 mt-2 mb-4">
          <Editor slim={false} pageAt={pageAt} />
        </div>
      </Modal>
    </Card>
  );
};

export default CreatePost;

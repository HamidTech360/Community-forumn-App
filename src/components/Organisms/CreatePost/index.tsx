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

import {
  selectCreatePostModal,
  setShowCreatePostModal,
} from "@/reduxFeatures/app/createPost";
import { selectNewGroupFeed } from "@/reduxFeatures/api/groupSlice";

// const CreatePost = ({ DisplayModal }) => {
const CreatePost = ({ pageAt }) => {
  const router = useRouter();
  // const { user } = useUser();
  // const { data } = useSelector((s) => s.user);
  const data = useSelector(selectUser);
  const showModal = useSelector(selectCreatePostModal);
  const dispatch = useDispatch();
  // const newCreatePost = useSelector(selectNewCreatePost);
  const newCreatePost = useSelector(selectNewGroupFeed);
  // const [showModal, setShowModal] = useState(false);
  // const handleChange = (e) => {
  //   dispatch(setPostTitle(e.currentTarget.value));
  // };

  // const handleModal = () => {
  //   // console.log(router.pathname);
  //   if (router.pathname === "/feed") return;
  //   setShowModal(true);
  //   dispatch(setShowPostModal(true));
  // };
  return (
    <Card className="p-4" style={{ border: "none" }}>
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Image
            src={data?.images.avatar || "/images/formbg.png"}
            width={50}
            height={50}
            alt="image"
            roundedCircle
          />
        </>
        <>
          <Form style={{ width: "100%" }}>
            <Form.Control
              className={`radius-20  ${styles.form}`}
              style={{ width: "100%" }}
              placeholder={`Hey ${
                data?.firstName && data.firstName.split(" ")[0]
              }! wanna say something?`}
              // onClick={() => DisplayModal()}
              onClick={() => dispatch(setShowCreatePostModal(true))}
            />
          </Form>
        </>
      </div>

      <Modal
        // show={showModal && showPostModal}
        show={showModal}
        className={styles2.GistModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        {/* <span className={styles.closeBtn}> */}
        <span className={styles2.closeBtn}>
          {" "}
          <FaTimes
            color="#207681"
            style={{ cursor: "pointer" }}
            size={35}
            onClick={() => dispatch(setShowCreatePostModal(false))}
          />{" "}
        </span>
        {/* <div className="col-12 px-5">
          <Form
            className={styles.newGistModal}
          >
            <Form.Group className={formStyles.formGroup}>
              <Form.Label className={formStyles.formLabel}>
                {" "}
                Post Title
              </Form.Label>
              <Form.Control
                id="createPostID"
                size="lg"
                name="postTitle"
                type="text"
                required
                onChange={(e) => handleChange(e)}
              />
            </Form.Group>
          </Form>

          <div style={{ marginTop: "40px" }}>
            <Editor slim={false} pageAt={pageAt} />
          </div>
          <div className="mb-4"></div>
        </div> */}
        <div className="col-12 px-4 mt-2 mb-4">
          <Editor slim={false} pageAt={pageAt} />
        </div>
      </Modal>
    </Card>
  );
};

export default CreatePost;

//import useUser from "@/hooks/useUser";
import React from "react";
import { Card, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import styles from "@/styles/utils.module.scss";
// import formStyles from "../../../styles/templates/new-group/formField.module.css";

import {
  selectCreatePostModal,
  setShowCreatePostModal
} from "@/reduxFeatures/app/createPost";
import FeedPostEditorModal from "../App/ModalPopUp/FeedPostEditorModal";
import Avatar from "@/components/Atoms/Avatar";

const CreatePost = ({ pageAt }) => {
  const data = useSelector(selectUser);
  const showModal = useSelector(selectCreatePostModal);
  const dispatch = useDispatch();
  // const newCreatePost = useSelector(selectNewGroupFeed);

  return (
    <Card className="p-4">
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Avatar src={data?.images?.avatar} name={data.firstName} />
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

      {/* Open Editor Modal */}
      {showModal && <FeedPostEditorModal pageAt={pageAt} />}

      {/* <Modal
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
      </Modal> */}
    </Card>
  );
};

export default CreatePost;

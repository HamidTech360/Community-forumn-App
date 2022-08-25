import React from "react";
import Editor from "../../SlateEditor/Editor";
import { useDispatch, useSelector } from "@/redux/store";
import {
  setShowPostModal,
  selectShowPostModal,
  setPostTitle,
} from "@/reduxFeatures/api/postSlice";

import { Form, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import styles from "../../../../styles/explore.module.scss";
import formStyles from "../../../../styles/templates/new-group/formField.module.css";

const ExplorePostEditorModal = ({ pageAt }) => {
  const dispatch = useDispatch();
  const showPostModal = useSelector(selectShowPostModal);

  const handleChange = (e) => {
    // console.log("e.currentTarget.value:", e.currentTarget.value);
    dispatch(setPostTitle(e.currentTarget.value));
  };
  return (
    <Modal
      show={showPostModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      className="p-3"
    >
      <span className={styles.closeBtn}>
        {" "}
        <FaTimes
          color="#207681"
          style={{ cursor: "pointer" }}
          size={35}
          onClick={() => dispatch(setShowPostModal(false))}
        />{" "}
      </span>

      <div className="row justify-content-center mx-1">
        <div
          className="col-11 col-sm-10 col-xl-11 col-xxl-10"
          style={{ padding: "12px 0px" }}
        >
          <Form>
            <Form.Group>
              <Form.Label className={formStyles.formLabel}>
                Post Title
              </Form.Label>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                  borderRadius: "10px",
                }}
              >
                <Form.Control
                  id="createPostID"
                  size="lg"
                  name="postTitle"
                  type="text"
                  //   onChange={(e) => handleChange(e)}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgb(248, 244, 244)",
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.125)",
                  }}
                  required
                />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="col-12 mt-2 mb-4 px-lg-4">
          <Editor slim={false} pageAt={pageAt} />
        </div>
      </div>
    </Modal>
  );
};

export default ExplorePostEditorModal;

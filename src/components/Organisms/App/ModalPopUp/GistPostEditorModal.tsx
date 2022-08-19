import { useDispatch, useSelector } from "@/redux/store";
import {
  selectShowGistModal,
  setGistTitle,
  setShowGistModal,
} from "@/reduxFeatures/api/gistSlice";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import Editor from "@/components/Organisms/SlateEditor/Editor";

//STYLES
import styles from "@/styles/gist.module.scss";
import formStyles from "@/styles/templates/new-group/formField.module.css";
import "react-toastify/dist/ReactToastify.css";

function GistPostEditorModal() {
  const dispatch = useDispatch();
  const showGistModal = useSelector(selectShowGistModal);

  const handleChange = (e) => {
    // console.log("e.currentTarget.value:", e.currentTarget.value);
    dispatch(setGistTitle(e.currentTarget.value));
  };
  return (
    <Modal
      show={showGistModal}
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
          onClick={() => dispatch(setShowGistModal(false))}
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
                Gist Title
              </Form.Label>
              <div
                style={{
                  border: "1px solid rgba(0, 0, 0, 0.125)",
                  borderRadius: "10px",
                }}
              >
                <Form.Control
                  id="createGistID"
                  size="lg"
                  name="title"
                  type="text"
                  // onChange={(e) => handleChange(e)}
                  onChange={handleChange}
                  style={{
                    backgroundColor: "rgb(248, 244, 244)",
                    borderRadius: "10px",
                  }}
                  required
                />
              </div>
            </Form.Group>
          </Form>
        </div>
        <div className="col-12 mt-2 mb-4 px-lg-4">
          <Editor slim={false} pageAt="/gist" />
        </div>
      </div>
    </Modal>
  );
}

export default GistPostEditorModal;

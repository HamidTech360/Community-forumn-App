//import useUser from "@/hooks/useUser";
import React, { useState } from "react";
import { Card, Col, Form, Image, Row } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import { FaTimes } from "react-icons/fa";
import { useSelector, useDispatch } from "@/redux/store";
import { useRouter } from "next/router";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import styles from "@/styles/utils.module.scss";
import formStyles from "../../../styles/templates/new-group/formField.module.css";
import Editor from "@/components/Organisms/SlateEditor/Editor";

import {
  setPostTitle,
  selectShowPostModal,
  setShowPostModal
} from "@/reduxFeatures/api/postSlice";

const CreatePost = ({DisplayModal}:any) => {
  const router = useRouter()
  const data = useSelector(selectUser);
  const showPostModal = useSelector(selectShowPostModal);
  const dispatch = useDispatch()
  const [showModal, setShowModal] = useState(false)
  const handleChange = (e) => { 
    dispatch(setPostTitle(e.currentTarget.value));
    
  };

  const handleModal = ()=>{
   // console.log(router.pathname);
    if(router.pathname==="/feed") return 
    setShowModal(true)
    dispatch(setShowPostModal(true))
  }
  return (
    <Card className="p-2 py-4" style={{ border: "none" }}>
      <div className="mx-2 d-flex gap-2 align-items-center bg-white radius-10">
        <>
          <Image
            src={data?.avatar?.url || "/images/formbg.png"}
            width={50}
            height={50}
            alt=""
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
                onClick={()=>handleModal()}
            //  onClick={() => setShowModal(true)}
            />
          </Form>
        </>
      </div>


      <Modal
        show={showModal && showPostModal}
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
            onClick={() => setShowModal(false)}
          />{" "}
        </span>
        <div className="col-12 px-5">
          {/* <div className={styles.newGistModal}> */}
          <Form
            // onSubmit={(e) => handleSubmit(e)}
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

         
          <div style={{marginTop:'40px'}}>
            <Editor slim={false} />
          </div>
          <div className="mb-4"></div>
        </div>
      </Modal>
    </Card>
  );
};

export default CreatePost;

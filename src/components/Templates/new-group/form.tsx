import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../../styles/templates/new-group/formField.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const FormField = ({handleChange, data, moveToNewTab}) => {
  const handleSubmit = (e:any)=>{
    e.preventDefault()
    if(data.name==""||data.description==""){
      return toast.error("Field cannot be left empty", {
        position: toast.POSITION.TOP_RIGHT,
        toastId: '2',
      });
    }
    moveToNewTab(1)
  }

  return (
    <div className={styles.formContainer}>
      <ToastContainer/>
      <Form>
        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}> Group Name</Form.Label>
          <Form.Control
            size="lg"
            name="name"
            type="text"
            // minlength="3"
            value={data.name}
            required
            onChange={(e)=>handleChange(e)}
          />
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}>
            {" "}
            Group Description
          </Form.Label>
          <Form.Control
            className={styles.bigForm}
            as="textarea"
            name="description"
            type="text"
            value={data.description}
            // minlength="5"
            required
            onChange={(e)=>handleChange(e)}
          />
        </Form.Group>

        <Form.Group className={styles.formGroup}>
          <Form.Label className={styles.formLabel}> Group Photo</Form.Label>
          <div className={`${styles.dragBox}`}>
            <AiOutlineCloudUpload size={30} color="#0B5351" />
            <span className={styles.dragBoxText}>Drag and drop files here</span>
          </div>
        </Form.Group>

        <Button onClick={(e)=>handleSubmit(e)} variant="primary" className="d-flex mx-auto" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default FormField;

import React, {useState} from "react";
import { Button, Form } from "react-bootstrap";
import styles from "../../../styles/templates/new-group/formField.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FormField = ({handleChange, data}) => {

  return (
    <div className={styles.formContainer}>
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

        <Button variant="primary" className="d-flex mx-auto" type="submit">
          Continue
        </Button>
      </Form>
    </div>
  );
};

export default FormField;

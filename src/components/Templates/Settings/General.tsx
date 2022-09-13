/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import config from "@/config";
import { toast, ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "@/redux/store";
import { selectUser, user as userAction } from "@/reduxFeatures/authState/authStateSlice";

import axios from "axios";
import styles from "../../../styles/settings.module.scss";
import "react-toastify/dist/ReactToastify.css";

const General = () => {
  const data = useSelector(selectUser);
  const dispatch = useDispatch()
  useEffect(() => {
    const clone = { ...formData };
    clone["email"] = data?.email;
    clone["fullName"] = `${data?.firstName} ${data?.lastName}`;
    clone["username"] = data?.username || data?.firstName;
    setFormData(clone);
  }, [data]);

  const [progress, setProgress] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: ""
  });

  const handleChange = e => {
    const clone = { ...formData };
    clone[e.currentTarget.name] = e.currentTarget.value;
    setFormData(clone);
    //console.log(formData);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setProgress(true);
    const payload = {
      email: formData.email,
      firstName: formData.fullName.split(" ")[0],
      lastName: formData.fullName.split(" ")[1],
      username: formData.username
    };
    console.log(payload);

    if (
      payload?.email === data?.email &&
      payload?.firstName == data.firstName &&
      payload.lastName == data.lastName &&
      payload.username == data.firstName
    ) {
      setProgress(false);
      return toast.warning("No change was made", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast1"
      });
    }
    
    const comfirm = window.confirm(
      "Are you sure to continue wuth this action?"
    );
    if (!comfirm) {
      setProgress(false);
      return;
    }

    try {
      const response = await axios.put(
        `${config.serverUrl}/api/users`,
        { ...payload },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log(response.data);
      dispatch(userAction(response.data.user))
      toast.success("Update successful", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast3"
      });
      setProgress(false);
      
      
    } catch (error) {
      toast.error("Update failed", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast4"
      });
      setProgress(false);
      console.log(error.response?.data);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className={styles.container}>
        <Form className={styles.form}>
          <Form.Group
            className={`mb-3 ${styles.group}`}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className={styles.label}>Full Name</Form.Label>

            <Form.Control
              type="text"
              //readOnly={true}
              defaultValue={`${formData.fullName}`}
              className={styles.input}
              name="fullName"
              onChange={e => handleChange(e)}
            />
          </Form.Group>

          <Form.Group
            className={`mb-3 ${styles.group}`}
            controlId="exampleForm.ControlInput1"
          >
            <Form.Label className={styles.label}>Username</Form.Label>

            <Form.Control
              type="text"
              //readOnly={true}
              defaultValue={formData.username}
              placeholder={data?.firstName}
              className={styles.input}
              onChange={e => handleChange(e)}
              name="username"
            />
          </Form.Group>

          <Form.Group
            className={`mb-3 ${styles.group}`}
            controlId="formBasicEmail"
          >
            <Form.Label className={styles.label}>Email Address</Form.Label>

            <Form.Control
              name="email"
              onChange={e => handleChange(e)}
              type="email"
              value={formData.email}
              className={styles.input}
            />
          </Form.Group>

          <div className={styles.div}>
            <Button
              onClick={e => handleSubmit(e)}
              variant="primary"
              type="submit"
              className={styles.btn}
            >
              {progress ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default General;

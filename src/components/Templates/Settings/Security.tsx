import React, { ChangeEvent, FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import config from "@/config";
import axios from "axios";
import styles from "../../../styles/settings.module.scss";
import "react-toastify/dist/ReactToastify.css";

const Security = () => {
  const [progress, setProgress] = useState(false);
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword_c: ""
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const clone = { ...formData };
    clone[e.currentTarget.name] = e.currentTarget.value;
    setFormData(clone);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newPassword !== formData.newPassword_c) {
      toast.error("Password mismatch", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast4"
      });
      return;
    }
    setProgress(true);
    try {
      const { data } = await axios.put(
        `${config.serverUrl}/api/auth/password`,
        { ...formData },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`
          }
        }
      );
      console.log(data);
      toast.success("Password Updates successfully", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 7000,
        toastId: "toast5"
      });
      setProgress(false);
    } catch (error) {
      console.log(error.response?.data);
      setProgress(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <Container className={styles.container}>
        <h4>Reset Password</h4>

        <Form onSubmit={handleSubmit} className={styles.form}>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.label}>Old Password</Form.Label>

            <Form.Control
              required
              onChange={handleChange}
              name="oldPassword"
              type="password"
              placeholder="Password"
              className={styles.input}
            />
            {/* <Image src="./assets/Vector.png" alt="" className={styles.img1} /> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.label}>New Password</Form.Label>

            <Form.Control
              required
              onChange={handleChange}
              name="newPassword"
              type="password"
              placeholder="enter password"
              className={styles.input}
            />
            {/* <Image src="./assets/Vector.png" alt="" className={styles.img2} /> */}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className={styles.label}>Confirm Password</Form.Label>
            <Form.Control
              required
              onChange={handleChange}
              name="newPassword_c"
              type="password"
              placeholder="enter password"
              className={styles.input}
            />
            {/* <Image src="./assets/Vector.png" alt="" className={styles.img3} /> */}
          </Form.Group>

          <div className={styles.div}>
            <Button variant="primary" type="submit" className={styles.btn}>
              {progress ? "Updating..." : "Update"}
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default Security;

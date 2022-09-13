/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import Spinner from "react-spinner-material";
import axios from "axios";
import config from "@/config";

import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const showPrependStyles = {
    backgroundColor: "whitesmoke",
    border: "0px",
    cursor: "pointer"
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [progress, setProgress] = useState(false)
  const router = useRouter()
  const [formData, setFormData] = useState({
    password: "",
    c_password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setProgress(true)

    if(formData.password != formData.c_password) {
      return toast.warning("Password mismatch", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }
    const payload ={
      password:formData.password,
      token:router.query.token,
      email:router.query.user
    }
   console.log(payload)
   
    try{
      const response = await axios.put(`${config.serverUrl}/api/auth/resetPassword`,payload )
      console.log(response.data)
      router.push('/success-reset')
    }catch(error){
      console.log(error.response?.data)
      toast.error(error.response?.data, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
      });
    }finally{
      setProgress(false)
    }
  }

  return (
    <>
      <Head>
        <title>Password reset</title>
      </Head>
      <ToastContainer/>
      <Container
        style={{ minHeight: "60vh" }}
        className=" d-flex mt-5 flex-column align-items-center justify-content-center"
      >
        <div
          className="p-4  mb-5 position-relative-flex justify-content-center flex-column align-items-center"
          style={{ maxWidth: "663px" }}
        >
          <div>
            <h2 className="text-center ">Forgot Password?</h2>
            <p style={{ lineHeight: "1.5" }} className="text-center">
              Please enter a new password of your choice. Your new password
              should be at least 5 characters long.
            </p>
          </div>
          <Form
            // onSubmit={handleSubmit}
            className="p-3"
            style={{
              background: "#F5FEFF",
              borderRadius: 10,
              border: "1px solid rgba(0, 0, 0, 0.125)"
            }}
          >
            <Form.Group style={{ marginBottom: "30px" }}>
              <Form.Label>New Password</Form.Label>
              <InputGroup>
                <Form.Control
                  name="password"
                  placeholder="Enter new password"
                  type={!showPassword ? "password" : "text"}
                  onChange={handleChange}
                />

                <InputGroup.Text
                  style={showPrependStyles}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                <Form.Control
                  type={!showCPassword ? "password" : "text"}
                  name="c_password"
                  placeholder="Re-enter new password"
                  onChange={handleChange}
                />
                <InputGroup.Text
                  style={showPrependStyles}
                  onClick={() => setShowCPassword(!showCPassword)}
                >
                  <i
                    className={`bi ${
                      showCPassword ? "bi-eye-slash" : "bi-eye"
                    }`}
                  />
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button onClick={handleSubmit} className="px-3" type="submit">
                {progress?<Spinner radius={23}  stroke={2} color="white" />:'Submit'}
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;

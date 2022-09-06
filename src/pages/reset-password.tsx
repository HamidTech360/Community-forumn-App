/* eslint-disable @typescript-eslint/no-unused-vars */
import Head from "next/head";
import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";

const ResetPassword = () => {
  const showPrependStyles = {
    backgroundColor: "whitesmoke",
    border: "0px",
    cursor: "pointer"
  };
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

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

  return (
    <>
      <Head>
        <title>Password reset</title>
      </Head>
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
              <Button className="px-3" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </div>
      </Container>
    </>
  );
};

export default ResetPassword;

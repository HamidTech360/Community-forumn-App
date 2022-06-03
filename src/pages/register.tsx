import { setAccessToken } from "@/misc/token";

import axios, { AxiosError } from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

import { useRouter } from "next/router";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [displayPassword, setDisplayPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSubmitting(true);
      await axios.post("/api/auth/register", formData);

      router.push("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError.response) {
          // setMessage(serverError.response.data.message);
          console.log(serverError.response);
        }
      }
    } finally {
      setSubmitting(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <FormWrapper
      form={
        <div>
          {/* {wasSignUpSuccessful && (
            <Alert variant="success">
              Thanks! Check your email- an account confirmation link has been
              sent to you.
            </Alert>
          )} */}
          {message && <Alert variant="danger">{message}</Alert>}
          <Head>
            <title>Register</title>
          </Head>
          {submitting && <div className="spinner-grow" role="status"></div>}
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> First Name</Form.Label>
                  <Form.Control
                    placeholder="Enter firstname"
                    name="firstName"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label> Last Name</Form.Label>
                  <Form.Control
                    placeholder="Enter lastname"
                    name="lastName"
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Label> Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                type="email"
                name="email"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Password</Form.Label>
              <div className="row">
                <div className="col-12">
                  <Form.Control
                    placeholder="Enter password"
                    type={displayPassword ? "text" : "password"}
                    name="password"
                    required
                    onChange={handleChange}
                  />
                </div>
                <div
                  className="col-1 btn"
                  style={{
                    marginLeft: "-3.5rem",
                    fontSize: "1.5rem",
                    marginTop: "-.3rem",
                  }}
                  onClick={() => setDisplayPassword(!displayPassword)}
                >
                  <Form.Text>
                    {displayPassword ? (
                      <AiOutlineEye />
                    ) : (
                      <AiOutlineEyeInvisible />
                    )}
                  </Form.Text>
                </div>
              </div>
            </Form.Group>

            <Form.Text>
              <Form.Check
                type="checkbox"
                className="formCheckBox"
                label={
                  <p>
                    &nbsp; I hereby agree to the
                    <span className="text-primary ps-3 ps-sm-0">
                      &nbsp; terms & conditions
                    </span>{" "}
                    and{" "}
                    <span className="text-primary ps-3 ps-sm-1">
                      privacy policy
                    </span>{" "}
                  </p>
                }
              />
            </Form.Text>
            <Button
              type="submit"
              variant="primary"
              className="d-flex mx-auto mt-3"
            >
              Register
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default Register;

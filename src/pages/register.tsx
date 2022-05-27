import { setAccessToken } from "@/misc/token";

import axios, { AxiosError } from "axios";
import Head from "next/head";
import React, { useState } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";

import { useRouter } from "next/router";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
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
              <Form.Label> Enter Password</Form.Label>
              <Form.Control
                placeholder="Enter password"
                type="password"
                name="password"
                required
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Text>
              <Form.Check
                type="checkbox"
                label={
                  <p>
                    &nbsp; I hereby agree to the
                    <span className="text-primary">
                      &nbsp; terms & conditions
                    </span>{" "}
                    and <span className="text-primary">privacy policy</span>{" "}
                  </p>
                }
              />
            </Form.Text>
            <Button type="submit" variant="primary" className="d-flex mx-auto">
              Register
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default Register;

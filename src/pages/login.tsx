/* eslint-disable react/jsx-key */
import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import Typography from "../components/Atoms/Typography";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";
import styles from "../styles/form.module.scss";
import Head from "next/head";
const login = () => {
  return (
    <FormWrapper
      form={
        <div>
          <Head>
            <title>Login</title>
          </Head>
          <Form>
            <Form.Group>
              <Form.Label> Email Address</Form.Label>
              <Form.Control placeholder="Enter email address" />
            </Form.Group>
            <Form.Group>
              <Form.Label> Enter Password</Form.Label>
              <Form.Control placeholder="Enter password" />
            </Form.Group>
            <Form.Text className="d-flex justify-content-end text-primary">
              Forgot password?
            </Form.Text>
            <Button variant="primary" className="d-flex mx-auto">
              Log In
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default login;

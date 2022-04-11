import Head from "next/head";
import React from "react";
import { Button, Form } from "react-bootstrap";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";

const register = () => {
  return (
    <FormWrapper
      form={
        <div>
          <Head>
            <title>Register</title>
          </Head>
          <Form>
            <Form.Group>
              <Form.Label> Fullname</Form.Label>
              <Form.Control placeholder="Enter fullname" />
            </Form.Group>
            <Form.Group>
              <Form.Label> Email</Form.Label>
              <Form.Control placeholder="Enter email" type="email" />
            </Form.Group>
            <Form.Group>
              <Form.Label> Enter Password</Form.Label>
              <Form.Control placeholder="Enter password" type="password" />
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
            <Button variant="primary" className="d-flex mx-auto">
              Register
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default register;

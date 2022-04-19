import React from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
const forgotPassword = () => {
  return (
    <Container
      style={{ minHeight: "60vh" }}
      className=" d-flex mt-5 flex-column align-items-center justify-content-center"
    >
      <Image
        src="/assets/ellipse-intro-top.png"
        className="vector-1"
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
        width={350}
        height={150}
      />
      <div
        className="p-3 position-relatived-flex justify-content-center flex-column align-items-center"
        style={{ maxWidth: "600px" }}
      >
        <div>
          <h1 className="text-center ">Forgot Password?</h1>
          <p style={{ lineHeight: "1.5" }}>
            We all forget passwords sometimes. Please enter the email address
            used to register your account. A link will be sent to your email to
            help you reset your password.
          </p>
        </div>
        <Form
          className="p-3"
          style={{
            background: "#F5FEFF;",
            border: "0.2px solid #0B5351;",
            borderRadius: 10,
          }}
        >
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control name="email" placeholder="Enter email address" />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button className="px-3">Send Link</Button>
          </div>
        </Form>
      </div>
      <Image
        src="/assets/ellipse-intro-top.png"
        className="vector-1"
        alt=""
        style={{ position: "absolute", bottom: 0, right: 0 }}
        width={350}
        height={150}
      />
    </Container>
  );
};

export default forgotPassword;

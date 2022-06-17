import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";

const ForgotPassword = () => {
  //to review
  const [isSent, setIsSent] = useState(false);
  const wasEmailSent = false;

  const [email, setEmail] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  if (isSent) {
    return (
      <div className="mt-3 pt-4 d-flex flex-column align-items-center justify-content-center h-100">
        <Image
          src="/assets/icons/mailsent.svg"
          width={150}
          height={150}
          alt="Mail Sent"
        />
        <div className="d-flex flex-column gap-2">
          <h1 className="text-center">Check your email</h1>
          <p>
            We have sent instructions to recover your password to &nbsp;
            {email}
          </p>
          <p>
            Did not get email? Check your spam folder.{" "}
            <Link href="/forgotPassword">Or try a different email address</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Container
      style={{ minHeight: "60vh" }}
      className=" d-flex mt-5 flex-column align-items-center justify-content-center"
    >
      {/* <Image
        src="/assets/ellipse-intro-top.png"
        className="vector-1"
        alt=""
        style={{ position: "absolute", top: 0, left: 0 }}
        width={350}
        height={150}
      /> */}
      <div
        className="p-4  mb-3position-relatived-flex justify-content-center flex-column align-items-center"
        style={{ maxWidth: "663px" }}
      >
        <div>
          <h2 className="text-center ">Forgot Password?</h2>
          <p style={{ lineHeight: "1.5" }}>
            We all forget passwords sometimes. Please enter the email address
            used to register your account. A link will be sent to your email to
            help you reset your password.
          </p>
        </div>
        <Form
          onSubmit={handleSubmit}
          className="p-3 shadow"
          style={{
            background: "#F5FEFF",
            borderRadius: 10,
          }}
        >
          <Form.Group>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              name="email"
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex justify-content-center mt-4">
            <Button className="px-3" type="submit">
              Send Link
            </Button>
          </div>
        </Form>
      </div>
      {/* <Image
        src="/assets/ellipse-intro-top.png"
        className="vector-2"
        alt=""
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          transform: "rotate(180deg) translate(-50%,20%)",
        }}
        fluid
      /> */}
    </Container>
  );
};

export default ForgotPassword;

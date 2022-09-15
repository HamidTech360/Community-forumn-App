import UnAuthContent from "@/components/Auth/UnAuthContent";
import axios from "axios";
import config from "@/config";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Container, Form, Image } from "react-bootstrap";
import {  ToastContainer } from "react-toastify";
import Spinner from "react-spinner-material";

import "react-toastify/dist/ReactToastify.css";

const ForgotPassword = () => {

  const [isSent, setIsSent] = useState(false);
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(email =="") return
    setProgress(true)
    try{
      const response = await axios.post(`${config.serverUrl}/api/auth/forgotPassword`, {email})
      console.log(response.data)
      setProgress(false)
      setIsSent(true)
    }catch(error){
      console.log(error.response?.data)
      setIsSent(false)
      setProgress(false)
    }
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
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <ToastContainer/>
      <Container
        style={{ minHeight: "60vh" }}
        className=" d-flex mt-5 flex-column align-items-center justify-content-center"
      >
        <div
          className="p-4  mb-3position-relatived-flex justify-content-center flex-column align-items-center"
          style={{ maxWidth: "663px" }}
        >
          <div>
            <h2 className="text-center ">Forgot Password?</h2>
            <p style={{ lineHeight: "1.5" }}>
              We all forget passwords sometimes. Please enter the email address
              used to register your account. A link will be sent to your email
              to help you reset your password.
            </p>
          </div>
          <Form
            onSubmit={handleSubmit}
            // className="p-3 shadow"
            className="p-3"
            style={{
              background: "#F5FEFF",
              borderRadius: 10,
              border: "1px solid rgba(0, 0, 0, 0.125)"
            }}
          >
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                name="email"
                placeholder="Enter email address"
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Group>

            <div className="d-flex justify-content-center mt-4">
              <Button className="px-3" type="submit">
                {progress?<Spinner radius={23} color="white" stroke={2} />:'Send Link'}
              </Button>
            </div>
          </Form>
        </div>
      
      </Container>
    </>
  );
};

export default ForgotPassword;

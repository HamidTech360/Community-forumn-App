import UnAuthContent from "@/components/Auth/UnAuthContent";
import axios, { AxiosError } from "axios";
import Head from "next/head";
import React, {  useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";
import config from "../config";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useRouter } from "next/router";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const [displayPassword, setDisplayPassword] = useState(false);
  const [message, setMessage] = useState({ message: "", variant: "" });
  const [submitting, setSubmitting] = useState(false);
  const [termsAndConditionsChecked, setTermsAndConditionsChecked] =
    useState(false);
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (termsAndConditionsChecked) {
      try {
        setSubmitting(true);
        const response = await axios.post(`${config.serverUrl}/api/auth/register`, formData);
        toast.success(" Check your email- an account confirmation link has been sent to you. Check the spam or promotion folder if you can't find it", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 7000,
          toastId: "2"
        });
       
       setTimeout(()=>{
        router.push("/login");
       }, 7000)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const serverError = error as AxiosError;
          if (serverError.response) {
            const returnedErrorMessage =
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (serverError?.response?.data as Record<string, any>)?.error;
            if (typeof returnedErrorMessage === "string") {
              setMessage({ message: returnedErrorMessage, variant: "danger" });
            } else {
              setMessage({
                message: "Check Your Network Connection",
                variant: "danger"
              });
            }
          }
        }
      } finally {
        setSubmitting(false);
      }
    } else {
      setMessage({
        message: "Read & Accept The Terms & Conditions To Proceed",
        variant: "danger"
      });
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const termsAndConditionsChecker = () => {
    setTermsAndConditionsChecked(!termsAndConditionsChecked);
  };

  

  return (
    <UnAuthContent>
      <Head>
        <title>Register</title>
      </Head>
      <FormWrapper
        form={
          <div>
           <ToastContainer style={{fontSize:'14px', fontWeight:'bold'}} />
           
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label> First Name</Form.Label>
                    <Form.Control
                      placeholder="Enter first name"
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
                      placeholder="Enter last name"
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
                      marginTop: "-.3rem"
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
                  onChange={termsAndConditionsChecker}
                  label={
                    <p className="pt-1">
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
                Register{" "}
                {submitting && (
                  <div
                    className="spinner-grow spinner-grow-sm text-light"
                    role="status"
                  ></div>
                )}
              </Button>
            </Form>
          </div>
        }
      />
    </UnAuthContent>
  );
};

export default Register;

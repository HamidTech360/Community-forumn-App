import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Typography from "../components/Atoms/Typography";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";
import styles from "../styles/form.module.scss";
import Head from "next/head";

import { useRouter } from "next/router";
import Link from "next/link";
import useUser from "@/hooks/useUser";
import axios, { AxiosError } from "axios";
import { setAccessToken } from "@/misc/token";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, authenticating, isAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !authenticating) {
      router.replace("/feed");
    }
  }, [isAuthenticated, authenticating, router]);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      const { data } = await axios.post("/api/auth", { ...formData });
      if (data.refreshToken) {
        sessionStorage.setItem("token", data.refreshToken);
      }

      setAccessToken(data.accessToken);
      router.push("/feed");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverError = error as AxiosError;
        if (serverError.response) {
          // setMessage(serverError.response.data.message as unknown as string);
          console.log(serverError.response);
        }
      }
    } finally {
      setLoading(false);
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
          {message && (
            <Alert variant="danger" style={{ textTransform: "capitalize" }}>
              {message.replace("_", " ")}
            </Alert>
          )}
          <Head>
            <title>Login</title>
          </Head>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label> Email Address</Form.Label>
              <Form.Control
                placeholder="Enter email address"
                name="email"
                type="email"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label> Enter Password</Form.Label>
              <Form.Control
                placeholder="Enter password"
                name="password"
                type="password"
                required
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Text className="d-flex justify-content-end text-primary">
              <Link href="./forgotPassword">Forgot password?</Link>
            </Form.Text>
            <Button
              variant="primary"
              className="d-flex mx-auto mt-3"
              type="submit"
            >
              Log In
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default Login;

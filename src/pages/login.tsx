import React, { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Typography from "../components/Atoms/Typography";
import FormWrapper from "../components/Organisms/Layout/FormWrapper";
import styles from "../styles/form.module.scss";
import Head from "next/head";
import { useMutation } from "@apollo/client";
import { GET_USER, LOG_IN } from "../queries/auth";
import useAuth, { AuthProvider } from "../hooks/useAuth";
import { useRouter } from "next/router";
import Link from "next/link";
const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { loggedIn, loading, user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (!loading && loggedIn) {
      router.push("/feed");
    }
  }, [router, loading, loggedIn, user]);
  const [message, setMessage] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { email, password } = formData;
    logIn({
      variables: {
        login: email,
        password,
      },
    }).catch((error) => {
      setMessage(error.message);
    });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const [logIn, { loading: logLoading, error }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_USER }],
  });

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
            <Button variant="primary" className="d-flex mx-auto" type="submit">
              Log In
            </Button>
          </Form>
        </div>
      }
    />
  );
};

export default Login;

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

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { user, authenticating, isAuthenticated } = useUser();
  const [loading, setLoading] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

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
          setMessage(
            (serverError.response.data as Record<string, any>).message
          );
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
          {loading && <div className="spinner-grow" role="status"></div>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label> Email</Form.Label>
              <Form.Control
                placeholder="Enter email"
                name="email"
                type="email"
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
                    name="password"
                    type={displayPassword ? "text" : "password"}
                    required
                    onChange={handleChange}
                  />
                </div>
                {/* ++++++++++++++++++++++++++++++++ */}
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

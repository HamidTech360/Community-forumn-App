/* eslint-disable @next/next/no-img-element */

import React, { ReactNode } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/form.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import { setAccessToken } from "@/misc/token";
const FormWrapper = ({ form }: { form: ReactNode }) => {
  const { pathname, push } = useRouter();

  const responseGoogle = async (response: Record<string, any>) => {
    if (response.accessToken) {
      const { profileObj } = response;
      try {
        const { data } = await axios.post("/auth/oauth/google", profileObj);
        if (data.refreshToken) {
          sessionStorage.setItem("token", data.refreshToken);
        }

        setAccessToken(data.accessToken);
        push("/feed");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          // setMessage(error.response.data.message);
          console.log(error);
        }
      }
    }
  };

  const responseFacebook = async (response: Record<string, any>) => {
    console.log(response);
    if (response.accessToken) {
      const { profileObj } = response;
      try {
        const { data } = await axios.post("/auth/oauth/facebook", profileObj);
        if (data.refreshToken) {
          sessionStorage.setItem("token", data.refreshToken);
        }

        setAccessToken(data.accessToken);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.log(error);
        }
      }
    }
  };
  return (
    <>
      <Container>
        <Row className={styles.formWrapper}>
          <Col md={6} className="desktop-only">
            <div className={styles.imgWrapper}>
              <img
                src="/assets/formvector.svg"
                alt=""
                className={styles.formvector}
              />
              <p>Get connected with information to study, work, live abroad</p>
            </div>
          </Col>
          <Col md={6} className={`${styles.form} px-4 pt-5 `}>
            <div>
              <h1>
                {pathname === "/login" ? (
                  "Welcome Back"
                ) : (
                  <div className="mt-5 pt-5 mt-xl-0 pt-xl-0">Get Started</div>
                )}
              </h1>
              <p>
                Please enter your details to{" "}
                {pathname === "/login"
                  ? "log into your account"
                  : "create an account"}
              </p>
            </div>

            {form}
            <div className={styles.continueWith}>
              Or continue with
              <div
                className={`${styles.buttons} buttons d-flex gap-3 justify-content-center`}
              >
                <Button variant="outline-primary" size="sm">
                  <Image
                    width={25}
                    height={25}
                    src="/images/facebook.png"
                    alt="facebook"
                    quality={100}
                  />
                </Button>
                <GoogleLogin
                  clientId="250767377397-68p1knjngdur342c3qcs993994otnhar.apps.googleusercontent.com"
                  render={(renderProps: Record<string, any>) => (
                    <Button variant="outline-primary" size="sm">
                      <Image
                        width={25}
                        height={25}
                        src="/images/google.png"
                        alt="google"
                        quality={100}
                      />
                    </Button>
                  )}
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                />
                <Button variant="outline-primary" size="sm">
                  <Image
                    width={25}
                    height={25}
                    src="/images/linkedin.png"
                    alt="google"
                    quality={100}
                  />
                </Button>
              </div>
              <div className="mt-4">
                {pathname === "/login" ? (
                  <p>
                    Don&apos;t have an account?{" "}
                    <span className="text-primary ms-1">
                      <Link href="/register">Sign up</Link>
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span className="text-primary ms-2">
                      <Link href="/login">Sign in</Link>
                    </span>
                  </p>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <img
        src="/assets/ellipse-intro-right.png"
        className={styles.vector2}
        alt=""
      />
    </>
  );
};

export default FormWrapper;

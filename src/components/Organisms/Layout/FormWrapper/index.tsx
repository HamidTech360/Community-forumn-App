/* eslint-disable @next/next/no-img-element */

import React, { ReactNode, useCallback, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Col, Container, Row } from "react-bootstrap";

import styles from "../../../../styles/form.module.scss";

import { useRouter } from "next/router";
import Link from "next/link";

import axios from "axios";
import { setAccessToken } from "@/misc/token";
import config from "@/config";

import jwt from "jsonwebtoken";

const FormWrapper = ({ form }: { form: ReactNode }) => {
  const { pathname, push } = useRouter();
  const responseGoogle = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (response: Record<string, any>) => {
      console.log(response);
      // console.log(jwt.decode(response.credential));
      if (response.credential) {
        const profileObj = jwt.decode(response.credential);
        console.log(profileObj);
        try {
          const { data } = await axios.post(
            `${config.serverUrl}/api/auth/oauth?provider=google`,
            profileObj
          );
          if (data.refreshToken) {
            localStorage.setItem("accessToken", data.accessToken);
          }

          setAccessToken(data.accessToken);
          // toast.success("Authenticated", {
          //   position: toast.POSITION.TOP_RIGHT,
          //   autoClose: 7000,
          // });
          push("/feed");
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            toast.error((error.response.data as Record<string, any>).message, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 7000
            });
          }
        }
      }
    },
    [push]
  );
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.google?.accounts.id.initialize({
      client_id:
        "491147804580-d58i9u8jsblukvmvg9jan7ve2cvn0qqa.apps.googleusercontent.com",
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      callback: (response: Record<string, any>) => responseGoogle(response)
    });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    window.google?.accounts.id.renderButton(
      document.getElementById("google-button"),
      {
        theme: "outline",
        size: "large",
        shape: "square"
      }
    );
  }, [responseGoogle]);

  return (
    <>
      <Container>
        <ToastContainer />
        <Row className={styles.formWrapper}>
          <Col md={6} className="d-none d-md-inline">
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
                <div id="google-button"></div>
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

/* eslint-disable @next/next/no-img-element */

import React, { ReactNode } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Image from "next/image";
import styles from "../../../../styles/form.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
const FormWrapper = ({ form }: { form: ReactNode }) => {
  const { pathname } = useRouter();
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
          <Col md={6} className={styles.form}>
            <div className="mt-5">
              <h1>{pathname === "/login" ? "Welcome Back" : "Get Started"}</h1>
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
                    src="/images/google.png"
                    alt="google"
                    quality={100}
                  />
                </Button>

                <Button variant="outline-primary" size="sm">
                  <Image
                    width={25}
                    height={25}
                    src="/images/facebook.png"
                    alt="google"
                    quality={100}
                  />
                </Button>
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
                    <span className="text-primary">
                      <Link href="/register">Sign up</Link>
                    </span>
                  </p>
                ) : (
                  <p>
                    Already have an account?{" "}
                    <span className="text-primary">
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

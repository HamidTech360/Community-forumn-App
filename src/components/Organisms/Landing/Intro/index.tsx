import Link from "next/link";
import React from "react";
import { Col, Row, Image, Button, Container } from "react-bootstrap";
import styles from "../../../../styles/Landing.module.scss";
const Intro = () => {
  return (
    <div className={styles.main_container}>
      <Image
        src="/assets/ellipse-intro-top.png"
        className={styles.vector1}
        alt=""
      />
      <Container>
        <Row
          className={` ${styles.main} d-flex justify-content-center align-items-center`}
        >
          <Col md={6} className={styles.text}>
            <Container>
              <p className={styles.text_primary}>
                Welcome to <span>Settlin</span>
              </p>
              <p>
                Connect and interact with people in the study, work and live
                abroad community and get all the information that you need.
              </p>

              <Link href="/login">
                <Button variant="primary" className="btn-lgs" size="lg">
                  Get Started
                </Button>
              </Link>
            </Container>
          </Col>
          <Col md={6} className={` ${styles.image_section}`}>
            <Container className="image-container">
              <Image src="/images/girl-reading1.png" alt="Girl Reading" fluid />
            </Container>
          </Col>
        </Row>
      </Container>
      <Image
        src="/assets/ellipse-intro-right.png"
        className={styles.vector2}
        alt=""
      />
    </div>
  );
};

export default Intro;

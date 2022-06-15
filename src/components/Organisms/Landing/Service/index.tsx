import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "../../../../styles/Landing.module.scss";
const Services = () => {
  const masonry = [1, 2, 3, 4];
  return (
    <section className={`${styles.services} align-items-center`}>
      <Container>
        <Row className={`align-items-center ${styles.row}`}>
          <Col md={6} className = {styles.image_section}>
            <div className={`m-4 ${styles.masonry}`}>
              {masonry.map((number) => (
                <Image
                  src={`/images/masonry${number}.png`}
                  alt="Masonry Image"
                  key={`masonry-${number}`}
                  fluid
                />
              ))}
            </div>
          </Col>
          <Col md={6}>
            <Container>
              <h1 className={styles.heading}>What we offer</h1>
              <div >
                <p className = {styles.msg}>
                  We offer an interactive online community that provides
                  information and connects people about studying, working and
                  living abroad. The platform offers an interactive source of
                  information about free education & scholarship opportunities for
                  international students at the undergraduate, graduate &
                  Postgraduate levels of studies abroad.
                </p>
               
              </div>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Services;

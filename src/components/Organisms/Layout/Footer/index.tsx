import useUser from "@/hooks/useUser";
import React from "react";
import { Col, Container, Image, Nav, Row } from "react-bootstrap";

import Logo from "../../../Atoms/Logo";

const Footer = () => {
  const { isAuthenticated } = useUser();
  return (
    <>
      {!isAuthenticated ? (
        <div className="footer mt-5 fixed-bottom">
          <Container>
            <Row className="px-3">
              <Col md={3} xs={6}>
                <Logo />
                <div className="text">
                  ©2021, All rights reserved <br />
                  Berlin, Berlin 12249, DE <br />
                  +49 30 901820, +49 30 901820
                </div>
              </Col>

              <Col md={3} xs={6}>
                <h3 className={"heading"}> About Us</h3>
                <div className="text">
                  <a href="">Our Story</a>
                  <a href="">Careers</a>
                </div>
              </Col>

              <Col md={3} xs={6}>
                <h3 className={"heading"}> Support</h3>
                <div className="text">
                  <a href="">FAQ</a>
                  <a href="">Contact</a>
                </div>
              </Col>

              <Col md={3} xs={6}>
                <h3 className={"heading"}>Legal</h3>
                <div className="text">
                  <a href="">Privacy Policy</a>
                  <a href="">Terms and Conditions</a>
                </div>
              </Col>
              <Col
                xs={12}
                className=" mt-5 border-top  d-flex justify-content-end gap-2"
              >
                <div>
                  <i className="m-2 bi bi-instagram"></i>
                  <i className="m-2 bi bi-facebook"></i>
                  <i className="m-2 bi bi-linkedin"></i>
                  <i className="m-2 bi bi-twitter"></i>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <footer
          className="footer d-none d-lg-block mt-5 p-3  fixed-bottom shadow"
          style={{ backgroundColor: "#ffffff", zIndex: "9" }}
        >
          <Container>
            <Nav className="d-flex justify-content-evenly text-primary">
              <Nav.Item>About us</Nav.Item>
              <Nav.Item>Privacy Policy</Nav.Item>
              <Nav.Item>Contact Us</Nav.Item>
              <Nav.Item>Terms of Service</Nav.Item>
            </Nav>
          </Container>
        </footer>
      )}
    </>
  );
};

export default Footer;

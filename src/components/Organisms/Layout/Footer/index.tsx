//import useUser from "@/hooks/useUser";
import React from "react";
import { Col, Container, Image, Nav, Row, Accordion } from "react-bootstrap";
import Logo from "../../../Atoms/Logo";
import useUser from "@/hooks/useUser";
import { BsInstagram } from "react-icons/bs";
import { FaFacebookF, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useRouter } from "next/router";

import { useSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/reduxFeatures/authState/authStateSlice";
import Link from "next/link";

const Footer = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  return (
    <>
      {!isAuthenticated ? (
        <div className="footer mt-5">
          <Container>
            <Row className="px-3">
              <Col md={3} xs={12}>
                <Link href="/" passHref>
                  <Nav.Item style={{ cursor: "pointer" }}>
                    <Logo />
                  </Nav.Item>
                </Link>
                <div className="footer-text">follow us</div>
                <div className="footer-icons">
                  <BsInstagram size={23} className="footer-icon" />
                  <FaFacebookF size={23} className="footer-icon" />
                  <FaLinkedinIn size={23} className="footer-icon" />
                  <FaTwitter size={23} className="footer-icon" />
                </div>
              </Col>

              <Col md={3} xs={6} className="desktop-only">
                <h3 className={"heading"}> About Us</h3>
                <div className="footer-text">
                  <Link href="/about" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>Our Story</Nav.Item>
                  </Link>
                </div>
              </Col>

              <Col md={3} xs={6} className="desktop-only">
                <h3 className={"heading"}> Support</h3>
                <div className="footer-text">
                  <Link href="/faq" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>FAQ</Nav.Item>
                  </Link>
                  <Link href="/contact" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>Contact</Nav.Item>
                  </Link>
                </div>
              </Col>

              <Col md={3} xs={6} className="desktop-only">
                <h3 className={"heading"}>Legal</h3>
                <div className="footer-text">
                  <Link href="/privacy" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>
                      Privacy Policy
                    </Nav.Item>
                  </Link>
                  <Link href="#" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>
                      Terms and Conditions (noPage)
                    </Nav.Item>
                  </Link>
                </div>
              </Col>
              <Col
                xs={12}
                className=" mt-5 border-top  d-flex justify-content-end gap-2"
              ></Col>
              <Col xs={12} className="mobile-only">
                <Accordion>
                  <Accordion.Item
                    style={{
                      marginBottom: "20px",
                      border: "0px",
                      borderBottom: "1px solid lightgrey",
                    }}
                    eventKey="0"
                  >
                    <Accordion.Header className="accordion-header">
                      <h3 className={"heading"}> About Us</h3>
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#F0F0F1" }}>
                      <div className="footer-text">
                        <Link href="/about" passHref>
                          <Nav.Item style={{ cursor: "pointer" }}>
                            Our Story
                          </Nav.Item>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    style={{
                      marginBottom: "20px",
                      border: "0px",
                      borderBottom: "1px solid lightgrey",
                    }}
                    eventKey="1"
                  >
                    <Accordion.Header>
                      <h3 className={"heading"}> Support</h3>
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#F0F0F1" }}>
                      <div className="footer-text">
                        <Link href="/faq" passHref>
                          <Nav.Item style={{ cursor: "pointer" }}>FAQ</Nav.Item>
                        </Link>
                        <Link href="/contact" passHref>
                          <Nav.Item style={{ cursor: "pointer" }}>
                            Contact
                          </Nav.Item>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item
                    style={{
                      marginBottom: "20px",
                      border: "0px",
                      borderBottom: "1px solid lightgrey",
                    }}
                    eventKey="2"
                  >
                    <Accordion.Header>
                      <h3 className={"heading"}>Legal</h3>
                    </Accordion.Header>
                    <Accordion.Body style={{ backgroundColor: "#F0F0F1" }}>
                      <div className="footer-text">
                        <Link href="/privacy" passHref>
                          <Nav.Item style={{ cursor: "pointer" }}>
                            Privacy Policy
                          </Nav.Item>
                        </Link>
                        <Link href="#" passHref>
                          <Nav.Item style={{ cursor: "pointer" }}>
                            Terms and Conditions (noPage)
                          </Nav.Item>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <>
          {router.asPath !== "/chat" && (
            <footer
              // className="footer d-none d-md-block mt-5 p-3 shadow"
              className="footer d-none d-md-block mt-5 p-3"
              style={{
                backgroundColor: "#ffffff",
                zIndex: "9",
                borderTop: "1px solid rgba(0, 0, 0, 0.125)",
              }}
            >
              <Container>
                <Nav className="d-flex justify-content-evenly text-primary">
                  <Link href="/about" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>About us</Nav.Item>
                  </Link>
                  <Link href="/privacy" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>
                      Privacy Policy
                    </Nav.Item>
                  </Link>
                  <Link href="/contact" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>
                      Contact Us
                    </Nav.Item>
                  </Link>
                  <Link href="/about" passHref>
                    <Nav.Item style={{ cursor: "pointer" }}>
                      Terms of Service (noPage)
                    </Nav.Item>
                  </Link>
                </Nav>
              </Container>
            </footer>
          )}
        </>
      )}
    </>
  );
};

export default Footer;

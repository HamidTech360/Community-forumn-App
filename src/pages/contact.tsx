import Head from "next/head";
import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import IconWithText from "../components/Atoms/IconWithText";
import Typography from "../components/Atoms/Typography";
import Banner from "../components/Molecules/Banner";

const Contact = () => {
  const contacts = [
    {
      icon: "bi-geo-alt-fill",
      text: "Berlin, Berlin 12249, DE",
    },
    {
      icon: "bi-envelope-fill",
      text: "hello@step-ng.com",
    },
    {
      icon: "bi-telephone-fill",
      text: (
        <>
          +49 30 901820, <br />
          +49 30 901820
        </>
      ),
    },
  ];
  return (
    <>
      <Head>
        <title>Get in Touch</title>
      </Head>
      <Banner title="Contact us" image="/images/contact.png" />
      <Container className="pt-5">
        <Row>
          <Col md={7} className="border-right">
            <Typography
              heading="Send us a message"
              text="Hi there, your feedback means a great deal to us"
            />{" "}
            <Form>
              <Form.Group>
                <Form.Label>full name</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control />
              </Form.Group>
              <Form.Group>
                <Form.Label>Your message</Form.Label>
                <Form.Control as="textarea" cols={6} />
              </Form.Group>
              <Button variant="primary" className="d-flex mx-auto m-5">
                Share Feedback
              </Button>
            </Form>
          </Col>
          <Col md={5}>
            <Container>
              {contacts.map((contact, key) => (
                <IconWithText
                  text={contact.text}
                  icon={contact.icon}
                  key={`contact-${key}`}
                />
              ))}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contact;

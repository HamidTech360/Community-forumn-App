import Head from "next/head";
import Link from "next/link";
import React from "react";
import { Accordion, Container } from "react-bootstrap";
import Banner from "../components/Molecules/Banner";

const faq = () => {
  return (
    <>
      <Head>
        <title>Frequently Asked</title>
      </Head>
      <Banner title="Faq" image="/images/faq.png" />
      <Container className="mt-5">
        <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              How is Setlinn different from other sites that post about
              migration?
            </Accordion.Header>
            <Accordion.Body>
              Setlinn is not just an information bank. We offer a social
              community linking people from all over the world to share
              experiences and compare information, producing one true source of
              information birthed from personal interactions. We don’t stop at
              information; we are concerned about every step of your migration
              journey. Even when you have gotten to where you want to be,
              Setlinn will still be relevant to you.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>What can I find on Setlinn?</Accordion.Header>
            <Accordion.Body>
              Setlinn features information about all things migration. In its
              different sections, there are many groups, articles, and blogs
              relevant to travel. Proper utilization of the site is key to the
              user experience. <br />
              You can find a description of the site&apos;s features{" "}
              <Link href="/about" passHref>
                here
              </Link>
              .
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              Can I trust the information posted here?
            </Accordion.Header>
            <Accordion.Body>
              Absolutely! It is one of the many benefits that our community
              provides. Here, information is fact-checked by our users for our
              users. In addition to this, one can rely on real-life experiences
              rather than prospects.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Does Setlinn only feature migration information for Nigerians?
            </Accordion.Header>
            <Accordion.Body>
              The information found on Setlinn is tailored for all people in
              different parts of the world.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>
              How can I post or make inquiries on Setlinn?
            </Accordion.Header>
            <Accordion.Body>
              <Link href="/" passHref>
                Tutorial 101
              </Link>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>
              Does Setlinn act as a travel agent?
            </Accordion.Header>
            <Accordion.Body>
              <b>No</b>, Setlinn is not an agency. It is a social platform where
              you can make meaningful connections and find information about all
              things migration. However, you can find and connect with travel
              agencies on Setlinn.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default faq;

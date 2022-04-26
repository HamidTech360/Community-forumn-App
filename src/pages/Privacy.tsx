import Head from "next/head";
import React from "react";
import { Accordion, Container } from "react-bootstrap";
import Banner from "../components/Molecules/Banner";

const privacy = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
      </Head>
      <Banner title="Privacy" image="/images/faq.png" />
      <Container className="mt-5">
        <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Preamble</Accordion.Header>
            <Accordion.Body>
            Please read this document carefully (hereinafter, the Privacy Policy). 
            If you have any questionsabout this document and, in general, about the 
            collection and processing of your personal information, please send an
             email to info@ojirasoft.com
             SETLINN, a subdivision of OJIRA Soft Ltd. and OJIRA Soft UG, hereafter 
             referred to as “us”, “we”, or “our” operates the www.setlinn.com website, 
             presented listed services therein and other future ones to come.
             This page informs you of our policies regarding the collection, use, 
             and disclosure of personal data when you use our website, service and/or contact
              us via emails and/or via the online contact form, and the choices you have associated 
              with that data. We use your data to improve our Services. By using the website, you 
              agree to the collection and use of information following this policy.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Policy brief and purpose</Accordion.Header>
            <Accordion.Body>
            Our Data Protection Policy refers to our commitment to treat 
            the information of applicants, customers, stakeholders and other 
            interested parties with the utmost care and confidentiality.

            With this policy, we ensure that we gather, store and handle data fairly,
             transparently and concerning individual rights and state laws.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Scope</Accordion.Header>
            <Accordion.Body>
            This policy refers to all parties (registered users, employees, partners,
             stakeholders etc.) who provide any amount of information to us.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>Who is covered under the Data Protection Policy?</Accordion.Header>
            <Accordion.Body>
            Employees of our company and its subsidiaries must follow this policy. Contractors, 
            consultants, partners and any other external entity are also covered. Generally, 
            our policy refers to anyone we collaborate with or acts on our behalf and may need
            occasional access to data.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Policy elements</Accordion.Header>
            <Accordion.Body>
            As part of our operations, we need to obtain and process user information. 
            This information includes any offline or online data that makes a person
             identifiable such as names, addresses, including emails, usernames and passwords,
              digital footprints, photographs, social security numbers, financial data etc.

              Our company transparently collects this information and only with the full cooperation 
              and knowledge of interested parties. Once this information is available to us, 
              the following rules apply:

              Our data will be;
              Accurate and kept up-to-date
              Collected fairly and for lawful purposes only
              Processed by the company within its legal and moral boundaries
              Made available to the user on demand without probing at their sole request
              Protected against any unauthorized or illegal access by internal or external parties
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Actions</Accordion.Header>
            <Accordion.Body>
            To exercise data protection, we are committed to:
            Restrict and monitor access to sensitive data
            Develop transparent data collection procedures
            Train employees in online privacy and security measures
            Build secure networks to protect online data from cyberattacks
            Establish clear procedures for reporting privacy breaches or data misuse
            Include contract clauses or communicate statements on how we handle data
            Establish data protection practices (document shredding, secure locks, data encryption, 
            frequent backups, access authorization etc.)

            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Disciplinary Consequences</Accordion.Header>
            <Accordion.Body>
            All principles described in this policy must be strictly followed. A breach of data protection 
            guidelines will invoke disciplinary and possibly legal action.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default privacy;

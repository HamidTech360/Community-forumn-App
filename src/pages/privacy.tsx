import { useDispatch } from "@/redux/store";
import { setActiveTab } from "@/reduxFeatures/app/settingsSlice";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Accordion, Container } from "react-bootstrap";
import Banner from "../components/Molecules/Banner";

const Privacy = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  return (
    <>
      <Head>
        <title>Setlinn Privacy Policy</title>
      </Head>
      <Banner
        title="Setlinn Privacy Policy"
        effective="October 1, 2022"
        revised="October 1, 2022"
        image="/images/faq.png"
      />
      <Container className="mt-5">
        <main className="row m-5 lead justify-content-center">
          <blockquote>
            <em>
              Your personal information is important. At{" "}
              <span className="text-primary">Setlinn</span>, we recognize the
              huge responsibility of handling your information as well as the
              trust you place in us, and we work hard to put your mind at ease.
            </em>
          </blockquote>
          <blockquote>
            <em>
              We want you to understand how Setlinn collects, uses, and manages
              information about you when you use our site. We also want to be
              upfront about how you can access, update, and delete your
              information.
            </em>
          </blockquote>
          <blockquote>
            <em>
              This is why we&apos;ve written this Privacy Policy in an “easy to
              read” fashion that is blissfully free of the legalese that often
              clouds these documents.
            </em>
          </blockquote>
          <blockquote>
            <em>
              If you still have any questions after reading, you&apos;re free to{" "}
              <Link href="/contact" passHref>
                contact us
              </Link>
              .
            </em>
          </blockquote>
        </main>
        <Accordion defaultActiveKey={["0"]} alwaysOpen flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Preamble</Accordion.Header>
            <Accordion.Body>
              Please read this document carefully (hereinafter, the Privacy
              Policy). If you have any questions about this document and, in
              general, about the collection and processing of your personal
              information, please send an email to info@ojirasoft.com SETLINN, a
              subdivision of OJIRA Soft Ltd. and OJIRA Soft UG, hereafter
              referred to as “us”, “we”, or “our” operates the www.setlinn.com
              website, presented listed services therein and other future ones
              to come. This page informs you of our policies regarding the
              collection, use, and disclosure of personal data when you use our
              website, service and/or contact us via emails and/or via the
              online contact form, and the choices you have associated with that
              data. We use your data to improve our Services. By using the
              website, you agree to the collection and use of information
              following this policy.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>Policy brief and purpose</Accordion.Header>
            <Accordion.Body>
              Our Data Protection Policy refers to our commitment to treat the
              information of applicants, customers, stakeholders and other
              interested parties with the utmost care and confidentiality. With
              this policy, we ensure that we gather, store and handle data
              fairly, transparently and concerning individual rights and state
              laws.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>Scope</Accordion.Header>
            <Accordion.Body>
              This policy refers to all parties (registered users, employees,
              partners, stakeholders etc.) who provide any amount of information
              to us.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              Who is covered under the Data Protection Policy?
            </Accordion.Header>
            <Accordion.Body>
              Employees of our company and its subsidiaries must follow this
              policy. Contractors, consultants, partners and any other external
              entity are also covered. Generally, our policy refers to anyone we
              collaborate with or acts on our behalf and may need occasional
              access to data.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4">
            <Accordion.Header>Policy elements</Accordion.Header>
            <Accordion.Body>
              As part of our operations, we need to obtain and process user
              information. This information includes any offline or online data
              that makes a person identifiable such as names, addresses,
              including emails, usernames and passwords, digital footprints,
              photographs, social security numbers, financial data etc. Our
              company transparently collects this information and only with the
              full cooperation and knowledge of interested parties. Once this
              information is available to us, the following rules apply: Our
              data will be; Accurate and kept up-to-date Collected fairly and
              for lawful purposes only Processed by the company within its legal
              and moral boundaries Made available to the user on demand without
              probing at their sole request Protected against any unauthorized
              or illegal access by internal or external parties
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5">
            <Accordion.Header>Actions</Accordion.Header>
            <Accordion.Body>
              To exercise data protection, we are committed to: Restrict and
              monitor access to sensitive data Develop transparent data
              collection procedures Train employees in online privacy and
              security measures Build secure networks to protect online data
              from cyberattacks Establish clear procedures for reporting privacy
              breaches or data misuse Include contract clauses or communicate
              statements on how we handle data Establish data protection
              practices (document shredding, secure locks, data encryption,
              frequent backups, access authorization etc.)
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6">
            <Accordion.Header>Disciplinary Consequences</Accordion.Header>
            <Accordion.Body>
              All principles described in this policy must be strictly followed.
              A breach of data protection guidelines will invoke disciplinary
              and possibly legal action.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7">
            <Accordion.Header>
              What happens to my data, really?
            </Accordion.Header>
            <Accordion.Body>???.</Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="8">
            <Accordion.Header>
              What data does Setlinn collect and how?
            </Accordion.Header>
            <Accordion.Body>
              <h3>Information we collect</h3>
              <ol>
                <li>
                  <b>Information you provide:</b> We collect information that
                  you provide to us when you interact with our services. Our
                  services require you to create an account, so we may need to
                  collect some personal information from you, such as your name,
                  username, password, email address, phone number, and date of
                  birth.
                </li>
                When you contact customer service or communicate with us in any
                other way, we will collect any information that we need to
                answer your question.
                <li>
                  <b>Information we receive when you use our services:</b> When
                  you use our services, we collect information about which of
                  those services you&apos;ve used and how you&apos;ve used them.
                  We might know, for instance:
                  <ul>
                    <li>The content you post.</li>
                    <li>
                      Your interactions on Setlinn with others on the platform,
                      such as people you follow and people who follow you, as
                      well as your connections.
                    </li>
                    <li>
                      Your interactions with other users&apos; content, such as
                      likes, shares, replies, if other users mention or tag you
                      in content, or if you mention or tag them.
                    </li>
                    <li>
                      The information contained in emails, when you communicate
                      with us.
                    </li>
                    <li>
                      Information about your approximate location in order to
                      serve you better.
                    </li>
                    <li>
                      Information from and about the devices you use to access
                      Setlinn.
                    </li>
                  </ul>
                </li>
              </ol>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="9">
            <Accordion.Header>
              What do you do with my information?
            </Accordion.Header>
            <Accordion.Body>
              We use your data to provide you with an incredible set of products
              and services that we are constantly improving. Here are some other
              reasons why your data is necessary to optimize your Setlinn
              experience:
              <ul>
                <li>It helps us to better understand your needs.</li>
                <li>
                  We improve our services and output with the information you
                  provide.
                </li>
                <li>
                  We want to send you emails containing information that we
                  think you would find interesting.
                </li>
                <li>
                  Furthermore, we want our website to be customized to suit your
                  online behavior and your personal preferences.
                </li>
                <li>
                  We also verify your identity and prevent fraud or other
                  unauthorized or illegal activity.
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="10">
            <Accordion.Header>
              Does my information stay with Setlinn forever?
            </Accordion.Header>
            <Accordion.Body>
              We store your basic account information — like your name, phone
              number, and email address — and list of friends until you delete
              them, ask us to delete them for you, or until your account itself
              is deleted.{" "}
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="11">
            <Accordion.Header>
              How can I take control of my information?
            </Accordion.Header>
            <Accordion.Body>
              <b>By Editing Your Account Data</b>: You can access and edit most
              of your basic account information{" "}
              <Link href="/settings" passHref>
                here
              </Link>
              <br />
              <b> By Deleting your account</b>: While we hope you&apos;ll remain
              on Setlinn forever if for some reason you ever want to delete your
              account, Go{" "}
              <span
                className="text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispatch(setActiveTab("security"));
                  router.push("/settings");
                }}
              >
                here{" "}
              </span>
              to learn how.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="12">
            <Accordion.Header>Can Children use Setlinn?</Accordion.Header>
            <Accordion.Body>
              Setlinn is available for anyone over 14 years of age.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="13">
            <Accordion.Header>Does Setlinn sell my data?</Accordion.Header>
            <Accordion.Body>
              <b>No</b>. We do not sell personal information about our users.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="14">
            <Accordion.Header>When this policy applies</Accordion.Header>
            <Accordion.Body>
              This Privacy Policy applies to all the services offered by Setlinn
              only. This Privacy Policy doesn&apos;t apply to services that have
              separate privacy policies that do not incorporate this Privacy
              Policy.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="15">
            <Accordion.Header>What does this mean for me?</Accordion.Header>
            <Accordion.Body>
              On most articles and posts on Setlinn, you would see links to
              other websites. Some of these websites may be operated by third
              parties. <br />
              On Setlinn, we provide the links for your convenience, but we do
              not review, control, or monitor the privacy practices of websites
              operated by others.
              <br />
              We recommend that you review each website&apos;s privacy practices
              and make your conclusions whenever you leave Setlinn.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="16">
            <Accordion.Header>Opting Out</Accordion.Header>
            <Accordion.Body>
              From time to time, we may email you electronic newsletters,
              announcements, surveys, or other information. If you prefer not to
              receive any or all of these communications, you may opt-out by
              following the directions provided within the electronic
              newsletters and announcements.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="17">
            <Accordion.Header>What if I have more questions?</Accordion.Header>
            <Accordion.Body>
              Please{" "}
              <Link href="/contact" passHref>
                Contact us
              </Link>{" "}
              for more information. <br />
              You can also email us at{" "}
              <Link href="mailto:contact@setlinn.com" passHref>
                contact@setlinn.com
              </Link>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    </>
  );
};

export default Privacy;

import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";
import Typography from "../components/Atoms/Typography";
import Banner from "../components/Molecules/Banner";

const about = () => {
  const aboutItems = [
    {
      title: "Answers / We give answers / Eureka!",
      text: "Have you ever found answers to questions you never even asked? At Setlinn, we predict your needs and answer your questions with our wealth of information and articles about migration, giving you that sweet eureka feeling all the time. We create utility tailored to meet your specific needs and give answers that are particular to you."
    },
    {
      title: "You are part of our team!",
      text: "All the members of our community are involved in our social network, and that includes you. We extend the responsibility and the right to share information, through meaningful conversations and connections. That way, we are able to increase the accountability and value enjoyed by all our members."
    },
    {
      title: "Gather around the Community fire",
      text: "Setlinn is all about connections. Here, we empower you to make meaningful connections in our migration community. We bring people around the world together to facilitate ethical conversations about all things migration. We link function to the people by the people."
    },
    {
      title: "Culture and curiosity",
      text: "Man has always sought after what he does not know. The world is vast, and we believe that people should be able to see as much of it as they can. This is why Setlinn is not limited to just the live, work, and study community. We give life to all migration desires and celebrate cultural education in all its dimensions."
    },
    {
      title: "Education",
      text: "At Setlinn, Education is not just a right, it’s a huge part of our overall vision. We believe that everyone should get the education they want; when and where they want, without any limitations. We take the burden of barriers away, opening you up to endless possibilities."
    },
    {
      title: "Continuity",
      text: "We're glad you're here, but we want you to stay because Setlinn isn't going anywhere. This authentic initiative is here to stay. Be a part of our story today!"
    }
  ];
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <Banner title="about" image="/images/about.png" />
      <Container className="d-flex flex-column align-items-center gap-5 pt-5">
        {aboutItems.map((item, key) => (
          <Typography
            key={`aboutItem-${key}`}
            heading={item.title}
            text={item.text}
            center
          />
        ))}
      </Container>
    </>
  );
};

export default about;

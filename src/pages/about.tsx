import Head from "next/head";
import React from "react";
import { Container } from "react-bootstrap";
import Typography from "../components/Atoms/Typography";
import Banner from "../components/Molecules/Banner";
import Footer from "../components/Organisms/Layout/Footer";

const about = () => {
  const aboutItems = [
    {
      title: "Who we are",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus deleniti magnam, quas mollitia expedita repellat quae autem id ea perferendis sed quo quia quisquam debitis totam animi dolorem commodi in reiciendis aliquid similique eum veniam deserunt? Quasi ad magni vero consectetur voluptates, nulla perferendis libero explicabo, ab autem blanditiis ut!",
    },
    {
      title: "Our mission",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus deleniti magnam, quas mollitia expedita repellat quae autem id ea perferendis sed quo quia quisquam debitis totam animi dolorem commodi in reiciendis aliquid similique eum veniam deserunt? Quasi ad magni vero consectetur voluptates, nulla perferendis libero explicabo, ab autem blanditiis ut!",
    },
    {
      title: "Our Vision",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus deleniti magnam, quas mollitia expedita repellat quae autem id ea perferendis sed quo quia quisquam debitis totam animi dolorem commodi in reiciendis aliquid similique eum veniam deserunt? Quasi ad magni vero consectetur voluptates, nulla perferendis libero explicabo, ab autem blanditiis ut!",
    },
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

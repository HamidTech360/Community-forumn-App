import UnAuthContent from "@/components/Auth/UnAuthContent";
import config from "@/config";
import axios from "axios";
import Head from "next/head";
import Articles from "../components/Organisms/Landing/Articles";
import Intro from "../components/Organisms/Landing/Intro";
import Services from "../components/Organisms/Landing/Service";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Home = ({ articles }: { articles: Record<string, any>[] }) => {
  return (
    <UnAuthContent>
      <Head>
        <title>Setlinn - Study and work abroad</title>
        <meta
          name="description"
          content="Connect and interact with people in the study, work and live abroad community and get all the information that you need."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <>
          <Intro />
          <Services />
          <Articles articles={articles} />
        </>
      </main>
    </UnAuthContent>
  );
};

export const getStaticProps = async () => {
  const {
    data: { posts }
  } = await axios.get(`${config.serverUrl}/api/posts`);

  return {
    props: {
      articles: posts
    }
  };
};
export default Home;

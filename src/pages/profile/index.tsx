import React, { useEffect, useState, ReactNode } from "react";
import { Card, CardImg, Container, Nav, Spinner } from "react-bootstrap";
import PostCard from "@/components/Organisms/App/PostCard";
import CreatePost from "@/components/Organisms/CreatePost";
import axios from "axios";
import config from "@/config";
import styles from "@/styles/feed.module.scss";
import Head from "next/head";
// import UserCard from "@/components/Organisms/App/UserCard";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";

import About from "@/components/Templates/Profile/About";
import Timeline from "@/components/Templates/Profile/Timeline";
import Friends from "@/components/Templates/Profile/Articles";
import Media from "@/components/Templates/Profile/Media";
import Bookmarks from "@/components/Templates/Profile/Bookmarks";

import ProfileCard from "@/components/Organisms/App/ProfileCard";
import AuthContent from "@/components/Auth/AuthContent";
interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  friends: ReactNode;
}

const Profile = () => {
  const [path, setPath] = useState("timeline");
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/posts/user/all`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // console.log(response.data);
        setData(response.data.posts);
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const Components: IComponents = {
    timeline: <Timeline Posts={data} />,
    about: <About />,
    media: <Media />,
    friends: <Friends />,
    bookmarks: <Bookmarks />,
  };
  return (
    <AuthContent>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        <div className={`padding-top mt-3 ${styles.profileWrapper}`}>
          <div className="d-none d-lg-flex col-lg-3 col-xl-2 me-xl-4">
            <div
              // style={{ width: 230 }}
              // className="position-fixed d-none d-lg-flex flex-column vh-100"
              className={`${styles.userCardDiscussion} position-fixed d-flex flex-column vh-100`}
            >
              <div className="col-xs-12">
                <Discussions />
              </div>
            </div>
          </div>

          <main className={`${styles.profile} col-12 col-lg-7 col-xl-7 `}>
            <ProfileCard active={path} handlePath={setPath} />

            {Components[path as unknown as string]}
          </main>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Profile;

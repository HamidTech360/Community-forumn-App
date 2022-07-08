import React, { useEffect, useState, ReactNode } from "react";
import { Card, CardImg, Container, Nav, Spinner } from "react-bootstrap";
import PostCard from "../../components/Organisms/App/PostCard";
import CreatePost from "../../components/Organisms/CreatePost";
import styles from "../../styles/feed.module.scss";
import Head from "next/head";
import UserCard from "../../components/Organisms/App/UserCard";
import Discussions from "../../components/Organisms/App/Discussions/Discussions";
import { usePagination } from "../../hooks/usePagination";
import { useRouter } from "next/router";
import About from "../../components/Templates/Profile/About";
import Timeline from "../../components/Templates/Profile/Timeline";
import Friends from "../../components/Templates/Profile/Friends";
import Media from "../../components/Templates/Profile/Media";
import Bookmarks from "../../components/Templates/Profile/Bookmarks";
import Link from "next/link";
import ProfileCard from "../../components/Organisms/App/ProfileCard";
import AuthContent from "@/components/Auth/AuthContent";
import axios from "axios";
import config from "@/config";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  friends: ReactNode;
}
const Components: IComponents = {
  timeline: <Timeline Posts={[]} />,
  about: <About />,
  media: <Media />,
  friends: <Friends />,
  bookmarks: <Bookmarks />,
};
const Profile = () => {
  //const { posts,  hasMore, isFetchingMore } = usePagination();

  const router = useRouter();

  const { path } = router.query;

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    (async function () {
      console.log("router.query.id:", router.query.id);
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/users/${router.query.id}`,
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        // const userResponse = await axios.get("/api/auth", {
        //   headers: {
        //     authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        //   },
        // });
        console.log("response:", response);
        // console.log("userResponse:", userResponse);
        // setUser(userResponse.data);
        // //console.log(response.data);
        // setData(response.data.gist);
      } catch (error) {
        // router.replace("/gist");
        console.log("error:", error.response?.data);
      }
    })();
  }, []);

  return (
    <AuthContent>
      <Head>
        <title>Profile</title>
      </Head>
      <Container>
        <div className={`padding-top mt-3 ${styles.profileWrapper}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-md-flex flex-column gap-4 vh-100"
            >
              <Discussions />
            </div>
          </>

          <main className={styles.profile}>
            <ProfileCard />

            {path !== "about" &&
            path !== "timeline" &&
            path !== "bookmarks" &&
            path !== "media" &&
            path !== "friends"
              ? Components["timeline"]
              : Components[path as unknown as string]}

            {/* {Components[path as unknown as string]} */}
          </main>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Profile;

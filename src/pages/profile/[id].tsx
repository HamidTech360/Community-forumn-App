import React, { useEffect, useState, ReactNode } from "react";
import { Card, CardImg, Container, Nav, Spinner } from "react-bootstrap";
import PostCard from "../../components/Organisms/App/PostCard";
import CreatePost from "../../components/Organisms/CreatePost";
import axios from "axios";
import config from "@/config";
import styles from "../../styles/feed.module.scss";
import Head from "next/head";
// import UserCard from "../../components/Organisms/App/UserCard";
import Discussions from "../../components/Organisms/App/Discussions/Discussions";
import { useRouter } from "next/router";
import About from "../../components/Templates/Profile/About";
import Timeline from "../../components/Templates/Profile/Timeline";
import Friends from "../../components/Templates/Profile/Friends";
import Media from "../../components/Templates/Profile/Media";
import Bookmarks from "../../components/Templates/Profile/Bookmarks";
import Link from "next/link";
import ProfileCard from "../../components/Organisms/App/ProfileCard";
import ProfileView from "../../components/Organisms/App/ProfileView";
import AuthContent from "@/components/Auth/AuthContent";
import Articles from "@/components/Templates/Profile/Articles";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  connections: ReactNode;
  articles: ReactNode;
}

const Profile = () => {
  //const { posts,  hasMore, isFetchingMore } = usePagination();

  const router = useRouter();
  const { id } = router.query;

  const [path, setPath] = useState("timeline");

  const [data, setData] = useState([]);
  const [user, setUser] = useState<Record<string, any>>({});
  useEffect(() => {
    (async () => {
      try {
        const { data: res } = await axios.get(
          `${config.serverUrl}/api/users/${id}`
        );
        setUser(res);
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
  }, [id]);

  const Components: IComponents = {
    timeline: <Timeline Posts={data} />,
    about: <About User={user} />,
    media: <Media />,
    connections: <Friends user={user} />,
    articles: <Articles />,
    bookmarks: <Bookmarks />,
  };
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
              className="position-fixed d-none d-lg-flex flex-column gap-4 vh-100"
            >
              <Discussions />
            </div>
          </>

          <main className={styles.profile}>
            {router.query.id ? (
              <ProfileView active={path} handlePath={setPath} />
            ) : (
              <ProfileCard active={path} handlePath={setPath} />
            )}

            {Components[path as unknown as string]}
          </main>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Profile;

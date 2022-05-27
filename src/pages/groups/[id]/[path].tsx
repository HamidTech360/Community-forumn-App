import React, { useEffect, useState, ReactNode } from "react";
import { Card, CardImg, Container, Nav, Spinner } from "react-bootstrap";
import PostCard from "@/components/Organisms/App/PostCard";
import CreatePost from "@/components/Organisms/CreatePost";
import styles from "@/styles/feed.module.scss";
import Head from "next/head";
import UserCard from "@/components/Organisms/App/UserCard";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import { usePagination } from "@/hooks/usePagination";
import { useRouter } from "next/router";
import About from "@/components/Templates/Groups/About";
import Timeline from "@/components/Templates/Groups/Timeline";
import Friends from "@/components/Templates/Groups/Friends";
import Media from "@/components/Templates/Groups/Media";
import Bookmarks from "@/components/Templates/Profile/Bookmarks";
import Link from "next/link";
import GroupInfoCard from "@/components/Organisms/App/GroupInfoCard";
import AuthContent from "@/components/Auth/AuthContent";
interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  videos: ReactNode;
  photos: ReactNode;
  members: ReactNode;
}
const Components: IComponents = {
  timeline: <Timeline />,
  about: <About />,
  photos: <Media />,
  members: <Friends />,
  videos: <Media />,
};
const Group = () => {
  const { posts, setPage, hasMore, isFetchingMore } = usePagination();

  const router = useRouter();

  const { path } = router.query;

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <AuthContent>
      <Head>
        <title>Group</title>
      </Head>
      <Container>
        <div className={`padding-top mt-3 ${styles.wrapper}`}>
          <>
            <div
              style={{ width: 250 }}
              className="position-fixed d-none d-md-flex flex-column gap-4 vh-100"
            >
              <Discussions />
            </div>
          </>

          <main className={styles.profile}>
            <GroupInfoCard />

            {Components[path as unknown as string]}
          </main>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Group;

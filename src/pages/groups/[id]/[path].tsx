import React, { useEffect, useState, ReactNode } from "react";
import { Container } from "react-bootstrap";
import CreatePost from "@/components/Organisms/CreatePost";
import styles from "@/styles/feed.module.scss";
import Head from "next/head";
import config from "@/config";
// import UserCard from "@/components/Organisms/App/UserCard";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";
import { useRouter } from "next/router";
import About from "@/components/Templates/Groups/About";
import Timeline from "@/components/Templates/Groups/Timeline";
import Friends from "@/components/Templates/Groups/Friends";
import Media from "@/components/Templates/Groups/Media";
import GroupInfoCard from "@/components/Organisms/App/GroupInfoCard";
import AuthContent from "@/components/Auth/AuthContent";
import axios from "axios";

import { useSelector } from "@/redux/store";
import // selectCreatePostModal,
// setShowCreatePostModal,
// selectNewCreatePost,
"@/reduxFeatures/app/createPost";
import {
  // selectCreatePostModal,
  // setShowCreatePostModal,
  selectNewGroupFeed
} from "@/reduxFeatures/api/groupSlice";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  videos: ReactNode;
  photos: ReactNode;
  members: ReactNode;
}

const Group = () => {
  const router = useRouter();
  const { path, id } = router.query;
  const [groupData, setGroupData] = useState([]);
  const newCreatePost = useSelector(selectNewGroupFeed);

  const [queryId, setQueryId] = useState(id);
  // Allow Rerender Bases On ID Change Even When Route Is Same Path
  if (id && id !== queryId) setQueryId(id);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          `${config.serverUrl}/api/groups/group/${id}`
        );
        setGroupData(response.data);
        console.log(response.data)
      } catch (error) {
        // console.log(error.response?.data);
      }
    })();
  }, [router.isReady, newCreatePost, queryId, id]);
  // console.log(router.query);

  const Components: IComponents = {
    timeline: <Timeline groupId={id?.toString()} />,
    about: <About data={groupData} />,
    photos: <Media />,
    members: <Friends data={groupData} />,
    videos: <Media />
  };

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
            <GroupInfoCard data={groupData} />
            <CreatePost pageAt="/groups" />

            {Components[path as unknown as string]}
          </main>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Group;

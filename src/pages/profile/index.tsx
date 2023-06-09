import React, { useEffect, useState, ReactNode } from "react";
import { Container } from "react-bootstrap";
import styles from "@/styles/feed.module.scss";
import Head from "next/head";
// import UserCard from "@/components/Organisms/App/UserCard";
import Discussions from "@/components/Organisms/App/Discussions/Discussions";

import About from "@/components/Templates/Profile/About";
import Timeline from "@/components/Templates/Profile/Timeline";
import Friends from "@/components/Templates/Profile/Friends";
import Media from "@/components/Templates/Profile/Media";
import Bookmarks from "@/components/Templates/Profile/Bookmarks";

import ProfileCard from "@/components/Organisms/App/ProfileCard";
import AuthContent from "@/components/Auth/AuthContent";
import Articles from "@/components/Templates/Profile/Articles";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";
import usePaginationProfileTL from "@/hooks/usePaginationProfileTL";
import FeedPostEditorModal from "@/components/Organisms/App/ModalPopUp/FeedPostEditorModal";
import { selectCreatePostModal } from "@/reduxFeatures/app/createPost";
import { useRouter } from "next/router";

interface IComponents {
  about: ReactNode;
  timeline: ReactNode;
  bookmarks: ReactNode;
  media: ReactNode;
  articles: ReactNode;
  connections: ReactNode;
}

const Profile = () => {
  const router = useRouter();
  const [path, setPath] = useState("timeline");
  const [data, setData] = useState([]);
  const user = useSelector(selectUser);
  const showModal = useSelector(selectCreatePostModal);

  const isAuthUserTimeline = true;
  const {
    paginatedDataProfileTL,
    isReachedEndProfileTL,
    errorProfileTL,
    fetchNextPageProfileTL,
    mutateProfileTL,
    isValidatingProfileTL
  } = usePaginationProfileTL(`/api/feed/user`, "feed", isAuthUserTimeline);

  useEffect(() => {
    if (paginatedDataProfileTL) {
      if (JSON.stringify(data) !== JSON.stringify(paginatedDataProfileTL)) {
        setData(paginatedDataProfileTL);
      }
    }
  }, [data, paginatedDataProfileTL]);

  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);

  const Components: IComponents = {
    timeline: (
      <Timeline
        Posts={data}
        paginatedData={paginatedDataProfileTL}
        isReachedEnd={isReachedEndProfileTL}
        error={errorProfileTL}
        fetchNextPage={fetchNextPageProfileTL}
        mutate={mutateProfileTL}
        isValidating={isValidatingProfileTL}
      />
    ),
    about: <About User={user} />,
    media: <Media />,
    connections: <Friends user={user} />,
    articles: <Articles />,
    bookmarks: <Bookmarks />
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
              className={`${styles.userCardDiscussion} position-fixed d-flex flex-column vh-100`}
            >
              <div className="col-xs-12">
                <Discussions />
              </div>
            </div>
          </div>

          <main className={`${styles.profile} col-12 col-lg-9 col-xl-10 `}>
            <ProfileCard active={path} handlePath={setPath} />

            {Components[path as unknown as string]}
          </main>
        </div>
      </Container>

      {/* Open Editor Modal */}
      {showModal && <FeedPostEditorModal pageAt={router.asPath} />}
    </AuthContent>
  );
};

export default Profile;

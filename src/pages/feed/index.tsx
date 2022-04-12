import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthContent from "../../components/Auth/AuthContent";
import PostCard from "../../components/Organisms/App/PostCard";
import UserCard from "../../components/Organisms/App/UserCard";
import CreatePost from "../../components/Organisms/CreatePost";
import useAuth from "../../hooks/useAuth";
import styles from "./feed.module.scss";
const Feed = () => {
  const { user } = useAuth();
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";

    return () => {
      document.body.style.backgroundColor = "initial";
    };
  }, []);
  return (
    <AuthContent>
      <Container>
        <div className={`padding-top ${styles.feed} gap-3`}>
          <div
            className="position-fixed d-none d-md-block"
            style={{ width: 250 }}
          >
            <UserCard user={user!} />
          </div>

          <main className={styles.posts}>
            <CreatePost />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
            <PostCard post={{ name: "" }} />
          </main>
          <div>
            <UserCard user={user!} />
          </div>
        </div>
      </Container>
    </AuthContent>
  );
};

export default Feed;

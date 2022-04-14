import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import AuthContent from "../../components/Auth/AuthContent";
import PostCard from "../../components/Organisms/App/PostCard";
import UserCard from "../../components/Organisms/App/UserCard";
import CreatePost from "../../components/Organisms/CreatePost";
import useAuth from "../../hooks/useAuth";
import styles from "./feed.module.scss";
const Feed = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Record<string, any>[]>();
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_REST}/buddyboss/v1/activity?_fields=user_id,name,content,date,user_avatar,bp_media_ids,title,%20type`
      );
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    document.body.style.backgroundColor = "#f6f6f6";
    fetchData();
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
            {posts?.map((post, key) => (
              <PostCard post={post} key={`activity-post-${key}`} />
            ))}
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

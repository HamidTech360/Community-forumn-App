import React from "react";
import { Container } from "react-bootstrap";

import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Friends = ({ user }: { user: Record<string, any> }) => {
  console.log(user);
  return (
    <>
      <Container className={styles.friendBody}>
        <FriendsData friendsList={[...user.followers, ...user.following]} />
      </Container>
    </>
  );
};

export default Friends;

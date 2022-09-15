import React from "react";
import { Container } from "react-bootstrap";
//import { FriendsDataType } from '../FriendsList/FriendsData';
import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Friends = ({ data }: { data?: Record<string, any> }) => {

  return (
    <>
      <Container className={styles.friendBody}>
        <FriendsData friendsList={data.groupMembers} />
      </Container>
    </>
  );
};

export default Friends;

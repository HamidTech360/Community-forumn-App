import React from "react";
import { Container } from "react-bootstrap";
//import { FriendsDataType } from '../FriendsList/FriendsData';
import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";
import { useSelector } from "@/redux/store";
import { selectUser } from "@/reduxFeatures/authState/authStateSlice";

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

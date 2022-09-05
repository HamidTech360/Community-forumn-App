import React from "react";
import { Container } from "react-bootstrap";
//import { FriendsDataType } from '../FriendsList/FriendsData';
import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Friends = ({ data }: { data?: Record<string, any> }) => {
  // const Data: FriendsDataType = {
  //   friends: [
  //     {
  //       id: 1,
  //       image: '/images/friends1.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 2,
  //       image: '/images/friends2.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 3,
  //       image: '/images/friends3.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 4,
  //       image: '/images/friends4.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 5,
  //       image: '/images/friends5.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 6,
  //       image: '/images/friends6.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 7,
  //       image: '/images/friends7.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 8,
  //       image: '/images/friends8.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 9,
  //       image: '/images/friends9.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 10,
  //       image: '/images/friends10.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 11,
  //       image: '/images/friends11.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 12,
  //       image: '/images/friends12.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 13,
  //       image: '/images/friends13.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 14,
  //       image: '/images/friends14.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 15,
  //       image: '/images/friends15.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //     {
  //       id: 16,
  //       image: '/images/friends16.png',
  //       name: 'Debola Lagos',
  //       number: '50 Mutual Friends',
  //       menu: '/images/dots.png'
  //     },
  //   ]
  // }

  return (
    <>
      <Container className={styles.friendBody}>
        <FriendsData friendsList={data.groupMembers} />
      </Container>
    </>
  );
};

export default Friends;

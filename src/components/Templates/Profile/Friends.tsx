import React, {useEffect, useState} from "react";
import { Container } from "react-bootstrap";

import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Friends = ({ user }: { user: Record<string, any> }) => {

  const [lists, setLists] =useState( [...user.following])

  useEffect(()=>{

    let lists__c = [...lists]
    user?.followers?.map(item=>{
      const check =  lists.find(el=>el._id==item._id)
      if(!check) lists__c.push(item)
    })
   
    setLists(lists__c)
  },[])

  return (
    <>
      <Container className={styles.friendBody}>
        <FriendsData friendsList={[...lists]} />
      </Container>
    </>
  );
};

export default Friends;

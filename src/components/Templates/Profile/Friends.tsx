import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

import FriendsData from "../FriendsList/FriendsData";
import styles from "../../../styles/friends.module.scss";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Friends = ({ user }: { user: Record<string, any> }) => {
  const [active, setActive] = useState<"followers" | "following">("followers");
  return (
    <>
      <Container className={styles.friendBody}>
        <div className="d-flex justify-content-center mb-2 gap-2">
          <Button
            variant={active === "followers" ? "primary" : "outline-primary"}
            onClick={() => setActive("followers")}
          >
            Followers
          </Button>
          <Button
            variant={active === "following" ? "primary" : "outline-primary"}
            onClick={() => setActive("following")}
          >
            Following
          </Button>
        </div>
        <FriendsData friendsList={user[active]} />
      </Container>
    </>
  );
};

export default Friends;

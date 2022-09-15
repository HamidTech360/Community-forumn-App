import React, { useState, useEffect } from "react";
import {
  user as userAuth,
  selectFollowing,
  selectUser,
  setFollowing
} from "@/reduxFeatures/authState/authStateSlice";
import { Button, NavDropdown } from "react-bootstrap";
import { HiDotsVertical } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "@/redux/store";
import makeSecuredRequest, {
  deleteSecuredRequest
} from "@/utils/makeSecuredRequest";
import config from "@/config";
import axios from "axios";
import { RiUserFollowFill } from "react-icons/ri";

import styles from "@/styles/profile.module.scss";
import { BsXCircleFill } from "react-icons/bs";

function FriendListDotMenu({ friend }) {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const currentlyFollowing = useSelector(selectFollowing);
  const [followed, setFollowed] = useState(false);

  // Update users following in AuthUser because it's a frontend resolved data
  useEffect(() => {
    if (user) {
      const currentlyFollowing = user.following.map(follow => {
        return follow._id;
      });
      dispatch(setFollowing(currentlyFollowing));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  //   Set Following Status
  useEffect(() => {
    // Monitor for post and not postReFetched
    if (currentlyFollowing.includes(friend?._id)) {
      setFollowed(true);
    } else {
      setFollowed(false);
    }
  }, [friend, currentlyFollowing]);

  const changeFollowingStatus = friend => {
    // console.log("post:", post);
    if (
      document.getElementById(`followStr-${friend?._id}`).innerText === "Follow"
    ) {
      handleFollow(friend?._id);
    } else if (
      document.getElementById(`followStr-${friend?._id}`).innerText ===
      "Unfollow"
    ) {
      handleUnFollow(friend?._id);
    }
  };

  const handleFollow = async id => {
    setFollowed(true);
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      setFollowed(false);
    }
  };

  const handleUnFollow = async id => {
    setFollowed(false);
    try {
      await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      setFollowed(true);
    }
  };

  return (
    <NavDropdown
      drop="start"
      style={{ color: "white" }}
      title={
        <Button variant="link" size="lg">
          <HiDotsVertical size={25} />
        </Button>
      }
    >
      <NavDropdown.Item
        className={styles.item}
        style={{ borderBottom: "1px solid gray", backgroundColor: "lightgray" }}
        onClick={async () => changeFollowingStatus(friend)}
      >
        {followed ? (
          <>
            <BsXCircleFill />{" "}
            <span id={`followStr-${friend?._id}`}>Unfollow</span>
          </>
        ) : (
          <>
            <RiUserFollowFill />{" "}
            <span id={`followStr-${friend?._id}`}>Follow</span>
          </>
        )}{" "}
        @
        {friend?.username ? friend?.username : friend?.firstName?.split(" ")[0]}
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default FriendListDotMenu;

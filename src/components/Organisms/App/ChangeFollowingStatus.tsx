import React, { useEffect } from "react";
import config from "@/config";
import { setFollowed, selectFollowed } from "@/reduxFeatures/app/appSlice";
import makeSecuredRequest, {
  deleteSecuredRequest,
} from "@/utils/makeSecuredRequest";
import { useDispatch } from "react-redux";
import {
  selectFollowing,
  user as userAuth,
  selectUser,
  setFollowers,
  setFollowing,
} from "@/reduxFeatures/authState/authStateSlice";
import axios from "axios";

function ChangeFollowingStatus(post) {
  const dispatch = useDispatch();

  useEffect(() => {
    manageFollowingStatus(post);
  }, []);

  // const dispatch = useDispatch()
  const manageFollowingStatus = (post) => {
    if (
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Follow"
    ) {
      // console.log("++++++++++++++++++");
      handleFollow(post?.author?._id);
    } else if (
      document.getElementById(`followStr-${post?.author?._id}`).innerText ===
      "Unfollow"
    ) {
      handleUnFollow(post?.author?._id);
    }
  };

  //   export default changeFollowingStatus;

  const handleFollow = async (id) => {
    // Preset following
    dispatch(setFollowed(true));
    try {
      await makeSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          console.error("follow Error:", error);
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Revert on axios  failure
      dispatch(setFollowed(false));
      console.error("follow Error:", error);
    }
  };

  const handleUnFollow = async (id) => {
    // Preset following
    dispatch(setFollowed(false));
    try {
      await deleteSecuredRequest(`${config.serverUrl}/api/users/${id}/follow`);

      // Update Auth User State
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          dispatch(userAuth(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
        }
      })();
    } catch (error) {
      // Revert on axios  failure
      dispatch(setFollowed(true));
      console.error("follow Error:", error);
    }
  };

  return <></>;
}

export default ChangeFollowingStatus;

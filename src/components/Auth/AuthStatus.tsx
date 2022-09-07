import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { user, selectUser } from "@/reduxFeatures/authState/authStateSlice";
import config from "@/config";
import {
  selectAcceptedMediaTypes,
  setPopulateAcceptedImagesTypes,
  setPopulateAcceptedVideosTypes
} from "@/reduxFeatures/app/appSlice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);
  const acceptedMediaTypes = useSelector(selectAcceptedMediaTypes);

  useEffect(() => {
    // User to satte if logedin
    if (localStorage.getItem("accessToken")) {
      if (!stateUser) {
        (async function () {
          try {
            const response = await axios.get(`${config.serverUrl}/api/auth`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
              }
            });
            dispatch(user(response.data));
          } catch (error) {
            localStorage.removeItem("accessToken");
          }
        })();
      }
    }

    // Set Accepted media types to state
    const imageExt = [];
    const videoExt = [];

    for (const key in acceptedMediaTypes) {
      const splitKey = key.split("/");
      const mediaType = splitKey[0];

      if (mediaType === "image") {
        imageExt.push(...acceptedMediaTypes[key]);
      } else if (mediaType === "video") {
        videoExt.push(...acceptedMediaTypes[key]);
      }
    }
    dispatch(setPopulateAcceptedImagesTypes(imageExt));
    dispatch(setPopulateAcceptedVideosTypes(videoExt));
  });

  return <></>;
};

export default AuthStatus;

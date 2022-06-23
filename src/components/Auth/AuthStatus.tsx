import React, { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { user, selectUser } from "@/reduxFeatures/authState/authStateSlice";

const AuthStatus = () => {
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      if (!stateUser) {
        (async function () {
          try {
            const response = await axios.get(`/api/auth`, {
              headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              },
            });
            dispatch(user(response.data));
          } catch (error) {
            localStorage.removeItem("accessToken");
          }
        })();
      }
    }
  });

  return <></>;
};

export default AuthStatus;

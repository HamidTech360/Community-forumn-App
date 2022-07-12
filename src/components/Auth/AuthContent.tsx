/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import Loader from "../Organisms/Layout/Loader/Loader";
import config from "@/config";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  user,
  selectUser,
  selectIsAuthenticated,
} from "@/reduxFeatures/authState/authStateSlice";

export default function AuthContent({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();
  const stateUser = useSelector(selectUser);

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      // Save current page for redirect
      sessionStorage.setItem("pageB4Login", JSON.stringify(router.asPath));

      router.push("/login");
    }
    if (!stateUser) {
      (async function () {
        try {
          const response = await axios.get(`${config.serverUrl}/api/auth`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          });
          console.log("user from authContent is", response.data);

          dispatch(user(response.data));
        } catch (error) {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      })();
    }
  }, []);

  return <>{isAuthenticated && <div>{children}</div>}</>;
}

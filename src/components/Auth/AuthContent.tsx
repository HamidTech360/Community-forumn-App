/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import config from "@/config";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import {
  user,
  selectUser,
  selectIsAuthenticated
} from "@/reduxFeatures/authState/authStateSlice";
import { Spinner } from "react-bootstrap";

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
              authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
          });
          

          dispatch(user(response.data));
          if(! response.data.interests){
            router.push('/interests')
          }
        } catch (error) {
          localStorage.removeItem("accessToken");
          router.push("/login");
        }
      })();
    }
  }, []);

  return (
    <>
      {isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="loader-wrapper">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}

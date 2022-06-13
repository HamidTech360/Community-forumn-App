import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";

import { useDispatch } from "@/redux/store";
import { userAuthenticated } from "@/reduxFeatures/authState/authStateSlice";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { isAuthenticated, authenticating } = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // Save current page for redirect
      sessionStorage.setItem("pageB4Login", JSON.stringify(router.asPath));

      router.push("/login");
    }
  }, [isAuthenticated, authenticating, router]);

  if (isAuthenticated) {
    // Set isAuthenticated in redux state to true
    dispatch(userAuthenticated(true));

    // Don't Display Register Page While logged-in
    if (router.asPath === "/register") {
      router.push("/feed");
    } else {
      return <div>{children}</div>;
    }
  }

  return <Loader />;
}

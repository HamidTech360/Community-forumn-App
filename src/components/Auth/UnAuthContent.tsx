import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import Loader from "../Organisms/Layout/Loader/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/reduxFeatures/authState/authStateSlice";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  // Navigate authenticated users to Feed page.
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/feed");
    }
  }, []);

  return <>{!isAuthenticated && <div>{children}</div>}</>;
}

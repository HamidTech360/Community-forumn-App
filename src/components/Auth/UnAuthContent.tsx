import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
//import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "@/redux/store";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const router = useRouter();

  // Navigate authenticated users to Feed page.
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/feed");
    }
  }, []);

  return <div>{children}</div>;

  return <Loader />;
}

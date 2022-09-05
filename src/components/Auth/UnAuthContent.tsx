import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useSelector } from "@/redux/store";
import { selectIsAuthenticated } from "@/reduxFeatures/authState/authStateSlice";
import { Spinner } from "react-bootstrap";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const router = useRouter();

  // Navigate authenticated users to Feed page.
  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      router.push("/feed");
    }
  }, [router]);

  return (
    <>
      {!isAuthenticated ? (
        <div>{children}</div>
      ) : (
        <div className="loader-wrapper">
          <Spinner animation="grow" />
        </div>
      )}
    </>
  );
}

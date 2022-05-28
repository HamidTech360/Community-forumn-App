import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";

export default function UnAuthContent({ children }: { children: ReactNode }) {
  const { isAuthenticated, authenticating } = useUser();
  const router = useRouter();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!authenticating && isAuthenticated) {
      router.push("/feed");
    }
  }, [isAuthenticated, authenticating, router]);

  if (!isAuthenticated) {
    return <div>{children}</div>;
  }

  return <Loader />;
}

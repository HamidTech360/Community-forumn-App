import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useUser from "../../hooks/useUser";
import Loader from "../Organisms/Layout/Loader/Loader";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { isAuthenticated, authenticating } = useUser();
  const router = useRouter();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!authenticating && !isAuthenticated) {
      // Save current page
      sessionStorage.setItem(
        "pageB4Login",
        JSON.stringify(globalThis.history.state.as)
      );

      router.push("/login");
    }
  }, [isAuthenticated, authenticating, router]);

  if (isAuthenticated) {
    return <div>{children}</div>;
  }

  return <Loader />;
}

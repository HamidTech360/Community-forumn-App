import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import useAuth from "../../hooks/useAuth";

export default function AuthContent({ children }: { children: ReactNode }) {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  // Navigate unauthenticated users to Log In page.
  useEffect(() => {
    if (!loading && !loggedIn) {
      router.push("/login");
    }
  }, [loggedIn, loading, router]);

  if (loggedIn) {
    return <div className="padding-top">{children}</div>;
  }

  return <p>Loading...</p>;
}

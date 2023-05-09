import { useAuth } from "utils/hooks/useAuth";
import PrivateHome from "components/tree/Home/Private";
import PublicHome from "components/tree/Home/Public";
import { useEffect } from "react";

export default function Home() {
  const isAuth = useAuth();

  useEffect(() => {
    console.log("useEffect");
  }, []);

  if (isAuth) {
    return <PrivateHome />;
  }

  return <PublicHome />;
}

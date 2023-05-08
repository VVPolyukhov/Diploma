import { useAuth } from "utils/hooks/useAuth";
import PrivateHome from "components/tree/Home/Private";
import PublicHome from "components/tree/Home/Public";

export default function Home() {
  const isAuth = useAuth();

  if (isAuth) {
    return <PrivateHome />;
  }

  return <PublicHome />;
}

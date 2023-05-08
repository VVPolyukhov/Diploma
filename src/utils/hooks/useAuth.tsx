import { useSelector } from "react-redux";
import { getAccessToken } from "store/auth/selectors";

export const useAuth = () => {
  const isAuth = useSelector(getAccessToken)
  return isAuth;
};

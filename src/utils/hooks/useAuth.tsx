import { useSelector } from "react-redux";
import { getAccessToken } from "utils/storages/local/accessToken";
// import { getAccessToken } from "store/auth/selectors";

export const useAuth = () => {
  const isAuth = getAccessToken() //useSelector(getAccessToken)
  return isAuth;
};

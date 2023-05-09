import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { useAuth } from "utils/hooks/useAuth";
import {
  isPrivatePathname,
  isPublicPathname,
  isPathnameUnknown,
} from "utils/shared/routes";
import { getAccessToken } from "utils/storages/local/accessToken";
import NoSsr from "../NoSsr";

interface IProps {}
const AccessProvider: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const isAuth = useAuth();

  const { pathname, ...router } = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();
    if (isPrivatePathname(pathname) && !accessToken) {
      router.replace(ROUTES.AUTH_SIGN_IN.PATHNAME);
    }
  }, []);

  /* Для публичных страниц */
  if (isPublicPathname(pathname) || isPathnameUnknown(pathname)) {
    return <>{children}</>;
  }

  if (isAuth) {
    /**
     * Выключение серверного рендеринга для приватных страниц
     */
    return <NoSsr>{children}</NoSsr>;
  }

  return null;
};

export default AccessProvider;

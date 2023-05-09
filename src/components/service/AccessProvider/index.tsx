import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { useUpdateAccessTokenMutation } from "store/auth/api";
import { useAuth } from "utils/hooks/useAuth";
import {
  isPrivatePathname,
  isPublicPathname,
  isPathnameUnknown,
} from "utils/shared/routes";
import { getRefreshToken } from "utils/storages/cookie/refreshToken";
import NoSsr from "../NoSsr";

interface IProps {}
// @ts-ignore
const AccessProvider: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const refreshToken = getRefreshToken();
  const isAuth = useAuth()

  const { pathname, ...router } = useRouter();

  const [updateAccessToken, { isLoading, isSuccess }] =
    useUpdateAccessTokenMutation();

  useEffect(() => {
    if (refreshToken) {
      updateAccessToken({ refreshToken: String(refreshToken) });
    } else if (isPrivatePathname(pathname)) {
      router.replace(ROUTES.AUTH_SIGN_IN.PATHNAME);
    }
  }, []);

  /* Для публичных страниц */
  if (isPublicPathname(pathname) || isPathnameUnknown(pathname)) {
    return children;
  }

  /* Для приватных страниц */
  if (isLoading) {
    return <>Loading...</>;
  }

  if (isSuccess || isAuth) {
    /**
     * Выключение серверного рендеринга для приватных страниц
     */
    return <NoSsr>{children}</NoSsr>;
  }

  return null;
};

export default AccessProvider;

import Spinner from "components/shared/Spinner";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { PropsWithChildren, useEffect } from "react";
import { useGetUserQuery } from "store/user/api";
import { useAuth } from "utils/hooks/useAuth";
import {
  isPrivatePathname,
  isPublicPathname,
  isPathnameUnknown,
} from "utils/shared/routes";
import NoSsr from "../NoSsr";

interface IProps {}
const AccessProvider: React.FC<PropsWithChildren<IProps>> = ({ children }) => {
  const isAuth = useAuth();

  const { isLoading, isSuccess } = useGetUserQuery({});

  const { pathname, ...router } = useRouter();

  useEffect(() => {
    if (isPrivatePathname(pathname) && !isAuth) {
      router.replace(ROUTES.AUTH_SIGN_IN.PATHNAME);
    }
  }, []);

  /* Для публичных страниц */
  if (isPublicPathname(pathname) || isPathnameUnknown(pathname)) {
    return <>{children}</>;
  }

  /* Для приватных страниц */
  if (isLoading) {
    return <Spinner onFullScreen />;
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

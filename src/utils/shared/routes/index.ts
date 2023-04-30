import {
  PRIVATE_ROUTE_PATHNAMES,
  PUBLIC_ROUTE_PATHNAMES,
} from "constants/shared/routes";

export const isPublicPathname = (pathname: string): boolean => {
  return PUBLIC_ROUTE_PATHNAMES.includes(pathname);
};

export const isPrivatePathname = (pathname: string): boolean => {
  return PRIVATE_ROUTE_PATHNAMES.includes(pathname);
};

export const isPathnameUnknown = (pathname: string): boolean => {
  return !isPublicPathname(pathname) && !isPrivatePathname(pathname);
};

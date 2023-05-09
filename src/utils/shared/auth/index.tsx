import { AnyAction } from "@reduxjs/toolkit";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { Dispatch } from "react";
import { setAccessToken } from "store/auth/slice";
import { deleteRefreshToken } from "utils/storages/cookie/refreshToken";

export const logout = (dispatch: Dispatch<AnyAction>) => {
  deleteRefreshToken();
  dispatch(setAccessToken(null));
  Router.replace(ROUTES.AUTH_SIGN_IN.PATHNAME);
};

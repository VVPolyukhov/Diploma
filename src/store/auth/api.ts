import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { api } from "store/api";
import { setRefreshToken } from "utils/storages/cookie/refreshToken";
import { setAccessToken } from "utils/storages/local/accessToken";
import {
  IAuthBaseRequestParams,
  IAuthBaseResponse,
  IAuthRegisterRequestParams,
  IAuthUpdateAccessTokenRequestParams,
} from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthBaseResponse, IAuthBaseRequestParams>({
      query: (body) => ({
        url: "auth/authenticate",
        body,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          const result = await api.queryFulfilled;
          setRefreshToken(result.data.refreshToken);
          setAccessToken(result.data.accessToken)
          Router.replace(ROUTES.MAIN.PATHNAME);
        } catch (error) {}
      },
    }),
    register: builder.mutation<IAuthBaseResponse, IAuthRegisterRequestParams>({
      query: (body) => ({
        url: "auth/register",
        body,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          const result = await api.queryFulfilled;
          setRefreshToken(result.data.refreshToken);
          setAccessToken(result.data.accessToken)
          Router.replace(ROUTES.MAIN.PATHNAME);
        } catch (error) {}
      },
    }),
    updateAccessToken: builder.mutation<
      IAuthBaseResponse,
      IAuthUpdateAccessTokenRequestParams
    >({
      query: (body) => ({
        url: "auth/token",
        body,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          const result = await api.queryFulfilled;
          setRefreshToken(result.data.refreshToken);
          setAccessToken(result.data.accessToken)
        } catch (error) {
          Router.replace(ROUTES.AUTH_SIGN_IN.PATHNAME);
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useUpdateAccessTokenMutation,
} = authApi;

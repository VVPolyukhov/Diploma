import { setCookie } from "cookies-next";
import { setAccessToken } from "store/auth/slice";
import { api } from "..";
import {
  IAuthBaseRequestParams,
  IAuthBaseResponse,
  IAuthRegisterRequestParams,
} from "./types";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthBaseResponse, IAuthBaseRequestParams>({
      query: (body) => ({
        url: "auth/authentication",
        body,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          const result = await api.queryFulfilled;
          setCookie("refreshToken", result.data.refreshToken);
          api.dispatch(setAccessToken(result.data.accessToken));
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
          setCookie("refreshToken", result.data.refreshToken);
          api.dispatch(setAccessToken(result.data.accessToken));
        } catch (error) {}
      },
    }),
    // updateAccessToken: builder.mutation<
    //   IAuthBaseResponse,
    //   IAuthUpdateAccessTokenRequestParams
    // >({
    //   query: (body) => ({
    //     url: "auth/token",
    //     body,
    //     method: 'post'
    //   }),
    // }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  // useUpdateAccessTokenMutation,
} = authApi;

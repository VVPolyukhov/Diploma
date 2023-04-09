import {
  FetchArgs,
  FetchBaseQueryArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { getCookie, setCookie } from "cookies-next";
import { getAccessToken } from "store/auth/selectors";
import { setAccessToken } from "store/auth/slice";
import { TRootState } from "store/types";
import { IAuthBaseResponse } from "./auth/types";

const mutex = new Mutex();

export const prepareHeaders: FetchBaseQueryArgs["prepareHeaders"] = (
  headers,
  { getState }
) => {
  const state = getState() as TRootState;
  const accessToken = getAccessToken(state);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: "https://pokeapi.co/api/v1/",
  prepareHeaders,
});

// Ссылка на источник: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#preventing-multiple-unauthorized-errors
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  any,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshToken = getCookie("refreshToken");

        if (refreshToken) {
          const refreshResult = await baseQuery(
            {
              url: "/auth/token",
              body: {
                refreshToken,
              },
            },
            api,
            extraOptions
          );
          if (refreshResult.data) {
            setCookie(
              "refreshToken",
              (refreshResult.data as IAuthBaseResponse).refreshToken
            );
            api.dispatch(
              setAccessToken(
                (refreshResult.data as IAuthBaseResponse).accessToken
              )
            );

            // retry the initial query
            result = await baseQuery(args, api, extraOptions);
          } else {
            // api.dispatch(loggedOut())
          }
        } else {
          // api.dispatch(loggedOut())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

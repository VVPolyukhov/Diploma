import {
  FetchArgs,
  FetchBaseQueryArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";
import { BaseQueryFn, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";
import { IAuthBaseResponse } from "store/auth/types";
import { TRootState } from "store/types";
import {
  getRefreshToken,
  setRefreshToken,
} from "utils/storages/cookie/refreshToken";
import {
  getAccessToken,
  setAccessToken,
} from "utils/storages/local/accessToken";

const mutex = new Mutex();

export const prepareHeaders: FetchBaseQueryArgs["prepareHeaders"] = (
  headers,
  { getState }
) => {
  const state = getState() as TRootState;
  const accessToken = getAccessToken(); // getAccessToken(state);
  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }
  return headers;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: `http${
    process.env.NODE_ENV === "development" ? "" : "s"
  }://84.252.73.203:8080/api/v1/`,
  prepareHeaders,
});

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
        const refreshToken = getRefreshToken();

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
            setRefreshToken(
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

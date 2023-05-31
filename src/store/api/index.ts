import { createApi } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { rtkQueryTagTypes } from "./types";
import { baseQueryWithReauth } from "./utils";

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  tagTypes: rtkQueryTagTypes,
  endpoints: (builder) => ({}),
});

export const {
  util: { getRunningQueriesThunk },
} = api;

export const {} = api.endpoints;

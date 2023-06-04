import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: "get",
      }),
    }),
  }),
});

export const { useGetCourseQuery } = eventsApi;

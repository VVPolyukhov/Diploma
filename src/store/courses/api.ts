import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: ({ id }) => ({
        url: `course/${id}`,
        method: "get",
      }),
    }),
    createCourse: builder.mutation({
      query: (body) => ({
        url: `course`,
        body,
        method: "post",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          Router.push(ROUTES.ADMIN_COURSES.PATHNAME);
          notification.success({
            message: "Курс создан",
          });
        } catch (error) {}
      },
      invalidatesTags: [ETagTypes.courses],
    }),
  }),
});

export const { useGetCourseQuery, useCreateCourseMutation } = eventsApi;

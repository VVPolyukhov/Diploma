import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { api } from "../api";

export const eventsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params) => ({
        url: `course`,
        params,
        method: "get",
      }),
      providesTags: [ETagTypes.courses],
    }),
    linkCourseWithArticle: builder.mutation({
      query: (params) => ({
        url: `admin/linkingArticleWithCourse`,
        params,
        method: "post",
      }),
      invalidatesTags: [ETagTypes.courses, ETagTypes.articles],
    }),
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
    setImageToCourse: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `course/${id}/avatar`,
          body,
          method: "post",
          formData: true,
        };
      },
      invalidatesTags: [ETagTypes.courses],
    }),
  }),
});

export const {
  useGetCourseQuery,
  useCreateCourseMutation,
  useSetImageToCourseMutation,
  useGetCoursesQuery,
  useLinkCourseWithArticleMutation,
} = eventsApi;

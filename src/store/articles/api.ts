import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { api } from "../api";

export const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: () => ({
        url: "article",
        method: "get",
      }),
      providesTags: [ETagTypes.articles],
    }),
    getArticle: builder.query({
      query: ({ articleId }) => ({
        url: `article/${articleId}`,
        method: "get",
      }),
    }),
    createArticle: builder.mutation({
      query: (body) => ({
        url: "article",
        body,
        method: "post",
      }),
      invalidatesTags: [ETagTypes.articles],
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          Router.push(ROUTES.ADMIN_ARTICLES.PATHNAME);
          notification.success({
            message: "Статья создана",
          });
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useLazyGetArticlesQuery,
  useCreateArticleMutation,
  useGetArticleQuery,
} = articlesApi;

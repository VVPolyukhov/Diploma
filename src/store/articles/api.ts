import { notification } from "antd";
import { ROUTES } from "constants/shared/routes";
import Router from "next/router";
import { ETagTypes } from "store/api/types";
import { TRootState } from "store/types";
import { api } from "../api";
import { getArticlesList } from "./selectors";
import { setArticlesList, setArticlesTotalCount } from "./slice";

export const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (params) => ({
        url: "article",
        params,
        method: "get",
      }),
      onQueryStarted: async (arg, api) => {
        try {
          const { data } = await api.queryFulfilled;
          const state = api.getState() as TRootState;
          const prevState = getArticlesList(state);
          const newData = [...(prevState || []), ...data.result];
          if (newData.length <= data.totalCount) {
            api.dispatch(setArticlesList(newData));
            api.dispatch(setArticlesTotalCount(data.totalCount));
          }
        } catch (error) {}
      },
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
    editArticle: builder.mutation({
      query: (body) => ({
        url: "article",
        body,
        method: "put",
      }),
      invalidatesTags: [ETagTypes.articles],
      onQueryStarted: async (arg, api) => {
        try {
          await api.queryFulfilled;
          Router.push(ROUTES.ADMIN_ARTICLES.PATHNAME);
          notification.success({
            message: "Статья изменена",
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
  useEditArticleMutation,
} = articlesApi;

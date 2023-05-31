import { api } from "../api";

export const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getArticles: builder.query({
      query: (body) => ({
        url: "article",
        method: "get",
      }),
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
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useLazyGetArticlesQuery,
  useCreateArticleMutation,
  useGetArticleQuery,
} = articlesApi;

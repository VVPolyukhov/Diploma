import { TRootState } from "store/types";

export const getArticlesPagination = (state: TRootState) =>
  state.articles.pagination;

export const getArticlesList = (state: TRootState) => state.articles.list;
export const getArticlesTotalCount = (state: TRootState) =>
  state.articles.totalCount;

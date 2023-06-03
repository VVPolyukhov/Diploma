import { createSlice } from "@reduxjs/toolkit";
import { IArticleSlice } from "./types";

const ARTICLES_SLICE_ALIAS = "articles";
const initialState: IArticleSlice = {
  list: null,
  pagination: { limit: 5, offset: 0 },
  totalCount: null,
};

export const articlesSlice = createSlice({
  name: ARTICLES_SLICE_ALIAS,
  initialState,
  reducers: {
    setArticlesList: (
      state,
      { payload }: { payload: IArticleSlice["list"] }
    ) => {
      state.list = payload;
    },
    setArticlesPagination: (
      state,
      { payload }: { payload: IArticleSlice["pagination"] }
    ) => {
      state.pagination = payload;
    },
    setArticlesTotalCount: (
      state,
      { payload }: { payload: IArticleSlice["totalCount"] }
    ) => {
      state.totalCount = payload;
    },
    clearArticlesSlice: () => initialState,
  },
});

export const {
  setArticlesPagination,
  setArticlesList,
  clearArticlesSlice,
  setArticlesTotalCount,
} = articlesSlice.actions;

export default articlesSlice.reducer;

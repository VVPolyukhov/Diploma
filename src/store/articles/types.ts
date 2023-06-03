import { IArticleItem } from "components/tree/Articles/Card";

export interface IArticleSlice {
  list: IArticleItem[] | null;
  pagination: {
    offset: number;
    limit: number;
  };
  totalCount: number | null;
}

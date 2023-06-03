import Button from "components/kit/Button";
import Spinner from "components/shared/Spinner";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetArticlesQuery } from "store/articles/api";
import {
  getArticlesList,
  getArticlesPagination,
  getArticlesTotalCount,
} from "store/articles/selectors";
import {
  clearArticlesSlice,
  setArticlesPagination,
} from "store/articles/slice";
import ArticleCard, { IArticleItem } from "../../Card";
import styles from "./index.module.scss";

interface IProps {
  className?: string;
}
const ReducedArticlesList: React.FC<IProps> = ({ className }) => {
  const dispatch = useDispatch();

  const pagination = useSelector(getArticlesPagination);
  const totalCount = useSelector(getArticlesTotalCount);
  const articles = useSelector(getArticlesList);

  const [lazyGetArticles, { isLoading }] = useLazyGetArticlesQuery();

  useEffect(() => {
    lazyGetArticles(pagination);

    return () => {
      dispatch(clearArticlesSlice());
    };
  }, []);

  const loadMore = () => {
    const newPagination = {
      ...pagination,
      offset: pagination.limit + pagination.offset,
    };
    lazyGetArticles(newPagination);
    dispatch(setArticlesPagination(newPagination));
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {isLoading ? (
        <Spinner margin="30px auto" />
      ) : (
        articles?.map((item: IArticleItem) => (
          <ArticleCard key={item.id} {...item} />
        ))
      )}
      {(articles?.length || 0) < (totalCount || 0) && (
        <Button type="ghost" className={styles.moreButton} onClick={loadMore}>
          Показать
          <br />
          больше
        </Button>
      )}
    </div>
  );
};

export default ReducedArticlesList;

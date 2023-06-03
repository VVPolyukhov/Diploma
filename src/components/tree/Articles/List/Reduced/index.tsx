import Spinner from "components/shared/Spinner";
import React from "react";
import { useGetArticlesQuery } from "store/articles/api";
import ArticleCard, { IArticleItem } from "../../Card";
import styles from "./index.module.scss";

interface IProps {
  className?: string;
}
const ReducedArticlesList: React.FC<IProps> = ({ className }) => {
  const { data, isLoading } = useGetArticlesQuery({});

  return (
    <div className={`${styles.root} ${className}`}>
      {isLoading ? (
        <Spinner margin="30px auto" />
      ) : (
        data?.result?.map((item: IArticleItem) => (
          <ArticleCard key={item.id} {...item} />
        ))
      )}
    </div>
  );
};

export default ReducedArticlesList;

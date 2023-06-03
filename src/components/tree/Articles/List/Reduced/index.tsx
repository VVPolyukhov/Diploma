import Spinner from "components/shared/Spinner";
import { useRouter } from "next/router";
import React from "react";
import { useGetArticlesQuery } from "store/articles/api";
import styles from "./index.module.scss";

interface IProps {}
const ReducedArticlesList: React.FC<IProps> = () => {
  const router = useRouter();
  const { data, isLoading } = useGetArticlesQuery({});

  return (
    <div className={styles.root}>
      {isLoading ? (
        <Spinner margin="30px auto" />
      ) : (
        data?.result?.map(({ id, title, authorShortModel }: any) => (
          <div
            key={id}
            className={styles.card}
            onClick={() => router.push(`/articles/${id}`)}
          >
            <h4 className={styles.title}>{title}</h4>
            <span className={styles.author}>
              {authorShortModel.firstLastName}
            </span>
          </div>
        ))
      )}
    </div>
  );
};

export default ReducedArticlesList;

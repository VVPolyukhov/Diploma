import { IAuthorShortModel } from "components/tree/Admin/Events";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.scss";

export interface IArticleItem {
  id: string;
  title: string;
  authorShortModel: {
    id: string;
    firstLastName: string;
  };
  courseInfoShortForArticleResponseDto: {
    id: string;
    title: string;
    authorShortModel: IAuthorShortModel;
  }[];
}

interface IProps extends IArticleItem {}
const ArticleCard: React.FC<IProps> = ({ id, authorShortModel, title }) => {
  const router = useRouter();
  return (
    <div
      key={id}
      className={styles.card}
      onClick={() => router.push(`/articles/${id}`)}
    >
      <h4 className={styles.title}>{title}</h4>
      <span className={styles.author}>{authorShortModel.firstLastName}</span>
    </div>
  );
};

export default ArticleCard;

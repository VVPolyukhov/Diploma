import React from "react";
import styles from "./index.module.scss";

interface IProps {}
const ReducedArticlesList: React.FC<IProps> = () => {
  const items = [
    {
      id: 1,
      title: "Как создать востребованный продукт?",
      firstname: "Илья",
      lastname: "Руденко",
    },
    {
      id: 2,
      title: "Продажи на высокий чек",
      firstname: "Эльвира",
      lastname: "Смирнова",
    },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ id, title, firstname, lastname }) => (
        <div key={id} className={styles.card}>
          <h4 className={styles.title}>{title}</h4>
          <span className={styles.author}>{`${firstname} ${lastname}`}</span>
        </div>
      ))}
    </div>
  );
};

export default ReducedArticlesList;

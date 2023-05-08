import React from "react";
import styles from "./index.module.scss";

interface IProps {}
const ReducedArticlesList: React.FC<IProps> = () => {
  const items = [
    {
      id: 1,
      title: "AMF. Что это такое и с чем его едят?",
      background: "#D5E8FF",
    },
    {
      id: 2,
      title: "Маркетинг. Будущее сферы",
      background: "#D5E8FF",
    },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ id, title, background }) => (
        <div style={{ background }} key={id} className={styles.card}>
          <h5>{title}</h5>
        </div>
      ))}
    </div>
  );
};

export default ReducedArticlesList;

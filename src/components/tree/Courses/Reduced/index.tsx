import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import dataImage from "images/Data.png";
import searchImage from "images/Search.png";
import financeImage from "images/Finance.png";
import vlogImage from "images/Vlog.png";

interface IProps {}
const ReducedCoursesList: React.FC<IProps> = () => {
  const items = [
    {
      id: 1,
      title: "Мои курсы",
      image: dataImage,
    },
    {
      id: 4,
      title: "Продюсирование",
      image: vlogImage,
    },
    {
      id: 2,
      title: "SMM",
      image: searchImage,
    },
    {
      id: 3,
      title: "Продажи",
      image: financeImage,
    },
  ];

  return (
    <div className={styles.root}>
      {items.map(({ id, image, title }) => (
        <div className={styles.card} key={id}>
          <div className={styles.imageWrapper}>
            <Image alt={title} src={image} fill />
          </div>
          <h2 className={styles.title}>{title}</h2>
        </div>
      ))}
    </div>
  );
};

export default ReducedCoursesList;

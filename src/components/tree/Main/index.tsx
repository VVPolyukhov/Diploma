import Button from "components/kit/Button";
import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React from "react";
import network1 from "images/Network1.png";
import styles from "./index.module.scss";
import Image from "next/image";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      {/* TODO: Collapse antd */}
      <CommonTag>Статьи</CommonTag>
      <ReducedArticlesList />

      {/* TODO: Collapse antd */}
      <CommonTag>Курсы</CommonTag>
      <ReducedCoursesList />

      <CommonTag>Нетворкинг-мероприятия</CommonTag>
      <div className={styles.events}>
        <div className={styles.event}>
          <div className={styles.content}>
            <h1>SMM</h1>
            <h3>6 июня в 18:00 по МСК </h3>
            <div>
              <h5>Осталось 10/20 мест</h5>
              <Button type="primary" className={styles.btn}>
                Зарегистрироваться
              </Button>
            </div>
          </div>
          <div className={styles.img}>
            <Image src={network1} alt="" width={300} height={300} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivateHome;

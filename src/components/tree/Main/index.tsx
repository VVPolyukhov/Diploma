import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React from "react";
import styles from './index.module.scss';

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
    </div>
  );
};

export default PrivateHome;

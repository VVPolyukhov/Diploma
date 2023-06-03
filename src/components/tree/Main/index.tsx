import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React from "react";
import styles from "./index.module.scss";
import ReducedEventsList from "../Events/List/Reduced";
import { useGetEventsQuery } from "store/events/api";
import { getArticlesList } from "store/articles/selectors";
import { useSelector } from "react-redux";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  const { data: events } = useGetEventsQuery({});

  const articles = useSelector(getArticlesList);

  return (
    <div className={styles.root}>
      {articles?.length !== 0 ? (
        <>
          <CommonTag>Статьи</CommonTag>
          <ReducedArticlesList />
        </>
      ) : null}

      {events?.result?.length ? (
        <>
          <CommonTag>Нетворкинг-мероприятия</CommonTag>
          <ReducedEventsList />
        </>
      ) : null}

      <CommonTag>Курсы</CommonTag>
      <ReducedCoursesList />
    </div>
  );
};

export default PrivateHome;

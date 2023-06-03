import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React from "react";
import styles from "./index.module.scss";
import EventsList from "../Events/List";
import { useGetEventsQuery } from "store/events/api";
import { useGetArticlesQuery } from "store/articles/api";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  const { data: events } = useGetEventsQuery({});
  const { data: articles } = useGetArticlesQuery({});
  return (
    <div className={styles.root}>
      {articles?.result?.length ? (
        <>
          <CommonTag>Статьи</CommonTag>
          <ReducedArticlesList />
        </>
      ) : null}

      {events?.result?.length ? (
        <>
          <CommonTag>Нетворкинг-мероприятия</CommonTag>
          <EventsList />
        </>
      ) : null}

      <CommonTag>Курсы</CommonTag>
      <ReducedCoursesList />
    </div>
  );
};

export default PrivateHome;

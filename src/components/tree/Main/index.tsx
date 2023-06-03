import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React from "react";
import styles from "./index.module.scss";
import EventsList from "../Events/List";
import { useGetEventsQuery } from "store/events/api";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  const { data: events } = useGetEventsQuery({});
  return (
    <div className={styles.root}>
      <CommonTag>Статьи</CommonTag>
      <ReducedArticlesList />

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

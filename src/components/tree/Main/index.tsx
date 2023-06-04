import CommonTag from "components/shared/CommonTag";
import ReducedArticlesList from "components/tree/Articles/List/Reduced";
import ReducedCoursesList from "components/tree/Courses/Reduced";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import ReducedEventsList from "../Events/List/Reduced";
import { useGetEventsQuery } from "store/events/api";
import { getArticlesList } from "store/articles/selectors";
import { useDispatch, useSelector } from "react-redux";
import { getNeedToGetUser } from "store/auth/selectors";
import { useLazyGetUserQuery } from "store/user/api";
import { setNeedToGetUser } from "store/auth/slice";

interface IProps {}
const PrivateHome: React.FC<IProps> = () => {
  const dispatch = useDispatch();
  const { data: events } = useGetEventsQuery({});

  const needToGetUser = useSelector(getNeedToGetUser);
  const [getUser] = useLazyGetUserQuery();

  useEffect(() => {
    if (needToGetUser) {
      getUser({});
      dispatch(setNeedToGetUser(false));
    }
  }, [needToGetUser]);

  const articles = useSelector(getArticlesList);

  return (
    <div className={styles.root}>
      {articles?.length !== 0 ? (
        <>
          <CommonTag>Статьи</CommonTag>
          <ReducedArticlesList />
        </>
      ) : null}

      {events?.result?.length !== 0 ? (
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

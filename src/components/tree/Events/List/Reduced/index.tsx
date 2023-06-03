import Spinner from "components/shared/Spinner";
import React from "react";
import { useGetEventsQuery } from "store/events/api";
import styles from "./index.module.scss";
import EventsCard, { IEventItem } from "../../Card";

interface IProps {}
const ReducedEventsList: React.FC<IProps> = () => {
  const { data, isLoading } = useGetEventsQuery({});

  if (isLoading) {
    return <Spinner margin="30px auto" />;
  }

  return (
    <div className={styles.events}>
      {data?.result.map((item: IEventItem) => {
        if (item.numberOfAvailableSeats > 0) return <EventsCard {...item} />;
        return null;
      })}
    </div>
  );
};

export default ReducedEventsList;

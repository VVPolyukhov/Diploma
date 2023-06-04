import Spinner from "components/shared/Spinner";
import React from "react";
import { useGetEventsQuery } from "store/events/api";
import styles from "./index.module.scss";
import EventsCard, { IEventItem } from "../../Card";

interface IProps {}
const ReducedEventsList: React.FC<IProps> = () => {
  const { data, isLoading } = useGetEventsQuery({});

  return (
    <div className={styles.events}>
      {isLoading ? (
        <Spinner margin="100px auto" />
      ) : (
        data?.result.map((item: IEventItem) => {
          if (item.numberOfAvailableSeats > 0)
            return <EventsCard key={item.id} {...item} />;
          return null;
        })
      )}
    </div>
  );
};

export default ReducedEventsList;

import Button from "components/kit/Button";
import Spinner from "components/shared/Spinner";
import Image from "next/image";
import React from "react";
import { useGetEventsQuery } from "store/events/api";
import styles from "./index.module.scss";
import { convertDate } from "utils/shared/date";

interface IProps {}
const EventsList: React.FC<IProps> = () => {
  const { data, isLoading } = useGetEventsQuery({});
  console.log("data", data);

  //   const mockIndex = 3; // -4932450434334466000

  //   const mock = data?.result[mockIndex];
  //   console.log("mock", mock);

  //   const { data: avatar } = useGetEventAvatarQuery(
  //     { id: mock?.id },
  //     {
  //       skip: !mock?.id,
  //     }
  //   );
  //   console.log("avatar", avatar);

  if (isLoading) {
    return <Spinner margin="30px auto" />;
  }

  return (
    <div className={styles.events}>
      {/* TODO: Сделать в одну строчку */}
      {data?.result.map(
        ({
          id,
          title,
          startTime,
          numberOfAvailableSeats,
          maximumNumberOfParticipants,
          image,
        }: any) => {
          if (numberOfAvailableSeats > 0)
            return (
              <div className={styles.event} key={id}>
                <div className={styles.content}>
                  <h2>{title}</h2>
                  <span className={styles.time}>
                    {convertDate(startTime, {
                      format: "D MMMM в HH:mm",
                    })}{" "}
                    по МСК{" "}
                  </span>
                  <div className={styles.target}>
                    <Button size="large" type="primary" className={styles.btn}>
                      Зарегистрироваться
                    </Button>
                    <span className={styles.seats}>
                      Осталось {numberOfAvailableSeats}/
                      {maximumNumberOfParticipants} мест
                    </span>
                  </div>
                </div>
                <div className={styles.img}>
                  <Image
                    src={`data:image/png;base64,${image}`}
                    alt="Фотография автора"
                    width={300}
                    height={270}
                  />
                </div>
              </div>
            );
          return null;
        }
      )}
    </div>
  );
};

export default EventsList;

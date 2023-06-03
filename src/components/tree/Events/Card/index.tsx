import Button from "components/kit/Button";
import Image from "next/image";
import React from "react";
import { convertDate } from "utils/shared/date";
import styles from "./index.module.scss";

export interface IEventItem {
  id: string;
  title: string;
  startTime: string;
  image: string;
  status: TEventsStatuses;
  numberOfAvailableSeats: number;
  maximumNumberOfParticipants: number;
}

export enum EEventsStatuses {
  TO_BE = "TO_BE",
  IN_PROCESS = "IN_PROCESS",
  PASSED = "PASSED",
}
export type TEventsStatuses = `${EEventsStatuses}`;

interface IProps extends IEventItem {}
const EventsCard: React.FC<IProps> = ({
  id,
  title,
  status,
  image,
  maximumNumberOfParticipants,
  numberOfAvailableSeats,
  startTime,
}) => {
  return (
    <div className={styles.event} key={id}>
      <div className={styles.content}>
        <h2>{title}</h2>
        <span className={styles.time}>
          {convertDate(startTime, {
            format: "D MMMM в HH:mm",
          })}{" "}
          по МСК
        </span>
        <div className={styles.target}>
          <Button
            disabled={status === "PASSED"}
            size="large"
            type="primary"
            className={styles.btn}
          >
            {status !== "PASSED" ? "Зарегистрироваться" : "Мероприятие прошло"}
          </Button>
          {status !== "PASSED" && (
            <span className={styles.seats}>
              Осталось {numberOfAvailableSeats}/{maximumNumberOfParticipants}{" "}
              мест
            </span>
          )}
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
};

export default EventsCard;

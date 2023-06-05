import Button from "components/kit/Button";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useRegisterEventMutation } from "store/events/api";
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
  durationOfEvent: any;
  eventSubscriptionFlag: boolean;
  link: string;
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
  eventSubscriptionFlag,
  link,
}) => {
  const router = useRouter();

  let btnText;
  if (status === "PASSED") {
    btnText = "Мероприятие прошло";
  } else if (eventSubscriptionFlag) {
    if (status === "IN_PROCESS") {
      btnText = "Перейти на мероприятие";
    }
    if (status === "TO_BE") {
      btnText = "Вы уже зарегистрированы";
    }
  } else {
    btnText = "Зарегистрироваться";
  }

  const [register] = useRegisterEventMutation();

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
            disabled={
              status === "PASSED" ||
              (eventSubscriptionFlag && status !== "IN_PROCESS")
            }
            size="large"
            type="primary"
            className={styles.btn}
            onClick={() => {
              if (!eventSubscriptionFlag) {
                register(id);
              } else {
                if (status === "IN_PROCESS") {
                  router.push(link);
                }
              }
            }}
          >
            {btnText}
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

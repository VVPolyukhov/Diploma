import { DatePicker, Form, Input, InputNumber } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { TComponentModes } from "constants/shared/components";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React from "react";
import { useCreateEventMutation, useGetEventQuery } from "store/events/api";
import styles from "./index.module.scss";

interface IProps {
  mode?: TComponentModes;
}
const AdminEventsItem: React.FC<IProps> = ({ mode = "edit" }) => {
  const router = useRouter();

  const { data, isLoading } = useGetEventQuery(
    { id: router.query.id },
    {
      skip: !router.query.id,
    }
  );
  console.log("data", data);

  const [createEvent, { isLoading: isCreationLoading }] =
    useCreateEventMutation();

  const onFinish = (values: any) => {
    values = { ...values, startTime: dayjs(values.startTime).format() };
    if (mode === "create") {
      createEvent(values);
    }
  };

  return (
    <div className={styles.root}>
      <Header
        title={`${
          mode === "create" ? "Создание" : "Редактирование"
        } нетворкинг-мероприятия`}
        goBackButton
        additionalContent={
          <Button type="primary" onClick={onFinish} loading={isCreationLoading}>
            Сохранить
          </Button>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Form onFinish={onFinish}>
          <Form.Item required name="title" label="Заголовок">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
          <Form.Item required name="link" label="Ссылка">
            <Input />
          </Form.Item>
          <Form.Item required name="startTime" label="Начало мероприятия">
            <DatePicker showTime />
          </Form.Item>
          <Form.Item
            required
            name="maximumNumberOfParticipants"
            label="Максимальное количество участников"
          >
            <InputNumber />
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default AdminEventsItem;

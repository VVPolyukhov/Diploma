import { DatePicker, Form, Input, InputNumber } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import { TComponentModes } from "constants/shared/components";
import dayjs from "dayjs";
import React from "react";
import { useCreateEventMutation } from "store/events/api";
import styles from "./index.module.scss";

interface IProps {
  mode?: TComponentModes;
}
const AdminEventsItem: React.FC<IProps> = ({ mode = "edit" }) => {
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
      />
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
        <Form.Item>
          <Button
            loading={isCreationLoading}
            size="large"
            type="primary"
            htmlType="submit"
          >
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminEventsItem;

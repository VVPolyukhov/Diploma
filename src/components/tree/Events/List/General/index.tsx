import { Checkbox, DatePicker, Form, Select } from "antd";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import React, { useState } from "react";
import { useGetEventsQuery } from "store/events/api";
import { TObject } from "utils/shared/url";
import EventsCard, { EEventsStatuses, IEventItem } from "../../Card";
import styles from "./index.module.scss";

interface IProps {}
const GeneralEventsList: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const [filters, setFilters] = useState<TObject>({});

  const { data, isLoading } = useGetEventsQuery(filters);

  return (
    <div className={styles.root}>
      <Header title={"Нетворкинг-мероприятия"} />
      <Form
        form={form}
        layout="inline"
        size="large"
        onValuesChange={(values) => setFilters(values)}
      >
        <Form.Item name="status" label="Статус">
          <Select
            allowClear
            style={{ width: "200px" }}
            options={[
              { label: "Будущие мероприятия", value: EEventsStatuses.TO_BE },
              {
                label: "Текущие мероприятия",
                value: EEventsStatuses.IN_PROCESS,
              },
              { label: "Прошедшие мероприятия", value: EEventsStatuses.PASSED },
            ]}
          />
        </Form.Item>
        <Form.Item name="authors" label="Авторы">
          <Select style={{ width: "200px" }} />
        </Form.Item>
        <Form.Item name="period" label="Период">
          <DatePicker.RangePicker />
        </Form.Item>
        <Form.Item
          name="eventSubscriptionFlag"
          label="Мои мероприятия"
          valuePropName="checked"
        >
          <Checkbox />
        </Form.Item>
      </Form>
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <div className={styles.list}>
          {data?.result?.map((item: IEventItem) => {
            return <EventsCard key={item.id} {...item} />;
          })}
        </div>
      )}
    </div>
  );
};

export default GeneralEventsList;

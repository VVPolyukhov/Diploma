import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { PICKER_DATE_MASK_FULL_TIME } from "constants/shared/date";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGetEventsQuery } from "store/events/api";
import { convertDate } from "utils/shared/date";

interface IAuthorShortModel {
  id: React.Key;
  firstLastName: string;
}
interface IData {
  authorShortModel: IAuthorShortModel;
  description: string;
  id: number;
  link: string;
  maximumNumberOfParticipants: number;
  numberOfAvailableSeats: number;
  startTime: string;
  status: "TO_BE";
  title: string;
}

interface IProps {}
const AdminEvents: React.FC<IProps> = () => {
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const { data, isLoading } = useGetEventsQuery({});

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      Table.SELECTION_NONE,
    ],
  };

  const columns = [
    {
      title: "Название",
      dataIndex: "title",
    },
    {
      title: "Описание",
      dataIndex: "description",
    },
    {
      title: "Автор",
      dataIndex: "authorShortModel",
      render: (value: IAuthorShortModel) => value.firstLastName,
    },
    {
      title: "Статус",
      dataIndex: "status",
    },
    {
      title: "Ссылка",
      dataIndex: "link",
    },
    {
      title: "Время начала",
      dataIndex: "startTime",
      render: (value: string) =>
        convertDate(value, { format: PICKER_DATE_MASK_FULL_TIME }),
    },
    {
      title: "Максимальное количество участников",
      dataIndex: "maximumNumberOfParticipants",
    },
    {
      title: "Количество свободных мест",
      dataIndex: "numberOfAvailableSeats",
    },
  ];

  return (
    <>
      <Header
        title="Нетворкинг-мероприятия"
        additionalContent={
          <>
            <Button
              icon={<DeleteOutlined />}
              danger
              disabled={!selectedRowKeys.length}
            />
            <Button
              type="primary"
              onClick={() => router.push(ROUTES.ADMIN_EVENTS_CREATE.PATHNAME)}
            >
              Создать
            </Button>
          </>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.result}
          pagination={false}
        />
      )}
    </>
  );
};

export default AdminEvents;

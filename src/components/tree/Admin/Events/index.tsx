import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";

interface IProps {}
const AdminEvents: React.FC<IProps> = () => {
  const router = useRouter();

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

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
      dataIndex: "authorFirstLastNames",
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

  const dataSource = [
    {
      key: 1,
      title: "string",
      description: "string",
      link: "string",
      status: "Мероприятие прошло",
      startTime: "2023-05-30T20:31:00.872Z",
      maximumNumberOfParticipants: 20,
      numberOfAvailableSeats: 1,
    },
    {
      key: 2,
      title: "string",
      description: "string",
      link: "string",
      startTime: "2023-05-30T20:31:00.872Z",
      maximumNumberOfParticipants: 7,
      numberOfAvailableSeats: 4,
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataSource}
        pagination={false}
      />
    </>
  );
};

export default AdminEvents;

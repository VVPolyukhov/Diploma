import {  Table, Tag, Tooltip } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import React, { useState } from "react";
import CouresesAppointmentModal from "./CoursesAppointment";
import styles from "./index.module.scss";

interface IProps {}
const UsersAdmin: React.FC<IProps> = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      title: "Фамилия",
      dataIndex: "surname",
    },
    {
      title: "Имя",
      dataIndex: "name",
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
    },
    {
      title: "Курсы",
      dataIndex: "courses",
      render: (values: string[]) =>
        values.map((e: string, i: number) => <Tag key={i}>{e}</Tag>),
    },
  ];

  const dataSource = [
    {
      key: 1,
      name: "Сергей",
      surname: "Павлов",
      email: "pavlovsr@gmail.com",
      courses: ["Маркетинг"],
    },
    {
      key: 2,
      name: "Михаил",
      surname: "Петряйкин",
      email: "masdj@gmail.com",
      courses: [],
    },
    {
      key: 3,
      name: "Елизавета",
      surname: "Петрова",
      email: "petelis@gmail.com",
      courses: ["Маркетинг", "СММ"],
    },
  ];

  const renderButton = () => {
    return (
      <Button
        type="primary"
        disabled={!selectedRowKeys.length}
        onClick={() => setIsModalOpen(true)}
      >
        Назначить курс
      </Button>
    );
  };

  return (
    <>
      <CouresesAppointmentModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Header
        title="Пользователи"
        additionalContent={
          selectedRowKeys.length ? (
            renderButton()
          ) : (
            <Tooltip title="Для назначения курса необходимо выбрать пользователей">
              {renderButton()}
            </Tooltip>
          )
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

export default UsersAdmin;

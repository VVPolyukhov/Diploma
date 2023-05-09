import { Button, Table, Tag, Tooltip } from "antd";
import React, { useState } from "react";
import styles from "./index.module.scss";

interface IProps {}
const UsersAdmin: React.FC<IProps> = () => {
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

  const dataIndex = [
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
        onClick={() => {}}
      >
        Назначить курс
      </Button>
    );
  };

  return (
    <>
      <div className={styles.header}>
        <h2>Пользователи</h2>
        {selectedRowKeys.length ? (
          renderButton()
        ) : (
          <Tooltip title="Для назначения курса необходимо выбрать пользователей">
            {renderButton()}
          </Tooltip>
        )}
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={dataIndex}
        pagination={false}
      />
    </>
  );
};

export default UsersAdmin;

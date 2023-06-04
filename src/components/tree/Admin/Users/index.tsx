import { Table, Tooltip } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import React, { useState } from "react";
import { useGetUsersQuery } from "store/user/api";
import CouresesAppointmentModal from "./CoursesAppointment";

interface IProps {}
const UsersAdmin: React.FC<IProps> = () => {
  const { data, isLoading } = useGetUsersQuery({});

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);

  const onSelectChange = (newSelectedRowKeys: string[]) => {
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
      dataIndex: "lastName",
    },
    {
      title: "Имя",
      dataIndex: "firstName",
    },
    {
      title: "Электронная почта",
      dataIndex: "email",
    },
    // {
    //   title: "Курсы",
    //   dataIndex: "courses",
    //   render: (values: string[]) =>
    //     values.map((e: string, i: number) => <Tag key={i}>{e}</Tag>),
    // },
    {
      title: "Город",
      dataIndex: "city",
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
        selectedRowKeys={selectedRowKeys}
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
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Table
          rowKey={"id"}
          // @ts-ignore
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data?.result}
          pagination={false}
        />
      )}
    </>
  );
};

export default UsersAdmin;

import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IAuthorShortModel } from "../../Events";

interface IProps {}
const AdminCoursesList: React.FC<IProps> = () => {
  const router = useRouter();

  const isLoading = false;
  const data = { result: [] };
  //   const { data, isLoading } = useGetUsersQuery({});

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
      dataIndex: "authorShortModel",
      render: (value: IAuthorShortModel) => value.firstLastName,
    },
  ];

  return (
    <>
      <Header
        title="Курсы"
        additionalContent={
          <>
            <Button
              icon={<DeleteOutlined />}
              danger
              disabled={!selectedRowKeys.length}
            />
            <Button
              type="primary"
              onClick={() => router.push(ROUTES.ADMIN_COURSES_CREATE.PATHNAME)}
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
          dataSource={data?.result}
          pagination={false}
        />
      )}
    </>
  );
};

export default AdminCoursesList;

import { DeleteOutlined } from "@ant-design/icons";
import { Table } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { coursesCategory, TCoursesCategory } from "constants/modules/courses";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGetCoursesQuery } from "store/courses/api";
import { IAuthorShortModel } from "../../Events";

interface IProps {}
const AdminCoursesList: React.FC<IProps> = () => {
  const router = useRouter();

  const { data, isLoading } = useGetCoursesQuery({});

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
    {
      title: "Категория",
      dataIndex: "category",
      render: (value: TCoursesCategory) => coursesCategory[value],
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
          onRow={({ id }) => {
            return {
              onClick: () => {
                router.push({
                  pathname: `/admin/courses/${id}`,
                });
              },
            };
          }}
        />
      )}
    </>
  );
};

export default AdminCoursesList;

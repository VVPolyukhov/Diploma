import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useGetArticlesQuery } from "store/articles/api";
import styles from "./index.module.scss";

interface IProps {}
const ArticlesListAdmin: React.FC<IProps> = () => {
  const router = useRouter();

  const { data, isLoading } = useGetArticlesQuery({ limit: 9999 });

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
      title: "Автор",
      dataIndex: "authorShortModel",
      render: (value: { id: string; firstLastName: string }) => {
        return value.firstLastName;
      },
    },
    // {
    //   title: "Дата создания",
    //   dataIndex: "creation_date",
    // },
    {
      title: "Теги",
      dataIndex: "tags",
      render: (values: string[]) =>
        ["Продажи", "Взаимодействие с клиентами"].map(
          (e: string, i: number) => <Tag key={i}>{e}</Tag>
        ),
    },
  ];

  return (
    <>
      <Header
        title="Статьи"
        additionalContent={
          <>
            <Button
              icon={<DeleteOutlined />}
              danger
              disabled={!selectedRowKeys.length}
            />
            <Button
              type="primary"
              onClick={() => router.push(ROUTES.ADMIN_ARTICLES_CREATE.PATHNAME)}
            >
              Создать
            </Button>
          </>
        }
      />
      {isLoading ? (
        <Spinner margin="150px auto" />
      ) : (
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.result}
          pagination={false}
          onRow={({ id }) => {
            return {
              onClick: () => {
                router.push({
                  pathname: `/admin/articles/${id}`,
                });
              },
            };
          }}
        />
      )}
    </>
  );
};

export default ArticlesListAdmin;

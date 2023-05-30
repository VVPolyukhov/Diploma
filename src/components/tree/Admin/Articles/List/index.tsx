import { DeleteOutlined } from "@ant-design/icons";
import { Table, Tag } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./index.module.scss";

interface IProps {}
const ArticlesListAdmin: React.FC<IProps> = () => {
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
      dataIndex: "name",
    },
    {
      title: "Автор",
      dataIndex: "author",
    },
    {
      title: "Дата создания",
      dataIndex: "creation_date",
    },
    {
      title: "Теги",
      dataIndex: "tags",
      render: (values: string[]) =>
        values.map((e: string, i: number) => <Tag key={i}>{e}</Tag>),
    },
  ];

  const dataSource = [
    {
      key: 1,
      name: "Как создать востребованный продукт?",
      author: "Павлов Александр",
      creation_date: "02.05.2023",
      tags: ["Продукт"],
    },
    {
      key: 2,
      name: "Продажи на высокий чек",
      author: "Смирнова Екатерина",
      creation_date: "01.05.2023",
      tags: ["Продажи", "Взаимодействие с клиентами"],
    },
  ]

  return (
    <>
      <Header
        title="Статьи"
        additionalContent={
          <>
          <Button icon={<DeleteOutlined />} danger disabled={!selectedRowKeys.length} />
          <Button
            type="primary"
            onClick={() => router.push(ROUTES.ADMIN_ARTICLES_CREATE.PATHNAME)}
            >
            Создать
          </Button>
            </>
        }
      />
      <Table rowSelection={rowSelection} columns={columns} dataSource={dataSource} pagination={false} />
    </>
  );
};

export default ArticlesListAdmin;

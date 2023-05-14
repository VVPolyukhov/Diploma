// @ts-nocheck
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Table, Tag } from "antd";
import Header from "components/shared/Header";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArticles } from "./help";

interface IProps {}
const ArticlesListAdmin: React.FC<IProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch()

  const dataSource = useSelector(getArticles)

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

  const onDelete = () => {
    dispatch(deleteArticles(selectedRowKeys))
  }

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


  return (
    <>
      <Header
        title="Статьи"
        additionalContent={
          <>
          <Button icon={<DeleteOutlined />} danger disabled={!selectedRowKeys.length} onClick={onDelete} />
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

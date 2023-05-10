import { Button, Table } from "antd";
import Header from "components/shared/Header";
import { ROUTES } from "constants/shared/routes";
import { useRouter } from "next/router";
import React from "react";
import styles from "./index.module.scss";

interface IProps {}
const ArticlesListAdmin: React.FC<IProps> = () => {
  const router = useRouter();

  return (
    <>
      <Header
        title="Статьи"
        additionalContent={
          <Button
            type="primary"
            onClick={() => router.push(ROUTES.ADMIN_ARTICLES_CREATE.PATHNAME)}
          >
            Создать
          </Button>
        }
      />
      <Table />
    </>
  );
};

export default ArticlesListAdmin;

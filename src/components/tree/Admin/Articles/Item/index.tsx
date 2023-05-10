import { Form, Input } from "antd";
import Header from "components/shared/Header";
import React from "react";
import RichEditor from "./Editor";
import styles from "./index.module.scss";

interface IProps {}
const ArticlesItemAdmin: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <Header title="Создание статьи" goBackButton  />
      <Form>
        <Form.Item name="title" label="Заголовок">
          <Input />
        </Form.Item>
      </Form>
      <RichEditor />
    </div>
  );
};

export default ArticlesItemAdmin;

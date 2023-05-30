import { Form, Input, Select } from "antd";
import Header from "components/shared/Header";
import React from "react";
import RichEditor from "./Editor";
import styles from "./index.module.scss";

const options = [
  {
    value: "Маркетинг",
    label: "Маркетинг",
  },
  {
    value: "Продукт",
    label: "Продукт",
  },
  {
    value: "СММ",
    label: "СММ",
  },
  {
    value: "Продажи",
    label: "Продажи",
  },
];

interface IProps {}
const ArticlesItemAdmin: React.FC<IProps> = () => {
  return (
    <div className={styles.root}>
      <Header title="Создание статьи" goBackButton />
      <Form>
        <Form.Item name="title" label="Заголовок">
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Теги">
          <Select mode="tags" options={options} />
        </Form.Item>
      </Form>

      <RichEditor />
    </div>
  );
};

export default ArticlesItemAdmin;

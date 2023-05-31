import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Select } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import { TComponentModes } from "constants/shared/components";
import React, { useRef } from "react";
import { useCreateArticleMutation } from "store/articles/api";
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

interface IProps {
  mode: TComponentModes;
}
const ArticlesItemAdmin: React.FC<IProps> = ({ mode = "edit" }) => {
  const [form] = Form.useForm();
  const editorRef = useRef<Editor | null>(null);

  const [createArticle, { isLoading }] = useCreateArticleMutation();

  const onFinish = () => {
    const values = form.getFieldsValue();
    const requestData = {
      title: values.title,
      // @ts-ignore
      textArticle: editorRef?.current?.getContent(),
    };
    createArticle(requestData);
  };

  return (
    <div className={styles.root}>
      <Header
        title={`${mode === "create" ? "Создание" : "Редактирование"} статьи`}
        goBackButton
        additionalContent={
          <Button type="primary" onClick={onFinish} loading={isLoading}>
            Сохранить
          </Button>
        }
      />
      <Form form={form}>
        <Form.Item required name="title" label="Заголовок">
          <Input />
        </Form.Item>
        <Form.Item name="tags" label="Теги">
          <Select mode="tags" options={options} />
        </Form.Item>
      </Form>

      <RichEditor editorRef={editorRef} />
    </div>
  );
};

export default ArticlesItemAdmin;

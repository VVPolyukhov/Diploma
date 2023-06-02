import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Select } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { TComponentModes } from "constants/shared/components";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import {
  useCreateArticleMutation,
  useGetArticleQuery,
} from "store/articles/api";
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
const ArticlesItemAdmin: React.FC<IProps> = ({ mode = "create" }) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const editorRef = useRef<Editor | null>(null);

  const { data, isLoading } = useGetArticleQuery(
    { articleId: router.query?.id },
    {
      skip: !router.query?.id,
    }
  );

  const [createArticle, { isLoading: isCreationLoading }] =
    useCreateArticleMutation();

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
          <Button type="primary" onClick={onFinish} loading={isCreationLoading}>
            Сохранить
          </Button>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <>
          <Form form={form}>
            <Form.Item required name="title" label="Заголовок">
              <Input />
            </Form.Item>
            <Form.Item name="tags" label="Теги">
              <Select mode="tags" options={options} />
            </Form.Item>
          </Form>

          <RichEditor editorRef={editorRef} />
        </>
      )}
    </div>
  );
};

export default ArticlesItemAdmin;

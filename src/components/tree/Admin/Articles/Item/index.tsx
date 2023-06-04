import { Editor } from "@tinymce/tinymce-react";
import { Form, Input } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { TComponentModes } from "constants/shared/components";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
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
      refetchOnMountOrArgChange: true,
      skip: !router.query?.id,
    }
  );

  const [createArticle, { isLoading: isCreationLoading }] =
    useCreateArticleMutation();
  const [editArticle, { isLoading: isEditLoading }] = useEditArticleMutation();

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = () => {
    const values = form.getFieldsValue();
    const requestData = {
      title: values.title,
      // @ts-ignore
      textArticle: editorRef?.current?.getContent(),
    };
    if (mode === "create") {
      createArticle(requestData);
    } else {
      editArticle({ ...requestData, id: router.query?.id });
    }
  };

  return (
    <div className={styles.root}>
      <Header
        title={`${mode === "create" ? "Создание" : "Редактирование"} статьи`}
        goBackButton
        additionalContent={
          <Button
            type="primary"
            onClick={onFinish}
            loading={isCreationLoading || isEditLoading}
          >
            Сохранить
          </Button>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <>
          <Form form={form} layout="vertical">
            <Form.Item required name="title" label="Заголовок">
              <Input />
            </Form.Item>
            {/* <Form.Item name="tags" label="Теги">
              <Select mode="tags" options={options} />
            </Form.Item> */}
          </Form>

          <RichEditor
            editorRef={editorRef}
            readonly={false}
            initialValue={data?.textArticle}
          />
        </>
      )}
    </div>
  );
};

export default ArticlesItemAdmin;

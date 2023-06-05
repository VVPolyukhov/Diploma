import { Editor } from "@tinymce/tinymce-react";
import { Form, Input, Select } from "antd";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { ICourseItem } from "components/tree/Courses/Item";
import { TComponentModes } from "constants/shared/components";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import {
  useCreateArticleMutation,
  useEditArticleMutation,
  useGetArticleQuery,
} from "store/articles/api";
import {
  useGetCoursesQuery,
  useLinkCourseWithArticleMutation,
} from "store/courses/api";
import RichEditor from "./Editor";
import styles from "./index.module.scss";

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

  const { data: coursesData, isLoading: isCoursesLoading } = useGetCoursesQuery(
    {
      limit: 9999,
    }
  );

  const [createArticle, { isLoading: isCreationLoading }] =
    useCreateArticleMutation();
  const [editArticle, { isLoading: isEditLoading }] = useEditArticleMutation();
  const [linking] = useLinkCourseWithArticleMutation();

  useEffect(() => {
    form.setFieldsValue(data);
    form.setFieldValue(
      "courses",
      data?.courseInfoShortForArticleResponseDto?.[0]?.id
    );
  }, [data]);

  const onFinish = async () => {
    const { courses: courseId, ...values } = form.getFieldsValue();
    const requestData = {
      title: values.title,
      // @ts-ignore
      textArticle: editorRef?.current?.getContent(),
    };

    let createdArticleId: any;
    if (mode === "create") {
      createdArticleId = await createArticle(requestData).unwrap();
    } else {
      editArticle({ ...requestData, id: router.query?.id });
    }

    if ((router.query?.id || createdArticleId) && courseId) {
      linking({
        articleId: router.query?.id || createdArticleId,
        courseId,
      });
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
      {isLoading || isCoursesLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <>
          <Form form={form} layout="vertical">
            <Form.Item required name="title" label="Заголовок">
              <Input />
            </Form.Item>
            <Form.Item name="courses" label="Курсы">
              <Select
                options={(coursesData?.result as ICourseItem[])?.map(
                  ({ title, id }) => ({
                    label: title,
                    value: id,
                  })
                )}
              />
            </Form.Item>
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

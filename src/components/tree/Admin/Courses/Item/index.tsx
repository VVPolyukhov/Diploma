import {
  InboxOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Form, Input, Select, Upload } from "antd";
import { RcFile } from "antd/es/upload";
import Button from "components/kit/Button";
import Header from "components/shared/Header";
import Spinner from "components/shared/Spinner";
import { ICourseChapter } from "components/tree/Courses/Item";
import { coursesCategoryOptions } from "constants/modules/courses";
import { TComponentModes } from "constants/shared/components";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  useCreateCourseMutation,
  useGetCourseQuery,
  useSetImageToCourseMutation,
} from "store/courses/api";
import styles from "./index.module.scss";

interface IProps {
  mode: TComponentModes;
}
const AdminCourseItem: React.FC<IProps> = ({ mode }) => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const { data, isLoading } = useGetCourseQuery(
    { id: router.query.id },
    {
      skip: !router.query.id,
    }
  );

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const [createCourse, { isLoading: isCreationLoading }] =
    useCreateCourseMutation();

  const [setCourseAvatar, { isLoading: isAvatarLoading }] =
    useSetImageToCourseMutation();

  useEffect(() => {
    form.setFieldsValue({ ...data });
  }, [data]);

  const onFinish = async () => {
    const { image, ...values } = form.getFieldsValue();
    console.log("values", values);
    const chapters = ((values.chapters as ICourseChapter[]) || []).map(
      (chapter, indexChapter) => {
        return {
          ...chapter,
          priorityNumberOfTheSectionInTheCourse: indexChapter,
          topics: (chapter.topics || []).map((topic, indexTopic) => {
            return {
              ...topic,
              priorityNumberOfTheSection: indexTopic,
            };
          }),
        };
      }
    );
    if (mode === "create") {
      try {
        const resultOfCreation = await createCourse({
          ...values,
          chapters,
          topics: [],
        }).unwrap();
        console.log("resultOfCreation", resultOfCreation);
        const formData = new FormData();
        formData.append("image", fileList[0]);
        setCourseAvatar({ id: resultOfCreation?.id, body: formData });
      } catch (error) {
        console.error("Oшибка при создании курса");
      }

      // const reader = new FileReader();
      // reader.onload = () => {
      //   const image = (reader.result as string).split(",")[1];
      //   createCourse({ ...values, image });
      // };
      // reader.readAsDataURL(fileList[0]);
    } else {
    }
  };

  const uploadHandler = (file: RcFile) => {
    setFileList([file]);
    return false;
  };

  const removeFile = () => {
    setFileList([]);
    return true;
  };

  const minusIconStyles: React.CSSProperties = { marginTop: 36, fontSize: 20 };
  return (
    <div className={styles.root}>
      <Header
        title={`${mode === "create" ? "Создание" : "Редактирование"} курса`}
        goBackButton
        additionalContent={
          <Button
            type="primary"
            onClick={onFinish}
            loading={isCreationLoading || isAvatarLoading}
          >
            Сохранить
          </Button>
        }
      />
      {isLoading ? (
        <Spinner margin="70px auto" />
      ) : (
        <Form form={form} layout="vertical">
          <Form.Item required name="category" label="Категория">
            <Select options={coursesCategoryOptions} />
          </Form.Item>
          <Form.Item required name="title" label="Заголовок">
            <Input />
          </Form.Item>
          <Form.Item required name="description" label="Описание">
            <Input.TextArea />
          </Form.Item>
          <Form.Item required name="linkPayment" label="Ссылка на оплату">
            <Input />
          </Form.Item>
          <Form.Item required label="Обложка" name="image">
            <Upload.Dragger
              fileList={fileList}
              beforeUpload={uploadHandler}
              onRemove={removeFile}
            >
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p>
                Перетащите файл в данную область, чтобы загрузить обложку курса
              </p>
            </Upload.Dragger>
          </Form.Item>
          <Form.List name="features">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    label={index === 0 ? "Преимущества" : ""}
                    required={false}
                    key={field.key}
                  >
                    <div className={styles.formItemList}>
                      <MinusCircleOutlined
                        style={{ fontSize: 20 }}
                        onClick={() => remove(field.name)}
                      />
                      <Form.Item {...field} noStyle>
                        <Input.TextArea />
                      </Form.Item>
                    </div>
                  </Form.Item>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Добавить преимущество
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.List name="chapters">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }, index) => (
                  <div key={key}>
                    <h6 style={{ marginBottom: "20px" }}>Раздел {index + 1}</h6>
                    <div className={styles.formItemList}>
                      <MinusCircleOutlined
                        style={minusIconStyles}
                        onClick={() => remove(name)}
                      />
                      <div className={styles.chaptersFormItemList}>
                        <div className={styles.chaptersLevelInfo}>
                          <Form.Item
                            {...restField}
                            label="Название"
                            name={[name, "title"]}
                            required
                          >
                            <Input />
                          </Form.Item>
                          <Form.Item
                            {...restField}
                            label="Описание"
                            name={[name, "description"]}
                            required
                          >
                            <Input.TextArea />
                          </Form.Item>
                        </div>

                        <Form.List name={[name, "topics"]}>
                          {(fields, { add, remove }) => (
                            <>
                              {fields.map(
                                ({ key, name, ...restField }, topicIndex) => (
                                  <div key={key}>
                                    <h6 style={{ marginBottom: "20px" }}>
                                      Тема {topicIndex + 1} раздела {index + 1}
                                    </h6>
                                    <div className={styles.formItemList}>
                                      <MinusCircleOutlined
                                        style={minusIconStyles}
                                        onClick={() => remove(name)}
                                      />
                                      <div className={styles.chaptersLevelInfo}>
                                        <Form.Item
                                          {...restField}
                                          label="Название"
                                          name={[name, "title"]}
                                          required
                                        >
                                          <Input />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          label="Описание"
                                          name={[name, "description"]}
                                          required
                                        >
                                          <Input.TextArea />
                                        </Form.Item>
                                        <Form.Item
                                          {...restField}
                                          label="Ссылка на видеоролик"
                                          name={[name, "linkToVideo"]}
                                          required
                                        >
                                          <Input />
                                        </Form.Item>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}
                              <Form.Item>
                                <Button
                                  type="dashed"
                                  onClick={() => add()}
                                  icon={<PlusOutlined />}
                                >
                                  Добавить тему
                                </Button>
                              </Form.Item>
                            </>
                          )}
                        </Form.List>
                      </div>
                    </div>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                  >
                    Добавить раздел
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form>
      )}
    </div>
  );
  return null;
};

export default AdminCourseItem;

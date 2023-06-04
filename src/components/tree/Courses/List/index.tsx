import { Form, Select } from "antd";
import Header from "components/shared/Header";
import React from "react";
import styles from "./index.module.scss";
import courseImage from "images/CourseImage.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import { coursesCategoryOptions } from "constants/modules/courses";
import { useGetCoursesQuery } from "store/courses/api";
import Spinner from "components/shared/Spinner";
import { ICourseItem } from "../Item";
import { IAuthorShortModel } from "components/tree/Admin/Events";

interface IProps {}
const CoursesList: React.FC<IProps> = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { data, isLoading } = useGetCoursesQuery({ limit: 9999 });

  const onCourseClick = (id: string) => {
    router.push(`/courses/${id}`);
  };

  return (
    <div className={styles.root}>
      <Header title={"Курсы"} />
      {isLoading ? (
        <Spinner margin="200px auto" />
      ) : (
        <>
          <Form form={form} layout="inline" size="large">
            <Form.Item name="type" label="Категории">
              <Select
                style={{ width: "200px" }}
                options={coursesCategoryOptions}
              />
            </Form.Item>
          </Form>
          <div className={styles.list}>
            {(
              data?.result as (ICourseItem & {
                authorShortModel: IAuthorShortModel;
              })[]
            ).map(({ id, title, image, authorShortModel }) => {
              return (
                <div
                  key={id}
                  className={styles.item}
                  onClick={() => onCourseClick(id)}
                >
                  <div className={styles.img}>
                    <Image
                      src={
                        image ? `data:image/png;base64,${image}` : courseImage
                      }
                      alt=""
                      fill
                    />
                  </div>
                  <div className={styles.description}>
                    <h4>{title}</h4>
                    <span>{authorShortModel.firstLastName}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CoursesList;

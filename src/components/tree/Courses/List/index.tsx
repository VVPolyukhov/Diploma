import { Form, Select } from "antd";
import Header from "components/shared/Header";
import React from "react";
import styles from "./index.module.scss";
import courseImage from "images/CourseImage.jpg";
import Image from "next/image";
import { useRouter } from "next/router";
import { coursesCategoryOptions } from "constants/modules/courses";

interface IProps {}
const CoursesList: React.FC<IProps> = () => {
  const [form] = Form.useForm();
  const router = useRouter();

  const onCourseClick = () => {
    router.push("/courses/6596281f-e23b-4326-a29b-a0eba69c4f5e");
  };

  return (
    <div className={styles.root}>
      <Header title={"Курсы"} />
      <Form form={form} layout="inline" size="large">
        <Form.Item name="type" label="Категории">
          <Select style={{ width: "200px" }} options={coursesCategoryOptions} />
        </Form.Item>
      </Form>
      <div className={styles.list}>
        <div className={styles.item} onClick={onCourseClick}>
          <div className={styles.img}>
            <Image src={courseImage} alt="" fill />
          </div>
          <div className={styles.description}>
            <h4>ПРОГРЕВ, КАК СЕРИАЛ</h4>
            <span>Екатерина Клипина</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoursesList;

import Button from "components/kit/Button";
import Image from "next/image";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import avatarImage from "images/Avatar.png";
import { Avatar, DatePicker, Form } from "antd";
import FirstNameFormItem from "components/shared/FormItem/FirstName";
import LastNameFormItem from "components/shared/FormItem/LastName";
import Input from "components/kit/Input";
import EmailFormItem from "components/shared/FormItem/Email";
import { useEditUserMutation, useGetUserQuery } from "store/user/api";
import { UserOutlined } from "@ant-design/icons";

const specifications = [
  {
    name: "Дата рождения",
    value: "02.11.1992",
  },
  {
    name: "Город",
    value: "Нижний Новгород",
  },
  {
    name: "Ниша",
    value: "Продюсирование",
  },
  {
    name: "Заработок",
    value: "300 тыс. руб - 1 млн. руб.",
  },
  {
    name: "Социальные сети",
    value: "@KatyushaPro",
  },
];

interface IProps {}
const Profile: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const { data, isLoading } = useGetUserQuery({});

  const [editUser] = useEditUserMutation();

  useEffect(() => {
    form.setFieldsValue(data);
  }, []);

  const onFinish = (values: any) => {
    values.firstname = values.firstName;
    values.lastname = values.lastName;
    editUser(values);
  };

  return (
    <div className={styles.root}>
      {/* <Image
        className={styles.image}
        alt="Аватар"
        src={avatarImage}
        width={240}
        height={200}
      /> */}
      <Avatar size={150} icon={<UserOutlined />} />
      <Form
        form={form}
        className={styles.form}
        layout="horizontal"
        onFinish={onFinish}
      >
        <FirstNameFormItem formItemProps={{ name: "firstName" }} />
        <LastNameFormItem formItemProps={{ name: "lastName" }} />
        <EmailFormItem />
        <Form.Item name="birthday" label="Дата рождения">
          <DatePicker size="large" />
        </Form.Item>
        <Form.Item name="city" label="Город">
          <Input size="large" placeholder="Укажите город" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            block
            loading={isLoading}
            type="primary"
            size="large"
            className={styles.button}
          >
            Сохранить изменения
          </Button>
        </Form.Item>
      </Form>
      {/* <div className={styles.specifications}>
        {specifications.map(({ name, value }) => (
          <div key={name} className={styles.specification}>
            <span>{name}</span>
            <span>{value}</span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Profile;

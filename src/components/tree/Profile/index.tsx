import Button from "components/kit/Button";
import React, { useEffect } from "react";
import styles from "./index.module.scss";
import { Avatar, DatePicker, Form } from "antd";
import FirstNameFormItem from "components/shared/FormItem/FirstName";
import LastNameFormItem from "components/shared/FormItem/LastName";
import Input from "components/kit/Input";
import EmailFormItem from "components/shared/FormItem/Email";
import { useEditUserMutation, useGetUserQuery } from "store/user/api";
import { UserOutlined } from "@ant-design/icons";
import ReducedArticlesList from "../Articles/List/Reduced";

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

      <h2 className={styles.articlesTitle}>Статьи от автора</h2>
      <ReducedArticlesList className={styles.articles} />
    </div>
  );
};

export default Profile;

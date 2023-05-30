import Button from "components/kit/Button";
import Image from "next/image";
import React from "react";
import styles from "./index.module.scss";
import avatarImage from 'images/Avatar.png'
import { DatePicker, Form } from "antd";
import FirstNameFormItem from "components/shared/FormItem/FirstName";
import LastNameFormItem from "components/shared/FormItem/LastName";
import Input from "components/kit/Input";
import EmailFormItem from "components/shared/FormItem/Email";

interface IProps {}
const Profile: React.FC<IProps> = () => {
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
  const [form] = Form.useForm();

  return (
    <div className={styles.root}>
      <Image
        className={styles.image}
        alt="Аватар"
        src={avatarImage}
        width={240}
        height={200}
      />
      <Form form={form} className={styles.form} layout="horizontal">
        <FirstNameFormItem />
        <LastNameFormItem />
        <EmailFormItem />
        <Form.Item name="birthday" label="Дата рождения">
          <DatePicker size="large" />
        </Form.Item>
        <Form.Item name="city" label="Город">
          <Input size="large" placeholder="Укажите город" />
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
      <Button type="primary" size="large" className={styles.button}>
        Сохранить изменения
      </Button>
    </div>
  );
};

export default Profile;

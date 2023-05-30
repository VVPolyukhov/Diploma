import { Form, Input } from "antd";
import React from "react";

interface IProps {}
const FirstNameFormItem: React.FC<IProps> = () => {
  return (
    <Form.Item
      name="firstname"
      label="Имя"
      rules={[{ required: true, message: "Введите имя" }]}
    >
      <Input placeholder="Укажите имя" size="large" />
    </Form.Item>
  );
};

export default FirstNameFormItem;

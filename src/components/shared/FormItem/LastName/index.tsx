import { Form, Input } from "antd";
import React from "react";

interface IProps {}
const LastNameFormItem: React.FC<IProps> = () => {
  return (
    <Form.Item
      name="lastname"
      label="Фамилия"
      rules={[{ required: true, message: "Введите фамилию" }]}
    >
      <Input placeholder="Фамилия" size="large" />
    </Form.Item>
  );
};

export default LastNameFormItem;

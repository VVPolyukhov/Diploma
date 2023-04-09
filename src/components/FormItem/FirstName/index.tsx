import { Form, Input } from "antd";
import React from "react";

interface IProps {}
const FirstNameFormItem: React.FC<IProps> = () => {
  return (
    <Form.Item
      name="firstname"
      rules={[{ required: true, message: "Введите имя" }]}
    >
      <Input placeholder="Имя" />
    </Form.Item>
  );
};

export default FirstNameFormItem;

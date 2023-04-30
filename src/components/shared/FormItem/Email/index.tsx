import { Form, Input } from "antd";
import React from "react";

interface IProps {}
const EmailFormItem: React.FC<IProps> = () => {
  return (
    <Form.Item
      name="email"
      rules={[{ type: "email", required: true, message: "Введите электронную почту" }]}
    >
      <Input placeholder="Электронная почта" />
    </Form.Item>
  );
};

export default EmailFormItem;

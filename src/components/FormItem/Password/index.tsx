import { Form, Input } from "antd";
import React from "react";

interface IProps {}
const PasswordFormItem: React.FC<IProps> = () => {
  return (
    <Form.Item
      name="password"
      // TODO: Добавить валидацию
      rules={[{ required: true, message: "Введите пароль" }]}
    >
      <Input.Password type="password" placeholder="Пароль" />
    </Form.Item>
  );
};

export default PasswordFormItem;

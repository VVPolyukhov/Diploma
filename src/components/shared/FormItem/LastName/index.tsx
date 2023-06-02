import { Form, Input } from "antd";
import React from "react";
import { TCustomFormItem } from "../types";

interface IProps extends TCustomFormItem {}
const LastNameFormItem: React.FC<IProps> = ({
  formItemProps,
  internalComponentProps,
}) => {
  return (
    <Form.Item
      name="lastname"
      label="Фамилия"
      rules={[{ required: true, message: "Введите фамилию" }]}
      {...formItemProps}
    >
      <Input
        placeholder="Укажите фамилию"
        size="large"
        {...internalComponentProps}
      />
    </Form.Item>
  );
};

export default LastNameFormItem;

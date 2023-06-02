import { Form, Input } from "antd";
import React from "react";
import { TCustomFormItem } from "../types";

interface IProps extends TCustomFormItem {}
const FirstNameFormItem: React.FC<IProps> = ({
  formItemProps,
  internalComponentProps,
}) => {
  return (
    <Form.Item
      name="firstname"
      label="Имя"
      rules={[{ required: true, message: "Введите имя" }]}
      {...formItemProps}
    >
      <Input
        placeholder="Укажите имя"
        size="large"
        {...internalComponentProps}
      />
    </Form.Item>
  );
};

export default FirstNameFormItem;

import Form from 'components/kit/Form';
import Input from 'components/kit/Input';
import { IInternalInputProps } from 'components/kit/Input/types';
import React from 'react';
import { TCustomFormItem } from '../types';

interface IProps extends TCustomFormItem<IInternalInputProps> {}
const EmailFormItem: React.FC<IProps> = ({ formItemProps = {}, internalComponentProps = {} }) => {
  return (
    <Form.Item
      name="email"
      label="Логин"
      rules={[
        { type: "email", message: "Поле не соотвествует шаблону" },
        { required: true, message: "Введите логин" },
        ...(formItemProps?.rules || []),
      ]}
      {...formItemProps}
    >
      <Input
        placeholder="Укажите логин"
        size="large"
        {...internalComponentProps}
      />
    </Form.Item>
  );
};

export default EmailFormItem;

import Form from 'components/kit/Form';
import Input from 'components/kit/Input';
import { IInputPasswordProps } from 'components/kit/Input/types';
import React from 'react';
import { TCustomFormItem } from '../types';

interface IProps extends TCustomFormItem<IInputPasswordProps> {}
const PasswordFormItem: React.FC<IProps> = ({ formItemProps = {}, internalComponentProps = {} }) => {
  return (
    <Form.Item
      name="password"
      label="Пароль"
      rules={[
        { required: true, message: 'Введите пароль' },
        {
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\d\s:])([^\sА-Яа-яЁё]){8,}$/,
          message: 'Поле не соотвествует шаблону',
        },
        ...(formItemProps?.rules || []),
      ]}
      {...formItemProps}
    >
      <Input.Password type="password" placeholder="Пароль" size="large" {...internalComponentProps} />
    </Form.Item>
  );
};

export default PasswordFormItem;

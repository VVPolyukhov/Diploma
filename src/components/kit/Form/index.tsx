import React from 'react';
import { Form as AntdForm } from 'antd';
import { TForm } from './types';

const Form: TForm = ({ ...props }) => {
  return <AntdForm layout="vertical" hideRequiredMark {...props} />;
};

Form.Item = ({ ...props }) => {
  return <AntdForm.Item {...props} />;
};

Form.useForm = AntdForm.useForm;

export default Form;

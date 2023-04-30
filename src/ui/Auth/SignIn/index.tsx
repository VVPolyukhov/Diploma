import { Button, Form } from "antd";
import EmailFormItem from "components/shared/FormItem/Email";
import PasswordFormItem from "components/shared/FormItem/Password";
import React from "react";
import { useLoginMutation } from "store/auth/api";

interface IProps {}
const SignIn: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = (values: any) => {
    console.log("values", values);
    login(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <EmailFormItem />
      <PasswordFormItem />
      <Form.Item>
        <Button type="primary" htmlType="submit" size="large" loading={isLoading} block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignIn;

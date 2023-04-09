import { Button, Form } from "antd";
import EmailFormItem from "components/FormItem/Email";
import FirstNameFormItem from "components/FormItem/FirstName";
import LastNameFormItem from "components/FormItem/LastName";
import PasswordFormItem from "components/FormItem/Password";
import React from "react";
import { useRegisterMutation } from "store/auth/api";

interface IProps {}
const SignUp: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const [register, { isLoading }] = useRegisterMutation();

  const onFinish = (values: any) => {
    console.log("values", values);
    register(values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <FirstNameFormItem />
      <LastNameFormItem />
      <EmailFormItem />
      {/* TODO: Введите пароль повторно */}
      <PasswordFormItem />
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={isLoading} block>
          Зарегистрироваться
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignUp;

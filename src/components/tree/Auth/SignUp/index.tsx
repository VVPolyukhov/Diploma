import Button from "components/kit/Button";
import Form from "components/kit/Form";
import EmailFormItem from "components/shared/FormItem/Email";
import FirstNameFormItem from "components/shared/FormItem/FirstName";
import LastNameFormItem from "components/shared/FormItem/LastName";
import PasswordFormItem from "components/shared/FormItem/Password";
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

import Button from "components/kit/Button";
import Form from "components/kit/Form";
import EmailFormItem from "components/shared/FormItem/Email";
import PasswordFormItem from "components/shared/FormItem/Password";
import { ROUTES } from "constants/shared/routes";
import Link from "next/link";
import React from "react";
import { useLoginMutation } from "store/auth/api";
import styles from "./index.module.scss";

type ELoginForm = any

interface IProps {}
const SignIn: React.FC<IProps> = () => {
  const [form] = Form.useForm<ELoginForm>();

  const [login, { isLoading }] = useLoginMutation();

  const onFinish = (values: ELoginForm) => {
    login(values);
  };

  return (
    <Form form={form} onFinish={onFinish} className={styles.root}>
      <EmailFormItem />
      <PasswordFormItem />
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={isLoading}
          block
        >
          Войти
        </Button>
      </Form.Item>
      <Link href={ROUTES.AUTH_SIGN_UP.PATHNAME}>
        <div className={styles.signUp}>Зарегистрироваться</div>
      </Link>
    </Form>
  );
};

export default SignIn;

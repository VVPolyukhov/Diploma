import { Button, Form, Input, Typography } from "antd";
import React from "react";

interface IProps {}
const SignIn: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {};

  return (
    <>
      <Typography.Title level={2}>Вход в систему</Typography.Title>
      <Form form={form} size="large" onFinish={onFinish}>s
        <Form.Item
          name="email"
          rules={[{ type: "email", required: true, message: "Введите email" }]}
        >
          <Input placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Введите пароль" }]}
        >
          <Input.Password type="password" placeholder="Пароль" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Войти
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default SignIn;

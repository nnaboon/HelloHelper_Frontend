import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { UserCreateBody } from './const';

type RegisterUsernameFormProps = {
    userAccountData: UserCreateBody;
    onNext: (value: UserCreateBody) => void;
};

export const RegisterUsernameForm = (props : RegisterUsernameFormProps) => {
    const [form] = Form.useForm();
    const { userAccountData, onNext } = props;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      username: value.username
    } as UserCreateBody;

    try {
    //   const {
    //     available,
    //     message: errorMessage
    //   } = await checkRegisterAvailableEmail(value.email);
    //   if (!available) {
    //     message.error(errorMessage, 5);
    //   } else {
    //     onNext(data);
    //   }
        onNext({ ...userAccountData, ...data });
    } catch (e) {
      message.error('ไม่พบบัญชีในระบบ');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      autoComplete="off"
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input />
      </Form.Item>
        <Button type="primary" htmlType="submit">
          ต่อไป
          </Button>

    </Form>
  );
};
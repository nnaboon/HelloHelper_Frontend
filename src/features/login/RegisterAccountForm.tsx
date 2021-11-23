import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { UserCreateBody } from './const';
import { FormRule, getRule } from 'utils/form/getRule';

type RegisterAccountFormProps = {
    userAccountData: UserCreateBody;
    onNext: (value: UserCreateBody) => void;
};

export const RegisterAccountForm = (props : RegisterAccountFormProps) => {
    const [form] = Form.useForm();
    const { userAccountData, onNext } = props;
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (
      form.getFieldValue('password') &&
      form.getFieldValue('password') !== form.getFieldValue('confirmPassword')
    )
      form.setFields([
        {
          name: 'confirmPassword',
          errors: ['รหัสผ่านไม่ตรงกัน']
        }
      ]);
    else
      form.setFields([
        {
          name: 'confirmPassword',
          errors: []
        }
      ]);
  }, [password]);


  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      email: value.email,
      password: value.password,
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
        onNext(data);
    } catch (e) {
      message.error('ไม่พบบัญชีในระบบ');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (userAccountData) {
      form.setFieldsValue({
        ...userAccountData,
        confirmPassword: userAccountData?.password,
      });
    }
  }, [userAccountData]);

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
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password />
    </Form.Item>
    <Form.Item
        name="confirmPassword"
        normalize={(value) => value.trim()}
        rules={[
          getRule(FormRule.REQUIRE, 'กรุณากรอกยืนยันรหัสผ่าน'),
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (value && getFieldValue('password') !== value)
                return Promise.reject('รหัสผ่านไม่ตรงกัน');
              return Promise.resolve();
            }
          })
        ]}
        className="mb-6"
      >
        <Input type="password" placeholder="ยืนยันรหัสผ่าน" />
      </Form.Item>

      <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
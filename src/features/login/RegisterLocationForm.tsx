import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { UserCreateBody } from './const';

type RegisterLocationFormProps = {
    userAccountData: UserCreateBody;
    onNext: (value: UserCreateBody) => void;
    onBack: () => void;
};

export const RegisterLocationForm = (props : RegisterLocationFormProps) => {
    const [form] = Form.useForm();
    const { userAccountData, onNext, onBack } = props;
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      location: value.location
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
        label="Location"
        name="location"
        rules={[{ required: true, message: 'Please input your location!' }]}
      >
        <Input />
        
          </Form.Item>
          
        <Button
          className=" w-full mr-4 h-12 rounded-xl"
          onClick={() => onBack()}
        >
          ย้อนกลับ
        </Button>
        <Button type="primary" htmlType="submit">
          ต่อไป
        </Button>

    </Form>
  );
};
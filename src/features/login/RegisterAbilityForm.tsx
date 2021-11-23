import React, { useState, useEffect } from "react";
import { Checkbox, Button, Form, message } from 'antd';
import { UserCreateBody } from './const';
import { useHistory } from 'react-router-dom';

type RegisterAbilityFormProps = {
    userAccountData: UserCreateBody;
    onNext: (value: UserCreateBody) => void;
    onBack: () => void;
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

export const RegisterAbilityForm = (props: RegisterAbilityFormProps) => {
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const { userAccountData, onNext, onBack } = props;

  const onFinish = async (value) => {
    setIsSubmitting(true);
    const data = {
      ability: value.ability
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
        history.push({
            pathname: '/'
        })

    } catch (e) {
      message.error('ไม่สามารถเลือกความสามารถในการช่วยเหลือได้');
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
                label="Ability"
                name="ability"
                rules={[{ required: true, message: 'โปรดกรอกความสามารถในการช่วยเหลือของคุณ' }]}
            >
                <Checkbox.Group options={plainOptions} />
            </Form.Item>
            <Button
                className=" w-full mr-4 h-12 rounded-xl"
                onClick={() => onBack()}
            >
            ย้อนกลับ
            </Button>
            <Button type="primary" htmlType="submit">
            สำเร็จ
            </Button>
        </Form>
    )
}
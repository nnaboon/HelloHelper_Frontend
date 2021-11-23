/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Form, Input, message } from 'antd';
import { Text } from 'components/Text';
import { UserCreateBody } from './const';

type RegisterUsernameFormProps = {
    userAccountData: UserCreateBody;
    onNext: (value: UserCreateBody) => void;
};

const RegisterUsernameFormSection = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2.55rem 2.75rem 1.5rem 2.75rem;
    position: relative;
    height: 564px;
`;

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
        <RegisterUsernameFormSection>
            <Global
                styles={css`
                    .ant-form-item-control-input {
                        width: 360px;
                    }
                `}
            />
            <Text fontSize="24px" marginTop="10px" marginBottom="20px">ชื่อ</Text>        
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
            <Form.Item
                name="username"
                rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
            >
                <Input placeholder="ชื่อ" style={{ height: '40px', borderRadius: '12px' }} />
            </Form.Item>
            <Button 
                type="primary"
                htmlType="submit"
                css={css`
                    width: 106px;
                    height: 40px;
                    box-sizing: border-box;
                    background: #EE6400;
                    border-radius: 9px;
                    border: 0;
                    position: absolute;
                    bottom: 0;
                    right: 20px;
                    color: #ffff;
                    font-size: 16px;


                    &:hover {
                        background: #EE6400;
                    }
                `}     
            >
                ถัดไป
            </Button>

            </Form>            
        </RegisterUsernameFormSection>

  );
};
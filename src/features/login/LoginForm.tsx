/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Input, Button, Form, Divider } from 'antd';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { LoginStep } from './const';

interface LoginFormProps {
  setStep: (step: LoginStep) => void;
}

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
`;

export const LoginForm = ({ setStep }: LoginFormProps) => {
  const onFinish = () => {
    console.log('success');
  };

  return (
    <LoginSection>
      <Global
        styles={css`
          .ant-form-item-control-input {
            width: 360px;
          }
        `}
      />

      <Text fontSize="24px" marginY="10px">
        เข้าสู่ระบบ
      </Text>
      <Text fontSize="18px" fontWeight={500} marginY="10px">
        เข้าสู่ระบบได้ง่านด้วย Facebook
      </Text>
      <PrimaryButton
        css={css`
          width: 100%;
          margin-left: 0;
          height: 50px;
          background: #1877f2;
          margin: 20px 0;
        `}
      >
        Facebook
      </PrimaryButton>
      <PrimaryButton
        css={css`
          width: 100%;
          margin-left: 0;
          height: 50px;
          background: #d34836;
          margin-bottom: 10px;
        `}
      >
        Google
      </PrimaryButton>
      <Divider style={{ borderTopColor: '#C4C4C4', color: '#7C7A7A' }}>
        หรือ
      </Divider>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            placeholder="อีเมล"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password
            placeholder="รหัสผ่าน"
            style={{ height: '40px', borderRadius: '12px' }}
          />
        </Form.Item>

        <PrimaryButton
          css={css`
            width: 100%;
            margin-left: 0;
            height: 50px;
          `}
        >
          เข้าสู่ระบบ
        </PrimaryButton>
        <Flex justify="center" marginY="18px">
          เพิ่งเคยใช้บริการใช่ไหม ?{' '}
          <span
            style={{ color: '#F86800', textDecoration: 'underline' }}
            onClick={() => setStep(LoginStep.REGISTER)}
          >
            สมัครเลย
          </span>
        </Flex>
      </Form>
    </LoginSection>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Input, Button, Form, Divider, message } from 'antd';
import { FacebookOutlined, GoogleOutlined } from '@ant-design/icons';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { LoginStep } from './const';
import { InputForm, InputPasswordForm } from 'components/Input/InputForm';
import firebase, { signInWithGoogle, signInWithFacebook } from '../../firebase';
import axios from 'axios';
import { useUser } from 'hooks/user/useUser';
import { REACT_APP_API } from 'config';
import {
  useMedia,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet,
  mediaQueryMiniDesktop
} from 'styles/variables';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

interface ForgotPasswordProps {
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2rem 1.5rem 2rem;

  ${mediaQueryLargeDesktop} {
    padding: 1.5rem 2rem;
  }

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const ForgotPassword = observer(
  ({ setIsModalVisible }: ForgotPasswordProps) => {
    const [form] = Form.useForm();
    const auth = getAuth();

    const onFinish = (value) => {
      firebase.auth();
      sendPasswordResetEmail(auth, value.email)
        .then(() => {
          message.success(
            'ระบบได้ทำการส่งอีเมลเปลี่ยนรหัสผ่านไปยังอีเมลของคุณเรียบร้อย'
          );
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          message.error(
            'ระบบไม่สามารถทำการส่งอีเมลเปลี่ยนรหัสผ่านไปยังอีเมลของคุณได้'
          );
        });
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

        <Text
          marginY="10px"
          css={css`
            font-size: 22px;

            ${mediaQueryMobile} {
              font-size: 20px;
            }
          `}
        >
          ลืมรหัสผ่าน?
        </Text>
        <Text
          fontWeight={500}
          color="#F86800"
          css={css`
            font-size: 16px;
            margin-bottom: 20px;

            ${mediaQueryMobile} {
              font-size: 14px;
              margin: 10px 0;
            }
          `}
        >
          กรุณาใส่อีเมล ระบบจะส่งลิงก์เพื่อเปลี่ยนรหัสผ่านไปที่อีเมลของคุณ
        </Text>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          css={css`
            .ant-form-item-control-input {
              width: 100%;
              // height: 40px;
            }

            .ant-form-item-control-input-content {
              height: 40px;
            }

            .ant-form-item-label > label {
              font-size: 1.5rem;
            }

            .ant-form-item {
              margin-bottom: 24px;
            }

            .ant-select-single:not(.ant-select-customize-input)
              .ant-select-selector {
              height: 40px;
            }

            .ant-upload.ant-upload-select-picture-card {
              width: 170px;
              height: 170px;
            }

            .ant-col-16 {
              max-width: 100%;
            }

            ${mediaQueryLargeDesktop} {
              font-size: 24px;

              .ant-select-single:not(.ant-select-customize-input)
                .ant-select-selector {
                height: 32px;
              }

              .ant-form-item-control-input-content {
                height: 35px;
              }

              .ant-form-item {
                margin-bottom: 24px;
              }

              .ant-form-item-control-input {
                width: 100%;
                // height: 35px;
              }

              .ant-form-item-label > label {
                font-size: 16px;
              }

              .ant-upload.ant-upload-select-picture-card {
                width: 104px;
                height: 104px;
              }

              .ant-col-16 {
                max-width: 100%;
              }
            }

            ${mediaQueryMiniDesktop} {
              .ant-form-item {
                margin-bottom: 15px;
              }
            }

            ${mediaQueryMobile} {
              width: 100%;

              .ant-form-item {
                margin-bottom: 24px;
                height: 40px;
              }
            }
          `}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
          >
            <InputForm placeholder="อีเมล" />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            css={css`
              width: 100%;
              margin-left: 0;
              height: 40px;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              color: #ffff;
              font-size: 14px;
              position: relative;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 16px;
              }

              ${mediaQueryMobile} {
                height: 35px;
              }
            `}
          >
            ส่ง
          </Button>
        </Form>
      </LoginSection>
    );
  }
);

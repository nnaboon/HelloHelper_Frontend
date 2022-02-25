/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Button, Form, Input, message } from 'antd';
import { Text } from 'components/Text';
import { UserCreateBody } from './const';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';

type RegisterUsernameFormProps = {
  userAccountData: UserCreateBody;
  onNext: (value: UserCreateBody) => void;
};

const RegisterUsernameFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  height: 100%;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const RegisterUsernameForm = (props: RegisterUsernameFormProps) => {
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
      <Text
        marginTop="10px"
        marginBottom="20px"
        css={css`
          font-size: 26px;
          margin-bottom: 30px;

          ${mediaQueryLargeDesktop} {
            height: 40px;
            font-size: 20px;
            margin-bottom: 30px;
          }

          ${mediaQueryTablet} {
            font-size: 20px;
            margin-bottom: 15px;
          }

          ${mediaQueryMobile} {
            font-size: 18px;
            margin-bottom: 0px;
          }
        `}
      >
        ชื่อ
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
          position: relative;
          height: 100%;

          .ant-form-item-control-input {
            width: 100%;
          }
          .ant-form-item-label > label {
            font-size: 1.5rem;
          }

          .ant-form-item {
            margin-bottom: 32px;
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

            .ant-form-item {
              margin-bottom: 24px;
            }

            .ant-form-item-control-input {
              width: 100%;
            }

            .ant-form-item-label > label {
              font-size: 16px;
            }

            .ant-upload.ant-upload-select-picture-card {
              width: 104px;
              height: 104px;
            }
          }

          ${mediaQueryMobile} {
            width: 100%;
          }
        `}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
        >
          <Input
            placeholder="ชื่อ"
            style={{ borderRadius: '12px' }}
            css={css`
              height: 50px;
              font-size: 1.5rem;

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 14px;
              }
            `}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            height: 35px;
            font-size: 16px;
            box-sizing: border-box;
            background: #ee6400;
            border-radius: 9px;
            border: 0;
            position: absolute;
            bottom: 0;
            right: 0;
            color: #ffff;

            &:hover {
              background: #ee6400;
            }
          `}
        >
          ถัดไป
        </Button>
      </Form>
    </RegisterUsernameFormSection>
  );
};

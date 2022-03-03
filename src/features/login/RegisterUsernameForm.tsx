/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Form, message } from 'antd';
import { Text } from 'components/Text';
import { UserCreateBody } from './const';
import { mediaQueryMobile, mediaQueryLargeDesktop } from 'styles/variables';
import { InputForm } from 'components/Input/InputForm';
import { PrimaryButton } from 'components/Button/Button';

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
    padding: 7px 10px 0 10px;
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
      <Text
        // marginTop="10px"
        css={css`
          font-size: 22px;
          margin-bottom: 20px;

          ${mediaQueryLargeDesktop} {
            font-size: 20px;
          }

          ${mediaQueryMobile} {
            font-size: 19px;
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
          <InputForm placeholder="ชื่อ" />
        </Form.Item>
        <PrimaryButton
          type="primary"
          htmlType="submit"
          css={css`
            width: 90px;
            min-width: 90px;
            height: 35px;
            position: absolute;
            bottom: -5px;
            right: 0;
          `}
        >
          ถัดไป
        </PrimaryButton>
      </Form>
    </RegisterUsernameFormSection>
  );
};

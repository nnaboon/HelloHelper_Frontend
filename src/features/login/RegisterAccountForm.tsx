/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import Flex from 'components/Flex/Flex';
import { Button, Form, Input, message } from 'antd';
import { UserCreateBody } from './const';
import { FormRule, getRule } from 'utils/form/getRule';
import { Text } from 'components/Text';
import { LoginStep } from 'components/Navbar/const';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';
import { userStore } from 'store/userStore';
import { getAuth } from 'firebase/auth';

import firebase from '../../firebase';
import axios from 'axios';
import { REACT_APP_API } from 'config';
import { InputForm, InputPasswordForm } from 'components/Input/InputForm';
import { PrimaryButton } from 'components/Button/Button';

type RegisterAccountFormProps = {
  userAccountData: UserCreateBody;
  setProcessStep: (processStep: LoginStep) => void;
  onNext: (value: any) => void;
};

const RegisterAccountFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 2.75rem 1.5rem 2.75rem;
  height: 100%;

  ${mediaQueryMobile} {
    padding: 7px 10px 0 10px;
  }
`;

export const RegisterAccountForm = observer(
  (props: RegisterAccountFormProps) => {
    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { userAccountData, setProcessStep, onNext } = props;
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const auth = firebase.auth();

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

      try {
        setIsLoading(true);

        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then(async ({ user }) => {
            user.getIdToken().then((idToken) => {
              const config = {
                headers: {
                  Authorization: `Bearer ${idToken}`
                }
              };
              axios
                .post(
                  `${REACT_APP_API}/user/verify`,
                  {
                    idToken: idToken
                  },
                  config
                )
                .then(async (res) => {
                  const firebaseIdToken = await firebase
                    .auth()
                    .currentUser.getIdToken();
                  window.localStorage.setItem('access_token', firebaseIdToken);
                  onNext({
                    userId: res.data.uid,
                    email: res.data.email
                  });
                })
                .catch((error) => {
                  console.log(error.message);
                });
            });
            await auth.currentUser
              .sendEmailVerification()
              .then(() => {
                console.log('Verification Email Sent Successfully !');
              })
              .catch((error) => {
                console.error(error);
              });
          })
          .catch((error) => {
            setIsLoading(false);
            message.error('อีเมลนี้ถูกใช้แล้ว');
          });
      } catch (e) {
        setIsLoading(false);
        message.error('ไม่สามารถลงทะเบียนได้');
      } finally {
        setIsLoading(false);
        setIsSubmitting(false);
      }
    };

    useEffect(() => {
      if (userAccountData) {
        form.setFieldsValue({
          ...userAccountData,
          confirmPassword: userAccountData?.password
        });
      }
    }, [userAccountData]);

    return (
      <RegisterAccountFormSection>
        <Text
          css={css`
            font-size: 22px;
            margin-bottom: 20px;

            ${mediaQueryLargeDesktop} {
              font-size: 20px;
            }

            ${mediaQueryTablet} {
              margin-bottom: 20px;
            }

            ${mediaQueryMobile} {
              font-size: 19px;
              margin-bottom: 10px;
            }
          `}
        >
          เริ่มลงทะเบียน
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

            .ant-form-item {
              height: 40px;
              margin-bottom: 24px;
            }

            .ant-form-item-control-input {
              width: 100%;
            }
            .ant-form-item-label > label {
              font-size: 1.5rem;
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

              .ant-form-item {
                height: 40px;
                margin-bottom: 15px;
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <InputPasswordForm placeholder="รหัสผ่าน" />
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
          >
            <InputPasswordForm placeholder="ยืนยันรหัสผ่าน" />
          </Form.Item>
          <Flex
            justify="space-between"
            css={css`
              position: absolute;
              bottom: 0;
            `}
          >
            <div
              css={css`
                bottom: 30px;
                left: 64px;
                font-size: 16px;

                ${mediaQueryLargeDesktop} {
                  font-size: 14px;
                }

                ${mediaQueryMobile} {
                  left: 0px;
                }
              `}
            >
              มีบัญชีผู้ใช้แล้ว{' '}
              <span
                style={{
                  color: '#F86800',
                  textDecoration: 'underline',
                  cursor: 'pointer'
                }}
                onClick={() => setProcessStep(LoginStep.LOGIN)}
              >
                เข้าสู่ระบบ
              </span>
            </div>
            <PrimaryButton
              type="primary"
              htmlType="submit"
              css={css`
                width: 90px;
                min-width: 90px;
              `}
              loading={isLoading}
            >
              ถัดไป
            </PrimaryButton>
          </Flex>
        </Form>
      </RegisterAccountFormSection>
    );
  }
);

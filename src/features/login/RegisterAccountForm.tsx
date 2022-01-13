/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useHistory } from 'react-router-dom';
import { Button, Form, Input, message } from 'antd';
import { UserCreateBody } from './const';
import { FormRule, getRule } from 'utils/form/getRule';
import { Text } from 'components/Text';
import { LoginStep } from 'components/Navbar/const';
import { mediaQueryMobile } from 'styles/variables';
import { userStore } from 'store/userStore';
import { getAuth } from 'firebase/auth';

import firebase from '../../firebase';
import axios from 'axios';

type RegisterAccountFormProps = {
  userAccountData: UserCreateBody;
  setProcessStep: (processStep: LoginStep) => void;
  onNext: (value: any) => void;
};

const RegisterAccountFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  position: relative;
  height: 620px;

  ${mediaQueryMobile} {
    padding: 0;
    height: 360px;
  }
`;

export const RegisterAccountForm = observer(
  (props: RegisterAccountFormProps) => {
    const [form] = Form.useForm();
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
      // const data = {
      //   email: value.email,
      //   password: value.password
      // } as UserCreateBody;
      try {
        firebase
          .auth()
          .createUserWithEmailAndPassword(value.email, value.password)
          .then(async ({ user }) => {
            user.getIdToken().then((idToken) => {
              axios
                .post('http://localhost:5000/user/verify', {
                  idToken: idToken
                })
                .then((res) => {
                  console.log('Verification Email Sent Successfully !');
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
                window.location.assign('/');
              })
              .catch((error) => {
                console.error(error);
              });
          });
      } catch (e) {
        message.error('ไม่สามารถลงทะเบียนได้');
      } finally {
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
        <Global
          styles={css`
            .ant-form-item-control-input {
              width: 360px;
            }
          `}
        />
        <Text fontSize="24px" marginTop="10px" marginBottom="20px">
          เริ่มลงทะเบียน
        </Text>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          css={css`
            .ant-form-item-control-input {
              ${mediaQueryMobile} {
                width: 100%;
              }
            }
          `}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
          >
            <Input
              placeholder="อีเมล"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <Input.Password
              placeholder="รหัสผ่าน"
              style={{ height: '40px', borderRadius: '12px' }}
            />
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
            <Input.Password
              placeholder="ยืนยันรหัสผ่าน"
              style={{ height: '40px', borderRadius: '12px' }}
            />
          </Form.Item>
          <div
            css={css`
              position: absolute;
              bottom: 10px;
              left: 2.75rem;

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
          <Button
            type="primary"
            htmlType="submit"
            css={css`
              width: 106px;
              height: 40px;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              position: absolute;
              bottom: -29px;
              right: 20px;
              color: #ffff;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryMobile} {
                right: -5px;
              }
            `}
          >
            ถัดไป
          </Button>
        </Form>
      </RegisterAccountFormSection>
    );
  }
);

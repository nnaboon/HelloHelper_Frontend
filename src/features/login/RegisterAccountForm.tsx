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
import { mediaQueryMobile, mediaQueryLargeDesktop } from 'styles/variables';
import { userStore } from 'store/userStore';
import { getAuth } from 'firebase/auth';

import firebase from '../../firebase';
import axios from 'axios';
import { REACT_APP_API } from 'config';

type RegisterAccountFormProps = {
  userAccountData: UserCreateBody;
  setProcessStep: (processStep: LoginStep) => void;
  onNext: (value: any) => void;
};

const RegisterAccountFormSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;

  ${mediaQueryMobile} {
    padding: 0;
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
                .post(`${REACT_APP_API}/user/verify`, {
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
          })
          .catch((error) => {
            message.error('อีเมลนี้ถูกใช้แล้ว');
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
        <Text
          marginTop="10px"
          marginBottom="20px"
          css={css`
            font-size: 2.2rem;

            ${mediaQueryLargeDesktop} {
              font-size: 24px;
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
            name="email"
            rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
          >
            <Input
              placeholder="อีเมล"
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <Input.Password
              placeholder="รหัสผ่าน"
              style={{ borderRadius: '12px' }}
              css={css`
                height: 50px;

                .ant-input {
                  font-size: 1.5rem;
                }

                ${mediaQueryLargeDesktop} {
                  height: 40px;

                  .ant-input {
                    font-size: 14px;
                  }
                }
              `}
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
              style={{ borderRadius: '12px' }}
              css={css`
                height: 50px;

                .ant-input {
                  font-size: 1.5rem;
                }

                ${mediaQueryLargeDesktop} {
                  height: 40px;

                  .ant-input {
                    font-size: 14px;
                  }
                }
              `}
            />
          </Form.Item>
          <div
            css={css`
              position: absolute;
              bottom: 30px;
              left: 64px;
              font-size: 1.3rem;

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
          {/* <div
            css={css`
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: flex-end;
              justify-content: flex-end;
            `}
          > */}
          <Button
            type="primary"
            htmlType="submit"
            css={css`
              width: 106px;
              height: 50px;
              font-size: 1.5rem;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              bottom: 20px;
              right: 64px;
              color: #ffff;
              position: absolute;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 16px;
              }

              ${mediaQueryMobile} {
                right: -5px;
              }
            `}
          >
            ถัดไป
          </Button>
          {/* </div> */}
        </Form>
      </RegisterAccountFormSection>
    );
  }
);

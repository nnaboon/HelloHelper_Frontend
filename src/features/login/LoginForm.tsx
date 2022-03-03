/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Input, Button, Form, Divider } from 'antd';
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
import { mediaQueryDesktop } from '../../styles/variables';

interface LoginFormProps {
  setStep: (step: LoginStep) => void;
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

export const LoginForm = observer(
  ({ setStep, setIsModalVisible }: LoginFormProps) => {
    const [isLoggedIn, serIsLoggedIn] = useState<boolean>(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const { data: user, execute: getUser } = useUser();

    const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

    const onFinish = (value) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(({ user }) => {
          user.getIdToken().then((idToken) => {
            window.localStorage.setItem('access_token', idToken);
            axios
              .post(`${REACT_APP_API}/user/verify`, {
                idToken: idToken
              })
              .then((res) => {
                getUser(res.data.uid);
              })
              .catch((error) => {
                console.log(error.message);
              });
          });
        })
        .then((res) => {
          history.push('/');
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
          เข้าสู่ระบบ
        </Text>
        <Text
          fontWeight={500}
          color="#F86800"
          css={css`
            font-size: 16px;

            ${mediaQueryMobile} {
              font-size: 14px;
              margin: 10px 0;
            }
          `}
        >
          เข้าสู่ระบบได้ง่ายด้วย Facebook หรือ Google account
        </Text>
        <PrimaryButton
          css={css`
            width: 100%;
            margin-left: 0;
            background: #1877f2;
            border-color: #1877f2;
            margin: 20px 0;
            font-size: 16px;

            &:hover {
              background: #1877f2 !important;
              border-color: #1877f2 !important;
            }

            &:focus {
              background: #1877f2 !important;
              border-color: #1877f2 !important;
            }

            ${mediaQueryLargeDesktop} {
              height: 45px;
            }

            ${mediaQueryMobile} {
              height: 40px;
              margin: 10px 0 !important;
            }
          `}
          onClick={signInWithFacebook}
        >
          <Flex justify="center">
            <FacebookOutlined
              style={{ marginRight: '10px' }}
              css={css`
                font-size: 30px;

                ${mediaQueryLargeDesktop} {
                  font-size: 28px;
                }

                ${mediaQueryTablet} {
                  font-size: 24px;
                }

                ${mediaQueryMobile} {
                  font-size: 18px;
                }
              `}
            />
            <div>Facebook</div>
          </Flex>
        </PrimaryButton>
        <PrimaryButton
          css={css`
            width: 100%;
            margin-left: 0;
            height: 45px;
            background: #d34836;
            margin-bottom: 10px;
            max-width: 100%;
            font-size: 16px;

            &:hover {
              background: #d34836 !important;
              border-color: #d34836 !important;
            }

            &:focus {
              background: #d34836 !important;
              border-color: #d34836 !important;
            }

            ${mediaQueryLargeDesktop} {
              height: 45px;
            }

            ${mediaQueryMobile} {
              height: 40px;
              margin: 10px 0 !important;
            }
          `}
          onClick={signInWithGoogle}
        >
          <Flex justify="center">
            <GoogleOutlined
              style={{ marginRight: '10px' }}
              css={css`
                font-size: 30px;

                ${mediaQueryLargeDesktop} {
                  font-size: 28px;
                }

                ${mediaQueryTablet} {
                  font-size: 24px;
                }

                ${mediaQueryMobile} {
                  font-size: 18px;
                }
              `}
            />
            <div>Google</div>
          </Flex>
        </PrimaryButton>
        <Divider
          style={{ borderTopColor: '#C4C4C4', color: '#7C7A7A' }}
          css={css`
            .ant-divider-inner-text {
              font-size: 16px;
            }

            ${mediaQueryLargeDesktop} {
              .ant-divider-inner-text {
                font-size: 14px;
              }
            }
          `}
        >
          หรือ
        </Divider>
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

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'กรุณากรอกรหัสผ่าน' }]}
          >
            <InputPasswordForm
              placeholder="รหัสผ่าน"
              css={css`
                ${mediaQueryMobile} {
                  height: 40px;
                }
              `}
            />
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
            เข้าสู่ระบบ
          </Button>
          <Flex
            justify="center"
            marginTop="35px"
            css={css`
              font-size: 14px;

              ${mediaQueryLargeDesktop} {
                font-size: 14px;
              }
            `}
          >
            เพิ่งเคยใช้บริการใช่ไหม ?
            <span
              style={{
                color: '#F86800',
                textDecoration: 'underline',
                cursor: 'pointer',
                marginLeft: '3px'
              }}
              onClick={() => setStep(LoginStep.REGISTER)}
            >
              สมัครเลย
            </span>
          </Flex>
        </Form>
      </LoginSection>
    );
  }
);

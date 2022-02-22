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
import firebase, { signInWithGoogle, signInWithFacebook } from '../../firebase';
import axios from 'axios';
import { useUser } from 'hooks/user/useUser';
import { REACT_APP_API } from 'config';
import {
  useMedia,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';

interface LoginFormProps {
  setStep: (step: LoginStep) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;

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
            font-size: 2.3rem;

            ${mediaQueryLargeDesktop} {
              font-size: 22px;
            }

            ${mediaQueryMobile} {
              font-size: 18px;
            }
          `}
        >
          เข้าสู่ระบบ
        </Text>
        <Text
          fontWeight={500}
          marginBottom="10px"
          color="#F86800"
          css={css`
            font-size: 1.7rem;

            ${mediaQueryLargeDesktop} {
              font-size: 18px;
            }

            ${mediaQueryMobile} {
              font-size: 14px;
            }
          `}
        >
          เข้าสู่ระบบได้ง่ายด้วย Facebook หรือ Google account
        </Text>
        <PrimaryButton
          css={css`
            width: 100%;
            margin-left: 0;
            height: 60px;
            background: #1877f2;
            margin: 20px 0;
            max-width: 100%;
            font-size: 1.5rem;

            ${mediaQueryLargeDesktop} {
              height: 45px;
              font-size: 16px;
            }

            ${mediaQueryMobile} {
              margin: 10px 0 !important;
            }
          `}
          onClick={signInWithFacebook}
        >
          <Flex justify="center">
            <FacebookOutlined
              style={{ marginRight: '10px' }}
              css={css`
                font-size: 36px;

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
            height: 60px;
            background: #d34836;
            margin-bottom: 10px;
            max-width: 100%;
            font-size: 1.5rem;

            ${mediaQueryLargeDesktop} {
              height: 45px;
              font-size: 16px;
            }

            ${mediaQueryMobile} {
              margin: 10px 0 !important;
            }
          `}
          onClick={signInWithGoogle}
        >
          <Flex justify="center">
            <GoogleOutlined
              style={{ marginRight: '10px' }}
              css={css`
                font-size: 36px;

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
              font-size: 1.4rem;
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

              .ant-col-16 {
                max-width: 100%;
              }
            }

            ${mediaQueryMobile} {
              width: 100%;
            }
          `}
        >
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input
              placeholder="อีเมล"
              css={css`
                height: 50px;
                font-size: 1.5rem;
                border-radius: 12px;
                ${mediaQueryLargeDesktop} {
                  height: 36px;
                  border-radius: 8px;
                  font-size: 15px;
                }
              `}
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              placeholder="รหัสผ่าน"
              css={css`
                height: 50px;
                font-size: 1.5rem;
                border-radius: 12px;

                ${mediaQueryLargeDesktop} {
                  height: 36px;
                  border-radius: 8px;
                  font-size: 16px;
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
              height: 60px;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              color: #ffff;
              font-size: 1.6rem;
              position: relative;

              &:hover {
                background: #ee6400;
              }

              ${mediaQueryLargeDesktop} {
                height: 40px;
                font-size: 16px;
              }
            `}
          >
            เข้าสู่ระบบ
          </Button>
          <Flex
            justify="center"
            marginTop="35px"
            css={css`
              font-size: 1.3rem;
              ${mediaQueryLargeDesktop} {
                font-size: 16px;
              }
            `}
          >
            เพิ่งเคยใช้บริการใช่ไหม ?{' '}
            <span
              style={{
                color: '#F86800',
                textDecoration: 'underline',
                cursor: 'pointer'
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

/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx, Global } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Input, Button, Form, Divider } from 'antd';
import { Text } from 'components/Text';
import { PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { LoginStep } from './const';
import { mediaQueryMobile } from 'styles/variables';
import firebase, { signInWithGoogle, signInWithFacebook } from '../../firebase';
import axios from 'axios';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';
import { REACT_APP_API } from 'config';

interface LoginFormProps {
  setStep: (step: LoginStep) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

const LoginSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;

  ${mediaQueryMobile} {
    padding: 0;
  }
`;

export const LoginForm = observer(
  ({ setStep, setIsModalVisible }: LoginFormProps) => {
    const [isLoggedIn, serIsLoggedIn] = useState<boolean>(false);
    const [form] = Form.useForm();
    const history = useHistory();
    const { setUserId, setMe } = userStore;
    const { data: user, execute: getUser } = useUser();

    // useEffect(() => {
    //   if (window.localStorage.getItem('id')) {
    //     getUser(window.localStorage.getItem('id'));
    //   }
    // }, [window.localStorage.getItem('id')]);

    // useEffect(() => {
    //   if (user) {
    //     setUserId(user.userId);
    //   }
    // }, [setStep, user]);

    // useEffect(() => {
    //   if (user) {
    //     setMe(user);
    //     setIsModalVisible(false);
    //   }
    // }, [user]);

    const onFinish = (value) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(value.email, value.password)
        .then(({ user }) => {
          user.getIdToken().then((idToken) => {
            axios
              .post(`${REACT_APP_API}/user/verify`, {
                idToken: idToken
              })
              .then((res) => {
                // setUserId(res.data.uid);
                // serIsLoggedIn(true);
                getUser(res.data.uid);
              })
              .catch((error) => {
                console.log(error.message);
              });
            // fetch('${REACT_APP_API}/users/verify', {
            //   method: 'POST',
            //   headers: {
            //     Accept: 'application/json',
            //     'Access-Control-Allow-Origin': '*',
            //     'Content-Type': 'application/json'
            //   },
            //   body: JSON.stringify({ idToken })
            // });
            // .then((res) => {
            //   console.log('res', res);
            // })
            // .catch((error) => {
            //   console.log(error);
            // });
          });
        })
        // .catch((error) => {
        //   console.log(error);
        // });
        // .then(() => {
        //   return firebase.auth().signOut();
        // })
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

        <Text fontSize="24px" marginY="10px">
          เข้าสู่ระบบ
        </Text>
        <Text
          fontSize="18px"
          fontWeight={500}
          marginBottom="10px"
          color="#F86800"
        >
          เข้าสู่ระบบได้ง่ายด้วย Facebook หรือ Google account
        </Text>
        <PrimaryButton
          css={css`
            width: 100%;
            margin-left: 0;
            height: 50px;
            background: #1877f2;
            margin: 20px 0;

            ${mediaQueryMobile} {
              margin: 10px 0 !important;
            }
          `}
          onClick={signInWithFacebook}
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
          onClick={signInWithGoogle}
        >
          Google
        </PrimaryButton>
        <Divider style={{ borderTopColor: '#C4C4C4', color: '#7C7A7A' }}>
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
              ${mediaQueryMobile} {
                width: 100%;
              }
            }
          `}
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

          <Button
            type="primary"
            htmlType="submit"
            css={css`
              width: 100%;
              margin-left: 0;
              height: 50px;
              box-sizing: border-box;
              background: #ee6400;
              border-radius: 9px;
              border: 0;
              color: #ffff;
              font-size: 16px;
              position: relative;

              &:hover {
                background: #ee6400;
              }
            `}
          >
            เข้าสู่ระบบ
          </Button>
          <Flex justify="center" marginTop="35px">
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

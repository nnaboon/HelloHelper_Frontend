/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { MailOutlined } from '@ant-design/icons';
import { mediaQueryMobile, mediaQueryLargeDesktop } from 'styles/variables';
import firebase from '../../firebase';
import MailSend from 'images/mail-send.png';

type RegisterUsernameFormProps = {
  onNext: () => void;
};

const RegisterVerifySection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 2.55rem 2.75rem 1.5rem 2.75rem;
  text-align: center;
  font-size: 20px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }

  ${mediaQueryMobile} {
    padding: 0;
    font-size: 16px;
    padding: 7px 10px 0 10px;
  }
`;

export const RegisterVerifyEmail = (props: RegisterUsernameFormProps) => {
  const { onNext } = props;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user && !user.emailVerified) {
        setInterval(function () {
          user.reload();
          if (user.emailVerified) {
            onNext();
          }
        }, 2000);
      }
    });
  }, []);

  return (
    <RegisterVerifySection>
      {/* <MailOutlined
        css={css`
          margin-bottom: 20px;
          font-size: 64px;

          ${mediaQueryMobile} {
            font-size: 64px;
          }
        `}
      /> */}
      <img
        src={MailSend}
        alt="send verified email"
        css={css`
          width: 100px;
          height: 100px;
        `}
      />

      <div>
        เราได้ทำการส่งอีเมล์ยืนยันไปยังอีเมล์ของคุณ กรุณาตรวจสอบที่อีเมลของคุณ
        และทำการยืนยันเพื่อลงทะเบียนในขั้นตอนถัดไป
      </div>
    </RegisterVerifySection>
  );
};
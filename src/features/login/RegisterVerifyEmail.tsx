/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
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
    const isVerified = setInterval(function () {
      firebase.auth().currentUser.reload();
      if (firebase.auth().currentUser.emailVerified) {
        clearInterval(isVerified);
        onNext();
      }
    }, 2000);

    return () => {};
  }, []);

  return (
    <RegisterVerifySection>
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

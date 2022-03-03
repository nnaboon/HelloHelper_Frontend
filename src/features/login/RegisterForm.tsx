import React, { useEffect, useState } from 'react';
import { LoginStep } from 'components/Navbar/const';
import { RegisterStep, UserCreateBody } from './const';
import { RegisterAccountForm } from './RegisterAccountForm';
import { RegisterUsernameForm } from './RegisterUsernameForm';
import { RegisterLocationForm } from './RegisterLocationForm';
import { RegisterAbilityForm } from './RegisterAbilityForm';
import { getAuth } from 'firebase/auth';
import axios from 'axios';
import { observer } from 'mobx-react-lite';
import { message } from 'antd';
import { userStore } from 'store/userStore';
import { REACT_APP_API } from 'config';
import { RegisterVerifyEmail } from './RegisterVerifyEmail';

interface RegisterFormProps {
  setProcessStep: (step: LoginStep) => void;
  setIsModalVisible: (isModalVisible: boolean) => void;
}

export const RegisterForm = observer(
  ({ setProcessStep, setIsModalVisible }: RegisterFormProps) => {
    const auth = getAuth();
    const user = auth.currentUser;
    const [step, setStep] = useState<RegisterStep>(
      user
        ? user.providerData[0].providerId === 'facebook.com'
          ? RegisterStep.LOCATION
          : user.emailVerified
          ? user.displayName
            ? RegisterStep.LOCATION
            : RegisterStep.USERNAME
          : RegisterStep.VERIFY_EMAIL
        : RegisterStep.EMAIL_AND_PASSWORD
    );
    const [createUserData, setCreateUserData] = useState<UserCreateBody>();
    const { setUserId } = userStore;

    useEffect(() => {
      if (window.localStorage.getItem('id')) {
        setCreateUserData((prev) => ({
          ...prev,
          userId: user.uid,
          email: user.email ?? user.providerData[0].email,
          username: user.displayName,
          imageUrl:
            user.providerData[0].providerId === 'facebook.com'
              ? `${
                  user.photoURL
                }?height=200&access_token=${window.localStorage.getItem(
                  'facebook_access_token'
                )}`
              : user.photoURL
        }));
      } else if (user) {
        setCreateUserData((prev) => ({
          ...prev,
          userId: user.uid,
          email: user.email ?? user.providerData[0].email,
          username: user.displayName,
          imageUrl:
            user.providerData[0].providerId === 'facebook.com'
              ? `${
                  user.photoURL
                }?height=200&access_token=${window.localStorage.getItem(
                  'facebook_access_token'
                )}`
              : user.photoURL
        }));
      }
    }, [user]);

    useEffect(() => {
      if (user?.emailVerified && !user.displayName) {
        setStep(RegisterStep.USERNAME);
      }
    }, [user]);

    const renderForm = (step: RegisterStep) => {
      switch (step) {
        case RegisterStep.EMAIL_AND_PASSWORD:
          return (
            <RegisterAccountForm
              userAccountData={createUserData}
              setProcessStep={setProcessStep}
              onNext={async (userAccountData) => {
                await setCreateUserData(userAccountData);
                setStep(RegisterStep.VERIFY_EMAIL);
              }}
            />
          );
        case RegisterStep.VERIFY_EMAIL:
          return (
            <RegisterVerifyEmail
              onNext={() => {
                setStep(RegisterStep.USERNAME);
              }}
            />
          );
        case RegisterStep.USERNAME:
          return (
            <RegisterUsernameForm
              userAccountData={createUserData}
              onNext={async (userAccountData: UserCreateBody) => {
                await setCreateUserData(userAccountData);
                setStep(RegisterStep.LOCATION);
              }}
            />
          );
        case RegisterStep.LOCATION:
          return (
            <RegisterLocationForm
              userAccountData={createUserData}
              onNext={async (userAccountData: UserCreateBody) => {
                await setCreateUserData(userAccountData);
                setStep(RegisterStep.ABILITY);
              }}
              onBack={() => {
                setStep(RegisterStep.USERNAME);
              }}
            />
          );
        case RegisterStep.ABILITY:
          return (
            <RegisterAbilityForm
              userAccountData={createUserData}
              onNext={async (userAccountData: UserCreateBody) => {
                await setCreateUserData(userAccountData);
                if (
                  user?.emailVerified ||
                  user.providerData[0].providerId === 'facebook.com' ||
                  user.providerData[0].providerId === 'google.com'
                ) {
                  axios
                    .post(`${REACT_APP_API}/user`, userAccountData)
                    .then(async (res) => {
                      setIsModalVisible(false);
                      message.success('สร้างบัญชีผู้ใช้สำเร็จ');
                      setUserId(user.uid);
                      window.localStorage.setItem('id', user.uid);
                      window.location.reload();
                    })
                    .catch((error) => {
                      console.log(error);
                      message.error('สร้างบัญชีผู้ใช้ไม่สำเร็จ');
                    });
                } else {
                  setIsModalVisible(false);
                  message.error('อีเมล์์ของคุณยังไม่ถูกยืนยัน');
                }
              }}
              onBack={() => {
                setStep(RegisterStep.LOCATION);
              }}
            />
          );
      }
    };
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        {renderForm(step)}
      </div>
    );
  }
);

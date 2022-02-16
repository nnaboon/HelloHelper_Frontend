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
import firebase from '../../firebase';
import { message } from 'antd';
import { userStore } from 'store/userStore';
import { REACT_APP_API } from 'config';

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
        ? user.displayName
          ? RegisterStep.LOCATION
          : RegisterStep.USERNAME
        : RegisterStep.EMAIL_AND_PASSWORD
    );
    const [createUserData, setCreateUserData] = useState<UserCreateBody>();
    const { setUserId } = userStore;

    // useEffect(() => {
    //   if (user) {
    //     if (user.displayName) {
    //       setStep(RegisterStep.LOCATION);
    //     } else {
    //       setStep(RegisterStep.USERNAME);
    //     }
    //   } else {
    //     setStep(RegisterStep.EMAIL_AND_PASSWORD);
    //   }
    // });

    useEffect(() => {
      if (window.localStorage.getItem('id')) {
        setCreateUserData((prev) => ({
          ...prev,
          userId: user.uid,
          email: user.email,
          username: user.displayName,
          imageUrl: user.photoURL
        }));
      } else if (user) {
        setCreateUserData((prev) => ({
          ...prev,
          userId: user.uid,
          email: user.email,
          username: user.displayName,
          imageUrl: user.photoURL
        }));
      }
    }, []);

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
                // axios.post('${REACT_APP_API}/user/create', {
                //   email: userAccountData.email,
                //   password: userAccountData?.password
                // });
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
                    .then((res) => {
                      setIsModalVisible(false);
                      setUserId(user.uid);
                      window.location.reload();
                      message.success('สร้างบัญชีผู้ใช้สำเร็จ');
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
    return <div>{renderForm(step)}</div>;
  }
);

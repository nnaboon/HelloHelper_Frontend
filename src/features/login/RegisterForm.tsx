import React, { useEffect, useState } from 'react';
import { LoginStep } from 'components/Navbar/const';
import { RegisterStep, UserCreateBody } from './const';
import { RegisterAccountForm } from './RegisterAccountForm';
import { RegisterUsernameForm } from './RegisterUsernameForm';
import { RegisterLocationForm } from './RegisterLocationForm';
import { RegisterAbilityForm } from './RegisterAbilityForm';

interface RegisterFormProps {
  setProcessStep: (step: LoginStep) => void;
}

export const RegisterForm = ({ setProcessStep }: RegisterFormProps) => {
  const [step, setStep] = useState<RegisterStep>(
    RegisterStep.EMAIL_AND_PASSWORD
  );
  const [createUserData, setCreateUserData] = useState<UserCreateBody>();

  const renderForm = (step: RegisterStep) => {
    switch (step) {
      case RegisterStep.EMAIL_AND_PASSWORD:
        return (
          <RegisterAccountForm
            userAccountData={createUserData}
            setProcessStep={setProcessStep}
            onNext={async (userAccountData: UserCreateBody) => {
              await setCreateUserData(userAccountData);
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
            }}
            onBack={() => {
              setStep(RegisterStep.LOCATION);
            }}
          />
        );
    }
  };
  return <div>{renderForm(step)}</div>;
};

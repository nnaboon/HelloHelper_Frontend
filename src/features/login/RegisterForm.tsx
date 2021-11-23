import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { RegisterStep, UserCreateBody } from './const';
import { RegisterAccountForm } from './RegisterAccountForm';
import { RegisterUsernameForm } from './RegisterUsernameForm';
import { RegisterLocationForm } from './RegisterLocationForm';
import { RegisterAbilityForm } from './RegisterAbilityForm';

export const RegisterForm = () => {
    const [step, setStep] = useState<RegisterStep>(RegisterStep.EMAIL_AND_PASSWORD);
    const [createUserData, setCreateUserData] = useState<UserCreateBody>();

    const renderForm = (step: RegisterStep) => {
        console.log(createUserData)
        switch (step) {
            case RegisterStep.EMAIL_AND_PASSWORD:
                return (
                    <RegisterAccountForm
                        userAccountData={createUserData}
                        onNext={async (userAccountData: UserCreateBody) => {
                            await setCreateUserData(userAccountData);
                            setStep(RegisterStep.USERNAME)
                        }}
                    />
                );
            case RegisterStep.USERNAME:
                return (
                    <RegisterUsernameForm
                        userAccountData={createUserData}
                        onNext={async (userAccountData: UserCreateBody) => {
                            await setCreateUserData(userAccountData);
                            setStep(RegisterStep.LOCATION)
                        }}
                    />
                );
            case RegisterStep.LOCATION:
                return (
                    <RegisterLocationForm
                        userAccountData={createUserData}
                        onNext={async (userAccountData: UserCreateBody) => {
                            await setCreateUserData(userAccountData);
                            setStep(RegisterStep.ABILITY)
                        }}
                        onBack={() => {
                            setStep(RegisterStep.USERNAME)
                        }}
                    />
                )
            case RegisterStep.ABILITY:
                return (
                    <RegisterAbilityForm
                        userAccountData={createUserData}
                        onNext={async (userAccountData: UserCreateBody) => {
                            await setCreateUserData(userAccountData);
                        }}
                        onBack={() => {
                            setStep(RegisterStep.LOCATION)
                        }}
                    />
                )
        }
    }
    return (
        <div>{renderForm(step)}</div>
    );
};
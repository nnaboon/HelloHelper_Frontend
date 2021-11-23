import React, { useEffect, useState } from 'react';
import { Button, Divider, Form, Input, message, Checkbox } from 'antd';
import { RegisterStep, UserCreateBody } from './const';
import { RegisterAccountForm } from './RegisterAccountForm';

export const RegisterForm = () => {
    const [step, setStep] = useState<RegisterStep>(RegisterStep.EMAIL_AND_PASSWORD);
    const [createUserData, setCreateUserData] = useState<UserCreateBody>();

    const renderForm = (step: RegisterStep) => {
        console.log(step)
        switch (step) {
            case RegisterStep.EMAIL_AND_PASSWORD:
                return (
                    <RegisterAccountForm
                        userAccountData={createUserData}
                        onNext={() => setStep(RegisterStep.USERNAME)}
                    />
                );
            case RegisterStep.USERNAME:
                return (
                    <div>user name</div>
                );
            case RegisterStep.LOCATION:
                return (
                    <div>location</div>
                )
            case RegisterStep.ABILITY:
                return (
                    <div>ability</div>
                )
        }
    }
    return (
        <div>{renderForm(step)}</div>
    );
};
import React from "react";
import styled from "@emotion/styled";
import { WrapperContainer } from "components/Wrapper/WrapperContainer";
import Flex from "components/Flex/Flex";
import { RegisterForm } from "features/login/RegisterForm";


const LoginSection = styled.div`
    width: 100%;
    height: calc(100vh - 165px);
    background: yellow;
    border-radius: 36px 0px 0px 36px;
    position: relative;
    top: 165px;
`;

const LoginBackgroundImage = styled.div`
    width: 60%;
    height: calc(100vh - 165px);
    background: #B9B9B9;
    position: relative;
    top: 165px;
`;

export const Login = () => {
    return (
        <div >
            <Flex>
                <LoginBackgroundImage>Pic</LoginBackgroundImage>
                <LoginSection>
                    <RegisterForm />
                </LoginSection>                
            </Flex>
        </div>
    )
}
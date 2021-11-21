import React, { useState } from 'react';
import styled from '@emotion/styled';
import { PrimaryButton } from './Button';
import { css, jsx } from '@emotion/react';

const Button = styled(PrimaryButton)`
    width: 198px;
    height: 49px;
    font-weight: 700;
    font-size: 18px;

    &:hover {
        color: #ffff;
    }
`;

export const PostRequestButton = () => {
    return (
        <Button>
            ขอความช่วยเหลือ
        </Button>
    )
}
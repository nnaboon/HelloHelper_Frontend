import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

interface CategoryButtonProps {
    text: string;
}

const Button = styled.a`
    display: flex;
    height: 45px;
    position: relative;
    text-decoration: none;
    border: 2px solid #EE6400;
    border-radius: 8px;
    color: #EE6400;
    font-size: 24px;
    max-width: 400px;
    align-items: center;
    justify-content: center;
`;

export const CategoryButton = ({ text } : CategoryButtonProps) => {
    return (
        <Button>
            {text}
        </Button>
    );
}
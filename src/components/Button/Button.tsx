import React from "react";
import styled from "@emotion/styled";
import { Button } from 'antd';

export const SecondaryButton = styled.a`
    min-width: 106px;
    height: 40px;
    background: #FFFFFF;
    border: 1px solid #EE6400;
    box-sizing: border-box;
    border-radius: 8px;
    text-decoration: none;
    color: #EE6400;
    font-size: 18px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #EE6400;
    }
`;

export const PrimaryButton = styled.a`
    width: 106px;
    height: 40px;
    box-sizing: border-box;
    text-decoration: none;
    background: #EE6400;
    border-radius: 9px;
    color: #FFFF;
    font-size: 18px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 15px;

    &:hover {
        color: #FFFF;     
    }
`;

export const TopSearchButton = styled.a`
    width: 330px;
    height: 80px;
    background: #FFFFFF;
    border: 2px solid #EE6400;
    box-sizing: border-box;
    border-radius: 8px;
    text-decoration: none;
    color: #000000;
    font-size: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        color: #ffff;
        background: #EE6400;
    }
`;

export const PrimaryButton2 = styled(Button)`
    width: 106px;
    height: 40px;
    box-sizing: border-box;
    background: #EE6400;
    border-radius: 9px;
    border: 0;
    position: relative;
    bottom: 0;
    right: 20px;
    color: #ffff;

    &:hover {
        background: #EE6400;
    }
`;
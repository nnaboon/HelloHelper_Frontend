import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';

export const SecondaryButton = styled.a`
  min-width: 106px;
  height: 40px;
  background: #ffffff;
  border: 1px solid #ee6400;
  box-sizing: border-box;
  border-radius: 8px;
  text-decoration: none;
  color: #ee6400;
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: #ee6400;
  }
`;

export const PrimaryButton = styled.a`
  min-width: 106px;
  width: 100%;
  max-width: 450px;
  height: 40px;
  box-sizing: border-box;
  text-decoration: none;
  background: #ee6400;
  border-radius: 9px;
  color: #ffff;
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;

  &:hover {
    color: #ffff;
  }
`;

export const TopSearchButton = styled.a`
  width: 330px;
  height: 80px;
  background: #ffffff;
  border: 2px solid #ee6400;
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
    background: #ee6400;
  }
`;

export const PrimaryButton2 = styled(Button)`
  width: 106px;
  height: 40px;
  box-sizing: border-box;
  background: #ee6400;
  border-radius: 9px;
  border: 0;
  position: relative;
  bottom: 0;
  right: 20px;
  color: #ffff;

  &:hover {
    background: #ee6400;
  }
`;

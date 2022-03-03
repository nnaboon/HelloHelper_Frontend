import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'antd';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';

export const SecondaryButton = styled(Button)`
  min-width: 130px;
  width: 100%;
  max-width: 550px;
  height: 40px;
  background: #ffffff;
  border: 2px solid #ee6400;
  box-sizing: border-box;
  border-radius: 8px;
  text-decoration: none;
  color: #ee6400;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background: #ffffff !important;
    color: #ee6400;
    border: 2px solid #ee6400;
  }

  &:focus {
    background: #ffffff !important;
    color: #ee6400;
    border: 2px solid #ee6400;
  }

  ${mediaQueryLargeDesktop} {
    min-width: 90px;
    height: 36px;
  }

  ${mediaQueryMobile} {
    min-width: 80px;
    height: 30px;
    border-radius: 5px;
    font-size: 14px;
  }
`;

export const PrimaryButton = styled(Button)`
  min-width: 130px;
  width: 100%;
  max-width: 550px;
  height: 40px;
  border: 1px solid #ee6400;
  box-sizing: border-box;
  text-decoration: none;
  background: #ee6400;
  border-radius: 8px;
  color: #ffff;
  font-size: 16px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;

  &:hover {
    color: #ffff;
    background: #ee6400;
    border: 1px solid #ee6400;
  }

  &:focus {
    color: #ffff !important;
    background: #ee6400 !important;
    border-color: #ee6400 !important;
  }

  ${mediaQueryLargeDesktop} {
    min-width: 90px;
    height: 36px;
  }

  ${mediaQueryMobile} {
    min-width: 80px;
    height: 30px;
    border-radius: 5px;
    font-size: 14px;
    margin: 0;
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

  ${mediaQueryLargeDesktop} {
    min-width: 106px;
    height: 40px;
    font-size: 16px;
  }
`;

export const CategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 100px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    min-width: 110px;
    height: 30px;
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    margin-bottom: 10px;
    font-size: 14px;
  }
`;

export const HashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px;
  height: 40px;
  margin: 10px 8px 10px 0px;
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    min-width: 80px;
    height: 30px;
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    margin-bottom: 0;
    font-size: 14px;
  }
`;

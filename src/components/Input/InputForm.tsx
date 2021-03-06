import React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import { mediaQueryLargeDesktop, mediaQueryMobile } from 'styles/variables';
import { mediaQueryMiniDesktop } from '../../styles/variables';

export const InputForm = styled(Input)`
  height: 40px;
  margin: 0;
  max-height: 40px;
  font-size: 16px;
  border-radius: 12px;

  ${mediaQueryLargeDesktop} {
    height: 35px;
    margin: 0;
    max-height: 35px;
    border-radius: 10px;
    font-size: 14px;
  }
`;

export const InputPasswordForm = styled(Input.Password)`
  height: 40px;
  font-size: 16px;
  border-radius: 12px;

  ${mediaQueryLargeDesktop} {
    height: 35px;
    border-radius: 10px;
    font-size: 14px;
  }

  ${mediaQueryMiniDesktop} {
    line-height: 1.8713;
  }
`;

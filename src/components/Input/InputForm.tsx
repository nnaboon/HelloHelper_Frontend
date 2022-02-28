import React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import { mediaQueryLargeDesktop, mediaQueryMobile } from 'styles/variables';

export const InputForm = styled(Input)`
  height: 40px;
  font-size: 16px;
  border-radius: 12px;
  line-height: 6.8713;

  ${mediaQueryLargeDesktop} {
    height: 35px;
    border-radius: 10px;
    font-size: 14px;
  }

  // ${mediaQueryMobile} {
  //   height: 30px;
  //   border-radius: 8px;
  // }
`;

export const InputPasswordForm = styled(Input.Password)`
  height: 40px;
  font-size: 16px;
  border-radius: 12px;
  line-height: 6.8713;

  ${mediaQueryLargeDesktop} {
    height: 35px;
    border-radius: 10px;
    font-size: 14px;
  }

  // ${mediaQueryMobile} {
  //   height: 35px;
  //   border-radius: 8px;
  // }
`;
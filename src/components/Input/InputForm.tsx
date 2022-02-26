import React from 'react';
import styled from '@emotion/styled';
import { Input } from 'antd';
import { mediaQueryLargeDesktop } from 'styles/variables';

export const InputForm = styled(Input)`
  height: 50px;
  font-size: 1.5rem;
  border-radius: 12px;

  ${mediaQueryLargeDesktop} {
    height: 40px;
    font-size: 14px;
  }
`;

import React from 'react';
import styled from '@emotion/styled';
import { mediaQueryMobile } from 'styles/variables';

export const WrapperContainer = styled.div`
  position: relative;
  height: calc(100vh + 400px);
  top: 165px;
  padding: 40px 100px;
  box-sizing: border-box;
  overflow-y: scroll;

  ${mediaQueryMobile} {
    padding: 20px 20px 40px 20px;
    top: 140px;
  }
`;

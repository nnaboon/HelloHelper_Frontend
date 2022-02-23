import React from 'react';
import styled from '@emotion/styled';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';

export const WrapperContainer = styled.div`
  position: relative;
  top: 165px;
  padding: 40px 100px;
  box-sizing: border-box;
  overflow-y: scroll;

  ${mediaQueryLargeDesktop} {
    top: 165px;
  }

  ${mediaQueryTablet} {
    padding: 40px 60px;
    top: 80px;
  }

  ${mediaQuerySmallTablet} {
    padding: 40px;
  }

  ${mediaQueryMobile} {
    padding: 20px 20px 40px 20px;
    top: 80px;
  }
`;

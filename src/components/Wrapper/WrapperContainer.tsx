import React from 'react';
import styled from '@emotion/styled';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryMiniDesktop,
  mediaQueryLargeDesktop
} from 'styles/variables';

export const WrapperContainer = styled.div`
  position: relative;
  top: 210px;
  padding: 0px 100px 40px;
  box-sizing: border-box;
  overflow-y: scroll;

  ${mediaQueryLargeDesktop} {
    top: 155px;
  }

  ${mediaQueryMiniDesktop} {
    padding: 0px 60px 40px;
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
    height: 100%;
  }
`;

/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryMiniDesktop,
  mediaQueryLargeDesktop
} from 'styles/variables';

export const ProvideCardContainer = styled.div`
  position: relative;
  top: -20px;
  width: 95%;
  min-width: 360px;
  max-width: 600px;
  height: 425px;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  padding: 30px;
  box-sizing: border-box;
  margin-top: 20px;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    min-width: 100%;
  }

  ${mediaQueryLargeDesktop} {
    min-width: 360px;
    height: 380px;
    padding: 20px 30px;
  }

  ${mediaQueryMiniDesktop} {
    min-width: 320px;
  }

  ${mediaQueryTablet} {
    min-width: 360px;
  }

  ${mediaQuerySmallTablet} {
    min-width: 300px;
  }

  ${mediaQueryMobile} {
    width: 90%;
    height: 270px;
    min-width: 90%;
    padding: 20px;
    display: flex;
    justify-content: center;
  }
`;

export const RequestCardContainer = styled.div`
  position: relative;
  top: -20px;
  min-width: 448px;
  max-width: 600px;
  height: 410px;
  width: 95%;
  background: #ffffff;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin-top: 20px;
  margin-left: 5px;
  padding: 0;
  box-sizing: border-box;
  cursor: pointer;

  ${mediaQueryLargeDesktop} {
    min-width: 360px;
    height: 365px;
  }

  ${mediaQueryMiniDesktop} {
    min-width: 320px;
  }

  ${mediaQueryTablet} {
    min-width: 360px;
    padding: 0px;
    margin-left: 0;
    height: 380px;
  }

  ${mediaQuerySmallTablet} {
    min-width: 336px;
  }

  ${mediaQueryMobile} {
    display: flex;
    justify-content: center;
    width: 90%;
    min-width: 90%;
    height: 270px;
  }

  ${mediaQueryMobile} {
    height: 310px;
  }
`;

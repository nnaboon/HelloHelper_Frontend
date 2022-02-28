import React from 'react';
import styled from '@emotion/styled';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';

export const SuggestedBadge = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  top: -15px;
  width: 62px;
  height: 26px;
  background: #ee6400;
  border-radius: 4px;
  padding: 0 5px;
  color: #ffff;
  justify-content: center;
  text-align: center;
  font-size: 1.5rem;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQuerySmallTablet} {
    width: 40px;
    height: 20px;
    font-size: 12px;
    top: -12px;
    left: 7px;
  }
`;

export const RankingBadge = styled.div<{ rankColor: string }>`
  display: flex;
  align-items: center;
  height: 43px;
  line-height: 2;
  justify-content: center;
  background: ${(props) => props.rankColor};
  color: #ffff;
  border-radius: 8px;
  max-width: max-content;
  padding: 0 10px;
  font-size: 20px;
  font-weight: 600;
  position: relative;
  margin-top: 4px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    font-weight: 600;
    height: 28px;
  }

  ${mediaQuerySmallTablet} {
    min-width: 95px;
    width: 100%;
    height: 25px;
    font-size: 16px;
    border-radius: 6px;
  }

  ${mediaQueryMobile} {
    min-width: unset;
  }
`;

//status: 0 = hide, 1 = process, 2 = already
export const RequestStatusBadge = styled.div<{ status?: number }>`
  display: flex;
  align-items: center;
  height: 30px;
  justify-content: center;
  min-width: 60px;
  width: 100%;
  max-width: max-content;
  border-radius: 10px;
  font-size: 1.1rem;
  border: 1px solid ${(props) => (props.status === 2 ? 'green' : 'gray')};
  background: ${(props) => (props.status === 2 ? 'green' : 'gray')};
  color: #ffff;
  padding: 0px 10px;
  box-sizing: border-box;
  margin-left: 8px;

  ${mediaQueryLargeDesktop} {
    font-size: 12px;
    border-radius: 6px;
    height: 22px;
  }
`;

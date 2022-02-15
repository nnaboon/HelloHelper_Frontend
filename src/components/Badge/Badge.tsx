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
  height: 32px;
  justify-content: center;
  background: ${(props) => props.rankColor};
  color: #ffff;
  border-radius: 8px;
  max-width: max-content;
  padding: 0 10px;
  font-size: 1.5rem;
  font-weight: 500;
  position: relative;
  margin-top: 4px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }

  ${mediaQuerySmallTablet} {
    width: 84px;
    height: 25px;
    font-size: 16px;
    border-radius: 6px;
    margin-left: 14px;
  }
`;

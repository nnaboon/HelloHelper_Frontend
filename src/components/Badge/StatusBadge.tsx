import React from 'react';
import { mediaQueryLargeDesktop } from 'styles/variables';
import { mediaQueryMobile } from '../../styles/variables';
import styled from '@emotion/styled';

interface StatusBadgeProps {
  status: string;
  color: string;
  style?: any;
}

const StatusBadgeContainer = styled.div<{ color: string }>`
  max-width: 150px;
  min-width: 120px;
  height: 35px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  width: unset;
  font-size: 16px;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
    max-width: 130px;
    min-width: 110px;
    height: 30px;
  }

  ${mediaQueryMobile} {
    min-width: 100px;
    font-size: 14px;
  }
`;

export const StatusBadge = ({ status, color, style }: StatusBadgeProps) => {
  return (
    <div style={style}>
      <StatusBadgeContainer color={color}>{status}</StatusBadgeContainer>
    </div>
  );
};

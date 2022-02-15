import React from 'react';
import { mediaQueryLargeDesktop } from 'styles/variables';
import styled from '@emotion/styled';

interface StatusBadgeProps {
  status: string;
  color: string;
  style?: any;
}

const StatusBadgeContainer = styled.div<{ color: string }>`
  max-width: 260px;
  min-width: 225px;
  height: 50px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;

  width: unset;
  font-size: 1.9rem;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
    max-width: 150px;
    min-width: 130px;
    height: 32px;
  }
`;

export const StatusBadge = ({ status, color, style }: StatusBadgeProps) => {
  return (
    <div style={style}>
      <StatusBadgeContainer color={color}>{status}</StatusBadgeContainer>
    </div>
  );
};

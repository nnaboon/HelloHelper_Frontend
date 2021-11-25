import React from 'react';
import styled from '@emotion/styled';

interface StatusBadgeProps {
  status: string;
  color: string;
  style?: any;
}

const StatusBadgeContainer = styled.div<{ color: string }>`
  max-width: 150px;
  min-width: 130px;
  height: 32px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  font-size: 18px;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const StatusBadge = ({ status, color, style }: StatusBadgeProps) => {
  return (
    <div style={style}>
      <StatusBadgeContainer color={color}>{status}</StatusBadgeContainer>
    </div>
  );
};

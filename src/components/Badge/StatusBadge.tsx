import React from 'react';
import styled from '@emotion/styled';

interface StatusBadgeProps {
  status: string;
  color: string;
}

const StatusBadgeContainer = styled.div<{ color: string }>`
  width: 102px;
  height: 27px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  font-size: 18px;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const StatusBadge = ({ status, color }: StatusBadgeProps) => {
  return (
    <div>
      <StatusBadgeContainer color={color}>{status}</StatusBadgeContainer>
    </div>
  );
};

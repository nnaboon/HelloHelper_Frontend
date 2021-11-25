import React from 'react';
import styled from '@emotion/styled';

interface StatusButtonProps {
  status: string;
  color: string;
}

const StatusButtonContainer = styled.div<{ color: string }>`
  width: 115px;
  height: 38px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  font-size: 18px;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
`;

export const StatusButton = ({ status, color }: StatusButtonProps) => {
  return (
    <div>
      <StatusButtonContainer color={color}>{status}</StatusButtonContainer>
    </div>
  );
};

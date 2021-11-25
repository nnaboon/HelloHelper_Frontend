import React from 'react';
import styled from '@emotion/styled';

interface StatusButtonProps {
  status: string;
  color: string;
  onClick: () => void;
}

const StatusButtonContainer = styled.div<{ color: string }>`
  max-width: 200px;
  min-width: 140px;
  height: 38px;
  display: flex;
  color: #ffff;
  font-weight: 500;
  font-size: 18px;
  background: ${(props) => props.color};
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
`;

export const StatusButton = ({ status, color, onClick }: StatusButtonProps) => {
  return (
    <div>
      <StatusButtonContainer onClick={onClick} color={color}>
        {status}
      </StatusButtonContainer>
    </div>
  );
};

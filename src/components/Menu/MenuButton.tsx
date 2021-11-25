/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';

interface MenuButtonProps {
  onClick: () => void;
  isActive?: boolean;
  className?: string;
  children?: any;
}

const MenuButtonSection = styled.div`
  line-height: 28px;
  cursor: pointer;
`;

export const MenuButton = ({
  isActive,
  onClick,
  children,
  ...restProps
}: MenuButtonProps) => {
  return (
    <MenuButtonSection
      onClick={onClick}
      css={css`
        color: ${isActive ? '#EE6400' : '#CACACA'};
        font-size: ${isActive ? '28px' : '24px'};
      `}
      {...restProps}
    >
      {children}
    </MenuButtonSection>
  );
};

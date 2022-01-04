/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { mediaQueryMobile } from 'styles/variables';

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
        font-size: ${isActive ? '25px' : '16px'};
        font-weight: ${isActive ? '700' : '500'};

        ${mediaQueryMobile} {
          font-size: ${isActive ? '20px' : '14px'};
        }
      `}
      {...restProps}
    >
      {children}
    </MenuButtonSection>
  );
};

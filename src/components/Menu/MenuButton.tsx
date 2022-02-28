/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import {
  mediaQueryLargeDesktop,
  mediaQueryMobile,
  mediaQueryTablet
} from 'styles/variables';

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
        color: ${isActive ? '#EE6400' : '#848484'};
        font-size: ${isActive ? '26px' : '18px'};
        font-weight: ${isActive ? '700' : '500'};

        ${mediaQueryLargeDesktop} {
          font-size: ${isActive ? '20px' : '14px'};
        }

        ${mediaQueryTablet} {
          font-size: ${isActive ? '20px' : '14px'};
        }

        ${mediaQueryMobile} {
          font-size: ${isActive ? '18px' : '14px'};
        }
      `}
      {...restProps}
    >
      {children}
    </MenuButtonSection>
  );
};

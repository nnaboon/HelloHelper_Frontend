/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Spin } from 'antd';
import {
  mediaQueryLargeDesktop,
  mediaQueryMobile
} from '../../styles/variables';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingProps {
  height?: any;
}

const antIcon = <LoadingOutlined style={{ color: '#ee6400' }} spin />;

export const Loading = ({ height }: LoadingProps) => {
  return (
    <Spin
      indicator={antIcon}
      css={css`
        display: flex;
        position: relative;
        height: ${height ? height : '100%'};
        align-items: center;
        justify-content: center;

        svg {
          font-size: 3.5rem;
        }

        ${mediaQueryLargeDesktop} {
          svg {
            font-size: 30px;
          }
        }

        ${mediaQueryMobile} {
          height: calc(100vh - 220px);
        }
      `}
    />
  );
};

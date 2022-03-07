/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Empty } from 'antd';
import {
  mediaQueryLargeDesktop,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';

interface EmptyDataProps {
  height?: any;
  text?: string;
}

const EmptyContainer = styled(Empty)`
    display: flex;
    flex-direction: column;
    // height: 700px;
    width: 100%;
    align-items: center;
    justify-content: center;

    ${mediaQueryTablet} {
        height: 100%;
    }

    ${mediaQueryMobile} {
        height: 100%;
        top: 0;
    }
}`;

export const EmptyData = ({ height, text }: EmptyDataProps) => {
  return (
    <Empty
      image={Empty.PRESENTED_IMAGE_DEFAULT}
      description={<span>{text ? text : 'ไม่พบข้อมูล'}</span>}
      css={css`
        display: flex;
        margin: 0;
        font-size: 24px;
        flex-direction: column;
        height: ${height ?? `calc(100vh - 265px)`};
        width: 100%;
        align-items: center;
        justify-content: center;

        .ant-empty {
          margin: 0;
        }

        > svg {
          width: 90px;
          height: 90px;
        }

        .ant-empty-img-default {
          width: 100px;
          height: 100px;
        }

        .ant-empty-image {
          height: 100px;
        }

        ${mediaQueryLargeDesktop} {
          font-size: 16px;

          > svg {
            width: 60px;
            height: 60px;
          }

          .ant-empty-img-default {
            width: 90px;
            height: 90px;
          }

          .ant-empty-image {
            height: max-content;
          }
        }

        ${mediaQueryTablet} {
          font-size: 12px;

          .ant-empty-img-default {
            width: 70px;
            height: 70px;
          }

          .ant-empty-image {
            height: max-content;
          }
        }

        ${mediaQueryMobile} {
          height: ${height ?? `calc(100vh - 265px)`};
          top: 0;

          .ant-empty-img-default {
            width: 60px;
            height: 60px;
          }
        }
      `}
    />
  );
};

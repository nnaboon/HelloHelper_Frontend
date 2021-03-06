/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import { Rate } from 'antd';
import { mediaQueryMobile } from 'styles/variables';
import { mediaQueryLargeDesktop } from '../../styles/variables';

export const getStar = (count: Number) => {
  // for (let i = 0; i < count; i++) {
  return (
    <div>
      <Rate
        allowHalf
        defaultValue={count as number}
        disabled
        style={{ minWidth: '153px', display: 'flex', justifyContent: 'center' }}
        css={css`
          .ant-rate-star.ant-rate-star-full svg {
            width: 25px;
            height: 25px;
          }
          .ant-rate-star.ant-rate-star-zero svg {
            width: 25px;
            height: 25px;
          }

          .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
            width: 25px;
            height: 25px;
          }

          .ant-rate-star.ant-rate-star-full,
          .ant-rate-star.ant-rate-star-zero,
          .ant-rate-star.ant-rate-star-half.ant-rate-star-active {
            transition: transform 0s;
          }

          .ant-rate-star.ant-rate-star-half.ant-rate-star-active:hover {
            transform: scale(0.91);
          }

          .ant-rate-star.ant-rate-star-full:hover {
            transform: scale(0.91);
          }

          .ant-rate-star.ant-rate-star-zero:hover {
            transform: scale(0.91);
          }

          .ant-rate-star:not(:last-child) {
            margin-right: 8px;
          }

          ${mediaQueryLargeDesktop} {
            .ant-rate-star.ant-rate-star-full svg {
              width: 20px;
              height: 20px;
            }
            .ant-rate-star.ant-rate-star-zero svg {
              width: 20px;
              height: 20px;
            }

            .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
              width: 20px;
              height: 20px;
            }

            .ant-rate-star:not(:last-child) {
              margin-right: 5px;
            }
          }

          ${mediaQueryMobile} {
            .ant-rate-star:not(:last-child) {
              margin-right: 4px;
            }
            .ant-rate-star.ant-rate-star-full svg {
              width: 20px;
              height: 20px;
            }
            .ant-rate-star.ant-rate-star-zero svg {
              width: 20px;
              height: 20px;
            }

            .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
              width: 20px;
              height: 20px;
            }
          }
        `}
      />
    </div>
  );
  // }
};

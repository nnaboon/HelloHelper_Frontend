/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import { Rate } from 'antd';

export const getStar = (count: Number) => {
  for (let i = 0; i < count; i++) {
    return (
      <div>
        <Rate
          allowHalf
          defaultValue={count as number}
          disabled
          style={{ minWidth: '153px' }}
          css={css`
            .ant-rate-star.ant-rate-star-full svg {
              width: 24px;
              height: 24px;
            }
            .ant-rate-star.ant-rate-star-zero svg {
              width: 24px;
              height: 24px;
            }

            .ant-rate-star.ant-rate-star-half.ant-rate-star-active svg {
              width: 24px;
              height: 24px;
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
          `}
        />
      </div>
    );
  }
};

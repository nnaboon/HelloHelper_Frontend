/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { Empty } from 'antd';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';

const EmptyContainer = styled(Empty)`
    display: flex;
    flex-direction: column;
    height: 800px;
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

export const Develop = () => {
  return (
    <EmptyContainer
      //   image={Empty.PRESENTED_IMAGE_SIMPLE}
      description={
        <span style={{ fontSize: '16px' }}>
          ขออภัย ส่วนนี้กำลังอยู่ในระหว่างขั้นตอนการพัฒนา
        </span>
      }
    />
  );
};

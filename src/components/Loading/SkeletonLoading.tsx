/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React from 'react';
import { Skeleton } from 'antd';

export const SkeletonLoading = () => {
  return <Skeleton avatar paragraph={{ rows: 4 }} />;
};

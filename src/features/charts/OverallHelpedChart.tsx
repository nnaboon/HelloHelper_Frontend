/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import ReactECharts from 'echarts-for-react';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH
} from 'styles/variables';

interface OverallHelpedChartProps {
  provideSum?: number;
  requestSum?: number;
}

export const OverallHelpedChart = ({
  provideSum,
  requestSum
}: OverallHelpedChartProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        label: {
          fontSize: isLargeDesktop ? 14 : '1.8rem'
        },
        data: [
          {
            value: provideSum,
            itemStyle: { color: '#f86800' },

            label: {
              fontSize: isLargeDesktop ? 14 : '1.4rem'
            },
            name: 'การให้ความช่วยเหลือ'
          },
          {
            value: requestSum,
            itemStyle: { color: '#0053d9' },
            label: {
              fontSize: isLargeDesktop ? 14 : '1.4rem'
            },
            name: 'การขอความช่วยเหลือ'
          }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{
          width: isLargeDesktop ? (isTablet ? '100%' : '800px') : '1000px',
          height: isLargeDesktop ? '300px' : '600px'
        }}
      />
    </div>
  );
};

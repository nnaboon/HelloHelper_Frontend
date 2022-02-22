import React from 'react';
import ReactECharts from 'echarts-for-react';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH
} from 'styles/variables';
import { width } from 'styled-system';

export const TopThreeHelpedChart = ({ data }: any) => {
  console.log(data);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const ability = {
    food: 'การจัดหาอาหาร',
    cloth: 'เครื่องแต่งกาย',
    furniture: 'เครื่องใช้ในบ้าน',
    electronic: 'เครื่องใช้ไฟฟ้า',
    agriculture: 'อุปกรณ์ทำการเกษตร',
    stationary: 'หนังสือและเครื่องเขียน',
    music: 'เพลงและดนตรี',
    mobile: 'มือถือและอุปกรณ์เสริม',
    sports: 'กีฬาและอุปกรณ์เสริม',
    health: 'สุขภาพและความงาม'
  };

  const option = {
    tooltip: {
      trigger: 'axis'
    },
    axisPointer: {
      type: 'shadow'
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      // bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      axisLabel: {
        fontFamily: 'Sarabun',
        fontSize: isLargeDesktop ? 14 : '1.5rem',
        color: '#2E2F38'
      },
      data: [
        ability[Object.keys(data)[2]],
        ability[Object.keys(data)[1]],
        ability[Object.keys(data)[0]]
      ]
    },
    series: [
      {
        type: 'bar',
        barGap: 0,
        barWidth: isLargeDesktop ? 30 : 45,
        itemStyle: { color: '#0053d9' },
        data: [
          Object.values(data)[2],
          Object.values(data)[1],
          Object.values(data)[0]
        ]
      }
    ]
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{
          width: isLargeDesktop ? (isTablet ? '100%' : '640px') : '1000px',
          height: isLargeDesktop ? '300px' : '600px'
        }}
      />
    </div>
  );
};

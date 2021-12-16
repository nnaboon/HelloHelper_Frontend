import React from 'react';
import ReactECharts from 'echarts-for-react';
import { useMedia, MOBILE_WIDTH } from 'styles/variables';

export const TopThreeHelpedChart = () => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
      data: ['เครื่องแต่งกาย', 'ความงาม', 'จัดหาอาหาร']
    },
    series: [
      {
        type: 'bar',
        barGap: 0,
        data: [100, 200, 400]
      }
    ]
  };

  return (
    <div>
      <ReactECharts
        option={option}
        style={{ width: isMobile ? '100%' : '640px' }}
      />
    </div>
  );
};

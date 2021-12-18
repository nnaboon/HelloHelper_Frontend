/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

import { Text } from 'components/Text';

const CommunityRequestSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const RequestCarousel = styled(Carousel)`
  .slick-next::before {
      content: '';
    }
  .slick-prev::before {
      content: '';
    }
  }`;

export const CommunityRequestContent = () => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '15px',
          top: '155px',
          marginRight: '2px'
        }}
        onClick={onClick}
      >
        <RightOutlined />
      </div>
    );
  };

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          color: 'black',
          fontSize: '15px',
          top: '155px',
          marginLeft: '6px'
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };
  return (
    <div>
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือยอดนิยม
      </Text>
      {isMobile ? (
        <RequestCarousel
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {SUGGESTED_REQUEST_DATA.map((items) => (
            <SuggestedRequestSection data={[items]} />
          ))}
        </RequestCarousel>
      ) : (
        <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
      )}
      <Text fontSize="32px" fontWeight={500}>
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      {isMobile ? (
        <RequestCarousel
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {SUGGESTED_REQUEST_DATA.map((items) => (
            <SuggestedRequestSection data={[items]} />
          ))}
        </RequestCarousel>
      ) : (
        <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
      )}
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityRequestSection>
        {SUGGESTED_REQUEST_DATA.map((items) => (
          <SuggestedRequestSection
            data={[items]}
            css={css`
              overflow: hidden !important;
            `}
          />
        ))}
      </CommunityRequestSection>
    </div>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { Text } from 'components/Text';
import { Carousel } from 'antd';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const CommunityProvideSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProvideCarousel = styled(Carousel)`
  .slick-next::before {
      content: '';
    }
  .slick-prev::before {
      content: '';
    }
  }`;

export const CommunityProvideContent = () => {
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
          top: '125px',
          marginRight: '5px'
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
          top: '125px',
          marginLeft: '5px'
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
        <ProvideCarousel
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {POPULAR_REQUEST_DATA.map((items) => (
            <PopularRequestSection data={[items]} />
          ))}
        </ProvideCarousel>
      ) : (
        <PopularRequestSection data={POPULAR_REQUEST_DATA} />
      )}

      <Text fontSize="32px" fontWeight={500}>
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      {isMobile ? (
        <ProvideCarousel
          arrows
          nextArrow={<SampleNextArrow />}
          prevArrow={<SamplePrevArrow />}
        >
          {POPULAR_REQUEST_DATA.map((items) => (
            <PopularRequestSection data={[items]} />
          ))}
        </ProvideCarousel>
      ) : (
        <PopularRequestSection data={POPULAR_REQUEST_DATA} />
      )}
      <Text fontSize="32px" fontWeight={500}>
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityProvideSection>
        {POPULAR_REQUEST_DATA.map((items) => (
          <PopularRequestSection
            data={[items]}
            css={css`
              overflow: hidden !important;
            `}
          />
        ))}
      </CommunityProvideSection>
    </div>
  );
};

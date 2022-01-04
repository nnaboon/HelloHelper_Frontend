/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { REQUEST_MAPPER } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
import Carousel from 'react-multi-carousel';

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

export const CommunityRequestContent = () => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <Text
        fontSize="32px"
        fontWeight={500}
        marginTop="30px"
        marginBottom="10px"
      >
        ความช่วยเหลือยอดนิยม
      </Text>
      <Carousel
        responsive={responsive}
        arrows
        css={css`
          .react-multiple-carousel__arrow {
            z-index: 10;
          }

          .react-multiple-carousel__arrow--left {
            left: 0;
          }

          .react-multiple-carousel__arrow--right {
            right: 0;
          }
        `}
      >
        {REQUEST_MAPPER.map((items) => (
          <SuggestedRequestSection data={[items]} />
        ))}
      </Carousel>
      <Text
        fontSize="32px"
        fontWeight={500}
        marginTop="30px"
        marginBottom="10px"
      >
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      <Carousel
        responsive={responsive}
        arrows
        css={css`
          .react-multiple-carousel__arrow {
            z-index: 10;
          }

          .react-multiple-carousel__arrow--left {
            left: 0;
          }

          .react-multiple-carousel__arrow--right {
            right: 0;
          }
        `}
      >
        {REQUEST_MAPPER.map((items) => (
          <SuggestedRequestSection data={[items]} />
        ))}
      </Carousel>
      <Text
        fontSize="32px"
        fontWeight={500}
        marginTop="30px"
        marginBottom="10px"
      >
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityRequestSection>
        {REQUEST_MAPPER.map((items) => (
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

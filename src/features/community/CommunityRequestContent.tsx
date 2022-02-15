/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryLargeDesktop
} from 'styles/variables';
import Carousel from 'react-multi-carousel';

import { Text } from 'components/Text';
import { useLocation } from 'react-router-dom';
import { useCommunityRequest } from 'hooks/community/useCommunityRequest';
import { Loading } from 'components/Loading/Loading';
import { EmptyData } from 'components/Empty/EmptyData';

const CommunityRequestSection = styled.div<{ isRequest: any }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isRequest.length > 0 ? 'repeat(3, 1fr)' : '1fr'};
  grid-gap: 10px;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const CommunityRequestContent = () => {
  const { data: request, execute: getCommunityRequest } = useCommunityRequest();
  const { pathname } = useLocation();
  const query = pathname.split('/')[2];
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: request ? (request.length > 0 ? 5 : 1) : 1
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: request ? (request.length > 0 ? 4 : 1) : 1
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: request ? (request.length > 0 ? 3 : 1) : 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: request ? (request.length > 0 ? 2 : 1) : 1
    },
    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: request ? (request.length > 0 ? 2 : 1) : 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getCommunityRequest(query);
  }, [query]);

  return (
    <div>
      <Text
        fontSize={isMobile ? '24px' : '2rem'}
        fontWeight={500}
        marginY="10px"
        css={css`
          font-size: 2.5rem;
          ${mediaQueryLargeDesktop} {
            font-size: 2rem;
          }
          ${mediaQueryMobile} {
            font-size: 24px;
          }
        `}
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
        {request ? (
          request.length > 0 ? (
            request.map((items) => <SuggestedRequestSection data={[items]} />)
          ) : (
            <EmptyData height="375px" />
          )
        ) : (
          <Loading height="375px" />
        )}
      </Carousel>
      <Text
        fontSize={isMobile ? '24px' : '2rem'}
        fontWeight={500}
        marginY="10px"
        css={css`
          font-size: 2.5rem;
          ${mediaQueryLargeDesktop} {
            font-size: 2rem;
          }
          ${mediaQueryMobile} {
            font-size: 24px;
          }
        `}
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
        {request ? (
          request.length > 0 ? (
            request.map((items) => <SuggestedRequestSection data={[items]} />)
          ) : (
            <EmptyData height="375px" />
          )
        ) : (
          <Loading height="375px" />
        )}
      </Carousel>
      <Text
        fontSize={isMobile ? '24px' : '2rem'}
        fontWeight={500}
        marginY="10px"
        css={css`
          font-size: 2.5rem;
          ${mediaQueryLargeDesktop} {
            font-size: 2rem;
          }
          ${mediaQueryMobile} {
            font-size: 24px;
          }
        `}
      >
        ความช่วยเหลือทั้งหมด
      </Text>
      <CommunityRequestSection isRequest={request ? request : 0}>
        {request ? (
          request.length > 0 ? (
            request.map((items) => (
              <SuggestedRequestSection
                data={[items]}
                css={css`
                  overflow: hidden !important;
                `}
              />
            ))
          ) : (
            <EmptyData height="375px" />
          )
        ) : (
          <Loading height="375px" />
        )}
      </CommunityRequestSection>
    </div>
  );
};

/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { Text } from 'components/Text';
import Carousel from 'react-multi-carousel';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useCommunityProvide } from 'hooks/community/useCommunityProvide';
import { Loading } from 'components/Loading/Loading';
import { EmptyData } from 'components/Empty/EmptyData';
import { mediaQueryMiniDesktop } from '../../styles/variables';

interface CommunityProvideContentProps {
  provides: any[];
  setProvides: (provides: any) => void;
}

const CommunityProvideSection = styled.div<{ isProvide: any }>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.isProvide.length > 0 ? 'repeat(3, 1fr)' : '1fr'};
  grid-gap: 10px;

  ${mediaQueryMiniDesktop} {
    grid-template-columns: ${(props) =>
      props.isProvide.length > 0 ? 'repeat(2, 1fr)' : '1fr'};
  }

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const CommunityProvideTitle = styled(Text)`
  margin: 20px 0;
  font-size: 22px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 15px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
  }
`;

export const CommunityProvideContent = ({
  provides,
  setProvides
}: CommunityProvideContentProps) => {
  const { data: provide, execute: getCommunityProvide } = useCommunityProvide();
  const { pathname } = useLocation();
  const query = pathname.split('/')[2];
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: provide ? 5 : 1
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: provide ? 4 : 1
    },
    desktop: {
      breakpoint: { max: 2000, min: 1300 },
      items: provide ? 3 : 1
    },
    smallDesktop: {
      breakpoint: { max: 1300, min: 1024 },
      items: 2
      // partialVisibilityGutter: 50
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: provide ? 2 : 1
    },

    smallTablet: {
      breakpoint: { max: 768, min: 464 },
      items: provide ? 2 : 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  useEffect(() => {
    getCommunityProvide(query).then((res) => setProvides(res.data));
  }, [query]);

  return (
    <div>
      <CommunityProvideTitle fontWeight={500}>
        ความช่วยเหลือยอดนิยม
      </CommunityProvideTitle>
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
        {provide ? (
          provides.length > 0 ? (
            provides.map((items) => <PopularRequestSection data={[items]} />)
          ) : (
            <EmptyData height={isMobile ? '200px' : '300px'} />
          )
        ) : (
          <Loading height="300px" />
        )}
      </Carousel>
      <CommunityProvideTitle fontWeight={500}>
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </CommunityProvideTitle>

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
        {provide ? (
          provides.length > 0 ? (
            provides.map((items) => <PopularRequestSection data={[items]} />)
          ) : (
            <EmptyData height={isMobile ? '200px' : '300px'} />
          )
        ) : (
          <Loading height="300px" />
        )}
      </Carousel>
      <CommunityProvideTitle fontWeight={500}>
        ความช่วยเหลือทั้งหมด
      </CommunityProvideTitle>
      <CommunityProvideSection isProvide={provide ? provide : 0}>
        {provide ? (
          provides.length > 0 ? (
            provides.map((items) => (
              <PopularRequestSection
                data={[items]}
                css={css`
                  overflow: hidden !important;
                `}
              />
            ))
          ) : (
            <EmptyData height={isMobile ? '200px' : '300px'} />
          )
        ) : (
          <Loading height="300px" />
        )}
      </CommunityProvideSection>
    </div>
  );
};

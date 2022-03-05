/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import Carousel from 'react-multi-carousel';
import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  MOBILE_WIDTH,
  useMedia
} from 'styles/variables';

const NewsSection = styled.div`
  width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  ${mediaQueryMobile} {
    padding: 0px 0px 50px 0px;
    justify-content: center;
    display: block;
  }
`;

const NewsContainer = styled.div`
  width: 100%;
  height: 450px;
  background: #f5f5f5;

  ${mediaQueryLargeDesktop} {
    height: 384px;
  }

  ${mediaQueryMobile} {
    width: 100%;
  }
`;

export const News = () => {
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
    <NewsSection>
      {isMobile ? (
        <React.Fragment>
          {' '}
          <Carousel
            responsive={responsive}
            arrows
            autoPlay={false}
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
            <NewsContainer>na1</NewsContainer>
            <NewsContainer>na2</NewsContainer>
          </Carousel>
        </React.Fragment>
      ) : (
        <NewsContainer />
      )}
    </NewsSection>
  );
};

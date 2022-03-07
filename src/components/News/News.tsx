/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import Flex from 'components/Flex/Flex';
import Carousel from 'react-multi-carousel';
import Community from 'images/community.png';
import Money from 'images/money.jpg';
import Shopping from 'images/shopping.jpg';
import Helping from 'images/helping.jpg';

import {
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  MOBILE_WIDTH,
  useMedia
} from 'styles/variables';
import { Card } from 'antd';

const { Meta } = Card;

const NewsSection = styled.div`
  width: 100%;
  padding: 20px 0;
  // display: flex;
  // justify-content: space-between;
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
            <Card
              hoverable
              cover={
                <img
                  alt="Spend money with rare goods"
                  src={Money}
                  css={css`
                    height: 250px;
                  `}
                />
              }
              css={css`
                width: 23%;
                margin: 0 10px;
              `}
            >
              <Meta
                title="จับจ่ายใช้สอยกับประสบการณ์"
                description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              cover={
                <img
                  alt="Build your provide and request community for help each other"
                  src={Community}
                  css={css`
                    height: 250px;
                  `}
                />
              }
              css={css`
                width: 23%;
                margin: 0 10px;
              `}
            >
              <Meta
                title="สร้างชุมชนความช่วยเหลือของคุณ"
                description="www.instagram.com"
              />
            </Card>

            <Card
              hoverable
              cover={
                <img
                  alt="Best ways that you can shopping rare goods"
                  src={Shopping}
                  css={css`
                    height: 250px;
                  `}
                />
              }
              css={css`
                width: 23%;
                margin: 0 10px;
              `}
            >
              <Meta
                title="เลือกซื้อสินค้าหายาก"
                description="www.instagram.com"
              />
            </Card>
            <Card
              hoverable
              cover={
                <img
                  alt="help each other to find goods"
                  src={Helping}
                  css={css`
                    height: 250px;
                  `}
                />
              }
              css={css`
                width: 23%;
                margin: 0 10px;
              `}
            >
              <Meta title="เลือกซื้อสินค้า" description="www.instagram.com" />
            </Card>
          </Carousel>
        </React.Fragment>
      ) : (
        <Flex justify="space-between">
          <Card
            hoverable
            cover={
              <img
                alt="Spend money with rare goods"
                src={Money}
                css={css`
                  height: 250px;
                `}
              />
            }
            css={css`
              width: 23%;
              margin: 0 10px;
            `}
          >
            <Meta
              title="จับจ่ายใช้สอยกับประสบการณ์"
              description="www.instagram.com"
            />
          </Card>
          <Card
            hoverable
            cover={
              <img
                alt="Build your provide and request community for help each other"
                src={Community}
                css={css`
                  height: 250px;
                `}
              />
            }
            css={css`
              width: 23%;
              margin: 0 10px;
            `}
          >
            <Meta
              title="สร้างชุมชนความช่วยเหลือของคุณ"
              description="www.instagram.com"
            />
          </Card>

          <Card
            hoverable
            cover={
              <img
                alt="Best ways that you can shopping rare goods"
                src={Shopping}
                css={css`
                  height: 250px;
                `}
              />
            }
            css={css`
              width: 23%;
              margin: 0 10px;
            `}
          >
            <Meta
              title="เลือกซื้อสินค้าหายาก"
              description="www.instagram.com"
            />
          </Card>
          <Card
            hoverable
            cover={
              <img
                alt="help each other to find goods"
                src={Helping}
                css={css`
                  height: 250px;
                `}
              />
            }
            css={css`
              width: 23%;
              margin: 0 10px;
            `}
          >
            <Meta title="เลือกซื้อสินค้า" description="www.instagram.com" />
          </Card>
        </Flex>
      )}
    </NewsSection>
  );
};

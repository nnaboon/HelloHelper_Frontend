/** @jsxRuntime classic */
/** @jsx jsx */
import React from 'react';
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import { Carousel } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { mediaQueryMobile, MOBILE_WIDTH, useMedia } from 'styles/variables';

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
  width: 96%;
  height: 384px;
  background: #f5f5f5;

  ${mediaQueryMobile} {
    width: 100%;
  }
`;

export const News = () => {
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
          marginLeft: '5px'
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };
  return (
    <NewsSection>
      {isMobile ? (
        <React.Fragment>
          {' '}
          <Carousel
            arrows
            nextArrow={<SampleNextArrow />}
            prevArrow={<SamplePrevArrow />}
            css={css`  
                .slick-next::before {
                    content: '';
                }
                .slick-prev::before {
                    content: '';
                  }
                }
              `}
          >
            {' '}
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

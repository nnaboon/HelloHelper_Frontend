/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Empty } from 'antd';
import Carousel from 'react-multi-carousel';
import { css, jsx } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { SecondaryButton, TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { News } from 'components/News/News';
import { CATEGORY } from 'data/category';
import { REQUEST_MAPPER } from '../data/request';
import { SearchSvg } from 'components/Svg/SearchSvg';
import {
  mediaQueryMobile,
  mediaQuerySmallTablet,
  MOBILE_WIDTH,
  useMedia
} from 'styles/variables';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { PROVIDE_MAPPER } from 'data/provide';
import { useUsers } from 'hooks/user/useUsers';
import { mediaQueryTablet } from '../styles/variables';

const HomePageCategorySection = styled.div`
  display: flex;
  width: 100%;
  overflow-x: scroll;
  ${mediaQueryMobile} {
    display: grid;
    grid-template-rows: repeat(2, auto);
    grid-gap: 20px;
  }
`;

const HomePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;
  overflow-y: scroll;

  ${mediaQueryTablet} {
    padding: 40px 60px;
    height: calc(100vh - 250px);
    padding: 40px 60px;
  }

  ${mediaQuerySmallTablet} {
    padding: 40px 30px;
    height: calc(100vh - 165px);
    top: 140px;
  }

  ${mediaQueryMobile} {
    height: calc(100vh - 80px);
    padding: 20px 20px 50px 20px;
  }
`;

const HomePagePictureSection = styled.div`
  width: 100%;
  height: 287px;
  background: #c4c4c4;
  margin-bottom: 30px;
  ${mediaQueryMobile} {
    height: 180px;
  }
`;

const TopTenSearchContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 28px;
  padding: 10px;
  overflow-x: scroll;
  margin: 40px 0;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 380px;
    margin: 10px 0;
    box-sizing: border-box;
    padding: 0;
  }
`;

const EmptyData = styled(Empty)`
  .ant-empty {
    display: flex;
    flex-direction: column;
    height: 800px !important;
    align-items: center;
    justify-content: center;
  }
}`;

export const HomePage = () => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState<string>();
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const { data: response, execute: getUsers } = useUsers();
  const { Search } = Input;
  const onSearch = (value) => {
    setSearchValue(value);
  };

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    bigDesktop: {
      breakpoint: { max: 3000, min: 2000 },
      items: 4,
      partialVisibilityGutter: 30
    },
    desktop: {
      breakpoint: { max: 2000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
      // partialVisibilityGutter: 200
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
          marginLeft: '10px'
        }}
        onClick={onClick}
      >
        <LeftOutlined />
      </div>
    );
  };

  return (
    <HomePageContainer>
      <HomePagePictureSection>Picture</HomePagePictureSection>
      {!isMobile && (
        <HomePageCategorySection>
          {CATEGORY.map(({ id, name }) => (
            <SecondaryButton
              key={id}
              css={css`
                min-width: 350px;
                margin-right: 20px;
                border-sizing: border-box;
                padding: 0 10px;
                margin-bottom: 30px;
                margin-top: 20px;

                &:hover {
                  box-shadow: 0px 0px 20px 8px rgba(255, 135, 48, 0.21);
                }
              `}
              onClick={() => {
                history.push({
                  pathname: `/${id}`
                });
              }}
            >
              ความช่วยเหลือ{name}
            </SecondaryButton>
          ))}
        </HomePageCategorySection>
      )}
      <div
        css={css`
          justify-content: space-between;
          display: flex;
          margin-top: 30px;
        `}
      >
        <Search
          placeholder="ค้นหาสถานที่"
          onSearch={onSearch}
          size="large"
          style={{ width: isMobile ? '200px' : '462px', height: '60px' }}
        />
        <PostRequestButton
          buttonText="เขียนความช่วยเหลือ"
          css={css`
            a {
              width: max-content !important;
              min-width: max-content !important;
            }
          `}
        />
      </div>
      <Text
        fontSize={isMobile ? '24px' : '36px'}
        fontWeight={500}
        marginY="10px"
        css={css`
          ${mediaQueryMobile} {
            font-size: 24px;
          }
        `}
      >
        ความช่วยเหลือยอดนิยม
      </Text>{' '}
      <React.Fragment>
        {' '}
        {PROVIDE_MAPPER.filter(({ location }) =>
          searchValue ? location.name === searchValue : true
        ).length > 0 ? (
          <React.Fragment
            css={css`
              .react-multi-carousel-list {
                position: static;
              }
            `}
          >
            {' '}
            <Carousel
              responsive={responsive}
              partialVisible={true}
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
              {PROVIDE_MAPPER.filter(({ location }) =>
                searchValue ? location.name === searchValue : true
              ).map((items) => (
                <PopularRequestSection data={[items]} />
              ))}
            </Carousel>
          </React.Fragment>
        ) : (
          <EmptyData
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            css={css`
              .ant-empty {
                display: flex;
                flex-direction: column;
                height: 300px;
                align-items: center;
                justify-content: center;
              }
            `}
            description={<span>ไม่พบข้อมูล</span>}
          />
        )}
      </React.Fragment>
      <Text
        fontSize={isMobile ? '24px' : '36px'}
        fontWeight={500}
        marginY="30px"
        css={css`
          ${mediaQueryMobile} {
            font-size: 26px;
          }
        `}
      >
        Top 10 การค้นหาติดอันดับ
      </Text>
      <TopTenSearchContainer>
        {isMobile ? (
          <div
            css={css`
              width: 100%;
              height: 100%;
              position: relative;
              background: rgb(247, 249, 249);
              border-radius: 8px;
            `}
          >
            {TOP_TEN_SEARCH_WEEKLY.map(({ name }) => (
              <div
                style={{
                  display: 'flex',
                  margin: '15px',
                  fontWeight: 700
                }}
                key={name}
                onClick={() => {
                  history.push({
                    pathname: '/search',
                    search: `?keyword=${name}`
                  });
                }}
              >
                <SearchSvg
                  style={{
                    marginRight: '10px',
                    width: isMobile ? '20px' : '25px',
                    height: isMobile ? '20px' : '25px'
                  }}
                />
                {name}
              </div>
            ))}
          </div>
        ) : (
          <React.Fragment>
            {' '}
            {TOP_TEN_SEARCH_WEEKLY.map(({ name }) => (
              <TopSearchButton
                key={name}
                onClick={() => {
                  history.push({
                    pathname: '/search',
                    search: `?keyword=${name}`
                  });
                }}
              >
                <SearchSvg
                  style={{
                    marginRight: '10px',
                    width: isMobile ? '20px' : '25px',
                    height: isMobile ? '20px' : '25px'
                  }}
                />
                {name}
              </TopSearchButton>
            ))}
          </React.Fragment>
        )}
      </TopTenSearchContainer>
      <Text
        fontSize={isMobile ? '24px' : '36px'}
        fontWeight={500}
        marginY="30px"
        css={css`
          ${mediaQueryMobile} {
            font-size: 26px;
          }
        `}
      >
        Top 10 ความช่วยเหลือประจำสัปดาห์
      </Text>
      <React.Fragment>
        {' '}
        {PROVIDE_MAPPER.filter(({ location }) =>
          searchValue ? location.name.includes(searchValue) : true
        ).length > 0 ? (
          <React.Fragment>
            {' '}
            <Carousel
              responsive={responsive}
              partialVisible={true}
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
              {PROVIDE_MAPPER.filter(({ location }) =>
                searchValue ? location.name.includes(searchValue) : true
              ).map((items) => (
                <PopularRequestSection data={[items]} />
              ))}
            </Carousel>
          </React.Fragment>
        ) : (
          <EmptyData
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>ไม่พบข้อมูล</span>}
          />
        )}
      </React.Fragment>
      <Text
        fontSize={isMobile ? '24px' : '36px'}
        fontWeight={500}
        marginY="30px"
        css={css`
          ${mediaQueryMobile} {
            font-size: 26px;
          }
        `}
      >
        ความช่วยเหลือแนะนำ
      </Text>
      <React.Fragment>
        {' '}
        {REQUEST_MAPPER.filter(({ location }) =>
          searchValue ? location.name.includes(searchValue) : true
        ).length > 0 ? (
          <React.Fragment>
            {' '}
            <Carousel
              arrows
              partialVisible={true}
              responsive={responsive}
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
              {REQUEST_MAPPER.filter(({ location }) =>
                searchValue ? location.name.includes(searchValue) : true
              ).map((items) => (
                <SuggestedRequestSection data={[items]} />
              ))}
            </Carousel>
          </React.Fragment>
        ) : (
          <EmptyData
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={<span>ไม่พบข้อมูล</span>}
          />
        )}
      </React.Fragment>
      <Text
        fontSize={isMobile ? '24px' : '36px'}
        fontWeight={500}
        marginY="30px"
        css={css`
          ${mediaQueryMobile} {
            font-size: 26px;
          }
        `}
      >
        ข่าวน่าสนใจ
      </Text>
      <div
        css={css`
          display: flex;
        `}
      >
        <News />
      </div>
    </HomePageContainer>
  );
};

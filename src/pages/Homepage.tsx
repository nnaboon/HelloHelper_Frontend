/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Modal } from 'antd';
import { css, jsx } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { TopTenRequestSection } from 'components/Card/TopTenRequestCard';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { SecondaryButton, TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { News } from 'components/News/News';
import { CATEGORY } from 'data/category';
import { SUGGESTED_REQUEST_DATA } from '../data/request';
import { POPULAR_REQUEST_DATA } from '../data/helper';
import { SearchSvg } from 'components/Svg/SearchSvg';

const HomePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;
`;

const TopTenSearchContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 28px;
  padding: 10px;
  overflow-x: scroll;
  margin: 40px 0;
`;

export const HomePage = () => {
  const history = useHistory();
  const { Search } = Input;
  const onSearch = (value) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`
    });
  };

  return (
    <React.Fragment>
      <HomePageContainer>
        <div
          css={css`
            width: 100%;
            height: 427px;
            background: #c4c4c4;
            margin-bottom: 30px;
          `}
        >
          Picture
        </div>
        <div style={{ display: 'flex', overflowX: 'scroll', width: '100%' }}>
          {CATEGORY.map(({ id, name }) => (
            <SecondaryButton
              key={id}
              css={css`
                min-width: 350px;
                margin-right: 20px;
                border-sizing: border-box;
                padding: 0 10px;
                margin-bottom: 30px;
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
        </div>
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
            style={{ width: '462px', height: '60px' }}
          />
          <PostRequestButton buttonText="ขอ/ให้ความช่วยเหลือ" />
        </div>
        <Text fontSize="36px" fontWeight={500}>
          ความช่วยเหลือยอดนิยม
        </Text>
        <PopularRequestSection data={POPULAR_REQUEST_DATA} />
        <Text fontSize="36px" fontWeight={500}>
          Top 10 การค้นหาติดอันดับ
        </Text>
        <TopTenSearchContainer>
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
              <SearchSvg style={{ marginRight: '10px' }} />
              {name}
            </TopSearchButton>
          ))}
        </TopTenSearchContainer>
        <Text fontSize="36px" fontWeight={500}>
          Top 10 ความช่วยเหลือประจำสัปดาห์
        </Text>
        <TopTenRequestSection data={POPULAR_REQUEST_DATA} />
        <Text fontSize="36px" fontWeight={500}>
          ความช่วยเหลือแนะนำ
        </Text>
        <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
        <Text fontSize="36px" fontWeight={500}>
          ข่าวน่าสนใจ
        </Text>
        <News />
      </HomePageContainer>
    </React.Fragment>
  );
};

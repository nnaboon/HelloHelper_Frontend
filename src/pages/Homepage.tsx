/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Modal } from 'antd';
import { css, jsx, useTheme } from '@emotion/react';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { TopTenRequestSection } from 'components/Card/TopTenRequestCard';
import { Text } from 'components/Text';
import { TOP_TEN_SEARCH_WEEKLY } from 'data/search';
import { SecondaryButton, TopSearchButton } from 'components/Button/Button';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { Navbar } from 'components/Navbar/Navbar';
import { News } from 'components/News/News';
import { CATEGORY } from 'data/category';
import { RequestForm } from 'components/Form/RequestForm';
import { TOP_TEN_REQUEST_DATA } from 'data/helper';
import { SUGGESTED_REQUEST_DATA } from '../data/request';
import { POPULAR_REQUEST_DATA } from '../data/helper';
import { CommunityForm } from 'components/Form/CommunityForm';
import { CommunityMenu } from 'features/community/CommunityMenu';

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
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const history = useHistory();
  const { Search } = Input;
  const onSearch = (value) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`
    });
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
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
        <Text fontSize="23px" fontWeight={500} marginY="10px">
          คุณมีชุมชนความช่วยเหลือแล้วหรือยัง ให้ความช่วยเหลือคนในชุมชนของคุณได้{' '}
          <span
            style={{ color: '#F86800' }}
            onClick={() => setIsModalVisible(true)}
          >
            ที่นี่
          </span>
        </Text>
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
          <PostRequestButton />
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
              {name}
            </TopSearchButton>
          ))}
        </TopTenSearchContainer>
        <Text fontSize="36px" fontWeight={500}>
          Top 10 ความช่วยเหลือประจำสัปดาห์
        </Text>
        <TopTenRequestSection data={TOP_TEN_REQUEST_DATA} />
        <Text fontSize="36px" fontWeight={500}>
          ความช่วยเหลือแนะนำ
        </Text>
        <SuggestedRequestSection data={SUGGESTED_REQUEST_DATA} />
        <Text fontSize="36px" fontWeight={500}>
          ข่าวน่าสนใจ
        </Text>
        <News />
        <Modal
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={500}
          maskClosable={false}
          centered
        >
          <CommunityMenu />
        </Modal>
      </HomePageContainer>
    </React.Fragment>
  );
};

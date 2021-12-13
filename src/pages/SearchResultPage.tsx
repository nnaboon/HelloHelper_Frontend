/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { useLocation } from 'react-router-dom';
import { HelpMenu } from 'components/Menu/const';
import { MenuTab } from 'components/Menu/MenuTab';
import { Divider } from 'components/Divider/Divider';
import Flex from 'components/Flex/Flex';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { POPULAR_REQUEST_DATA } from 'data/helper';
import { SUGGESTED_REQUEST_DATA } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';

const SearchResultContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  overflow: scroll;
  position: relative;
`;

export const SearchResultPage = () => {
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const { state } = useLocation();
  const currentMenu = ((state as any)?.menu || HelpMenu.PROVIDE) as HelpMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            left: 25%;
            width: 75%;
          `}
        >
          <div style={{ top: '125px' }}>
            <MenuTab menu={menu} setMenu={setMenu} />
            <Divider />
            <Flex justify="space-between" marginY="20px">
              <Text fontSize="24px" fontWeight={500}>
                ผลการค้นหา ทั้งหมด {POPULAR_REQUEST_DATA.length} รายการ
              </Text>
              <PostRequestButton
                css={css`
                  margin-right: 20px;
                `}
                buttonText="ขอ/ให้ความช่วยเหลือ"
              />
            </Flex>
          </div>
          <SearchResultContent>
            {menu === HelpMenu.PROVIDE
              ? POPULAR_REQUEST_DATA.map((props) => (
                  <PopularRequestSection data={[props]} />
                ))
              : SUGGESTED_REQUEST_DATA.map((props) => (
                  <SuggestedRequestSection data={[props]} />
                ))}
          </SearchResultContent>
        </div>
      </div>
    </WrapperContainer>
  );
};

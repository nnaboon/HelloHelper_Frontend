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
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';

const SearchResultContent = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
  overflow: scroll;
  position: relative;

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const SearchResultPage = () => {
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const { state } = useLocation();
  const currentMenu = ((state as any)?.menu || HelpMenu.PROVIDE) as HelpMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 90px);
        }
      `}
    >
      <div style={{ display: 'flex' }}>
        {!isMobile && <Sidebar />}
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            left: 25%;
            width: 75%;

            ${mediaQueryMobile} {
              left: 0;
              width: 100%;
            }
          `}
        >
          <div style={{ top: '125px' }}>
            <MenuTab menu={menu} setMenu={setMenu} />
            <Divider
              css={css`
                ${mediaQueryMobile} {
                  margin: 30px 0;
                }
              `}
            />
            <Flex
              justify={isMobile ? 'flex-start' : 'space-between'}
              marginY="20px"
              itemAlign={isMobile ? 'flex-start' : 'center'}
              direction={isMobile ? 'column' : 'row'}
            >
              <Text fontSize="24px" fontWeight={500} marginBottom="20px">
                ผลการค้นหา ทั้งหมด {POPULAR_REQUEST_DATA.length} รายการ
              </Text>
              <div
                css={css`
                  ${mediaQueryMobile} {
                    align-self: end !important;
                  }
                `}
              >
                {' '}
                <PostRequestButton
                  buttonText={
                    menu === HelpMenu.PROVIDE
                      ? 'ขอความช่วยเหลือ'
                      : 'ให้ความช่วยเหลือ'
                  }
                />
              </div>
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

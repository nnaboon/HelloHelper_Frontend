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
import { REQUEST_MAPPER } from 'data/request';
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  TABLET_WIDTH
} from 'styles/variables';
import { PROVIDE_MAPPER } from 'data/provide';

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
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 120px);
        }
      `}
    >
      <div style={{ display: 'flex' }}>
        {!isTablet && <Sidebar />}
        <div
          css={css`
            position: relative;
            display: flex;
            flex-direction: column;
            left: 25%;
            width: 75%;

            ${mediaQueryTablet} {
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
                ผลการค้นหา ทั้งหมด {PROVIDE_MAPPER.length} รายการ
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
              ? PROVIDE_MAPPER.map((props) => (
                  <PopularRequestSection data={[props]} />
                ))
              : REQUEST_MAPPER.map((props) => (
                  <SuggestedRequestSection data={[props]} />
                ))}
          </SearchResultContent>
        </div>
      </div>
    </WrapperContainer>
  );
};

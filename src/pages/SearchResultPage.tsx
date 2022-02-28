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
import { SuggestedRequestSection } from 'components/Card/SuggestedRequestCard';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  TABLET_WIDTH,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop,
  mediaQueryMiniDesktop
} from 'styles/variables';
import { EmptyData } from 'components/Empty/EmptyData';
import { useProvides } from 'hooks/provide/useProvides';
import { useRequests } from 'hooks/request/useRequests';
import { Loading } from 'components/Loading/Loading';

const SearchResultContent = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  overflow: scroll;
  position: relative;

  ${mediaQueryLargeDesktop} {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
  }

  ${mediaQueryMiniDesktop} {
    grid-template-columns: 1fr 1fr;
  }

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

export const SearchResultPage = () => {
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const [provides, setProvides] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const { pathname, state, search } = useLocation();
  const qs = pathname.split('/')[1];
  const currentMenu = ((state as any)?.menu || HelpMenu.PROVIDE) as HelpMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const { data: provideData, execute: getProvides } = useProvides();
  const { data: requestData, execute: getRequests } = useRequests();

  useEffect(() => {
    if (state?.menu !== undefined) {
      setMenu(currentMenu);
    }
  }, [currentMenu, state]);

  useEffect(() => {
    getProvides().then((res) => setProvides(res.data));
    getRequests().then((res) => setRequests(res.data));
  }, []);

  return (
    <WrapperContainer>
      {provideData && requestData ? (
        <div style={{ display: 'flex' }}>
          {!isTablet && <Sidebar />}
          <div
            css={css`
              position: relative;
              display: flex;
              flex-direction: column;
              left: 25%;
              width: 70%;

              ${mediaQueryExtraLargeDesktop} {
                width: 75%;
              }

              ${mediaQueryLargeDesktop} {
                width: 72%;
              }

              ${mediaQueryMiniDesktop} {
                width: 77%;
              }

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
                    margin: 20px 0;
                  }
                `}
              />
              <Flex
                justify={isMobile ? 'flex-start' : 'space-between'}
                marginY="20px"
                itemAlign={isMobile ? 'flex-start' : 'center'}
                direction={isMobile ? 'column' : 'row'}
              >
                <Text
                  fontWeight={500}
                  marginBottom="20px"
                  css={css`
                    font-size: 24px;

                    ${mediaQueryLargeDesktop} {
                      font-size: 21px;
                    }
                    ${mediaQueryMobile} {
                      font-size: 14px;
                    }
                  `}
                >
                  ผลการค้นหา ทั้งหมด{' '}
                  {menu === 'provide'
                    ? provides.filter(
                        ({ category, communityId }) =>
                          category[0] === qs && !Boolean(communityId)
                      ).length
                    : requests.filter(
                        ({ category, communityId }) =>
                          category[0] === qs && !Boolean(communityId)
                      ).length}{' '}
                  รายการ
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
                    setProvides={setProvides}
                    setRequests={setRequests}
                    buttonText={
                      menu === HelpMenu.PROVIDE
                        ? 'ให้ความช่วยเหลือ'
                        : 'ขอความช่วยเหลือ'
                    }
                    type={menu === HelpMenu.PROVIDE ? 'provide' : 'request'}
                  />
                </div>
              </Flex>
            </div>
            {menu === HelpMenu.PROVIDE ? (
              provideData.filter(({ category, title }) =>
                search ? title.includes(state?.search) : category[0] === qs
              ).length > 0 ? (
                <SearchResultContent>
                  {provides
                    .filter(
                      ({ category, title, visibility, communityId, hashtag }) =>
                        Boolean(visibility) && !Boolean(communityId) && search
                          ? title.includes(state?.search) ||
                            hashtag.includes(state?.search)
                          : category[0] === qs
                    )
                    .map((props) => (
                      <PopularRequestSection data={[props]} />
                    ))}
                </SearchResultContent>
              ) : (
                <EmptyData height="300px" />
              )
            ) : requestData.filter(({ category, title }) =>
                search ? title.includes(state?.search) : category[0] === qs
              ).length > 0 ? (
              <SearchResultContent>
                {requests
                  .filter(
                    ({ category, title, visibility, communityId, hashtag }) =>
                      Boolean(visibility) &&
                      !Boolean(communityId) &&
                      (search
                        ? title.includes(state?.search) ||
                          hashtag.includes(state?.search)
                        : category[0] === qs)
                  )
                  .map((props) => (
                    <SuggestedRequestSection data={[props]} />
                  ))}
              </SearchResultContent>
            ) : (
              <EmptyData height="300px" />
            )}
          </div>
        </div>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
};

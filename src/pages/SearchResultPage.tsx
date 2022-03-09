/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Text } from 'components/Text';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { useHistory, useLocation } from 'react-router-dom';
import { SearchMenu } from 'components/Menu/const';
import { SecondaryButton } from 'components/Button/Button';
import { UserSvg } from 'components/Svg/UserSvg';
import { SearchMenuTab } from 'components/Menu/SearchMenuTab';
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
import { useUsers } from 'hooks/user/useUsers';

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

const HelperListCardContainer = styled.div`
  width: 100%;
  min-width: 850px;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  box-sizing: border-box;
  padding: 20px 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;

  ${mediaQueryLargeDesktop} {
    min-width: 330px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    height: 130px;
    min-width: 100%;
    align-items: center;
    margin-bottom: 15px;
  }

  ${mediaQueryMobile} {
    flex-direction: column;
    margin-bottom: 20px;
    justify-content: flex-start;
    align-items: flex-start;
    height: 90px;
  }
`;

const HelperImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 50%;

  ${mediaQueryTablet} {
    width: 55px;
    height: 55px;
  }

  ${mediaQueryMobile} {
    width: 45px;
    height: 45px;
  }
`;

const HelperName = styled.div`
  font-size: 18px;
  color: #000000;
  margin-left: 50px;

  ${mediaQueryMobile} {
    font-size: 16px;
    margin-left: 20px;
    font-weight: 600;
  }
`;

export const SearchResultPage = () => {
  const [menu, setMenu] = useState<SearchMenu>(SearchMenu.PROVIDE);
  const [provides, setProvides] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const { pathname, state, search } = useLocation();
  const history = useHistory();
  const qs = pathname.split('/')[1];
  const currentMenu = ((state as any)?.menu ||
    SearchMenu.PROVIDE) as SearchMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const { data: users, execute: getUsers } = useUsers();
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
    getUsers();
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
                width: 80%;
                left: 23%;
              }

              ${mediaQueryTablet} {
                left: 0;
                width: 100%;
              }
            `}
          >
            <div style={{ top: '125px' }}>
              <SearchMenuTab menu={menu} setMenu={setMenu} />
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
                  ผลการค้นหาทั้งหมด{' '}
                  {menu === 'provide'
                    ? provides.filter(
                        ({
                          category,
                          title,
                          visibility,
                          communityId,
                          hashtag
                        }) =>
                          Boolean(visibility) && !Boolean(communityId) && search
                            ? title.includes(state?.search) ||
                              hashtag.includes(state?.search)
                            : category[0] === qs
                      ).length
                    : menu === 'request'
                    ? requests.filter(
                        ({
                          category,
                          title,
                          visibility,
                          communityId,
                          hashtag
                        }) =>
                          Boolean(visibility) &&
                          !Boolean(communityId) &&
                          (search
                            ? title.includes(state?.search) ||
                              hashtag.includes(state?.search)
                            : category[0] === qs)
                      ).length
                    : users.filter(
                        ({ username, location }) =>
                          username
                            .toLowerCase()
                            .includes(state?.search.toLowerCase()) ||
                          location.name.includes(state?.search)
                      ).length}{' '}
                  รายการ
                </Text>
                {menu !== SearchMenu.USER && (
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
                        menu === SearchMenu.PROVIDE
                          ? 'ให้ความช่วยเหลือ'
                          : 'ขอความช่วยเหลือ'
                      }
                      type={menu === SearchMenu.PROVIDE ? 'provide' : 'request'}
                    />
                  </div>
                )}
              </Flex>
            </div>
            {menu === SearchMenu.PROVIDE ? (
              provideData.filter(({ category, title, hashtag }) =>
                search
                  ? title.includes(state?.search) ||
                    hashtag.includes(state?.search)
                  : category[0] === qs
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
            ) : menu === SearchMenu.REQUEST ? (
              requestData.filter(({ category, title, hashtag }) =>
                search
                  ? title.includes(state?.search) ||
                    hashtag.includes(state?.search)
                  : category[0] === qs
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
              )
            ) : users.filter(
                ({ username, location }) =>
                  username
                    .toLowerCase()
                    .includes(state?.search.toLowerCase()) ||
                  location.name.includes(state?.search)
              ).length > 0 ? (
              users
                .filter(
                  ({ username, location }) =>
                    username
                      .toLowerCase()
                      .includes(state?.search.toLowerCase()) ||
                    location.name.includes(state?.search)
                )
                .map(({ id, username, imageUrl }) => (
                  <HelperListCardContainer
                    onClick={() => {
                      history.push({ pathname: `/profile/${id}` });
                    }}
                  >
                    <div
                      css={css`
                        display: flex;
                        align-items: center;

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
                      `}
                    >
                      <HelperImage src={imageUrl} alt="user avatar" />
                      <HelperName>{username}</HelperName>
                    </div>

                    <div
                      css={css`
                        display: flex;

                        ${mediaQueryMobile} {
                          position: relative;
                          bottom: -12px;
                          width: 100%;
                          justify-content: space-between;
                          display: none;
                        }
                      `}
                    >
                      <SecondaryButton
                        css={css`
                          ${mediaQueryMobile} {
                            width: 50%;
                            margin-right: 15px;
                          }
                        `}
                        onClick={() => {
                          history.push({ pathname: `/profile/${id}` });
                        }}
                      >
                        <UserSvg />
                        <div>โปรไฟล์</div>
                      </SecondaryButton>
                    </div>
                  </HelperListCardContainer>
                ))
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

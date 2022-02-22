/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { HelpMenu } from 'components/Menu/const';
import Flex from 'components/Flex/Flex';
import { PrimaryButton } from 'components/Button/Button';
import { Divider } from 'components/Divider/Divider';
import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';
import { Loading } from 'components/Loading/Loading';
import { MyProvideList } from 'components/Profile/MyProvideList';
import { MyRequestList } from 'components/Profile/MyRequestList';
import { RANK_BADGE } from 'components/Badge/const';
import { ProfileMenuTab } from 'components/Menu/ProfileMenuTab';
import DefaultImage from 'images/default.png';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { FollowingSvg } from 'components/Svg/FollowingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { getStar } from 'components/Star/getStar';
import { OverallHelpedChart } from 'features/charts/OverallHelpedChart';
import { TopThreeHelpedChart } from 'features/charts/TopThreeHelpedChart';
import { SettingOutlined } from '@ant-design/icons';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryExtraLargeDesktop,
  MOBILE_WIDTH,
  useMedia,
  TABLET_WIDTH
} from 'styles/variables';
import { ProfileMenu } from '../components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { useMyProvide } from 'hooks/provide/useMyProvide';
import { useMyRequest } from 'hooks/request/useMyRequest';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';

import { EmptyData } from 'components/Empty/EmptyData';
import { mediaQueryLargeDesktop } from '../styles/variables';

const ProfilePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;

  ${mediaQueryTablet} {
    padding: 40px 50px;
  }

  ${mediaQueryMobile} {
    height: calc(100vh - 95px);
    padding: 30px 20px 50px 20px;
    top: 95px;
    overflow-y: scroll;
  }
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQueryTablet} {
    flex-direction: column;
    justify-content: center;
  }
`;

const ProfilePageUserHelperListSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2rem;

  ${mediaQueryExtraLargeDesktop} {
    grid-template-columns: repeat(4, 1fr);
  }

  ${mediaQueryLargeDesktop} {
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }

  ${mediaQueryTablet} {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 3000px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const UserCard = styled.div`
  width: 23%;
  height: 290px;
  min-width: 650px;
  background: #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  border-sizing: border-box;
  padding: 20px;
  position: relative;

  ${mediaQueryLargeDesktop} {
    width: 500px;
    height: 246px;
    min-width: unset;
  }

  ${mediaQueryTablet} {
    margin-bottom: 40px;
    margin-left: 0;
    margin-right: 0;
  }

  ${mediaQueryMobile} {
    width: 100%;
    margin: 0 0 20px 0;
  }
`;

const HelperImageSection = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-top: 15px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 120px;
    height: 120px;
  }
  ${mediaQueryMobile} {
    width: 100px;
    height: 100px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #000000;
  margin-bottom: 5px;
  word-wrap: break-word;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }

  ${mediaQueryMobile} {
    text-align: center;
    max-width: 150px;
  }
`;

const ProfileInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, auto) minmax(300px, auto);
  grid-gap: 40px;

  ${mediaQueryTablet} {
    grid-template-columns: minmax(200px, auto) minmax(200px, auto);
  }

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProfileInfoSection = styled.div`
  margin-top: 20px;
  position: relative;
  left: 130px;

  ${mediaQueryTablet} {
    margin-bottom: 30px;
    left: 0;
  }

  ${mediaQueryMobile} {
    margin-bottom: 0;
  }
`;

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 14px;
  color: #5a5a5a;

  ${mediaQueryLargeDesktop} {
    font-size: 16px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    white-space: pre;
  }
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 2rem;
  line-height: 21px;
  color: #e56101;
  margin-left: 12px;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
    word-wrap: break-word;
  }
`;

export const ProfilePage = observer(() => {
  const [menu, setMenu] = useState<HelpMenu | ProfileMenu>(HelpMenu.PROVIDE);
  const [provideRank, setProvideRank] = useState<any>();
  const [provides, setProvides] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.profile_menu || HelpMenu.PROVIDE) as
    | HelpMenu
    | ProfileMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const { me } = userStore;

  const { data: user, execute: getUser } = useUser();
  const { data: provide, execute: getProvide } = useMyProvide();
  const { data: request, execute: getRequest } = useMyRequest();
  const { execute: addChatRoom } = useAddChatRoom();

  useEffect(() => {
    if (query || window.localStorage.getItem('id')) {
      getUser(query ? query : window.localStorage.getItem('id'));
      getProvide(query ? query : window.localStorage.getItem('id'))
        .then((res) => {
          setProvides(res.data.data);
          setProvideRank(res.data.rank);
        })
        .catch(() => {
          setProvides([]);
          setProvideRank(null);
        });
      getRequest(query ? query : window.localStorage.getItem('id')).then(
        (res) => setRequests(res.data)
      );
    } else if (window.localStorage.getItem('id') === null) {
      history.push('/');
    }
  }, [query]);

  useEffect(() => {
    if (!isMobile && menu === ProfileMenu.HOME) {
      setMenu(HelpMenu.PROVIDE);
    } else {
      setMenu(currentMenu);
    }
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      setMenu(ProfileMenu.HOME);
    }
  }, [isMobile]);

  return (
    <ProfilePageContainer>
      {provide && user && request ? (
        <React.Fragment>
          {isMobile && <ProfileMenuTab menu={menu} setMenu={setMenu} />}
          {(!isMobile || menu === ProfileMenu.HOME) && (
            <div>
              <ProfilePageUserInfoSection>
                <UserCard>
                  <div
                    css={css`
                      display: flex;
                      width: 40%;
                      flex-direction: column;
                      align-items: center;
                      margin-right: 35px;

                      ${mediaQueryMobile} {
                        margin-right: 0;
                        margin-top: 8px;
                      }
                    `}
                  >
                    <HelperImageSection
                      src={user.imageUrl ?? DefaultImage}
                      alt="user avatar"
                    />
                    {Boolean(user?.recommend) && (
                      <SuggestedBadge
                        css={css`
                          left: 0 !important;
                          width: 62px !important;
                          font-size: 14px !important;
                        `}
                      >
                        แนะนำ
                      </SuggestedBadge>
                    )}
                  </div>
                  <div
                    css={css`
                      display: flex;
                      flex-direction: column;
                      align-items: center;
                      justify-content: center;
                      margin-top: -50px;
                    `}
                  >
                    <UserName>{user?.username}</UserName>
                    <div
                      style={{
                        display: 'flex',
                        marginBottom: '10px',
                        marginTop: '-4px'
                      }}
                      css={css`
                        ${mediaQueryMobile} {
                          ul {
                            display: flex;
                            justify-content: center;
                          }
                        }
                      `}
                    >
                      {getStar(user?.rating)}
                    </div>
                    <RankingBadge
                      rankColor={RANK_BADGE[user?.rank].color}
                      css={css`
                        font-size: 1.85rem;
                        height: 37px;

                        ${mediaQueryLargeDesktop} {
                          font-size: 20px;
                          height: 32px;
                        }

                        ${mediaQueryMobile} {
                          width: max-content !important;
                          height: 32px !important;
                          font-size: 20px !important;
                          border-radius: 8px !important;
                          margin-left: 0 !important;
                        }
                      `}
                    >
                      {user?.rank.toUpperCase()}
                    </RankingBadge>
                  </div>
                  {window.localStorage.getItem('id') === query ||
                  query === undefined ? (
                    <div
                      style={{
                        display: 'flex',
                        position: 'absolute',
                        padding: '10px',
                        width: '100%'
                      }}
                      css={css`
                        bottom: 8px;
                        left: -9px;

                        ${mediaQueryMobile} {
                          left: 0;
                          justify-content: space-between;
                          padding: 10px 20px !important;
                          bottom: 4px;
                        }
                      `}
                    >
                      <PrimaryButton
                        css={css`
                          width: 100%;
                          font-size: 1.5rem;
                          height: 45px;

                          ${mediaQueryLargeDesktop} {
                            font-size: 18px;
                            height: 40px;
                          }

                          ${mediaQueryMobile} {
                            width: 47%;
                            height: 35px;
                          }
                        `}
                        onClick={() => {
                          window.localStorage.removeItem('id');
                          window.localStorage.removeItem('loginType');
                          window.localStorage.removeItem('access_token');
                          window.localStorage.removeItem('selectedCommunity');
                          window.location.assign('/');
                          auth.signOut();
                        }}
                      >
                        <LogoutSvg style={{ marginRight: '10px' }} />
                        ออกจากระบบ
                      </PrimaryButton>
                      <PrimaryButton
                        css={css`
                          display: flex;
                          height: 45px;
                          align-items: center;
                          background: transparent;
                          border: 1px solid #848484;
                          width: 100%;
                          color: #848484;
                          &:hover {
                            color: #848484;
                          }

                          ${mediaQueryLargeDesktop} {
                            font-size: 18px;
                            height: 40px;
                          }

                          ${mediaQueryMobile} {
                            width: 47%;
                            height: 35px;
                          }
                        `}
                        onClick={() => {
                          history.push('/user/account/setting');
                        }}
                      >
                        <SettingOutlined
                          style={{ fontSize: '22px', marginRight: '10px' }}
                        />
                        ตั้งค่า
                      </PrimaryButton>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: 'flex',
                        position: 'absolute',
                        bottom: '8px',
                        padding: '10px',
                        left: '-9px',
                        width: '100%'
                      }}
                      css={css`
                        ${mediaQueryMobile} {
                          left: 0 !important;
                          justify-content: space-between;
                          padding: 10px 20px !important;
                        }
                      `}
                    >
                      <PrimaryButton
                        css={css`
                          width: 100%;

                          ${mediaQueryMobile} {
                            width: 47%;
                          }
                        `}
                      >
                        <FollowingSvg style={{ marginRight: '10px' }} />
                        ติดตาม
                      </PrimaryButton>
                      <PrimaryButton
                        onClick={() => {
                          addChatRoom({
                            providerUserId: query,
                            requesterUserId: me.userId
                          }).then((res) => {
                            history.push(`/chat/${res.data}`);
                          });
                        }}
                        css={css`
                          background: #487bff;
                          width: 100%;
                          ${mediaQueryMobile} {
                            width: 47%;
                          }
                        `}
                      >
                        <MessageSvg style={{ marginRight: '10px' }} />
                        แชท
                      </PrimaryButton>
                    </div>
                  )}
                </UserCard>
                <ProfileInfoSection>
                  <Flex
                    marginBottom="40px"
                    itemAlign={isMobile ? 'center' : 'flex-end'}
                  >
                    <ProfileInfoListHeading>
                      ขอบเขตการช่วยเหลือ
                    </ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {user?.location.name}
                    </ProfileInfoListDetail>
                  </Flex>
                  <ProfileInfoContainer>
                    <Flex>
                      <ProfileInfoListHeading>
                        จำนวนการให้ช่วยเหลือ
                      </ProfileInfoListHeading>
                      <ProfileInfoListDetail>
                        {user?.provideSum.toLocaleString()} ครั้ง
                      </ProfileInfoListDetail>
                    </Flex>
                    <Flex>
                      <ProfileInfoListHeading>
                        จำนวนการขอความช่วยเหลือ
                      </ProfileInfoListHeading>
                      <ProfileInfoListDetail>
                        {user?.requestSum.toLocaleString()} ครั้ง
                      </ProfileInfoListDetail>
                    </Flex>
                    <Flex>
                      <ProfileInfoListHeading>ผู้ติดตาม</ProfileInfoListHeading>
                      <ProfileInfoListDetail>
                        {user?.followerUserId} คน
                      </ProfileInfoListDetail>
                    </Flex>
                    <Flex>
                      <ProfileInfoListHeading>
                        กำลังติดตาม
                      </ProfileInfoListHeading>
                      <ProfileInfoListDetail>
                        {user?.followingUserId} คน
                      </ProfileInfoListDetail>
                    </Flex>
                  </ProfileInfoContainer>
                </ProfileInfoSection>
              </ProfilePageUserInfoSection>

              {(user?.provideSum > 0 || user?.requestSum > 0) && provideRank && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    display: isTablet ? 'block' : 'flex',
                    margin: '40px 0',
                    justifyContent: 'center'
                  }}
                >
                  <OverallHelpedChart
                    provideSum={user?.provideSum}
                    requestSum={user?.requestSum}
                  />
                  <TopThreeHelpedChart data={provideRank} />
                </div>
              )}
            </div>
          )}

          {!isMobile && <Divider />}
          {!isMobile && (
            <Flex justify="space-between">
              <ProfileMenuTab menu={menu} setMenu={setMenu} />
              {(query === window.localStorage.getItem('id') ||
                query === undefined) && (
                <PostRequestButton
                  setProvides={setProvides}
                  setRequests={setRequests}
                  buttonText={
                    menu === HelpMenu.PROVIDE
                      ? 'ให้ความข่วยเหลือ'
                      : 'ขอความช่วยเหลือ'
                  }
                />
              )}
            </Flex>
          )}
          {isMobile ? (
            <ProfilePageUserHelperListSection>
              {menu === HelpMenu.PROVIDE ? (
                <React.Fragment>
                  {provides.length > 0 ? (
                    <div>
                      {provides.map((props) => (
                        <MyProvideList
                          key={props.id}
                          data={props}
                          user={user}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyData height="200px" />
                  )}
                </React.Fragment>
              ) : menu === ProfileMenu.REQUEST ? (
                <React.Fragment>
                  {requests.length > 0 ? (
                    <div>
                      {' '}
                      {requests.map((props) => (
                        <MyRequestList
                          key={props.requestId}
                          data={props}
                          user={user}
                        />
                      ))}
                    </div>
                  ) : (
                    <EmptyData height="200px" />
                  )}
                </React.Fragment>
              ) : null}
            </ProfilePageUserHelperListSection>
          ) : (
            <div>
              {menu === HelpMenu.PROVIDE ? (
                <React.Fragment>
                  {provides?.length > 0 ? (
                    <ProfilePageUserHelperListSection>
                      {provides.map((props) => (
                        <MyProvideList
                          key={props.id}
                          data={props}
                          user={user}
                        />
                      ))}
                    </ProfilePageUserHelperListSection>
                  ) : (
                    <EmptyData height="200px" />
                  )}
                </React.Fragment>
              ) : menu === ProfileMenu.REQUEST ? (
                <React.Fragment>
                  {requests.length > 0 ? (
                    <ProfilePageUserHelperListSection>
                      {' '}
                      {requests.map((props) => (
                        <MyRequestList
                          key={props.requestId}
                          data={props}
                          user={user}
                        />
                      ))}
                    </ProfilePageUserHelperListSection>
                  ) : (
                    <EmptyData height="200px" />
                  )}
                </React.Fragment>
              ) : null}
            </div>
          )}
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 285px)" />
      )}
    </ProfilePageContainer>
  );
});

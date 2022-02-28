/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useHistory, useLocation } from 'react-router-dom';
import { auth } from '../firebase';
import { HelpMenu } from 'components/Menu/const';
import { message } from 'antd';
import Flex from 'components/Flex/Flex';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
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
import { userStore } from 'store/userStore';
import { logout } from 'features/logout/Logout';
import {
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  useMedia
} from 'styles/variables';
import { ProfileMenu } from '../components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';

import { useUser } from 'hooks/user/useUser';
import { useMyProvide } from 'hooks/provide/useMyProvide';
import { useMyRequest } from 'hooks/request/useMyRequest';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';
import { useFollowUser } from 'hooks/user/useFollowUser';
import { useUnfollowUser } from 'hooks/user/useUnfollowUser';

import { EmptyData } from 'components/Empty/EmptyData';

const ProfilePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;

  ${mediaQueryTablet} {
    padding: 40px;
    top: 80px;
  }

  ${mediaQueryMobile} {
    padding: 30px 20px 50px 20px;
  }
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  ${mediaQueryTablet} {
    flex-direction: column;
    justify-content: center;
    margin-top: 10px;
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
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px;
  }

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 3000px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const UserCard = styled.div`
  width: 100%;
  max-width: 550px;
  min-width: 400px;
  height: 250px;
  background: #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  align-items: center;
  border-sizing: border-box;
  padding: 20px;
  position: relative;

  ${mediaQueryLargeDesktop} {
    width: 450px;
    height: 210px;
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
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: -50px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 80px;
    height: 80px;
  }

  ${mediaQueryMobile} {
    width: 75px;
    height: 75px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  word-break: break-all;

  ${mediaQueryLargeDesktop} {
    font-size: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
    text-align: center;
    max-width: 150px;
  }
`;

const ProfileInfoContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, auto) minmax(300px, auto);
  grid-gap: 30px;

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
  font-size: 18px;
  line-height: 14px;
  color: #5a5a5a;

  ${mediaQueryLargeDesktop} {
    font-size: 14px;
  }

  ${mediaQueryMobile} {
    font-size: 12px;
    white-space: pre;
  }
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #e56101;
  margin-left: 12px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
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
  const { execute: followUser } = useFollowUser();
  const { execute: unfollowUser } = useUnfollowUser();

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
                      flex: 1;
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
                    <RankingBadge rankColor={RANK_BADGE[user?.rank].color}>
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

                        ${mediaQueryTablet} {
                          left: 0;
                        }

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
                          ${mediaQueryTablet} {
                            margin: 0;
                          }

                          ${mediaQueryMobile} {
                            margin-right: 15px;
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
                          // display: flex;
                          // height: 45px;
                          // align-items: center;
                          background: transparent;
                          border: 1px solid #848484;
                          // width: 100%;
                          color: #848484;

                          &:hover {
                            background: transparent !important;
                            border: 1px solid #848484;
                            color: #848484;
                          }

                          &:focus {
                            background: transparent !important;
                            border: 1px solid #848484;
                            color: #848484;
                          }

                          // ${mediaQueryLargeDesktop} {
                          //   font-size: 18px;
                          //   height: 40px;
                          // }

                          // ${mediaQueryMobile} {
                          //   width: 47%;
                          //   height: 35px;
                          // }
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
                        left: 0,
                        width: '100%'
                      }}
                      css={css`
                        ${mediaQueryMobile} {
                          justify-content: space-between;
                          padding: 10px 20px !important;
                        }
                      `}
                    >
                      {user?.followerUserId?.filter(
                        (items) =>
                          items.userId === window.localStorage.getItem('id')
                      )?.length > 0 ? (
                        <SecondaryButton
                          css={css`
                            width: 100%;

                            ${mediaQueryMobile} {
                              width: 47%;
                            }
                          `}
                          onClick={() => {
                            unfollowUser(user?.userId)
                              .then(() => {
                                getUser(
                                  query
                                    ? query
                                    : window.localStorage.getItem('id')
                                );
                              })
                              .catch((error) => {
                                if (error.response.data === 'Unauthorized') {
                                  logout();
                                } else {
                                  message.error('ไม่สำเร็จ');
                                }
                              });
                          }}
                        >
                          {/* <FollowingSvg style={{ marginRight: '10px' }} /> */}
                          เลิกติดตาม
                        </SecondaryButton>
                      ) : (
                        <PrimaryButton
                          css={css`
                            width: 100%;
                            margin: 0;

                            ${mediaQueryMobile} {
                              width: 47%;
                            }
                          `}
                          onClick={() => {
                            followUser(user?.userId)
                              .then(() => {
                                getUser(
                                  query
                                    ? query
                                    : window.localStorage.getItem('id')
                                );
                              })
                              .catch((error) => {
                                if (error.response.data === 'Unauthorized') {
                                  logout();
                                } else {
                                  message.error('ไม่สำเร็จ');
                                }
                              });
                          }}
                        >
                          <FollowingSvg style={{ marginRight: '10px' }} />
                          ติดตาม
                        </PrimaryButton>
                      )}
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
                          border-color: #487bff;
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
                  <Flex marginBottom="30px" itemAlign="center">
                    <ProfileInfoListHeading>
                      ขอบเขตการช่วยเหลือ
                    </ProfileInfoListHeading>
                    <ProfileInfoListDetail
                      css={css`
                        max-width: 600px;

                        ${mediaQueryLargeDesktop} {
                          max-width: 400px;
                        }

                        ${mediaQueryTablet} {
                          max-width: 450px;
                        }

                        ${mediaQueryMobile} {
                          max-width: 300px;
                        }
                      `}
                    >
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
                        {user?.followerUserId.length} คน
                      </ProfileInfoListDetail>
                    </Flex>
                    <Flex>
                      <ProfileInfoListHeading>
                        กำลังติดตาม
                      </ProfileInfoListHeading>
                      <ProfileInfoListDetail>
                        {user?.followingUserId.length} คน
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
                    marginTop: '40px',
                    marginBottom: '0px',
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
                  type={menu === HelpMenu.PROVIDE ? 'provide' : 'request'}
                />
              )}
            </Flex>
          )}
          {isMobile ? (
            <ProfilePageUserHelperListSection>
              {menu === HelpMenu.PROVIDE ? (
                <React.Fragment>
                  {provides?.length > 0 ? (
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
                  {requests?.length > 0 ? (
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
                  {requests?.length > 0 ? (
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

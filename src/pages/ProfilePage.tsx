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
import { USER_DATA } from 'data/user';
import { PrimaryButton } from 'components/Button/Button';
import { Divider } from 'components/Divider/Divider';
import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';
import { Loading } from 'components/Loading/Loading';
import { MyProvideList } from 'components/Profile/MyProvideList';
import { MyRequestList } from 'components/Profile/MyRequestList';
import { RANK_BADGE } from 'components/Badge/const';
import { ProfileMenuTab } from 'components/Menu/ProfileMenuTab';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { FollowingSvg } from 'components/Svg/FollowingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { getStar } from 'components/Star/getStar';
import { OverallHelpedChart } from 'features/charts/OverallHelpedChart';
import { TopThreeHelpedChart } from 'features/charts/TopThreeHelpedChart';
import UserAvatar from 'images/avatar_helper.png';
import MyAccountAvatar from 'images/avatar_user2.png';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';
import {
  mediaQueryMobile,
  MOBILE_WIDTH,
  useMedia,
  mediaQueryTablet,
  TABLET_WIDTH
} from 'styles/variables';
import { ProfileMenu } from '../components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { myAccountUserId } from 'data/user';
import { ORDER_DATA } from 'data/order';
import { PROVIDE_MAPPER } from '../data/provide';
import { REQUEST_MAPPER } from 'data/request';
import { useMyProvide } from 'hooks/provide/useMyProvide';
import { useMyRequest } from 'hooks/request/useMyRequest';
import { EmptyData } from 'components/Empty/EmptyData';

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
  grid-template-columns: minmax(auto, 510px) minmax(auto, 510px) minmax(
      auto,
      510px
    );
  grid-gap: 30px;

  ${mediaQueryTablet} {
    display: flex;
    flex-direction: column;
  }
`;

const UserCard = styled.div`
  width: 485px;
  height: 246px;
  background: #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  border-sizing: border-box;
  padding: 20px;
  position: relative;

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
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-top: 15px;

  ${mediaQueryMobile} {
    width: 100px;
    height: 100px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  word-wrap: break-word;

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
  font-size: 16px;
  line-height: 14px;
  color: #5a5a5a;

  ${mediaQueryMobile} {
    font-size: 16px;
    white-space: pre;
  }
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
  color: #e56101;
  margin-left: 12px;

  ${mediaQueryMobile} {
    font-size: 18px;
    word-wrap: break-word;
  }
`;

export const ProfilePage = observer(() => {
  const [menu, setMenu] = useState<HelpMenu | ProfileMenu>(HelpMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.profile_menu || HelpMenu.PROVIDE) as
    | HelpMenu
    | ProfileMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const { userId } = userStore;

  const { data: user, loading: isUserLoading, execute: getUser } = useUser();
  const {
    data: provide,
    loading: isProvideLoading,
    execute: getProvide
  } = useMyProvide();
  const {
    data: request,
    loading: isRequedtLoading,
    execute: getRequest
  } = useMyRequest();

  useEffect(() => {
    if (query || window.localStorage.getItem('id')) {
      getUser(query ? query : window.localStorage.getItem('id'));
      getProvide(query ? query : window.localStorage.getItem('id'));
      getRequest(query ? query : window.localStorage.getItem('id'));
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
  }, [currentMenu, isMobile, menu]);

  useEffect(() => {
    if (isMobile) {
      setMenu(ProfileMenu.HOME);
    }
  }, []);

  // useEffect(() => {
  //   getProvide(query ? query : userId);
  // }, [userId, query]);
  return (
    <React.Fragment>
      <ProfilePageContainer>
        {isMobile && <ProfileMenuTab menu={menu} setMenu={setMenu} />}
        {(!isMobile || menu === ProfileMenu.HOME) && (
          <div>
            {provide && user && request ? (
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
                        src={user.imageUrl}
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
                          onClick={() => {
                            window.localStorage.removeItem('id');
                            auth.signOut();
                            window.location.assign('/');
                          }}
                        >
                          <LogoutSvg style={{ marginRight: '10px' }} />
                          ออกจากระบบ
                        </PrimaryButton>
                        <PrimaryButton
                          css={css`
                            background: transparent;
                            border: 1px solid #bab8b8;
                            width: 100%;
                            color: #b9b9b9;
                            &:hover {
                              color: #b9b9b9;
                            }
                            ${mediaQueryMobile} {
                              width: 47%;
                            }
                          `}
                          onClick={() => {
                            history.push('/user/account/profile');
                          }}
                        >
                          แก้ไขโปรไฟล์
                        </PrimaryButton>
                      </div>
                    ) : (
                      // <div
                      //   style={{
                      //     display: 'flex',
                      //     position: 'absolute',
                      //     bottom: '8px',
                      //     padding: '10px',
                      //     left: '10px',
                      //     width: '100%'
                      //   }}
                      //   onClick={() => {
                      //     history.push('/user/account/profile');
                      //   }}
                      // >
                      //   <SecondaryButton
                      //     css={css`
                      //       width: 95%;
                      //       border: 1px solid #bab8b8;
                      //       color: #b9b9b9;
                      //       &:hover {
                      //         color: #b9b9b9;
                      //       }
                      //     `}
                      //   >
                      //     แก้ไขโปรไฟล์
                      //   </SecondaryButton>
                      // </div>
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
                          ยอดการให้ช่วยเหลือ
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {user?.provideSum.toLocaleString()} ครั้ง
                        </ProfileInfoListDetail>
                      </Flex>
                      <Flex>
                        <ProfileInfoListHeading>
                          ยอดการขอความช่วยเหลือ
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {user?.requestSum.toLocaleString()} ครั้ง
                        </ProfileInfoListDetail>
                      </Flex>
                      <Flex>
                        <ProfileInfoListHeading>
                          ผู้ติดตาม
                        </ProfileInfoListHeading>
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
              </div>
            ) : (
              <Loading />
            )}
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
              <TopThreeHelpedChart />
            </div>
          </div>
        )}

        {!isMobile && <Divider />}
        {!isMobile && (
          <Flex justify="space-between">
            <ProfileMenuTab menu={menu} setMenu={setMenu} />
            {(query === myAccountUserId || query === undefined) && (
              <PostRequestButton
                buttonText={
                  menu === HelpMenu.PROVIDE
                    ? 'ให้ความข่วยเหลือ'
                    : 'ขอความช่วยเหลือ'
                }
              />
            )}
          </Flex>
        )}
        {provide && request ? (
          <React.Fragment>
            {isMobile ? (
              <ProfilePageUserHelperListSection>
                {menu === HelpMenu.PROVIDE ? (
                  <React.Fragment>
                    {provide.length > 0 ? (
                      <div>
                        {provide.map((props) => (
                          <MyProvideList key={props.id} data={props} />
                        ))}
                      </div>
                    ) : (
                      <EmptyData height="200px" />
                    )}
                  </React.Fragment>
                ) : menu === ProfileMenu.REQUEST ? (
                  <React.Fragment>
                    {request.length > 0 ? (
                      <div>
                        {' '}
                        {request.map((props) => (
                          <MyRequestList key={props.requestId} data={props} />
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
                    {provide.length > 0 ? (
                      <ProfilePageUserHelperListSection>
                        {provide.map((props) => (
                          <MyProvideList key={props.id} data={props} />
                        ))}
                      </ProfilePageUserHelperListSection>
                    ) : (
                      <EmptyData height="200px" />
                    )}
                  </React.Fragment>
                ) : menu === ProfileMenu.REQUEST ? (
                  <React.Fragment>
                    {request.length > 0 ? (
                      <ProfilePageUserHelperListSection>
                        {' '}
                        {request.map((props) => (
                          <MyRequestList key={props.requestId} data={props} />
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
          <Loading />
        )}
      </ProfilePageContainer>
    </React.Fragment>
  );
});

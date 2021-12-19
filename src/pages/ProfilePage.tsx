/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { HelpMenu } from 'components/Menu/const';
import Flex from 'components/Flex/Flex';
import { USER_DATA } from 'data/user';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { Divider } from 'components/Divider/Divider';
import { SuggestedBadge, RankingBadge } from 'components/Badge/Badge';
import { MyProvideList } from 'components/Profile/MyProvideList';
import { MyRequestList } from 'components/Profile/MyRequestList';
import { RANK_BADGE } from 'components/Badge/const';
import { ProfileMenuTab } from 'components/Menu/ProfileMenuTab';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { FollowingSvg } from 'components/Svg/FollowingSvg';
import { getStar } from 'components/Star/getStar';
import { OverallHelpedChart } from 'features/charts/OverallHelpedChart';
import { TopThreeHelpedChart } from 'features/charts/TopThreeHelpedChart';
import UserAvatar from 'images/avatar_helper.png';
import { mediaQueryMobile, MOBILE_WIDTH, useMedia } from 'styles/variables';
import { ProfileMenu } from '../components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { myAccountUserId } from 'data/user';
import { ORDER_DATA } from 'data/order';

const ProfilePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;

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
  justify-content: space-around;

  ${mediaQueryMobile} {
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

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const UserCard = styled.div`
  width: 445px;
  height: 246px;
  background: #ffffff;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  display: flex;
  margin-left: 50px;
  border-sizing: border-box;
  padding: 20px;
  position: relative;

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

  ${mediaQueryMobile} {
    display: flex;
    flex-direction: column;
  }
`;

const ProfileInfoSection = styled.div`
  margin-top: 20px;
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

export const ProfilePage = () => {
  const [menu, setMenu] = useState<HelpMenu | ProfileMenu>(HelpMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.profile_menu || HelpMenu.PROVIDE) as
    | HelpMenu
    | ProfileMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  let data = USER_DATA.filter(({ userId }) => userId === myAccountUserId);

  useEffect(() => {
    if (!isMobile && menu === ProfileMenu.HOME) {
      setMenu(HelpMenu.PROVIDE);
    } else {
      setMenu(currentMenu);
    }
  }, [currentMenu, isMobile]);

  useEffect(() => {
    if (isMobile) {
      setMenu(ProfileMenu.HOME);
    }
  }, []);

  return (
    <React.Fragment>
      <ProfilePageContainer>
        {isMobile && <ProfileMenuTab menu={menu} setMenu={setMenu} />}
        {(!isMobile || menu === ProfileMenu.HOME) && (
          <div>
            {USER_DATA.filter(
              (props) => props.userId === (query ? query : myAccountUserId)
            ).map(
              ({
                userId,
                username,
                imageUrl,
                location,
                followerUserId,
                followingUserId,
                provideSum,
                requestSum,
                rank,
                rating,
                recommend
              }) => (
                <ProfilePageUserInfoSection key={userId}>
                  <UserCard>
                    <div
                      css={css`
                        display: flex;
                        width: 50%;
                        flex-direction: column;
                        align-items: center;
                        margin-right: 35px;

                        ${mediaQueryMobile} {
                          margin-right: 0;
                          margin-top: 8px;
                        }
                      `}
                    >
                      <HelperImageSection src={UserAvatar} alt="user avatar" />
                      {Boolean(recommend) && (
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
                      <UserName>{username}</UserName>
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
                        {getStar(rating)}
                      </div>
                      <RankingBadge
                        rankColor={RANK_BADGE[rank].color}
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
                        {rank.toUpperCase()}
                      </RankingBadge>
                    </div>
                    {myAccountUserId === query ? (
                      <div
                        style={{
                          display: 'flex',
                          position: 'absolute',
                          bottom: '8px',
                          padding: '10px',
                          left: '10px',
                          width: '100%'
                        }}
                      >
                        <SecondaryButton
                          css={css`
                            width: 95%;
                            border: 1px solid #bab8b8;
                            color: #b9b9b9;
                            &:hover {
                              color: #b9b9b9;
                            }
                          `}
                        >
                          แก้ไขโปรไฟล์
                        </SecondaryButton>
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
                        {location.name}
                      </ProfileInfoListDetail>
                    </Flex>
                    <ProfileInfoContainer>
                      <Flex>
                        <ProfileInfoListHeading>
                          ยอดการให้ช่วยเหลือ
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {provideSum.toLocaleString()} ครั้ง
                        </ProfileInfoListDetail>
                      </Flex>
                      <Flex>
                        <ProfileInfoListHeading>
                          ยอดการขอความช่วยเหลือ
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {requestSum.toLocaleString()} ครั้ง
                        </ProfileInfoListDetail>
                      </Flex>
                      <Flex>
                        <ProfileInfoListHeading>
                          ผู้ติดตาม
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {followerUserId.length} คน
                        </ProfileInfoListDetail>
                      </Flex>
                      <Flex>
                        <ProfileInfoListHeading>
                          กำลังติดตาม
                        </ProfileInfoListHeading>
                        <ProfileInfoListDetail>
                          {followingUserId.length} คน
                        </ProfileInfoListDetail>
                      </Flex>
                    </ProfileInfoContainer>
                  </ProfileInfoSection>
                </ProfilePageUserInfoSection>
              )
            )}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: isMobile ? 'block' : 'flex',
                margin: '40px 0'
              }}
            >
              <OverallHelpedChart />
              <TopThreeHelpedChart />
            </div>
          </div>
        )}

        {!isMobile && <Divider />}
        {!isMobile && (
          <Flex justify="space-between">
            <ProfileMenuTab menu={menu} setMenu={setMenu} />
            <PostRequestButton
              buttonText={
                menu === HelpMenu.PROVIDE ? 'ให้ความข่วยเหลือ' : 'ขอคำช่วยเหลือ'
              }
            />
          </Flex>
        )}
        {isMobile ? (
          <ProfilePageUserHelperListSection>
            {menu === HelpMenu.PROVIDE ? (
              <React.Fragment>
                {ORDER_DATA.filter(
                  ({ providerUserId }) =>
                    providerUserId === (query ?? myAccountUserId)
                ).map((props) => (
                  <MyProvideList key={props.orderId} data={props} />
                ))}
              </React.Fragment>
            ) : menu === ProfileMenu.REQUEST ? (
              <React.Fragment>
                {ORDER_DATA.filter(
                  ({ requesterUserId }) =>
                    requesterUserId === (query ?? myAccountUserId)
                ).map((props) => (
                  <MyRequestList key={props.orderId} data={props} />
                ))}
              </React.Fragment>
            ) : null}
          </ProfilePageUserHelperListSection>
        ) : (
          <ProfilePageUserHelperListSection>
            {menu === HelpMenu.PROVIDE ? (
              <React.Fragment>
                {ORDER_DATA.filter(
                  ({ providerUserId }) =>
                    providerUserId === (query ?? myAccountUserId)
                ).map((props) => (
                  <MyProvideList key={props.orderId} data={props} />
                ))}
              </React.Fragment>
            ) : menu === ProfileMenu.REQUEST ? (
              <React.Fragment>
                {ORDER_DATA.filter(
                  ({ requesterUserId }) =>
                    requesterUserId === (query ?? myAccountUserId)
                ).map((props) => (
                  <MyRequestList key={props.orderId} data={props} />
                ))}
              </React.Fragment>
            ) : null}
          </ProfilePageUserHelperListSection>
        )}
      </ProfilePageContainer>
    </React.Fragment>
  );
};

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

const ProfilePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;

  ${mediaQueryMobile} {
    padding: 20px;
    top: 95px;
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
    width: 70px;
    height: 70px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
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

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;
  color: #5a5a5a;

  ${mediaQueryMobile} {
    font-size: 14px;
  }
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
  color: #e56101;
  margin-left: 12px;

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

export const ProfilePage = () => {
  const [myAccount, setMyAccount] = useState<Boolean>(false);
  const [menu, setMenu] = useState<HelpMenu | ProfileMenu>(HelpMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const currentMenu = ((state as any)?.profile_menu || HelpMenu.PROVIDE) as
    | HelpMenu
    | ProfileMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const ProfileMobileContent = (menu) => {
    switch (menu) {
      case ProfileMenu.HOME:
        return <div>หน้าแรก</div>;
      case ProfileMenu.PROVIDE:
        return <div>ให้ความช่วยเหลือ</div>;
      case ProfileMenu.REQUEST:
        return <div>ขอความช่วยเหลือ</div>;
    }
  };

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (pathname.split('/')[2] !== USER_DATA[0].id) {
      setMyAccount(false);
    } else {
      setMyAccount(true);
    }
  }, [pathname, history]);

  return (
    <React.Fragment>
      <ProfilePageContainer>
        {USER_DATA.map(
          ({
            id,
            name,
            imageUrl,
            location,
            category,
            follower,
            following,
            helpSum,
            requestSum,
            rank,
            rating,
            recommend
          }) => (
            <ProfilePageUserInfoSection key={id}>
              {isMobile && <ProfileMenuTab menu={menu} setMenu={setMenu} />}
              <UserCard>
                <div
                  css={css`
                    display: flex;
                    width: 50%;
                    flex-direction: column;
                    align-items: center;
                    margin-right: 35px;
                  `}
                >
                  <HelperImageSection src={UserAvatar} alt="user avatar" />
                  {Boolean(recommend) && <SuggestedBadge>แนะนำ</SuggestedBadge>}
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
                  <UserName>{name}</UserName>
                  <div
                    style={{
                      display: 'flex',
                      marginBottom: '10px',
                      marginTop: '-4px'
                    }}
                  >
                    {getStar(rating)}
                  </div>
                  <RankingBadge rankColor={RANK_BADGE[rank].color}>
                    {rank.toUpperCase()}
                  </RankingBadge>
                </div>
                {myAccount ? (
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
                  >
                    <PrimaryButton
                      css={css`
                        width: 100%;
                      `}
                    >
                      <FollowingSvg style={{ marginRight: '10px' }} />
                      ติดตาม
                    </PrimaryButton>
                    <PrimaryButton
                      css={css`
                        background: #487bff;
                        width: 100%;
                      `}
                    >
                      <MessageSvg style={{ marginRight: '10px' }} />
                      แชท
                    </PrimaryButton>
                  </div>
                )}
              </UserCard>
              <div>
                <Flex marginBottom="40px" itemAlign="flex-end">
                  <ProfileInfoListHeading>
                    ขอบเขตการช่วยเหลือ
                  </ProfileInfoListHeading>
                  <ProfileInfoListDetail>{location}</ProfileInfoListDetail>
                </Flex>
                <ProfileInfoContainer>
                  <Flex>
                    <ProfileInfoListHeading>
                      ยอดการให้ช่วยเหลือ
                    </ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {helpSum.toLocaleString()} ครั้ง
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
                    <ProfileInfoListHeading>ผู้ติดตาม</ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {follower.toLocaleString()} คน
                    </ProfileInfoListDetail>
                  </Flex>
                  <Flex>
                    <ProfileInfoListHeading>กำลังติดตาม</ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {following.toLocaleString()} คน
                    </ProfileInfoListDetail>
                  </Flex>
                </ProfileInfoContainer>
              </div>
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
        <Divider />
        {!isMobile && <ProfileMenuTab menu={menu} setMenu={setMenu} />}
        <ProfilePageUserHelperListSection>
          {menu === HelpMenu.PROVIDE ? (
            <React.Fragment>
              {USER_DATA[0].myList.provideList.map((props) => (
                <MyProvideList key={props.id} data={props} />
              ))}
            </React.Fragment>
          ) : (
            <React.Fragment>
              {USER_DATA[0].myList.requestList.map((props) => (
                <MyRequestList key={props.id} data={props} />
              ))}
            </React.Fragment>
          )}
        </ProfilePageUserHelperListSection>
      </ProfilePageContainer>
    </React.Fragment>
  );
};

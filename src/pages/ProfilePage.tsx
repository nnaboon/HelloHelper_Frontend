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
import StarIcon from 'images/rating-star.png';
import { MyProvideList } from 'components/Profile/MyProvideList';
import { MyRequestList } from 'components/Profile/MyRequestList';
import { RANK_BADGE } from 'components/Badge/const';
import { ProfileMenuTab } from 'components/Menu/ProfileMenuTab';
import { MessageSvg } from 'components/Svg/MessageSvg';
import { FollowingSvg } from 'components/Svg/FollowingSvg';

const ProfilePageContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  top: 165px;
  padding: 40px 100px;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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
`;

const HelperImage = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: #0f3276;
  margin-top: 15px;
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
`;

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;
  color: #5a5a5a;
`;

const ProfileInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 21px;
  color: #e56101;
  margin-left: 12px;
`;

export const ProfilePage = () => {
  const [myAccount, setMyAccount] = useState<Boolean>(false);
  const [menu, setMenu] = useState<HelpMenu>(HelpMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const currentMenu = ((state as any)?.menuKey || HelpMenu.PROVIDE) as HelpMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (pathname.split('/')[2] !== USER_DATA[0].id) {
      setMyAccount(false);
    } else {
      setMyAccount(true);
    }
  }, [history]);

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
                  <HelperImage />
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
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
                    <img
                      src={StarIcon}
                      alt="star"
                      style={{
                        width: '26px',
                        height: '26px',
                        marginRight: '2px'
                      }}
                    />
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
                      {helpSum.toLocaleString()}
                    </ProfileInfoListDetail>
                  </Flex>
                  <Flex>
                    <ProfileInfoListHeading>
                      ยอดการขอความช่วยเหลือ
                    </ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {requestSum.toLocaleString()}
                    </ProfileInfoListDetail>
                  </Flex>
                  <Flex>
                    <ProfileInfoListHeading>ผู้ติดตาม</ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {follower.toLocaleString()}
                    </ProfileInfoListDetail>
                  </Flex>
                  <Flex>
                    <ProfileInfoListHeading>กำลังติดตาม</ProfileInfoListHeading>
                    <ProfileInfoListDetail>
                      {following.toLocaleString()}
                    </ProfileInfoListDetail>
                  </Flex>
                </ProfileInfoContainer>
              </div>
            </ProfilePageUserInfoSection>
          )
        )}
        <Divider />
        <ProfileMenuTab menu={menu} setMenu={setMenu} />
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

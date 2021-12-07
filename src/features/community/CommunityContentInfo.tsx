/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Divider } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { SettingSvg } from 'components/Svg/SettingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { COMMUNITY_MAPPER } from 'data/community';
import { CommunityMenuTab } from 'components/Menu/CommunityMenuTab';
import { CommunityMenu } from 'components/Menu/const';

const ProfilePageUserHelperListSection = styled.div`
  display: grid;
  grid-template-columns: minmax(auto, 510px) minmax(auto, 510px) minmax(
      auto,
      510px
    );
  grid-gap: 30px;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
  margin-bottom: 70px;
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
export const CommunityContentInfo = () => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer>
      {' '}
      {COMMUNITY_MAPPER.filter((items) => items.id === 'zxcvb234').map(
        ({ id, name, location, description, code, admin, member }) => (
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
              </div>
              {false ? (
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: '12px',
                    padding: '10px',
                    left: '-6px',
                    width: '100%'
                  }}
                >
                  <PrimaryButton>
                    <LogoutSvg style={{ marginRight: '10px' }} />
                    ออกจากขุมชนความช่วยเหลือ
                  </PrimaryButton>
                </div>
              ) : (
                <div
                  style={{
                    display: 'flex',
                    position: 'absolute',
                    bottom: '12px',
                    padding: '10px',
                    left: '-9px',
                    width: '100%'
                  }}
                >
                  <PrimaryButton
                    css={css`
                      width: 100%;
                      background: #487bff;
                    `}
                  >
                    <SettingSvg style={{ marginRight: '10px' }} />
                    จัดการชุมขน
                  </PrimaryButton>
                  <PrimaryButton
                    css={css`
                      width: 100%;
                    `}
                  >
                    <LogoutSvg style={{ marginRight: '10px' }} />
                    ออกจากขุมชน
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
              <Flex marginBottom="40px">
                <ProfileInfoListHeading>สมาชิก</ProfileInfoListHeading>
                <ProfileInfoListDetail>{member.length}</ProfileInfoListDetail>
              </Flex>
              <Flex marginBottom="40px">
                <ProfileInfoListHeading>คำอธิบาย</ProfileInfoListHeading>
                <ProfileInfoListDetail>{description}</ProfileInfoListDetail>
              </Flex>
            </div>
          </ProfilePageUserInfoSection>
        )
      )}
      <Divider />
      <CommunityMenuTab menu={menu} setMenu={setMenu} />
      <ProfilePageUserHelperListSection>
        {/* {menu === CommunityMenu.PROVIDE ? (
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
        )} */}
      </ProfilePageUserHelperListSection>
    </WrapperContainer>
  );
};

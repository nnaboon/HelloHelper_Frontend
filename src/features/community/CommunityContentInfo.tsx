/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Divider, Input, Menu, Select } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { SettingSvg } from 'components/Svg/SettingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { COMMUNITY_MAPPER } from 'data/community';
import { CommunityMenuTab } from 'components/Menu/CommunityMenuTab';
import { CommunityMenu } from 'components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { CommunityProvideContent } from './CommunityProvideContent';
import { CommunityRequestContent } from './CommunityRequestContent';
import { CommunityMemberContent } from './CommunityMemberContent';
import { CATEGORY } from 'data/category';

const ProfilePageUserHelperListSection = styled.div`
  width: 100%;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-right: 150px;
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
export const CommunityContentInfo = ({ data }: any) => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  const { Search } = Input;
  const { Option } = Select;

  const onSearch = (value) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`
    });
  };

  const dropDownMenu = (
    <Menu>
      {CATEGORY.map(({ id, name }) => (
        <Menu.Item key={id}>
          <div>{name}</div>
        </Menu.Item>
      ))}
    </Menu>
  );

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
                <ProfileInfoListDetail>
                  {member.length} คน
                </ProfileInfoListDetail>
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
      {menu !== CommunityMenu.MEMBER && (
        <div
          css={css`
            justify-content: space-between;
            display: flex;
            margin-top: 30px;
          `}
        >
          <div
            css={css`
              display: flex;
              align-items: start;
            `}
          >
            <Search
              placeholder="ค้นหาความช่วยเหลือ"
              onSearch={onSearch}
              size="large"
              style={{ width: '462px', height: '60px' }}
            />
            <Select
              defaultValue="เลือกหมวดหมู่"
              style={{
                width: 200,
                justifyContent: 'center',
                display: 'flex',
                alignItems: 'center',
                marginLeft: '20px'
              }}
              // css={css`
              //   .ant-select:not(.ant-select-customize-input)
              //     .ant-select-selector {
              //     height: 35px;
              //     border: 2px solid #f86800 !important;
              //     border-radius: 8px;
              //   }
              // `}
            >
              {CATEGORY.map(({ id, name }) => (
                <Option key={id} value={name}>
                  {name}
                </Option>
              ))}
            </Select>
          </div>

          <PostRequestButton
            buttonText={
              menu === CommunityMenu.PROVIDE
                ? 'ให้ความช่วยเหลือ'
                : 'ขอความช่วยเหลือ'
            }
          />
        </div>
      )}
      <ProfilePageUserHelperListSection>
        {menu === CommunityMenu.MEMBER ? (
          <div>
            <CommunityMemberContent member={data.member} />
          </div>
        ) : (
          <div>
            {' '}
            {menu === CommunityMenu.PROVIDE ? (
              <React.Fragment>
                <CommunityProvideContent />
              </React.Fragment>
            ) : (
              <React.Fragment>
                <CommunityRequestContent />
              </React.Fragment>
            )}
          </div>
        )}
      </ProfilePageUserHelperListSection>
    </WrapperContainer>
  );
};

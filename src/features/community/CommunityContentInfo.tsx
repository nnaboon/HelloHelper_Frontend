/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Divider, Input, Menu, Select } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { PrimaryButton } from 'components/Button/Button';
import { useMedia, MOBILE_WIDTH, mediaQueryMobile } from 'styles/variables';
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
import { USER_DATA } from 'data/user';
import CommunityImage from 'images/community.jpg';

const ProfilePageUserHelperListSection = styled.div`
  width: 100%;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 70px;

  ${mediaQueryMobile} {
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const UserCard = styled.div`
  position: relative;
  display: flex;
  width: 445px;
  height: 246px;
  background: #ffffff;
  margin-right: 150px;
  margin-left: 50px;
  padding: 20px;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border-sizing: border-box;

  ${mediaQueryMobile} {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
`;

const CommunityImageSection = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
  margin-top: 15px;

  ${mediaQueryMobile} {
    width: 120px;
    height: 120px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;

  ${mediaQueryMobile} {
    max-width: 160px;
    word-wrap: break-word;
  }
`;

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 14px;
  color: #5a5a5a;

  ${mediaQueryMobile} {
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
  }
`;
export const CommunityContentInfo = ({ data }: any) => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
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

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  return (
    <WrapperContainer>
      {' '}
      {COMMUNITY_MAPPER.filter(
        (items) => items.id === USER_DATA[0].community.id
      ).map(({ id, name, location, description, code, admin, member }) => (
        <ProfilePageUserInfoSection key={id}>
          <UserCard>
            <div
              css={css`
                display: flex;
                width: 50%;
                flex-direction: column;
                align-items: center;
                margin-right: 35px;

                ${mediaQueryMobile} {
                  margin-right: 10px;
                }
              `}
            >
              <CommunityImageSection src={CommunityImage} alt="community" />
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
                  width: '100%',
                  cursor: 'pointer'
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
                  width: '100%',
                  cursor: 'pointer'
                }}
                css={css`
                  ${mediaQueryMobile} {
                    justify-content: space-between;
                    left: 0 !important;
                  }
                `}
              >
                <PrimaryButton
                  css={css`
                    width: 100%;
                    background: #487bff;
                    z-index: 2;
                    cursor: pointer;

                    ${mediaQueryMobile} {
                      width: 47%;
                    }
                  `}
                  onClick={() => {
                    history.push({
                      pathname: '/user/community'
                    });
                  }}
                >
                  <SettingSvg style={{ marginRight: '10px' }} />
                  จัดการชุมขน
                </PrimaryButton>
                <PrimaryButton
                  css={css`
                    width: 100%;
                    ${mediaQueryMobile} {
                      width: 47%;
                    }
                  `}
                >
                  <LogoutSvg style={{ marginRight: '10px' }} />
                  ออกจากขุมชน
                </PrimaryButton>
              </div>
            )}
          </UserCard>
          <div>
            <Flex
              marginBottom="40px"
              marginTop={isMobile ? '40px' : 0}
              itemAlign={isMobile ? 'center' : 'flex-end'}
            >
              <ProfileInfoListHeading>
                ขอบเขต{'\n'}การช่วยเหลือ
              </ProfileInfoListHeading>
              <ProfileInfoListDetail>{location}</ProfileInfoListDetail>
            </Flex>
            <Flex marginBottom="40px">
              <ProfileInfoListHeading>สมาชิก</ProfileInfoListHeading>
              <ProfileInfoListDetail>{member.length} คน</ProfileInfoListDetail>
            </Flex>
            <Flex marginBottom="40px">
              <ProfileInfoListHeading>คำอธิบาย</ProfileInfoListHeading>
              <ProfileInfoListDetail>{description}</ProfileInfoListDetail>
            </Flex>
          </div>
        </ProfilePageUserInfoSection>
      ))}
      <Divider />
      <CommunityMenuTab menu={menu} setMenu={setMenu} />
      {menu !== CommunityMenu.MEMBER && (
        <div
          css={css`
            justify-content: space-between;
            display: flex;
            margin-top: 30px;

            ${mediaQueryMobile} {
              flex-direction: column;
            }
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
              style={{ width: isMobile ? '100%' : '462px', height: '60px' }}
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

          <div
            css={css`
              ${mediaQueryMobile} {
                align-self: end !important;
              }
            `}
          >
            {' '}
            <PostRequestButton
              buttonText={
                menu === CommunityMenu.PROVIDE
                  ? 'ให้ความช่วยเหลือ'
                  : 'ขอความช่วยเหลือ'
              }
            />
          </div>
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

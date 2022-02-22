/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { Divider, Input, Menu, Dropdown, Select, message } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { PrimaryButton } from 'components/Button/Button';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQuerySmallTablet,
  mediaQueryLargeDesktop,
  mediaQueryExtraLargeDesktop
} from 'styles/variables';
import Flex from 'components/Flex/Flex';
import DefaultImage from 'images/default.png';
import { SettingSvg } from 'components/Svg/SettingSvg';
import { LogoutSvg } from 'components/Svg/LogoutSvg';
import { PlusOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react-lite';
import { userStore } from 'store/userStore';
import { CommunityMenuTab } from 'components/Menu/CommunityMenuTab';
import { CommunityMenu } from 'components/Menu/const';
import { PostRequestButton } from 'components/Button/PostRequestButton';
import { CommunityMemberContent } from './CommunityMemberContent';
import { CATEGORY } from 'data/category';
import { CommunityProvideContent } from './CommunityProvideContent';
import { CommunityRequestContent } from './CommunityRequestContent';
import { useCommunity } from 'hooks/community/useCommunity';
import { useBanMember } from 'hooks/community/useBanMember';
import { useCommunityMember } from 'hooks/community/useCommunityMember';
import { Loading } from 'components/Loading/Loading';
import { firestore } from '../../firebase';

const ProfilePageUserHelperListSection = styled.div`
  width: 100%;
`;

const ProfilePageUserInfoSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 70px;

  ${mediaQueryTablet} {
    margin: 40px 0;
  }

  ${mediaQuerySmallTablet} {
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 0;
  }
`;

const UserCard = styled.div`
  position: relative;
  display: flex;
  width: 23%;
  height: 290px;
  background: #ffffff;
  margin-right: 150px;
  margin-left: 50px;
  padding: 20px;
  box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  border-sizing: border-box;

  ${mediaQueryLargeDesktop} {
    width: 445px;
    height: 246px;
    min-width: unset;
  }

  ${mediaQueryTablet} {
    width: 65%;
    margin-left: 0;
    margin-right: 50px;
    margin-bottom: 45px;
  }

  ${mediaQueryMobile} {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
    margin-left: 0;
  }
`;

const CommunityImageSection = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 50%;
  margin-top: 15px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 115px;
    height: 115px;
  }
  ${mediaQueryMobile} {
    width: 90px;
    height: 90px;
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

const ProfileInfoListHeading = styled.div`
  font-weight: 500;
  font-size: 1.4rem;
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
  font-size: 2.2rem;
  line-height: 42px;
  color: #e56101;
  margin-left: 12px;
  width: 550px;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
    line-height: 21px;
    width: 350px;
  }

  ${mediaQueryMobile} {
    font-size: 18px;
    word-wrap: break-word;
  }
`;
export const CommunityContentInfo = observer(({ data }: any) => {
  const [menu, setMenu] = useState<CommunityMenu>(CommunityMenu.PROVIDE);
  const [provides, setProvides] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const { execute: bannedMember } = useBanMember();
  const { data: member, execute: getCommunityMember } = useCommunityMember();
  const { data: community, execute: getCommunity } = useCommunity();
  const [selectedCommunity, setSetSelectedCommunity] = useState<string>(
    data[0].communityId
  );
  const history = useHistory();
  const { pathname, state } = useLocation();
  const { me } = userStore;
  const query = pathname.split('/')[2];
  const currentMenu = ((state as any)?.menuKey ||
    CommunityMenu.PROVIDE) as CommunityMenu;

  const { Search } = Input;
  const { Option } = Select;

  const onSearch = (value) => {
    history.push({
      pathname: '/search',
      search: `?keyword=${value}`,
      state: {
        search: value
      }
    });
  };

  const dropDownMenu = (
    <Menu
      css={css`
        .ant-dropdown-menu-item,
        .ant-dropdown-menu-submenu-title {
          font-size: 1.2rem;
        }

        ${mediaQueryLargeDesktop} {
          .ant-dropdown-menu-item,
          .ant-dropdown-menu-submenu-title {
            font-size: 14px;
          }
        }
      `}
    >
      {data.map(({ communityId, communityName }) => (
        <Menu.Item
          onClick={() => {
            history.push(`/community/${communityId}`);
            window.localStorage.setItem('selectedCommunity', communityId);
          }}
        >
          {communityName}
        </Menu.Item>
      ))}
      <Menu.Item
        onClick={() => {
          history.push(`/community`);
        }}
      >
        <Flex>
          <PlusOutlined style={{ marginRight: '10px' }} />
          <div>เพิ่มชุมชนความช่วยเหลือ</div>
        </Flex>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const doc = firestore.collection('communities');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        getCommunity(query ?? selectedCommunity);
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => observer();
  }, []);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (selectedCommunity) {
      getCommunity(query ?? selectedCommunity);
      // getCommunityMember(query);
    }
  }, [selectedCommunity, query]);

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    if (query !== window.localStorage.getItem('selectedCommunity')) {
      window.localStorage.setItem('selectedCommunity', query);
    }
  }, []);

  return (
    <WrapperContainer
      css={css`
        ${mediaQueryMobile} {
          height: calc(100vh - 140px) !important;
        }
      `}
    >
      {community ? (
        <React.Fragment>
          {' '}
          <ProfilePageUserInfoSection>
            <UserCard>
              {community?.member.filter(
                ({ userId }) => userId === window.localStorage.getItem('id')
              )[0].role === 1 && (
                <SettingSvg
                  style={{
                    marginRight: '10px',
                    position: 'absolute',
                    top: '20px',
                    right: '8px',
                    cursor: 'pointer',
                    transition: 'transform .7s ease-in-out'
                  }}
                  css={css`
                    width: 30px;
                    height: 30px;

                    &:hover {
                      transform: rotate(90deg);
                    }

                    ${mediaQueryLargeDesktop} {
                      width: 24px;
                      height: 24px;
                    }
                  `}
                  onClick={() => {
                    history.push({
                      pathname: `/user/community/${community.communityId}`
                    });
                  }}
                />
              )}

              <div
                css={css`
                  display: flex;
                  width: 100%;
                  flex-direction: column;
                  align-items: center;

                  ${mediaQueryMobile} {
                    margin-right: 10px;
                  }
                `}
              >
                <CommunityImageSection
                  src={community.imageUrl ?? DefaultImage}
                  alt="community"
                />
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  margin-top: -50px;
                  width: 100%;
                `}
              >
                <UserName>{community.communityName}</UserName>
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
                    ออกจากชุมชนความช่วยเหลือ
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
                  {' '}
                  <PrimaryButton
                    css={css`
                      width: 100%;
                      ${mediaQueryMobile} {
                        width: 47%;
                      }
                    `}
                    onClick={() => {
                      bannedMember(
                        query,
                        community?.member.filter(
                          ({ userId }) =>
                            userId === window.localStorage.getItem('id')
                        )[0].id,
                        {
                          communityAdminUserId:
                            window.localStorage.getItem('id')
                        }
                      )
                        .then(() => {
                          // data.length > 1
                          //   ? history.push(
                          //       `/community/${
                          //         data.filter(
                          //           (items) =>
                          //             items.communityId !==
                          //             window.localStorage.getItem(
                          //               'selectedCommunity'
                          //             )
                          //         )[0].communityId
                          //       }`
                          //     )
                          //   : history.push('/community');
                          history.push('/');
                        })
                        .catch((error) => {
                          message.error(
                            'ขออภัย ไม่สามารถออกจากชุมชนความช่วยเหลือนี้ได้เนื่องจากมีผู้นำชุมชนเพียง 1 คน'
                          );
                        });
                    }}
                  >
                    <LogoutSvg style={{ marginRight: '10px' }} />
                    ออกจากขุมชน
                  </PrimaryButton>
                  <Dropdown trigger={['click']} overlay={dropDownMenu}>
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
                    >
                      {/* <SwitchCommunitySvg style={{ marginRight: '10px' }} /> */}
                      สลับชุมชน
                    </PrimaryButton>
                  </Dropdown>
                </div>
              )}
            </UserCard>
            <div>
              <Flex marginBottom="40px" marginTop={isMobile ? '40px' : 0}>
                <ProfileInfoListHeading>
                  ขอบเขตการช่วยเหลือ
                </ProfileInfoListHeading>
                <ProfileInfoListDetail>
                  {community.location.name}
                </ProfileInfoListDetail>
              </Flex>
              <Flex marginBottom="40px">
                <ProfileInfoListHeading>สมาชิก</ProfileInfoListHeading>
                <ProfileInfoListDetail>
                  {community.member ? community.member.length : `0`} คน
                </ProfileInfoListDetail>
              </Flex>
              <Flex marginBottom="40px">
                <ProfileInfoListHeading>คำอธิบาย</ProfileInfoListHeading>
                <ProfileInfoListDetail>
                  {community.description}
                </ProfileInfoListDetail>
              </Flex>
            </div>
          </ProfilePageUserInfoSection>
          {/* ))} */}
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
                  style={{
                    width: isSmallTablet ? '100%' : '462px',
                    height: '60px'
                  }}
                  css={css`
                    .ant-input {
                      height: 50px;
                      width: 500px;
                      font-size: 1.6rem;
                    }

                    .ant-btn-icon-only.ant-btn-lg {
                      height: 50px;
                      width: 50px;
                    }

                    ${mediaQueryExtraLargeDesktop} {
                      .ant-input {
                        height: 40px;
                        width: 100%;
                        font-size: 16px;
                      }

                      .ant-btn-icon-only.ant-btn-lg {
                        height: 40px;
                        width: 40px;
                      }
                    }
                  `}
                />
                <Select
                  defaultValue="เลือกหมวดหมู่"
                  style={{
                    justifyContent: 'center',
                    display: 'flex',
                    alignItems: 'center'
                  }}
                  css={css`
                    margin-left: 120px;
                    font-size: 1.6rem;
                    height: 50px;
                    width: 250px;

                    ${mediaQueryExtraLargeDesktop} {
                      margin-left: 20px;
                      font-size: 16px;
                      width: 200px;
                      height: 40px;
                    }
                  `}
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
                  setProvides={setProvides}
                  setRequests={setRequests}
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
                <CommunityMemberContent member={community.member} />
              </div>
            ) : (
              <div>
                {menu === CommunityMenu.PROVIDE ? (
                  <React.Fragment>
                    <CommunityProvideContent
                      provides={provides}
                      setProvides={setProvides}
                    />
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <CommunityRequestContent
                      requests={requests}
                      setRequests={setRequests}
                    />
                  </React.Fragment>
                )}
              </div>
            )}
          </ProfilePageUserHelperListSection>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
});

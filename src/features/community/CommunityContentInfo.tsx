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
import { logout } from 'features/logout/Logout';

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

const CommunityCard = styled.div`
  width: 100%;
  max-width: 500px;
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
    width: 400px;
    height: 210px;
    min-width: unset;
  }

  ${mediaQueryTablet} {
    height: 200px;
    margin-bottom: 40px;
    margin-left: 0;
    margin-right: 0;
  }

  ${mediaQueryMobile} {
    width: 100%;
    margin: 0 0 20px 0;
  }
`;

const CommunityImageSection = styled.img`
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

const CommunityName = styled.div`
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

const CommunityInfoListHeading = styled.div`
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

const CommunityInfoListDetail = styled.div`
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  color: #e56101;
  margin-left: 12px;
  max-width: 500px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
    max-width: 400px;
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
    <WrapperContainer>
      {community ? (
        <React.Fragment>
          {' '}
          <ProfilePageUserInfoSection>
            <CommunityCard>
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
                  flex: 1;
                `}
              >
                <CommunityName>{community.communityName}</CommunityName>
              </div>
              <div
                style={{
                  display: 'flex',
                  position: 'absolute',
                  bottom: '12px',
                  padding: '10px',

                  width: '100%',
                  cursor: 'pointer'
                }}
                css={css`
                  left: -9px;

                  ${mediaQueryTablet} {
                    left: 0;
                  }

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

                    ${mediaQueryTablet} {
                      margin-left: 0;
                    }

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
                        communityAdminUserId: window.localStorage.getItem('id')
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
                        if (error.response.data === 'Unauthorized') {
                          logout();
                        } else {
                          message.error(
                            'ขออภัย ไม่สามารถออกจากชุมชนความช่วยเหลือนี้ได้เนื่องจากมีผู้นำชุมชนเพียง 1 คน'
                          );
                        }
                      });
                  }}
                >
                  <LogoutSvg style={{ marginRight: '10px' }} />
                  ออกจากชุมชน
                </PrimaryButton>
                <Dropdown trigger={['click']} overlay={dropDownMenu}>
                  <PrimaryButton
                    css={css`
                      background: #487bff;
                      z-index: 2;

                      border-color: #497bff;

                      &:hover {
                        background: #1877f2 !important;
                        border-color: #1877f2 !important;
                      }

                      &:focus {
                        background: #1877f2 !important;
                        border-color: #1877f2 !important;
                      }

                      ${mediaQueryMobile} {
                        width: 47%;
                      }
                    `}
                  >
                    สลับชุมชน
                  </PrimaryButton>
                </Dropdown>
              </div>
            </CommunityCard>
            <div
              css={css`
                margin-top: 20px;
                position: relative;
                left: 55px;

                ${mediaQueryTablet} {
                  margin-bottom: 30px;
                  left: 0;
                }

                ${mediaQueryMobile} {
                  margin-bottom: 0;
                }
              `}
            >
              <Flex marginBottom="30px" marginTop={isMobile ? '40px' : 0}>
                <CommunityInfoListHeading
                  css={css`
                    max-width: 600px;

                    ${mediaQueryLargeDesktop} {
                      max-width: 500px;
                    }

                    ${mediaQueryMobile} {
                      max-width: 300px;
                    }
                  `}
                >
                  ขอบเขตการช่วยเหลือ
                </CommunityInfoListHeading>
                <CommunityInfoListDetail>
                  {community.location.name}
                </CommunityInfoListDetail>
              </Flex>
              <Flex marginBottom="30px">
                <CommunityInfoListHeading>สมาชิก</CommunityInfoListHeading>
                <CommunityInfoListDetail>
                  {community.member ? community.member.length : `0`} คน
                </CommunityInfoListDetail>
              </Flex>
              <Flex marginBottom="30px">
                <CommunityInfoListHeading>คำอธิบาย</CommunityInfoListHeading>
                <CommunityInfoListDetail>
                  {community.description ?? '-'}
                </CommunityInfoListDetail>
              </Flex>
            </div>
          </ProfilePageUserInfoSection>
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
                      line-height: 6.8713;
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
                  type={menu === CommunityMenu.PROVIDE ? 'provide' : 'request'}
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

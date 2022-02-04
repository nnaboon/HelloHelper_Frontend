/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Divider, Dropdown, Menu } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { RequestFormModal } from 'components/Form/RequestForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelperListCard } from 'components/Card/HelperListCard';
import { SmallSuggestedRequestCard } from 'components/Card/SmallSuggestedRequestCard';
import { InfoMenu } from 'components/Menu/const';
import { Loading } from 'components/Loading/Loading';
import UserAvatar from 'images/avatar_helper.png';
import { UserSvg } from 'components/Svg/UserSvg';
import MyAccountAvatar from 'images/avatar_user2.png';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  mediaQueryMobile,
  mediaQueryDesktop,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { InfoMenuTab } from 'components/Menu/InfoMenuTab';
import { RANK_BADGE } from 'components/Badge/const';
import { RankingBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { USER_DATA } from '../../data/user';
import { PROVIDE_MAPPER } from 'data/provide';

import { useUser } from 'hooks/user/useUser';
import { useProvides } from 'hooks/provide/useProvides';
import { useRequest } from 'hooks/request/useRequest';
import { useAddRequesterUser } from 'hooks/request/useAddRequesterUser';

import { userStore } from 'store/userStore';

import { MoreOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { REQUEST_MAPPER } from 'data/request';
import { EmptyData } from 'components/Empty/EmptyData';

const RequestImageSection = styled.img`
  width: 420px;
  height: 510px;
  margin-bottom: 20px;

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
  }

  ${mediaQueryMobile} {
    height: 300px;
    justify-self: center;
    align-self: center;
  }
`;

const RequestCategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 140px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 40px;
  margin: 10px 8px 10px 0px;
`;

const RequestInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 180px 400px;
  grid-gap: 40px;
  margin-bottom: 60px;

  ${mediaQueryMobile} {
    grid-template-columns: auto auto;
    grid-gap: 12px;
  }
`;

const HelperImage = styled.img`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-top: 5px;

  ${mediaQueryMobile} {
    width: 65px;
    height: 65px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;
  min-width: 140px;
  width: max-content;

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 16px;
    margin-right: 0;
  }
`;

const RequestDetail = styled.div`
  font-weight: 700;
  font-size: 24px;
  line-height: 28px;
  color: #000000;
  min-width: 200px;
  line-height: 31px;
  white-space: pre-wrap;

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

const RequestTitle = styled.div`
  font-size: 14px;
  line-height: 26px;
  color: #848484;
  min-width: 90px;
  max-width: 150px;

  ${mediaQueryMobile} {
    min-width: unset;
    max-width: unset;
  }
`;

const MenuItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const UserProfileCard = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 40px;

  ${mediaQueryMobile} {
    height: 90px;
    margin: 0;
  }
`;

const UserProfileImageContainer = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
  margin-left: 170px;
  margin-right: 60px;

  ${mediaQuerySmallTablet} {
    margin-left: 45px;
  }

  ${mediaQueryMobile} {
    margin: 0 30px;
  }
`;

export const RequestInfoContent = observer(({ data }: any) => {
  const [menu, setMenu] = useState<InfoMenu>(InfoMenu.INFO);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[3];
  const currentMenu = ((state as any)?.info_menu || InfoMenu.INFO) as InfoMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const { data: user, execute: getUser } = useUser();
  const { data: request, execute: getRequest } = useRequest();
  const { execute: addRequesterUserId } = useAddRequesterUser();

  // const { data: provides, execute: getProvides } = useProvides();
  const { me, userId } = userStore;

  const dropDownMenu = (
    <Menu
      css={css`
        z-index: 99;
      `}
    >
      <Menu.Item
        key="1"
        onClick={() => {
          setIsModalVisible(true);
        }}
      >
        <MenuItemContainer>
          <EditSvg style={{ marginRight: '8px' }} />
          <div>แก้ไข</div>
        </MenuItemContainer>
      </Menu.Item>
      <Menu.Item key="2">
        <MenuItemContainer>
          <EyeOffSvg style={{ marginRight: '18px' }} />
          <div>ซ่อน</div>
        </MenuItemContainer>
      </Menu.Item>
      <Menu.Item key="3">
        <MenuItemContainer>
          <DeleteSvg style={{ marginRight: '18px' }} />
          <div>ลบ</div>
        </MenuItemContainer>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    setMenu(currentMenu);
  }, [currentMenu]);

  useEffect(() => {
    // getProvides();
    getRequest(query);
  }, []);

  useEffect(() => {
    if (request) {
      console.log(request);
      getUser(request.userId);
    }
  }, [request]);

  return (
    <React.Fragment>
      {user && request && userId ? (
        <div>
          <WrapperContainer
            css={css`
              overflow-y: scroll;
              overflow-x: hidden;

              ${mediaQueryTablet} {
                height: calc(100vh - 140px);
              }

              ${mediaQueryMobile} {
                height: calc(100vh - 190px);
              }
            `}
          >
            {request.userId === userId && (
              <Dropdown.Button
                icon={<MoreOutlined />}
                overlay={dropDownMenu}
                css={css`
                  position: absolute;
                  z-index: 8;
                  top: 40px;
                  color: #0000;
                  right: 25px;

                  .ant-dropdown-trigger {
                    border: none;
                    z-index: 8;
                  }

                  .ant-dropdown-menu {
                    z-index: 8;
                  }

                  .ant-dropdown .ant-dropdown-placement-bottomRight {
                    z-index: 8;
                    top: 570px;
                  }

                  .ant-dropdown-trigger > span {
                    background-color: white !important;
                    z-index: 8;
                  }

                  .ant-dropdown-menu-item,
                  .ant-dropdown-menu-submenu-title {
                    z-index: 8;
                  }

                  &:selection {
                    color: #fff;
                    z-index: 8;
                    background: transparent;
                  }

                  svg {
                    font-size: 24px;
                  }

                  ${mediaQueryMobile} {
                    right: 8px;
                    top: 10px;
                  }
                `}
              />
            )}
            {isTablet && <InfoMenuTab menu={menu} setMenu={setMenu} />}
            {(!isTablet || menu === InfoMenu.INFO) && (
              <React.Fragment>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexDirection: `${isTablet ? 'column' : 'row'}`
                  }}
                >
                  <Flex
                    direction="column"
                    justify="flex-start"
                    itemAlign="flex-start"
                    style={{ width: 'unset', position: 'relative' }}
                  >
                    <RequestImageSection
                      src={request.imageUrl}
                      alt="request section"
                    />

                    <Flex
                      css={css`
                        width: 600px;
                        flex-wrap: wrap;
                      `}
                    >
                      {request.category.map((items) => (
                        <RequestCategoryButton
                          onClick={() => {
                            history.push({
                              pathname: `/${items}`
                            });
                          }}
                        >
                          {CATEGORY.filter(({ id }) => id === items)[0].name}
                        </RequestCategoryButton>
                      ))}
                    </Flex>
                    <Flex
                      css={css`
                        width: 600px;
                        flex-wrap: wrap;
                      `}
                    >
                      {request.hashtag.map((items) => (
                        <RequestHashtagButton
                          onClick={() => {
                            history.push({
                              pathname: `/search`,
                              search: `?keyword=${items}`,
                              state: {
                                search: items
                              }
                            });
                          }}
                        >
                          #{items}
                        </RequestHashtagButton>
                      ))}
                    </Flex>
                  </Flex>
                  <Flex
                    direction="column"
                    marginTop="30px"
                    style={{ width: 'unset' }}
                    itemAlign={isTablet ? 'flex-start' : 'center'}
                  >
                    <RequestInfoContainer>
                      <RequestTitle>ชื่อ</RequestTitle>
                      <RequestDetail>{request.title}</RequestDetail>
                      <RequestTitle>สถานที่ให้ความข่วยเหลือ</RequestTitle>
                      <RequestDetail>{request.location.name}</RequestDetail>
                      <React.Fragment>
                        <RequestTitle>จำนวน</RequestTitle>
                        <RequestDetail>{request.number}</RequestDetail>
                        <RequestTitle>ราคาสินค้าสูงสุด</RequestTitle>
                        <RequestDetail>{request.price} บาท</RequestDetail>
                      </React.Fragment>
                      <RequestTitle>อัตราค่าบริการสูงสุด</RequestTitle>
                      <RequestDetail>{request.serviceCharge} บาท</RequestDetail>
                      <RequestTitle>ช่องทางการชำระเงิน</RequestTitle>
                      <RequestDetail>{request.payment}</RequestDetail>
                      <RequestTitle>คำอธิบาย</RequestTitle>
                      <RequestDetail>
                        {request.description ? request.description : '-'}
                      </RequestDetail>
                    </RequestInfoContainer>
                    {request.userId !== window.localStorage.getItem('id') && (
                      <PrimaryButton
                        css={css`
                          ${mediaQueryTablet} {
                            width: 100%;
                            max-width: 100%;
                          }

                          ${mediaQueryMobile} {
                            width: 100%;
                            position: fixed;
                            z-index: 4;
                            bottom: 0;
                            left: 0;
                            border-radius: 0 !important;
                            height: 40px;
                          }
                        `}
                        onClick={() => {
                          addRequesterUserId(request.requestId, {
                            userId: userId
                          });
                        }}
                      >
                        สนใจให้ความช่วยเหลือ
                      </PrimaryButton>
                    )}
                  </Flex>
                </div>
                <UserProfileCard>
                  <div style={{ display: 'flex' }}>
                    <UserProfileImageContainer>
                      <HelperImage
                        src={user ? user.imageUrl : undefined}
                        alt="user avatar"
                      />
                      {Boolean(user.recommend) && (
                        <SuggestedBadge
                          css={css`
                            ${mediaQueryMobile} {
                              left: 0;
                            }
                          `}
                        >
                          แนะนำ
                        </SuggestedBadge>
                      )}
                    </UserProfileImageContainer>
                    <div
                      css={css`
                        display: flex;
                        align-items: center;
                      `}
                    >
                      <UserName>{user.username}</UserName>
                      <RankingBadge
                        rankColor={RANK_BADGE[user.rank].color}
                        css={css`
                          margin-top: -10px;
                        `}
                      >
                        {user.rank.toUpperCase()}
                      </RankingBadge>
                    </div>
                  </div>

                  {!isTablet && (
                    <SecondaryButton
                      css={css`
                        margin-right: 100px;
                        width: 140px;
                        z-index: 5;
                      `}
                      onClick={() => {
                        history.push({
                          pathname: `/profile/${request.userId}`
                        });
                      }}
                    >
                      <UserSvg />
                      <div>โปรไฟล์</div>
                    </SecondaryButton>
                  )}
                </UserProfileCard>
              </React.Fragment>
            )}

            {(!isTablet || menu === InfoMenu.HELPER_LIST) && (
              <React.Fragment>
                {request.userId !== userId ? (
                  <div>
                    <Divider
                      style={{
                        borderTopColor: '#C4C4C4',
                        color: '#7C7A7A',
                        fontSize: '18px',
                        fontWeight: 500
                      }}
                    >
                      คุณอาจจะสนใจสิ่งนี้
                    </Divider>

                    <div
                      css={css`
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        grid-gap: 10px;

                        ${mediaQueryTablet} {
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                          align-items: center;
                        }
                      `}
                    >
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[0]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[1]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[2]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[3]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[4]]} />
                      <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[5]]} />
                    </div>
                  </div>
                ) : (
                  <div>
                    <Text fontSize="26px" fontWeight={400}>
                      รายชื่อผู้ต้องการช่วยเหลือ
                    </Text>
                    <Flex
                      itemAlign="flex-start"
                      css={css`
                        justify-content: space-between;
                        ${mediaQueryDesktop} {
                          justify-content: flex-start;
                        }
                        ${mediaQueryTablet} {
                          flex-direction: column;
                        }
                      `}
                    >
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'flex-start',
                          alignItems: 'flex-start',
                          width: '100%',
                          marginTop: isTablet ? '20px' : '40px'
                        }}
                        css={css`
                          width: unset;
                          margin-right: 120px;

                          ${mediaQueryDesktop} {
                            width: 100%;
                          }
                        `}
                      >
                        {request.requesterUserId.length > 0 ? (
                          <React.Fragment>
                            {' '}
                            {request.requesterUserId.map(
                              ({ userId, username, imageUrl }) => (
                                <HelperListCard
                                  id={userId}
                                  name={username}
                                  imageUrl={imageUrl}
                                />
                              )
                            )}
                          </React.Fragment>
                        ) : (
                          <EmptyData />
                        )}
                      </div>
                      {isTablet && (
                        <Divider
                          style={{
                            borderTopColor: '#C4C4C4',
                            color: '#7C7A7A',
                            fontSize: '18px',
                            fontWeight: 500
                          }}
                        >
                          คุณอาจจะสนใจสิ่งนี้
                        </Divider>
                      )}
                      <Flex
                        direction="column"
                        itemAlign={isTablet ? 'center' : 'flex-end'}
                        css={css`
                          width: unset;
                          ${mediaQueryDesktop} {
                            width: 100%;
                          }
                        `}
                      >
                        <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[1]]} />
                        <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[2]]} />
                        <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[0]]} />
                        <SmallSuggestedRequestCard data={[PROVIDE_MAPPER[3]]} />
                      </Flex>
                    </Flex>
                  </div>
                )}
              </React.Fragment>
            )}
          </WrapperContainer>
          <RequestFormModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            requestData={{
              ...request,
              type: 'request'
            }}
          />
        </div>
      ) : (
        <WrapperContainer
          css={css`
            overflow-y: scroll;
            overflow-x: hidden;

            ${mediaQueryTablet} {
              height: calc(100vh - 140px);
            }

            ${mediaQueryMobile} {
              height: calc(100vh - 190px);
            }
          `}
        >
          <Loading />
        </WrapperContainer>
      )}
    </React.Fragment>
  );
});

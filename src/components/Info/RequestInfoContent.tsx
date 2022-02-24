/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { Divider, Dropdown, Menu, message } from 'antd';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { RequestFormModal } from 'components/Form/RequestForm';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import { HelperListCard } from 'components/Card/HelperListCard';
import { SmallSuggestedRequestCard } from 'components/Card/SmallSuggestedRequestCard';
import { PopularRequestSection } from 'components/Card/PopularRequestCard';
import { InfoMenu } from 'components/Menu/const';
import { Loading } from 'components/Loading/Loading';
import DefaultImage from 'images/default.png';
import { UserSvg } from 'components/Svg/UserSvg';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQueryDesktop,
  mediaQueryLargeDesktop,
  mediaQuerySmallTablet,
  mediaQueryExtraLargeDesktop,
  mediaQueryTablet
} from 'styles/variables';
import { InfoMenuTab } from 'components/Menu/InfoMenuTab';
import { RANK_BADGE } from 'components/Badge/const';
import { RankingBadge, RequestStatusBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';

import { useUser } from 'hooks/user/useUser';
import { useProvides } from 'hooks/provide/useProvides';
import { useRequest } from 'hooks/request/useRequest';
import { useAddRequesterUser } from 'hooks/request/useAddRequesterUser';
import { useUpdateRequest } from 'hooks/request/useUpdateRequest';

import { userStore } from 'store/userStore';

import { MoreOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { EmptyData } from 'components/Empty/EmptyData';
import { mediaQueryMiniDesktop } from '../../styles/variables';

const RequestImageSection = styled.img`
  width: 520px;
  height: 100%;
  margin-bottom: 20px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 420px;
    height: 500px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
    height: 450px;
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
  height: 45px;
  margin: 10px 8px 10px 0px;
  font-size: 1.7rem;

  ${mediaQueryLargeDesktop} {
    height: 40px;
  }

  ${mediaQueryMobile} {
    margin-bottom: 10px;
  }
`;

const RequestHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 45px;
  margin: 10px 8px 10px 0px;
  font-size: 1.7rem;

  ${mediaQueryLargeDesktop} {
    height: 40px;
  }

  ${mediaQueryMobile} {
    margin-bottom: 0;
  }
`;

const RequestInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 450px;
  grid-gap: 40px;
  margin-bottom: 60px;

  ${mediaQueryLargeDesktop} {
    grid-template-columns: 180px 400px;
  }

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
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 80px;
    height: 80px;
  }

  ${mediaQueryMobile} {
    width: 55px;
    height: 55px;
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

  ${mediaQueryLargeDesktop} {
    font-size: 22px;
  }

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 16px;
    margin-right: 0;
  }
`;

const RequestDetail = styled.div`
  font-weight: 700;
  line-height: 31px;
  font-size: 1.5rem;
  color: #000000;
  min-width: 800px;
  line-height: 60px;
  white-space: pre-wrap;

  ${mediaQueryLargeDesktop} {
    font-size: 24px;
    min-width: 200px;
    line-height: 31px;
    min-width: max-content;
  }

  ${mediaQueryTablet} {
    min-width: 100%;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    min-width: 100%;
  }
`;

const RequestTitle = styled.div`
  font-size: 1.5rem;
  line-height: 60px;
  color: #848484;
  min-width: 90px;
  max-width: 250px;

  ${mediaQueryLargeDesktop} {
    max-width: 150px;
    font-size: 14px;
    line-height: 26px;
  }

  ${mediaQueryMobile} {
    min-width: 120px;
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
  margin: 80px 0;
  justify-content: space-around;

  ${mediaQueryLargeDesktop} {
    justify-content: space-between;
    margin: 40px 0;
  }

  ${mediaQueryMobile} {
    height: 90px;
    margin: 0;
    margin-top: 20px;
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
  const [request, setRequest] = useState<any>();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const history = useHistory();
  const { pathname, state } = useLocation();
  const query = pathname.split('/')[3];
  const currentMenu = ((state as any)?.info_menu || InfoMenu.INFO) as InfoMenu;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const { data: user, execute: getUser } = useUser();
  const { execute: getRequest } = useRequest();
  const { execute: updateRequest } = useUpdateRequest();
  const { execute: addRequesterUserId } = useAddRequesterUser();

  const { data: provides, execute: getProvides } = useProvides();
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            if (request.visibility === 0) {
              updateRequest(query, {
                userId: window.localStorage.getItem('id'),
                visibility: 1
              })
                .then((res) => {
                  message.success('สำเร็จ');
                  setRequest(res.data);
                })
                .catch((error) => message.error('ไม่สำเร็จ'));
            } else {
              updateRequest(query, {
                userId: window.localStorage.getItem('id'),
                visibility: 0
              })
                .then((res) => {
                  message.success('สำเร็จ');
                  setRequest(res.data);
                })
                .catch((error) => message.error('ไม่สำเร็จ'));
            }
          }}
        >
          <EyeOffSvg style={{ marginRight: '18px' }} />
          <div>{Boolean(request?.visibility) ? 'ซ่อน' : 'เลิกซ่อน'}</div>
        </div>
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
    getProvides();
    getRequest(query).then((res) => {
      setRequest(res.data);
    });
  }, []);

  useEffect(() => {
    if (request) {
      getUser(request.userId);
    }
  }, [request]);

  return (
    <React.Fragment>
      {user && request && userId && provides ? (
        <div>
          <WrapperContainer
            css={css`
              overflow-y: scroll;
              overflow-x: hidden;

              ${mediaQueryTablet} {
                height: 100%;
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
                  css={css`
                    position: relative;
                  `}
                >
                  <Flex
                    direction="column"
                    justify="flex-start"
                    itemAlign="flex-start"
                    style={{ width: 'unset', position: 'relative' }}
                  >
                    <RequestImageSection
                      src={request.imageUrl ?? DefaultImage}
                      alt="request section"
                    />

                    <Flex
                      css={css`
                        width: 600px;
                        flex-wrap: wrap;

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
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

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
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
                    style={{ width: 'unset', height: 'inherit' }}
                    itemAlign={isTablet ? 'flex-start' : 'center'}
                  >
                    <RequestInfoContainer>
                      <RequestTitle>ชื่อ</RequestTitle>
                      <Flex>
                        <RequestDetail>{request.title}</RequestDetail>
                        {(request.providedUserId.length > 0 ||
                          !Boolean(request.visibility)) && (
                          <RequestStatusBadge
                            status={
                              request.providedUserId.length > 0
                                ? 2
                                : Boolean(request.visibility)
                                ? undefined
                                : 0
                            }
                          >
                            {request.providedUserId.length > 0 &&
                            Boolean(request.visibility)
                              ? 'ช่วยเหลือแล้ว'
                              : !Boolean(request.visibility)
                              ? 'ซ่อน'
                              : null}
                          </RequestStatusBadge>
                        )}
                      </Flex>

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
                    {request.userId !== window.localStorage.getItem('id') &&
                      (request.requesterUserId.find(
                        (item) =>
                          item.userId === window.localStorage.getItem('id')
                      ) ? (
                        <PrimaryButton
                          css={css`
                            position: absolute;
                            bottom: 0;

                            ${mediaQueryLargeDesktop} {
                              bottom: 40px;
                            }

                            ${mediaQueryTablet} {
                              width: 100%;
                              max-width: 100%;
                              bottom: 0;
                            }

                            ${mediaQueryMobile} {
                              // width: 100%;
                              // position: fixed;
                              // z-index: 4;
                              // bottom: 0;
                              // left: 0;
                              // border-radius: 0 !important;
                              height: 40px;
                              margin-bottom: 10px;
                            }
                          `}
                          onClick={() => {
                            addRequesterUserId(
                              request.requestId,
                              request.userId,
                              {
                                userId: window.localStorage.getItem('id')
                              }
                            )
                              .then(() => {
                                message.success(
                                  'เรากำลังส่งความช่วยเหลือของคุณให้เจ้าของโพสต์ได้รับทราบ'
                                );
                              })
                              .catch(() => {
                                message.error('ไม่สำเร็จ');
                              });
                          }}
                        >
                          คุณได้ทำการสนใจให้ความช่วยเหลือนี้แล้ว
                        </PrimaryButton>
                      ) : (
                        <PrimaryButton
                          css={css`
                            position: absolute;
                            bottom: 0;

                            ${mediaQueryLargeDesktop} {
                              bottom: 40px;
                            }

                            ${mediaQueryTablet} {
                              width: 100%;
                              max-width: 100%;
                              bottom: 0;
                              margin-left: 0;
                            }

                            ${mediaQueryMobile} {
                              // width: 100%;
                              // position: fixed;
                              // z-index: 4;
                              // bottom: 0;
                              // left: 0;
                              // border-radius: 0 !important;
                              height: 40px;
                              margin-bottom: 10px;
                            }
                          `}
                          onClick={() => {
                            addRequesterUserId(
                              request.requestId,
                              request.userId,
                              {
                                userId: window.localStorage.getItem('id')
                              }
                            )
                              .then(() => {
                                message.success(
                                  'เรากำลังส่งความช่วยเหลือของคุณให้เจ้าของโพสต์ได้รับทราบ'
                                );
                              })
                              .catch(() => {
                                message.error('ไม่สำเร็จ');
                              });
                          }}
                        >
                          สนใจให้ความช่วยเหลือ
                        </PrimaryButton>
                      ))}
                  </Flex>
                </div>
                <UserProfileCard
                  onClick={() => {
                    history.push({
                      pathname: `/profile/${request.userId}`
                    });
                  }}
                >
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

                          ${mediaQueryMobile} {
                            margin-left: 8px;
                          }
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
                        fontWeight: 500,
                        marginBottom: '35px'
                      }}
                    >
                      คุณอาจจะสนใจสิ่งนี้
                    </Divider>

                    <div
                      css={css`
                        display: grid;
                        grid-template-columns: repeat(5, 1fr);
                        grid-gap: 2rem;

                        ${mediaQueryExtraLargeDesktop} {
                          grid-template-columns: repeat(4, 1fr);
                          grid-gap: 20px;
                        }

                        ${mediaQueryLargeDesktop} {
                          grid-template-columns: repeat(3, 1fr);
                        }

                        ${mediaQueryDesktop} {
                          grid-template-columns: repeat(2, 1fr);
                        }

                        ${mediaQueryMiniDesktop} {
                          grid-template-columns: repeat(2, 1fr);
                        }

                        ${mediaQueryMobile} {
                          display: flex;
                          flex-direction: column;
                          width: 100%;
                          align-items: center;
                        }

                        @media screen and (max-width: 2700px) and (min-width: 2600px) {
                          grid-template-columns: repeat(4, 1fr);
                        }

                        @media screen and (max-width: 2600px) and (min-width: 2000px) {
                          grid-template-columns: repeat(3, 1fr);
                          grid-gap: 20px;
                        }
                      `}
                    >
                      {/* <SmallSuggestedRequestCard data={[provides[1]]} />
                      <SmallSuggestedRequestCard data={[provides[2]]} />
                      <SmallSuggestedRequestCard data={[provides[0]]} />
                      <SmallSuggestedRequestCard data={[provides[3]]} />
                      <SmallSuggestedRequestCard data={[provides[4]]} />
                      <SmallSuggestedRequestCard data={[provides[5]]} /> */}
                      <PopularRequestSection data={[provides[1]]} />
                      <PopularRequestSection data={[provides[2]]} />
                      <PopularRequestSection data={[provides[0]]} />
                      <PopularRequestSection data={[provides[3]]} />
                      <PopularRequestSection data={[provides[4]]} />
                      <PopularRequestSection data={[provides[5]]} />
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* <Text
                      fontWeight={400}
                      css={css`
                        font-size: 2.3rem;
                        ${mediaQueryLargeDesktop} {
                          font-size: 26px;
                        }
                      `}
                    >
                      รายชื่อผู้ต้องการช่วยเหลือ
                    </Text> */}
                    <Flex
                      itemAlign="flex-start"
                      css={css`
                        justify-content: center;

                        ${mediaQueryLargeDesktop} {
                          justify-content: space-between;
                        }
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
                          marginTop: isTablet ? '0px' : '40px'
                        }}
                        css={css`
                          width: unset;
                          margin-right: 120px;

                          ${mediaQueryLargeDesktop} {
                            width: 100%;
                          }
                        `}
                      >
                        <Text
                          fontWeight={400}
                          css={css`
                            font-size: 2.3rem;
                            margin-bottom: 35px;

                            ${mediaQueryLargeDesktop} {
                              font-size: 26px;
                              margin-bottom: 20px;
                            }
                          `}
                        >
                          รายชื่อผู้ต้องการช่วยเหลือ
                        </Text>
                        {request.requesterUserId.length > 0 ? (
                          <React.Fragment>
                            {' '}
                            {request.requesterUserId.map(
                              ({ userId, username, imageUrl }) => (
                                <HelperListCard
                                  id={userId}
                                  name={username}
                                  imageUrl={imageUrl}
                                  request={request}
                                />
                              )
                            )}
                          </React.Fragment>
                        ) : (
                          <EmptyData
                            height={isSmallTablet ? '300px' : undefined}
                          />
                        )}
                      </div>
                      {isTablet && (
                        <Divider
                          style={{
                            borderTopColor: '#C4C4C4',
                            color: '#7C7A7A',
                            fontSize: '18px',
                            fontWeight: 500,
                            marginBottom: '35px'
                          }}
                        >
                          คุณอาจจะสนใจสิ่งนี้
                        </Divider>
                      )}
                      <div
                        css={css`
                          display: flex;
                          flex-direction: column;
                          align-items: center;

                          ${mediaQueryTablet} {
                            display: grid;
                            grid-template-columns: repeat(2, 1fr);
                            grid-gap: 2rem;
                          }

                          ${mediaQueryMobile} {
                            display: flex;
                            flex-direction: column;
                            width: 100%;
                            align-items: center;
                          }
                        `}
                      >
                        {/* <SmallSuggestedRequestCard data={[provides[1]]} />
                        <SmallSuggestedRequestCard data={[provides[2]]} />
                        <SmallSuggestedRequestCard data={[provides[0]]} />
                        <SmallSuggestedRequestCard data={[provides[3]]} /> */}
                        <PopularRequestSection data={[provides[1]]} />
                        <PopularRequestSection data={[provides[2]]} />
                        <PopularRequestSection data={[provides[0]]} />
                        <PopularRequestSection data={[provides[3]]} />
                      </div>
                    </Flex>
                  </div>
                )}
              </React.Fragment>
            )}
          </WrapperContainer>
          <RequestFormModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
            setUpdateData={setRequest}
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
          <Loading height="calc(100vh - 265px)" />
        </WrapperContainer>
      )}
    </React.Fragment>
  );
});

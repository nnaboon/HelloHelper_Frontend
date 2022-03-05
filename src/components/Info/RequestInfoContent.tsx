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
import {
  PrimaryButton,
  SecondaryButton,
  CategoryButton,
  HashtagButton
} from 'components/Button/Button';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { HelperListCard } from 'components/Card/HelperListCard';
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
  mediaQueryMiniDesktop,
  mediaQueryExtraLargeDesktop,
  mediaQueryTablet,
  MINI_DESKTOP_WIDTH
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
import { useDeletedRequesterUserId } from 'hooks/request/useDeleteRequesterUserId';

import { userStore } from 'store/userStore';

import { MoreOutlined } from '@ant-design/icons';
import { CATEGORY } from 'data/category';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { EmptyData } from 'components/Empty/EmptyData';
import { logout } from 'features/logout/Logout';
import { useDeleteRequest } from 'hooks/request/useDeleteRequest';

const RequestImageSection = styled.img`
  width: 450px;
  height: 100%;
  margin-bottom: 20px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 350px;
    height: 400px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
    height: 380px;
  }

  ${mediaQueryMobile} {
    height: 300px;
    justify-self: center;
    align-self: center;
  }
`;

const RequestInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 500px;
  grid-gap: 20px 40px;
  margin-bottom: 60px;

  ${mediaQueryLargeDesktop} {
    grid-template-columns: 160px 300px;
  }

  ${mediaQueryMobile} {
    grid-template-columns: auto auto;
    grid-gap: 12px;
  }
`;

const HelperImage = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 5px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 60px;
    height: 60px;
  }

  ${mediaQueryMobile} {
    width: 45px;
    height: 45px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  margin-right: 20px;
  min-width: 140px;
  width: max-content;

  ${mediaQueryLargeDesktop} {
    font-size: 20px;
  }

  ${mediaQueryMiniDesktop} {
    margin-right: 10px;
  }

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 16px;
  }
`;

const RequestDetail = styled.div`
  font-weight: 700;
  line-height: 31px;
  font-size: 20px;
  color: #000000;
  min-width: unset;
  max-width: max-content;
  line-height: 60px;
  white-space: pre-wrap;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
    line-height: 31px;
    max-width: max-content;
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
  font-size: 14px;
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
  height: 100px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  margin: 80px 0;
  justify-content: space-around;

  ${mediaQueryLargeDesktop} {
    justify-content: space-around;
    height: 90px;
    margin: 40px 0;
  }

  ${mediaQueryTablet} {
    justify-content: space-between;
  }

  ${mediaQueryMobile} {
    height: 90px;
    justify-content: space-between;
    margin: 0;
    margin-top: 20px;
  }
`;

const UserProfileImageContainer = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  align-items: center;
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

  const isMiniDesktop = useMedia(`(max-width: ${MINI_DESKTOP_WIDTH}px)`);

  const { data: user, execute: getUser } = useUser();
  const { execute: getRequest } = useRequest();
  const { execute: updateRequest } = useUpdateRequest();
  const { execute: addRequesterUserId } = useAddRequesterUser();
  const { execute: deleteRequest } = useDeleteRequest();
  const { execute: deleteRequesterUserId } = useDeletedRequesterUserId();

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
          {/* <EditSvg style={{ marginRight: '8px' }} /> */}
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
          {/* <EyeOffSvg style={{ marginRight: '18px' }} /> */}
          <div>{Boolean(request?.visibility) ? 'ซ่อน' : 'เลิกซ่อน'}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <MenuItemContainer
          onClick={() => {
            deleteRequest(query)
              .then((res) => {
                message.success('สำเร็จ');
                history.push('/');
              })
              .catch((error) => {
                if (error.response.data === 'Unauthorized') {
                  logout();
                }

                message.error('ไม่สำเร็จ');
              });
          }}
        >
          {/* <DeleteSvg style={{ marginRight: '18px' }} /> */}
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
    getRequest(query)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((error) => {
        message.error('ไม่พบความช่วยเหลือนี้', 10);
        history.push('/');
      });
  }, []);

  useEffect(() => {
    if (request) {
      getUser(request.userId);
    }
  }, [request]);

  return (
    <React.Fragment>
      {user && request && provides ? (
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
            <Flex
              justify="flex-end"
              css={css`
                margin-top: 25px;

                ${mediaQueryLargeDesktop} {
                  margin-top: 10px;
                }
              `}
            >
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
                  css={css`
                    ${mediaQueryMobile} {
                      right: 30px;
                      position: relative;
                    }
                  `}
                >
                  {request.providedUserId.length > 0 &&
                  Boolean(request.visibility)
                    ? 'ช่วยเหลือแล้ว'
                    : !Boolean(request.visibility)
                    ? 'ซ่อน'
                    : null}
                </RequestStatusBadge>
              )}
              {request.userId === window.localStorage.getItem('id') && (
                <Dropdown.Button
                  icon={<MoreOutlined />}
                  overlay={dropDownMenu}
                  trigger={['click']}
                  css={css`
                    position: absolute;
                    z-index: 8;
                    // top: 0px;
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
                      // top: 10px;
                    }
                  `}
                />
              )}{' '}
            </Flex>
            {isTablet && <InfoMenuTab menu={menu} setMenu={setMenu} />}
            {(!isTablet || menu === InfoMenu.INFO) && (
              <React.Fragment>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: `${isTablet ? 'column' : 'row'}`
                  }}
                  css={css`
                    position: relative;
                    justify-content: center;

                    ${mediaQueryMiniDesktop} {
                      justify-content: space-between;
                    }

                    ${mediaQueryTablet} {
                      justify-content: center;
                    }
                  `}
                >
                  <Flex
                    direction="column"
                    justify="flex-start"
                    itemAlign="flex-start"
                    css={css`
                      position: relative;
                      width: 30%;

                      ${mediaQueryLargeDesktop} {
                        width: 35%;
                      }
                      ${mediaQueryTablet} {
                        width: unset;
                      }
                    `}
                  >
                    <RequestImageSection
                      src={request.imageUrl ?? DefaultImage}
                      alt="request section"
                    />

                    <Flex
                      css={css`
                        width: 400px;
                        flex-wrap: wrap;

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
                      `}
                    >
                      {request.category.map((items) => (
                        <CategoryButton
                          onClick={() => {
                            history.push({
                              pathname: `/${items}`
                            });
                          }}
                        >
                          {CATEGORY.filter(({ id }) => id === items)[0].name}
                        </CategoryButton>
                      ))}
                    </Flex>
                    <Flex
                      css={css`
                        width: 500px;
                        flex-wrap: wrap;

                        ${mediaQueryLargeDesktop} {
                          width: 400px;
                        }

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
                      `}
                    >
                      {request.hashtag.map((items) => (
                        <HashtagButton
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
                        </HashtagButton>
                      ))}
                    </Flex>
                    <FacebookShareButton
                      url={`https://hello-helper-66225d.netlify.app/${pathname}`}
                      className="share"
                      quote={undefined}
                      hashtag={'hellohelper'}
                      css={css`
                        margin-top: 10px;
                      `}
                    >
                      <FacebookIcon size={32} round={true} />
                    </FacebookShareButton>
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
                      (request.requesterUserId.filter(
                        (item) =>
                          item.userId === window.localStorage.getItem('id')
                      ).length > 0 ? (
                        <SecondaryButton
                          css={css`
                            position: absolute;
                            bottom: 0;

                            &:hover {
                              box-shadow: 0px 9px 16px rgba(255, 135, 48, 0.2);
                            }

                            ${mediaQueryLargeDesktop} {
                              bottom: 40px;
                            }

                            ${mediaQueryTablet} {
                              width: 100%;
                              max-width: 100%;
                              bottom: 0;
                            }

                            ${mediaQueryMobile} {
                              height: 40px;
                              margin-bottom: 10px;
                            }
                          `}
                          onClick={() => {
                            deleteRequesterUserId(
                              request.requestId,
                              request.requesterUserId.filter(
                                (item) =>
                                  item.userId ===
                                  window.localStorage.getItem('id')
                              )[0].requesterId
                            )
                              .then(() => {
                                getRequest(query)
                                  .then((res) => {
                                    setRequest(res.data);
                                    message.success(
                                      'ยกเลิกการสนใจให้ความช่วยเหลือนี้สำเร็จ'
                                    );
                                  })
                                  .catch((error) => {
                                    message.error('ไม่พบความช่วยเหลือนี้', 10);
                                    history.push('/');
                                  });
                              })
                              .catch(() => {
                                message.error('ยกเลิกไม่สำเร็จ');
                              });
                          }}
                        >
                          ยกเลิกการสนใจให้ความช่วยเหลือนี้
                        </SecondaryButton>
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
                              .then((res) => {
                                getRequest(query)
                                  .then((res) => {
                                    setRequest(res.data);
                                    message.success(
                                      'เรากำลังส่งความช่วยเหลือของคุณให้เจ้าของโพสต์ได้รับทราบ'
                                    );
                                  })
                                  .catch((error) => {
                                    message.error('ไม่พบความช่วยเหลือนี้', 10);
                                    history.push('/');
                                  });
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
                      <RankingBadge rankColor={RANK_BADGE[user.rank].color}>
                        {user.rank.toUpperCase()}
                      </RankingBadge>
                    </div>
                  </div>

                  {!isMobile && (
                    <SecondaryButton
                      css={css`
                        margin-right: 20px;
                        width: 140px;
                        z-index: 5;
                        font-size: 18px;

                        ${mediaQueryLargeDesktop} {
                          font-size: 16px;
                        }
                      `}
                      onClick={() => {
                        history.push({
                          pathname: `/profile/${request.userId}`
                        });
                      }}
                    >
                      <UserSvg
                        css={css`
                          margin-right: 8px;
                        `}
                      />
                      <div>โปรไฟล์</div>
                    </SecondaryButton>
                  )}
                </UserProfileCard>
              </React.Fragment>
            )}

            {(!isTablet || menu === InfoMenu.HELPER_LIST) && (
              <React.Fragment>
                {request.userId !== window.localStorage.getItem('id') ? (
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
                          grid-gap: 10px;
                        }

                        ${mediaQueryLargeDesktop} {
                          grid-template-columns: repeat(3, 1fr);
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
                      `}
                    >
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
                    <Flex
                      itemAlign="flex-start"
                      css={css`
                        justify-content: center;

                        ${mediaQueryLargeDesktop} {
                          justify-content: space-between;
                        }

                        ${mediaQueryMiniDesktop} {
                          flex-direction: column;
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
                          width: 39%;
                          margin-right: 120px;

                          ${mediaQueryLargeDesktop} {
                            width: 100%;
                          }
                        `}
                      >
                        <Text
                          fontWeight={400}
                          css={css`
                            font-size: 24px;
                            margin-bottom: 35px;

                            ${mediaQueryLargeDesktop} {
                              font-size: 24px;
                              margin-bottom: 20px;
                            }

                            ${mediaQueryTablet} {
                              font-size: 20px;
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
                            height={isMiniDesktop ? '250px' : undefined}
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

                          ${mediaQueryMiniDesktop} {
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

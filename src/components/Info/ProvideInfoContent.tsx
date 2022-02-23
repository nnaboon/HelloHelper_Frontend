/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import Flex from 'components/Flex/Flex';
import { CATEGORY } from 'data/category';
import { PrimaryButton, SecondaryButton } from 'components/Button/Button';
import DefaultImage from 'images/default.png';
import { UserSvg } from 'components/Svg/UserSvg';
import { Divider, Dropdown, Menu, message } from 'antd';
import { RankingBadge, RequestStatusBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import { useProvide } from 'hooks/provide/useProvide';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';

import { RequestFormModal } from 'components/Form/RequestForm';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  mediaQueryMobile,
  mediaQuerySmallTablet,
  mediaQueryTablet
} from 'styles/variables';
import { MoreOutlined } from '@ant-design/icons';
import { EditSvg } from 'components/Svg/EditSvg';
import { DeleteSvg } from 'components/Svg/DeleteSvg';
import { EyeOffSvg } from 'components/Svg/EyeOffSvg';
import { Loading } from 'components/Loading/Loading';
import { useUpdateProvide } from 'hooks/provide/useUpdateProvide';
import { useAddChatRoom } from 'hooks/chat/useAddChatRoom';
import { mediaQueryLargeDesktop } from '../../styles/variables';
import { ProviderId } from 'firebase/auth';

const ProvideImageSection = styled.img`
  width: 520px;
  height: 100%;
  margin-bottom: 20px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 380px;
    height: 500px;
  }

  ${mediaQueryTablet} {
    width: 100%;
    justify-self: center;
    align-self: center;
    height: 450px;
  }

  ${mediaQuerySmallTablet} {
    justify-self: flex-start;
    align-self: flex-start;
  }

  ${mediaQueryMobile} {
    width: 100%;
    height: 300px;
  }
`;

const ProvideCategoryButton = styled(PrimaryButton)`
  width: max-content;
  min-width: 140px;
  padding: 10px 15px;
  height: 45px;
  margin: 10px 8px 10px 0px;
  font-size: 1.7rem;

  ${mediaQueryLargeDesktop} {
    height: 40px;
    font-size: 16px;
  }

  ${mediaQueryTablet} {
    margin: 10px 0;
  }
`;

const ProvideHashtagButton = styled(SecondaryButton)`
  width: max-content;
  min-width: 80px;
  padding: 10px 15px;
  height: 45px;
  margin: 10px 8px 10px 0px;
  font-size: 1.7rem;

  ${mediaQueryLargeDesktop} {
    height: 40px;
    font-size: 16px;
  }
`;

const ProvideUserCard = styled.div`
  width: 100%;
  height: 140px;
  display: flex;
  align-items: center;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  justify-content: space-around;

  ${mediaQueryLargeDesktop} {
    justify-content: space-between;
  }

  ${mediaQueryMobile} {
    height: 90px;
  }
`;

const ProvideInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 300px 450px;
  grid-gap: 40px;
  margin-bottom: 60px;

  ${mediaQueryLargeDesktop} {
    grid-template-columns: 180px 400px;
  }

  ${mediaQuerySmallTablet} {
    grid-template-columns: 144px 400px;
  }

  ${mediaQueryMobile} {
    grid-template-columns: auto auto;
    grid-gap: 12px;
  }
`;

const ProvideDetail = styled.div`
  font-weight: 700;
  font-size: 2rem;
  color: #000000;
  min-width: 400px;
  line-height: 60px;
  white-space: pre-wrap;

  ${mediaQueryLargeDesktop} {
    font-size: 19px;
    min-width: 200px;
    line-height: 31px;
  }

  ${mediaQueryTablet} {
    min-width: max-content;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

const ProvideTitle = styled.div`
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
    min-width: unset;
    max-width: unset;
  }
`;

const HelperImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
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
    font-size: 14px;
    margin-right: 0;
  }
`;

export const ProvideInfoContent = observer(({ data }: any) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [provide, setProvide] = useState<any>();
  const history = useHistory();
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const { me } = userStore;

  // const { data: user, loading: isUserLoading, execute: getUser } = useUser();
  const { execute: updateProvide } = useUpdateProvide();
  const { execute: getProvide } = useProvide();
  const { execute: addChatRoom } = useAddChatRoom();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);

  const dropDownMenu = (
    <Menu
      css={css`
        z-index: 99;
      `}
    >
      <Menu.Item key="1">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          css={css`
            z-index: 99;
          `}
          onClick={() => {
            setIsModalVisible(true);
          }}
        >
          <EditSvg style={{ marginRight: '8px' }} />

          <div>แก้ไข</div>
        </div>
      </Menu.Item>
      <Menu.Item key="2">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            if (provide?.visibility === 0) {
              updateProvide(query, {
                userId: window.localStorage.getItem('id'),
                visibility: 1
              })
                .then((res) => {
                  message.success('สำเร็จ');
                  setProvide(res.data);
                })
                .catch((error) => message.error('ไม่สำเร็จ'));
            } else {
              updateProvide(query, {
                userId: window.localStorage.getItem('id'),
                visibility: 0
              })
                .then((res) => {
                  message.success('สำเร็จ');
                  setProvide(res.data);
                })
                .catch((error) => message.error('ไม่สำเร็จ'));
            }
          }}
        >
          <EyeOffSvg style={{ marginRight: '18px' }} />
          <div>{Boolean(provide?.visibility) ? 'ซ่อน' : 'เลิกซ่อน'}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <DeleteSvg style={{ marginRight: '18px' }} />
          <div>ลบ</div>
        </div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (query || window.localStorage.getItem('id')) {
      getProvide(query ?? window.localStorage.getItem('id')).then((res) => {
        setProvide(res.data);
      });
      // getUser(provide?.userId);
    }
  }, []);

  // useEffect(() => {
  //   if (provide) {
  //     getUser(provide?.userId);
  //   }
  // }, [provide]);

  return (
    <React.Fragment>
      {' '}
      {provide && me ? (
        <div>
          {' '}
          <WrapperContainer
            css={css`
              overflow-y: scroll;

              ${mediaQueryTablet} {
                height: 100%;
              }
            `}
          >
            {provide?.userId === window.localStorage.getItem('id') && (
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
                <ProvideImageSection
                  src={provide?.imageUrl ?? DefaultImage}
                  alt="provide img"
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
                  {provide?.category.map((items) => (
                    <ProvideCategoryButton
                      onClick={() => {
                        history.push({
                          pathname: `/${items}`
                        });
                      }}
                    >
                      {CATEGORY.filter(({ id }) => id === items)[0].name}
                    </ProvideCategoryButton>
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
                  {provide?.hashtag.map((items) => (
                    <ProvideHashtagButton
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
                    </ProvideHashtagButton>
                  ))}
                </Flex>
              </Flex>
              <Flex
                direction="column"
                marginTop="30px"
                style={{ width: 'unset' }}
                itemAlign={isTablet ? 'flex-start' : 'center'}
              >
                <ProvideInfoContainer>
                  <ProvideTitle>ชื่อ</ProvideTitle>
                  <Flex>
                    <ProvideDetail>{provide?.title}</ProvideDetail>
                    {!Boolean(provide?.visibility) && (
                      <RequestStatusBadge status={0}>ซ่อน</RequestStatusBadge>
                    )}
                  </Flex>
                  <ProvideTitle>
                    {isMobile ? 'สถานที่' : 'สถานที่ให้ความข่วยเหลือ'}
                  </ProvideTitle>
                  <ProvideDetail>{provide?.location.name}</ProvideDetail>
                  <ProvideTitle>จำนวนการช่วยเหลือ</ProvideTitle>
                  <ProvideDetail>{provide?.provideSum} ครั้ง</ProvideDetail>
                  <ProvideTitle>อัตราค่าบริการ</ProvideTitle>
                  <ProvideDetail>{provide?.serviceCharge} บาท</ProvideDetail>
                  <ProvideTitle>ช่องทางการชำระเงิน</ProvideTitle>
                  <ProvideDetail>{provide?.payment}</ProvideDetail>
                  <ProvideTitle>คำอธิบาย</ProvideTitle>
                  <ProvideDetail>
                    {provide?.description ? provide?.description : '-'}
                  </ProvideDetail>
                </ProvideInfoContainer>
                {provide?.userId !== me.userId && (
                  <Flex>
                    <PrimaryButton
                      css={css`
                        height: 65px;
                        font-size: 1.7rem;
                        max-width: 100%;
                        bottom: 0;

                        ${mediaQueryLargeDesktop} {
                          font-size: 19px;
                          height: 40px;
                        }

                        ${mediaQueryTablet} {
                          width: 100%;
                          max-width: 100%;
                        }
                        ${mediaQueryMobile} {
                          position: fixed;
                          z-index: 4;
                          bottom: 0;
                          left: 0;
                          border-radius: 0 !important;
                        }
                      `}
                      onClick={() => {
                        addChatRoom({
                          providerUserId: provide?.userId,
                          requesterUserId: me.userId
                        }).then((res) => {
                          history.push({
                            pathname: `/chat/${res.data}`,
                            state: {
                              id: query,
                              type: 'provide',
                              title: provide?.title,
                              location: {
                                name: provide?.location.name,
                                latitude: provide?.location.latitude,
                                longitude: provide?.location.longitude
                              },
                              payment: provide?.payment,
                              price: provide?.price,
                              serviceCharge: provide?.serviceCharge,
                              number: provide?.number,
                              description: provide?.description,
                              userId: provide?.userId
                            }
                          });
                        });
                      }}
                    >
                      ขอความช่วยเหลือ
                    </PrimaryButton>
                  </Flex>
                )}
              </Flex>
            </div>
            <Divider />
            <ProvideUserCard
              onClick={() => {
                history.push({
                  pathname: `/profile/${provide?.userId}`
                });
              }}
            >
              <div style={{ display: 'flex' }}>
                <div
                  css={css`
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
                  `}
                >
                  <HelperImage
                    src={provide ? provide?.user.imageUrl : DefaultImage}
                    alt="user avatar"
                  />
                  {Boolean(provide?.user?.recommend) && (
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
                </div>
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                  `}
                >
                  <UserName>{provide?.user.username}</UserName>
                  <RankingBadge
                    rankColor={RANK_BADGE[provide?.user?.rank].color}
                    css={css`
                      margin-top: -10px;
                    `}
                  >
                    {provide?.user.rank.toUpperCase()}
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
                      pathname: `/profile/${provide?.userId}`
                    });
                  }}
                >
                  <UserSvg />
                  <div>โปรไฟล์</div>
                </SecondaryButton>
              )}
            </ProvideUserCard>
          </WrapperContainer>
          <RequestFormModal
            visible={isModalVisible}
            setUpdateData={setProvide}
            onClose={() => setIsModalVisible(false)}
            requestData={{
              ...provide,
              type: 'provide'
            }}
          />
        </div>
      ) : (
        <WrapperContainer
          css={css`
            overflow-y: scroll;

            ${mediaQueryTablet} {
              height: calc(100vh - 200px);
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

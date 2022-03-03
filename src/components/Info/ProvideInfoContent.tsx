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
import {
  HashtagButton,
  PrimaryButton,
  CategoryButton,
  SecondaryButton
} from 'components/Button/Button';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import DefaultImage from 'images/default.png';
import { UserSvg } from 'components/Svg/UserSvg';
import { Divider, Dropdown, Menu, message } from 'antd';
import { RankingBadge, RequestStatusBadge } from 'components/Badge/Badge';
import { SuggestedBadge } from 'components/Badge/Badge';
import { RANK_BADGE } from 'components/Badge/const';
import { useProvide } from 'hooks/provide/useProvide';
import { useUser } from 'hooks/user/useUser';
import { userStore } from 'store/userStore';
import { logout } from 'features/logout/Logout';

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
import { useDeleteProvide } from '../../hooks/provide/useDeleteProvide';

const ProvideImageSection = styled.img`
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

const ProvideUserCard = styled.div`
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

const ProvideInfoContainer = styled.div`
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

const ProvideDetail = styled.div`
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

const ProvideTitle = styled.div`
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
    margin-right: 10px;
  }

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 16px;
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
  const { execute: deleteProvide } = useDeleteProvide();

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
          {/* <EditSvg style={{ marginRight: '8px' }} /> */}
          <div
            css={css`
              font-size: 13px;
            `}
          >
            แก้ไข
          </div>
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
          {/* <EyeOffSvg
            style={{ marginRight: '18px' }}
            css={css`
              font-size: 14px;
            `}
          /> */}
          <div
            css={css`
              font-size: 13px;
            `}
          >
            {Boolean(provide?.visibility) ? 'ซ่อน' : 'เลิกซ่อน'}
          </div>
        </div>
      </Menu.Item>
      <Menu.Item key="3">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={() => {
            deleteProvide(query)
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
          <div
            css={css`
              font-size: 13px;
            `}
          >
            ลบ
          </div>
        </div>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    if (query || window.localStorage.getItem('id')) {
      getProvide(query ?? window.localStorage.getItem('id')).then((res) => {
        setProvide(res.data);
      });
    }
  }, []);

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
            <Flex justify="flex-end">
              {!Boolean(provide?.visibility) && (
                <RequestStatusBadge
                  status={0}
                  css={css`
                    ${mediaQueryMobile} {
                      right: 30px;
                      position: relative;
                    }
                  `}
                >
                  ซ่อน
                </RequestStatusBadge>
              )}

              {provide?.userId === window.localStorage.getItem('id') && (
                <Dropdown.Button
                  icon={<MoreOutlined />}
                  overlay={dropDownMenu}
                  trigger={['click']}
                  css={css`
                    position: absolute;
                    z-index: 8;
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
                    }
                  `}
                />
              )}
            </Flex>
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
                    width: 600px;
                    flex-wrap: wrap;

                    ${mediaQueryMobile} {
                      width: 100%;
                    }
                  `}
                >
                  {provide?.hashtag.map((items) => (
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
                style={{ width: 'unset' }}
                itemAlign={isTablet ? 'flex-start' : 'center'}
              >
                <ProvideInfoContainer>
                  <ProvideTitle>ชื่อ</ProvideTitle>
                  <Flex>
                    <ProvideDetail>{provide?.title}</ProvideDetail>
                    {/* {!Boolean(provide?.visibility) && (
                      <RequestStatusBadge status={0}>ซ่อน</RequestStatusBadge>
                    )} */}
                  </Flex>
                  <ProvideTitle>
                    {isMobile ? 'สถานที่' : 'สถานที่ให้ความข่วยเหลือ'}
                  </ProvideTitle>
                  <ProvideDetail>{provide?.location.name}</ProvideDetail>
                  <ProvideTitle>จำนวนการช่วยเหลือ</ProvideTitle>
                  <ProvideDetail>{provide?.provideSum} ครั้ง</ProvideDetail>
                  <ProvideTitle>ราคาสินค้า</ProvideTitle>
                  <ProvideDetail>{provide?.price} บาท</ProvideDetail>
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
                        position: absolute;
                        bottom: 0;

                        ${mediaQueryLargeDesktop} {
                          bottom: 40px;
                        }

                        ${mediaQueryTablet} {
                          width: 100%;
                          max-width: 100%;
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
                  >
                    {provide?.user.rank.toUpperCase()}
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
                      pathname: `/profile/${provide?.userId}`
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

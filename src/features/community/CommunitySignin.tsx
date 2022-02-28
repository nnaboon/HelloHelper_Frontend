/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useHistory, useLocation } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Modal, Input, message } from 'antd';
import { WrapperContainer } from 'components/Wrapper/WrapperContainer';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import Flex from 'components/Flex/Flex';
import { Text } from 'components/Text';
import { RANK_BADGE } from 'components/Badge/const';
import { RankingBadge } from 'components/Badge/Badge';
import { useCommunities } from 'hooks/community/useCommunities';
import { useUpdateJoinedCommunityRequest } from 'hooks/community/useUpdateJoinedCommunityRequest';
import { useJoinCommunity } from 'hooks/community/useJoinCommunity';
import { CreateCommunityForm } from 'components/Form/CreateCommunityForm';
import { CheckOutlined } from '@ant-design/icons';
import { Loading } from 'components/Loading/Loading';
import DefaultImage from 'images/default.png';
import {
  useMedia,
  MOBILE_WIDTH,
  TABLET_WIDTH,
  LARGE_DESKTOP_WIDTH,
  mediaQueryMobile,
  mediaQueryLargeDesktop,
  mediaQuerySmallTablet,
  mediaQueryTablet,
  mediaQueryExtraLargeDesktop
} from 'styles/variables';
import { userStore } from 'store/userStore';
import { EmptyData } from 'components/Empty/EmptyData';
import { logout } from 'features/logout/Logout';

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
  object-fit: cover;

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

export const CommunitySignin = observer(() => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [search, setSearch] = useState<any>();
  const { data: communities, execute: getCommunities } = useCommunities();
  const {
    data: response,
    loading: updateJoinCommunityLoading,
    execute: joinCommunity
  } = useJoinCommunity();
  const {
    data: updateJoinRequest,
    loading: updateJoinRequestLoading,
    execute: updateJoinedCommunityRequest
  } = useUpdateJoinedCommunityRequest();

  const history = useHistory();
  const { pathname, state } = useLocation();
  const { me } = userStore;
  const query = pathname.split('/')[3];
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isTablet = useMedia(`(max-width: ${TABLET_WIDTH}px)`);
  const isLargeDesktop = useMedia(`(max-width: ${LARGE_DESKTOP_WIDTH}px)`);

  const { Search } = Input;

  const onSearch = (value) => {
    setSearch(value);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    getCommunities();
  }, [updateJoinCommunityLoading, updateJoinRequestLoading]);

  return (
    <WrapperContainer>
      {communities ? (
        <React.Fragment>
          <Text
            fontSize="23px"
            fontWeight={500}
            marginTop="10px"
            marginBottom="30px"
            css={css`
              font-size: 1.5rem;

              ${mediaQueryLargeDesktop} {
                font-size: 20px;
              }

              ${mediaQueryTablet} {
                font-size: 16px;
              }

              ${mediaQueryMobile} {
                font-size: 14px;
              }
            `}
          >
            คุณมีชุมชนความช่วยเหลือแล้วหรือยัง
            สามารถเพิ่มชุมชนความช่วยเหลือของคุณเองได้{' '}
            <span
              style={{ color: '#F86800', cursor: 'pointer' }}
              onClick={() => setIsModalVisible(true)}
            >
              ที่นี่
            </span>
          </Text>
          <Search
            placeholder="ค้นหาชุมชนความช่วยเหลือ หรือ สถานที่"
            onSearch={onSearch}
            size="large"
            style={{ width: isMobile ? '200px' : '462px', height: '40px' }}
            css={css`
              .ant-input {
                height: 40px;
                width: 600px;
                font-size: 1.6rem;
                line-height: 6.8713;
              }

              .ant-btn-icon-only.ant-btn-lg {
                height: 40px;
                width: 60px;
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
          {communities.filter(
            ({ communityName, location }) =>
              communityName.includes(search) || location.name.includes(search)
          ).length > 0
            ? communities
                .filter(
                  ({ communityName, location }) =>
                    communityName.includes(search) ||
                    location.name.includes(search)
                )
                .map(
                  ({
                    communityName,
                    id,
                    createdBy,
                    joinedRequestUserId,
                    imageUrl
                  }) => (
                    <UserProfileCard key={id}>
                      <div style={{ display: 'flex' }}>
                        <UserProfileImageContainer>
                          <HelperImage
                            src={imageUrl ?? DefaultImage}
                            alt="community pic"
                          />
                        </UserProfileImageContainer>
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                          `}
                        >
                          <UserName>{communityName}</UserName>
                        </div>
                      </div>

                      {me?.communityId?.includes(id) ? (
                        <PrimaryButton
                          onClick={() => {
                            history.push(`/community/${id}`);
                          }}
                          css={css`
                            margin-right: 100px;
                            width: 180px;
                            z-index: 5;
                          `}
                        >
                          <div>ดูชุมชนความช่วยเหลือ</div>
                        </PrimaryButton>
                      ) : (
                        <SecondaryButton
                          css={css`
                            margin-right: 100px;
                            width: 230px;
                            z-index: 5;

                            ${mediaQueryLargeDesktop} {
                              width: 180px;
                            }
                          `}
                          onClick={() => {
                            if (
                              joinedRequestUserId?.filter(({ userId }) =>
                                userId.includes(
                                  window.localStorage.getItem('id')
                                )
                              ).length > 0
                            ) {
                              try {
                                updateJoinedCommunityRequest(id, {
                                  joinedRequestId: joinedRequestUserId?.filter(
                                    ({ userId }) =>
                                      userId.includes(
                                        window.localStorage.getItem('id')
                                      )
                                  )[0].id,
                                  status: 0
                                }).catch((error) => {
                                  if (error.response.data === 'Unauthorized') {
                                    logout();
                                  } else {
                                    message.error('ไม่สามารถส่งคำขอได้');
                                  }
                                });
                              } catch (e) {
                                message.error('ไม่สามารถส่งคำขอได้');
                              } finally {
                                message.success('สำเร็จ');
                              }
                            } else {
                              try {
                                joinCommunity({
                                  userId: window.localStorage.getItem('id'),
                                  communityId: id,
                                  communityAdminUserId: createdBy
                                });
                              } catch (e) {
                                message.error('ไม่สามารถส่งคำขอได้');
                              } finally {
                                message.success('สำเร็จ');
                              }
                            }
                          }}
                        >
                          <div>
                            {joinedRequestUserId?.filter(({ userId }) =>
                              userId.includes(window.localStorage.getItem('id'))
                            ).length > 0 ? (
                              <Flex>
                                <CheckOutlined style={{ marginRight: '7px' }} />
                                <div>ได้ส่งคำขอแล้ว</div>
                              </Flex>
                            ) : (
                              'ส่งคำขอเข้าร่วม'
                            )}
                          </div>
                        </SecondaryButton>
                      )}
                    </UserProfileCard>
                  )
                )
            : search && <EmptyData height="400px" />}
          {/* {communities
            .filter(
              ({ communityName, location }) =>
                communityName.includes(search) || location.name.includes(search)
            )
            .map(({ communityName, id, createdBy, joinedRequestUserId }) => (
              <UserProfileCard key={id}>
                <div style={{ display: 'flex' }}>
                  <UserProfileImageContainer>
                    <HelperImage src={undefined} alt="user avatar" />
                  </UserProfileImageContainer>
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                    `}
                  >
                    <UserName>{communityName}</UserName>
                  </div>
                </div>

                {me.communityId.includes(id) ? (
                  <PrimaryButton
                    onClick={() => {
                      history.push(`/community/${id}`);
                    }}
                    css={css`
                      margin-right: 100px;
                      width: 180px;
                      z-index: 5;
                    `}
                  >
                    <div>ดูชุมชนความช่วยเหลือ</div>
                  </PrimaryButton>
                ) : (
                  <SecondaryButton
                    css={css`
                      margin-right: 100px;
                      width: 180px;
                      z-index: 5;
                    `}
                    onClick={() => {
                      if (
                        joinedRequestUserId?.filter(({ userId }) =>
                          userId.includes(window.localStorage.getItem('id'))
                        ).length > 0
                      ) {
                        try {
                          updateJoinedCommunityRequest(id, {
                            joinedRequestId: joinedRequestUserId?.filter(
                              ({ userId }) =>
                                userId.includes(
                                  window.localStorage.getItem('id')
                                )
                            )[0].id,
                            status: 0
                          });
                        } catch (e) {
                          message.error('ไม่สามารถส่งคำขอได้');
                        } finally {
                          message.success('สำเร็จ');
                        }
                      } else {
                        try {
                          joinCommunity({
                            userId: window.localStorage.getItem('id'),
                            communityId: id,
                            communityAdminUserId: createdBy
                          });
                        } catch (e) {
                          message.error('ไม่สามารถส่งคำขอได้');
                        } finally {
                          message.success('สำเร็จ');
                        }
                      }
                    }}
                  >
                    <div>
                      {joinedRequestUserId?.filter(({ userId }) =>
                        userId.includes(window.localStorage.getItem('id'))
                      ).length > 0 ? (
                        <Flex>
                          <CheckOutlined style={{ marginRight: '7px' }} />
                          <div>ได้ส่งคำขอแล้ว</div>
                        </Flex>
                      ) : (
                        'ส่งคำขอเข้าร่วม'
                      )}
                    </div>
                  </SecondaryButton>
                )}
              </UserProfileCard>
            ))} */}

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            // width={isMobile ? '80%' : isLargeDesktop ? '800px' : '32%'}
            maskClosable={false}
            centered
            css={css`
              .ant-modal-content {
                min-height: 620px;
                height: 880px;
              }

              ${mediaQueryLargeDesktop} {
                width: 500px !important;

                .ant-modal-content {
                  min-height: 520px;
                  height: 750px;
                }
              }

              ${mediaQueryMobile} {
                width: 320px !important;

                .ant-modal-content {
                  min-height: 700px;
                  height: max-content;
                }
              }

              .ant-modal-body {
                width: 100%;
                height: 100%;
                position: absolute;
              }
            `}
          >
            <CreateCommunityForm setVisible={setIsModalVisible} />
          </Modal>
        </React.Fragment>
      ) : (
        <Loading height="calc(100vh - 265px)" />
      )}
    </WrapperContainer>
  );
});

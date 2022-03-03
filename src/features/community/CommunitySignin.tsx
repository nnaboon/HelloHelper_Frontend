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
  mediaQueryDesktop,
  mediaQueryExtraLargeDesktop
} from 'styles/variables';
import { userStore } from 'store/userStore';
import { EmptyData } from 'components/Empty/EmptyData';
import { logout } from 'features/logout/Logout';
import { firestore } from '../../firebase';

const CommunityImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 5px;
  object-fit: cover;

  ${mediaQueryLargeDesktop} {
    width: 65px;
    height: 65px;
  }

  ${mediaQueryMobile} {
    width: 55px;
    height: 55px;
  }
`;

const CommunityName = styled.div`
  font-weight: 700;
  font-size: 18px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;
  min-width: 140px;
  width: max-content;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }

  ${mediaQueryMobile} {
    min-width: max-content;
    font-size: 14px;
    margin-right: 0;
  }
`;

const CommunityCard = styled.div`
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

  ${mediaQueryLargeDesktop} {
    height: 100px;
  }

  ${mediaQueryMobile} {
    flex-direction: column;
    justify-content: space-around;
    height: 150px;
    margin: 20px 0;
    padding: 10px 15px;
  }
`;

const CommunityImageContainer = styled.div`
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
    margin-right: 20px;
    margin-left: 0;
    width: 100%;
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
  const { pathname } = useLocation();
  const { me } = userStore;
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

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
    const doc = firestore.collection('communities');

    const observer = doc.onSnapshot(
      async (docSnapshot) => {
        getCommunities();
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    return () => observer();
  }, []);

  // useEffect(() => {
  //   getCommunities();
  // }, [updateJoinCommunityLoading, updateJoinRequestLoading]);

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
                font-size: 18px;
              }

              ${mediaQueryTablet} {
                font-size: 16px;
              }

              ${mediaQueryMobile} {
                font-size: 15px;
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
            style={{ width: isMobile ? '300px' : '462px', height: '40px' }}
            css={css`
              .ant-input {
                height: 40px;
                width: 600px;
                font-size: 16px;
                line-height: 6.8713;
              }

              .ant-btn-icon-only.ant-btn-lg {
                height: 40px;
                width: 60px;
              }

              ${mediaQueryExtraLargeDesktop} {
                .ant-input {
                  height: 35px;
                  width: 100%;
                  font-size: 16px;
                }

                .ant-btn-icon-only.ant-btn-lg {
                  height: 35px;
                  width: 35px;
                }
              }

              ${mediaQueryMobile} {
                .ant-input {
                  font-size: 14px;
                }
              }
            `}
          />
          {communities.filter(({ communityName, location }) =>
            search
              ? communityName.includes(search) || location.name.includes(search)
              : true
          ).length > 0
            ? communities
                .filter(({ communityName, location }) =>
                  search
                    ? communityName.includes(search) ||
                      location.name.includes(search)
                    : true
                )
                .map(
                  ({
                    communityName,
                    id,
                    createdBy,
                    joinedRequestUserId,
                    imageUrl
                  }) => (
                    <CommunityCard key={id}>
                      <div style={{ display: 'flex' }}>
                        <CommunityImageContainer>
                          <CommunityImage
                            src={imageUrl ?? DefaultImage}
                            alt="community pic"
                          />
                        </CommunityImageContainer>
                        <div
                          css={css`
                            display: flex;
                            align-items: center;
                          `}
                        >
                          <CommunityName>{communityName}</CommunityName>
                        </div>
                      </div>

                      {/* {me?.communityId?.includes(id) ? ( */}
                      <SecondaryButton
                        onClick={() => {
                          history.push(`/community/${id}`);
                        }}
                        css={css`
                          margin-right: 100px;
                          width: 150px;
                          z-index: 5;
                          font-size: 14px;

                          ${mediaQueryMobile} {
                            margin: 0;
                            width: 100%;
                          }
                        `}
                      >
                        <div>ดูชุมชนความช่วยเหลือ</div>
                      </SecondaryButton>
                      {/* ) : (
                        <SecondaryButton
                          css={css`
                            margin-right: 100px;
                            width: 150px !important;
                            font-size: 14px;
                            z-index: 5;

                            ${mediaQueryMobile} {
                              margin: 0;
                              width: 100% !important;
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
                      )} */}
                    </CommunityCard>
                  )
                )
            : search && <EmptyData height="400px" />}

          <Modal
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
            maskClosable={false}
            centered
            css={css`
              .ant-modal-content {
                min-height: 620px;
                height: 800px;
              }

              ${mediaQueryLargeDesktop} {
                width: 500px !important;

                .ant-modal-content {
                  min-height: 420px;
                  height: 750px !important;
                }
              }

              ${mediaQueryDesktop} {
                .ant-modal-content {
                  min-height: 590px;
                  height: 750px !important;
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

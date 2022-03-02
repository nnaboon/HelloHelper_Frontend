/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { Dropdown, Menu, message } from 'antd';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { Text } from 'components/Text';
import DefaultImage from 'images/default.png';
import {
  useMedia,
  MOBILE_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet,
  mediaQueryLargeDesktop
} from 'styles/variables';
import { useCommunity } from 'hooks/community/useCommunity';
import { useUpdateJoinedCommunityRequest } from 'hooks/community/useUpdateJoinedCommunityRequest';
import { useUpdateMemberRole } from 'hooks/community/useUpdateMemberRole';
import { useBanMember } from 'hooks/community/useBanMember';
import { EmptyData } from 'components/Empty/EmptyData';
import { firestore } from '../../firebase';
import { logout } from 'features/logout/Logout';

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 100px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

  ${mediaQueryLargeDesktop} {
    height: 90px;
  }

  ${mediaQueryMobile} {
    height: 135px;
    margin-bottom: 20px;
  }
`;

const CommunityAdminBadge = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 26px;
  color: #ee6400;

  ${mediaQueryMobile} {
    width: 100%;
    margin-top: -8px;
  }
`;

const CommunityMemberImage = styled.img`
  border-radius: 50%;
  width: 70px;
  height: 70px;
  margin-right: 55px;

  ${mediaQueryLargeDesktop} {
    width: 50px;
    height: 50px;
  }

  ${mediaQueryMobile} {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 22px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;

  ${mediaQueryLargeDesktop} {
    font-size: 18px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
    width: max-content;
    margin-right: 20px;
    min-width: max-content;
  }
`;

const CommunityMemberContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-left: 90px;
  justify-content: space-between;

  ${mediaQueryTablet} {
    margin-left: 35px;
  }

  ${mediaQueryMobile} {
    margin-left: 0;
    padding: 20px;
    flex-direction: column;
  }
`;

const CommunityMemberImageContainer = styled.div`
  display: flex;
  align-items: center;

  ${mediaQueryMobile} {
    margin-left: 0;
    align-self: flex-start;
  }
`;

const CommunityButtonContainer = styled.div`
  display: flex;
  margin-right: 80px;

  ${mediaQueryTablet} {
    margin-right: 35px;
  }
  ${mediaQueryMobile} {
    margin: 0;
    position: relative;
    bottom: -13px;
    width: 100%;
    justify-content: space-between;
  }
`;

const CommunityTitle = styled(Text)`
  font-weight: 500;
  font-size: 24px;
  margin-bottom: 20px;
  margin-top: 20px;

  ${mediaQueryLargeDesktop} {
    margin-bottom: 15px;
    font-size: 20px;
  }

  ${mediaQueryMobile} {
    font-size: 16px;
  }
`;

export const CommunitySettingManageMember = () => {
  const [member, setMember] = useState<any[]>();
  const [joinedRequestUserId, setJoinedRequestUserId] = useState<any[]>();

  const { pathname } = useLocation();
  const query = pathname.split('/')[3];

  const { execute: updateJoinedCommunityRequest } =
    useUpdateJoinedCommunityRequest();
  const { execute: updateMemberRole } = useUpdateMemberRole();
  const { execute: bannedMember } = useBanMember();
  const { data: community, execute: getCommunity } = useCommunity();

  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);

  const menu = (userId: string) => (
    <Menu>
      <Menu.Item
        onClick={() => {
          updateMemberRole(query, userId, {
            role: 1,
            communityAdminUserId: window.localStorage.getItem('id')
          })
            .then(() => {
              message.success('เปลี่ยนบทบาทสำเร็จ');
            })
            .catch((error) => {
              if (error.response.data === 'Unauthorized') {
                logout();
              } else {
                message.error(
                  'ขออภัย ผู้นำชุมชนจำเป็นต้องมีมากกว่า 1 คนแต่น้อยกว่า 3 คน'
                );
              }
            });
        }}
      >
        ผู้นำชุมชน
      </Menu.Item>
      <Menu.Item
        onClick={() => {
          updateMemberRole(query, userId, {
            role: 0,
            communityAdminUserId: window.localStorage.getItem('id')
          })
            .then(() => {
              message.success('เปลี่ยนบทบาทสำเร็จ');
            })
            .catch((error) => {
              if (error.response.data === 'Unauthorized') {
                logout();
              } else {
                message.error(
                  'ขออภัย ผู้นำชุมชนจำเป็นต้องมีมากกว่า 1 คนแต่น้อยกว่า 3 คน'
                );
              }
            });
        }}
      >
        สมาชิกชุมขน
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const doc = firestore
      .collection('communities')
      .doc(query)
      .collection('members');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        getCommunity(query).then((res) => {
          setJoinedRequestUserId(res.data.joinedRequestUserId);
          setMember(res.data.member);
        });
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => observer();
  }, []);

  useEffect(() => {
    const doc = firestore
      .collection('communities')
      .doc(query)
      .collection('joinedRequestUserId');

    const observer = doc.onSnapshot(
      (docSnapshot) => {
        getCommunity(query).then((res) => {
          setJoinedRequestUserId(res.data.joinedRequestUserId);
          setMember(res.data.member);
        });
      },
      (err) => {
        console.log(`Encountered error: ${err}`);
      }
    );

    //remember to unsubscribe from your realtime listener on unmount or you will create a memory leak
    return () => observer();
  }, []);

  useEffect(() => {
    if (!community && !member) {
      getCommunity(query).then((res) => {
        setJoinedRequestUserId(res.data.joinedRequestUserId);
        setMember(res.data.member);
      });
    }
  }, []);

  return (
    <div
      css={css`
        margin: 40px 60px;
        height: 100%;

        ${mediaQueryTablet} {
          margin: 0;
        }

        ${mediaQueryMobile} {
          margin-top: 20px;
        }
      `}
    >
      <CommunityTitle fontWeight={500}>ผู้ต้องการเข้าร่วมชุมชน</CommunityTitle>
      {joinedRequestUserId?.length > 0 ? (
        <div>
          {' '}
          {joinedRequestUserId.map(
            ({ id, username, userId, joinedRequestId, imageUrl }) => (
              <CommunityMemberCard key={userId}>
                <CommunityMemberContainer>
                  <CommunityMemberImageContainer>
                    <CommunityMemberImage
                      src={imageUrl ?? DefaultImage}
                      alt="community member avatar"
                    />
                    <UserName>{username}</UserName>
                  </CommunityMemberImageContainer>
                  <CommunityButtonContainer>
                    <SecondaryButton
                      css={css`
                        min-width: 109px;
                        width: 109px;

                        ${mediaQueryMobile} {
                          width: 100%;
                          margin-right: 15px;
                        }
                      `}
                      onClick={() => {
                        updateJoinedCommunityRequest(query, {
                          joinedRequestId: id,
                          userId: userId
                        })
                          .then(() => {
                            message.success('สำเร็จ');
                          })
                          .catch((error) => {
                            if (error.response.data === 'Unauthorized') {
                              logout();
                            } else {
                              message.error('ไม่สำเร็จ');
                            }
                          });
                      }}
                    >
                      <div>ปฏิเสธ</div>
                    </SecondaryButton>
                    <PrimaryButton
                      css={css`
                        min-width: 109px;
                        width: 109px;

                        ${mediaQueryMobile} {
                          width: 100%;
                        }
                      `}
                      onClick={() => {
                        updateJoinedCommunityRequest(query, {
                          joinedRequestId: id,
                          status: 1,
                          requesterUserId: userId,
                          communityAdminUserId:
                            window.localStorage.getItem('id')
                        })
                          .then(() => {
                            message.success('สำเร็จ');
                          })
                          .catch((error) => {
                            if (error.response.data === 'Unauthorized') {
                              logout();
                            } else {
                              message.error('ไม่สำเร็จ');
                            }
                          });
                      }}
                    >
                      <div>ยอมรับ</div>
                    </PrimaryButton>
                  </CommunityButtonContainer>
                </CommunityMemberContainer>
              </CommunityMemberCard>
            )
          )}
        </div>
      ) : (
        <EmptyData
          text={`ยังไม่มีสมาชิกในชุมชนความช่วยเหลือนี้`}
          height={isMobile ? '150px' : '200px'}
        />
      )}

      <CommunityTitle fontWeight={500}>ผู้นำชุมชน</CommunityTitle>
      {member
        ?.filter(({ role }) => role === 1)
        .map(({ id, username, imageUrl }) => (
          <CommunityMemberCard key={id}>
            <CommunityMemberContainer>
              <CommunityMemberImageContainer>
                {' '}
                <CommunityMemberImage
                  src={imageUrl ?? DefaultImage}
                  alt="community member avatar"
                />
                <UserName>{username}</UserName>
              </CommunityMemberImageContainer>
              <CommunityButtonContainer>
                <SecondaryButton
                  css={css`
                    min-width: 109px;
                    width: 109px;

                    ${mediaQueryMobile} {
                      width: 100%;
                      margin-right: 15px;
                    }
                  `}
                  onClick={() => {
                    bannedMember(query, id, {
                      communityAdminUserId: window.localStorage.getItem('id')
                    })
                      .then(() => {
                        message.success(
                          'ลบผู้ใช้งานออกจากชุมชนความช่วยเหลือนี้สำเร็จ'
                        );
                      })
                      .catch((error) => {
                        if (error.response.data === 'Unauthorized') {
                          logout();
                        } else {
                          message.error(
                            'ขออภัย ไม่สามารถลบผู้ใช้งานนี้ได้ ณ ขณะนี้'
                          );
                        }
                      });
                  }}
                >
                  <div>ลบ</div>
                </SecondaryButton>
                <Dropdown overlay={menu(id)} trigger={['click']}>
                  <PrimaryButton
                    css={css`
                      min-width: 109px;
                      width: 109px;

                      ${mediaQueryMobile} {
                        width: 100%;
                      }
                    `}
                  >
                    <div>เปลี่ยนสถานะ</div>
                  </PrimaryButton>
                </Dropdown>
              </CommunityButtonContainer>
            </CommunityMemberContainer>
          </CommunityMemberCard>
        ))}
      <CommunityTitle fontWeight={500}>สมาชิกในชุมชน</CommunityTitle>
      {member?.filter(({ role }) => role === 0).length > 0 ? (
        <React.Fragment>
          {' '}
          {member
            ?.filter(({ role }) => role === 0)
            .map(({ id, username, imageUrl }) => (
              <CommunityMemberCard key={id}>
                <CommunityMemberContainer>
                  <CommunityMemberImageContainer>
                    {' '}
                    <CommunityMemberImage
                      src={imageUrl ?? DefaultImage}
                      alt="community member avatar"
                    />
                    <UserName>{username}</UserName>
                  </CommunityMemberImageContainer>
                  <CommunityButtonContainer>
                    <SecondaryButton
                      css={css`
                        min-width: 109px;
                        width: 109px;

                        ${mediaQueryMobile} {
                          margin-right: 15px;
                          width: 100%;
                        }
                      `}
                      onClick={() => {
                        bannedMember(query, id, {
                          communityAdminUserId:
                            window.localStorage.getItem('id')
                        })
                          .then(() => {
                            message.success(
                              'ลบผู้ใช้งานออกจากชุมชนความช่วยเหลือนี้สำเร็จ'
                            );
                          })
                          .catch((error) => {
                            if (error.response.data === 'Unauthorized') {
                              logout();
                            } else {
                              message.error(
                                'ขออภัย ไม่สามารถลบผู้ใช้งานนี้ได้ ณ ขณะนี้'
                              );
                            }
                          });
                      }}
                    >
                      <div>ลบ</div>
                    </SecondaryButton>
                    <Dropdown overlay={menu(id)} trigger={['click']}>
                      <PrimaryButton
                        css={css`
                          min-width: 109px;
                          width: 109px;

                          ${mediaQueryMobile} {
                            width: 100%;
                          }
                        `}
                      >
                        <div>เปลี่ยนสถานะ</div>
                      </PrimaryButton>
                    </Dropdown>
                  </CommunityButtonContainer>
                </CommunityMemberContainer>
              </CommunityMemberCard>
            ))}
        </React.Fragment>
      ) : (
        <EmptyData
          text={`ยังไม่มีสมาชิกในชุมชนความช่วยเหลือนี้`}
          height={isMobile ? '150px' : '200px'}
        />
      )}
    </div>
  );
};

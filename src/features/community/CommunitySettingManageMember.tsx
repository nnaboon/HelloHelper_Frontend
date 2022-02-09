/** @jsxRuntime classic */
/** @jsx jsx */
import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { css, jsx } from '@emotion/react';
import { useLocation } from 'react-router-dom';
import { Dropdown, Menu } from 'antd';
import { SecondaryButton, PrimaryButton } from 'components/Button/Button';
import { Text } from 'components/Text';
import DefaultImage from 'images/default.png';
import {
  useMedia,
  MOBILE_WIDTH,
  SMALL_TABLET_WIDTH,
  mediaQueryMobile,
  mediaQueryTablet
} from 'styles/variables';
import { useUpdateJoinedCommunityRequest } from '../../hooks/community/useUpdateJoinedCommunityRequest';
import { EmptyData } from 'components/Empty/EmptyData';

interface CommunitySettingManagerMemberProps {
  member: any;
  joinedRequest: any;
}

const CommunityMemberCard = styled.div`
  width: 100%;
  height: 120px;
  background: #ffffff;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;

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
  width: 74px;
  height: 74px;
  margin-right: 55px;

  ${mediaQueryMobile} {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const UserName = styled.div`
  font-weight: 700;
  font-size: 24px;
  color: #000000;
  margin-bottom: 5px;
  margin-right: 30px;

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

const CommunityPrimaryButton = styled(PrimaryButton)`
  width: 140px;

  ${mediaQueryTablet} {
    width: 120px;
  }

  ${mediaQueryMobile} {
    width: 45%;
  }
`;

const CommunitySecondaryButton = styled(SecondaryButton)`
  width: 140px;

  ${mediaQueryTablet} {
    width: 120px;
    margin-right: 0;
  }

  ${mediaQueryMobile} {
    width: 45%;
  }
`;

export const CommunitySettingManageMember = ({
  member,
  joinedRequest
}: CommunitySettingManagerMemberProps) => {
  const isMobile = useMedia(`(max-width: ${MOBILE_WIDTH}px)`);
  const isSmallTablet = useMedia(`(max-width: ${SMALL_TABLET_WIDTH}px)`);
  const { pathname } = useLocation();
  const query = pathname.split('/')[3];
  const { execute: updateJoinedCommunityRequest } =
    useUpdateJoinedCommunityRequest();

  const menu = (
    <Menu>
      <Menu.Item>ผู้นำชุมชน</Menu.Item>
      <Menu.Item>สมาชิกชุมขน</Menu.Item>
    </Menu>
  );

  return (
    <div style={{ margin: isSmallTablet ? 0 : '40px 60px' }}>
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        ผู้ต้องการเข้าร่วมชุมชน
      </Text>
      {joinedRequest.length > 0 ? (
        <div>
          {' '}
          {joinedRequest.map(
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
                    <CommunitySecondaryButton
                      onClick={() => {
                        updateJoinedCommunityRequest(query, {
                          joinedRequestId: id,
                          userId: userId
                        });
                      }}
                    >
                      <div>ปฏิเสธ</div>
                    </CommunitySecondaryButton>
                    <CommunityPrimaryButton
                      onClick={() => {
                        updateJoinedCommunityRequest(query, {
                          joinedRequestId: id,
                          status: 1,
                          requesterUserId: userId,
                          communityAdminUserId:
                            window.localStorage.getItem('id')
                        });
                      }}
                    >
                      <div>ยอมรับ</div>
                    </CommunityPrimaryButton>
                  </CommunityButtonContainer>
                </CommunityMemberContainer>
              </CommunityMemberCard>
            )
          )}
        </div>
      ) : (
        <EmptyData text={`ยังไม่มีสมาชิกในชุมชนความช่วยเหลือนี้`} />
      )}

      <Text fontWeight={500} fontSize="28px" marginY="40px">
        ผู้นำชุมชน
      </Text>
      {member
        .filter(({ role }) => role === 1)
        .map(({ id, username, imageUrl, userId }) => (
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
                <CommunitySecondaryButton>
                  <div>ลบ</div>
                </CommunitySecondaryButton>
                <Dropdown overlay={menu}>
                  <CommunityPrimaryButton>
                    <div>เปลี่ยนสถานะ</div>
                  </CommunityPrimaryButton>
                </Dropdown>
              </CommunityButtonContainer>
            </CommunityMemberContainer>
          </CommunityMemberCard>
        ))}
      {/* {member
        .filter(({ role }) => role === 1)
        .map(({ username, userId }) => (
          <CommunityMemberCard key={userId}>
            <CommunityMemberContainer>
              <CommunityMemberImageContainer>
                {' '}
                <CommunityMemberImage
                  src={UserAvatar}
                  alt="community member avatar"
                />
                <UserName>{username}</UserName>
              </CommunityMemberImageContainer>
              <CommunityButtonContainer>
                <CommunitySecondaryButton>
                  <div>ลบ</div>
                </CommunitySecondaryButton>
                <Dropdown overlay={menu}>
                  <CommunityPrimaryButton>
                    <div>เปลี่ยนสถานะ</div>
                  </CommunityPrimaryButton>
                </Dropdown>
              </CommunityButtonContainer>
            </CommunityMemberContainer>
          </CommunityMemberCard>
        ))} */}
      <Text fontWeight={500} fontSize="28px" marginY="40px">
        สมาชิกในชุมชน
      </Text>
      {member?.filter(({ role }) => role === 0).length > 0 ? (
        <React.Fragment>
          {' '}
          {member
            .filter(({ role }) => role === 0)
            .map(({ id, username, imageUrl, userId }) => (
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
                    <CommunitySecondaryButton>
                      <div>ลบ</div>
                    </CommunitySecondaryButton>
                    <Dropdown overlay={menu}>
                      <CommunityPrimaryButton>
                        <div>เปลี่ยนสถานะ</div>
                      </CommunityPrimaryButton>
                    </Dropdown>
                  </CommunityButtonContainer>
                </CommunityMemberContainer>
              </CommunityMemberCard>
            ))}
        </React.Fragment>
      ) : (
        <EmptyData text={`ยังไม่มีสมาชิกในชุมชนความช่วยเหลือนี้`} />
      )}
      {/* {member
        .filter(({ role }) => role === 0)
        .map(({ username, userId }) => (
          <CommunityMemberCard key={userId}>
            <CommunityMemberContainer>
              <CommunityMemberImageContainer>
                {' '}
                <CommunityMemberImage
                  src={UserAvatar}
                  alt="community member avatar"
                />
                <UserName>{username}</UserName>
              </CommunityMemberImageContainer>
              <CommunityButtonContainer>
                <CommunitySecondaryButton>
                  <div>ลบ</div>
                </CommunitySecondaryButton>
                <Dropdown overlay={menu}>
                  <CommunityPrimaryButton>
                    <div>เปลี่ยนสถานะ</div>
                  </CommunityPrimaryButton>
                </Dropdown>
              </CommunityButtonContainer>
            </CommunityMemberContainer>
          </CommunityMemberCard>
        ))} */}
    </div>
  );
};
